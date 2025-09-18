import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Payment from '@/models/Payment';
import aurService from '@/lib/aurService';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const token = searchParams.get('token');

    if (!orderId && !token) {
      return NextResponse.json(
        { success: false, error: 'orderId or token parameter is required' },
        { status: 400 }
      );
    }

    // Find payment record
    let payment;
    if (orderId) {
      payment = await Payment.findOne({ orderId: orderId });
    } else {
      payment = await Payment.findOne({ aurToken: token });
    }

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    // If we have a token, check with Aur API
    if (payment.aurToken) {
      const aurStatus = await aurService.checkTransactionStatus(payment.aurToken);
      
      if (aurStatus.success) {
        // Update payment with latest Aur status
        const aurData = aurStatus.data;
        payment.aurStatus = aurData.status;
        payment.aurResponse = aurData;
        
        // Update payment status based on Aur response
        if (aurData.status === 'FINISHED' && payment.status !== 'completed') {
          payment.status = 'completed';
          payment.completedAt = new Date();
        } else if (aurData.status === 'CANCELLED' && payment.status !== 'failed') {
          payment.status = 'failed';
          payment.failureReason = 'Payment cancelled by user';
        }
        
        await payment.save();
      }
    }

    // Return payment status
    return NextResponse.json({
      success: true,
      data: {
        orderId: payment.orderId,
        status: payment.status,
        aurStatus: payment.aurStatus,
        amount: payment.amount,
        createdAt: payment.createdAt,
        completedAt: payment.completedAt,
        isSuccessful: payment.isSuccessful(),
        isFailed: payment.isFailed(),
        isPending: payment.isPending(),
        summary: payment.getSummary()
      }
    });

  } catch (error) {
    console.error('Status check error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

