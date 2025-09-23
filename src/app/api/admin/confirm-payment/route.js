import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Company from '@/models/Company';
import Payment from '@/models/Payment';
import PaymentLog from '@/models/PaymentLog';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { orderId, adminNotes, confirmedBy } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Find the company by order ID
    const company = await Company.findOne({ orderId: orderId });
    
    if (!company) {
      return NextResponse.json(
        { success: false, error: 'Company not found with this order ID' },
        { status: 404 }
      );
    }

    // Check if already confirmed
    if (company.subscriptionStatus === 'active') {
      return NextResponse.json(
        { success: false, error: 'Payment already confirmed for this order' },
        { status: 409 }
      );
    }

    // Update company subscription status
    company.subscriptionStatus = 'active';
    company.paymentDate = new Date();
    company.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    await company.save();

    // Update payment record
    const payment = await Payment.findOne({ orderId: orderId });
    if (payment) {
      payment.status = 'completed';
      payment.completedAt = new Date();
      payment.adminNotes = adminNotes || '';
      payment.confirmedBy = confirmedBy || 'admin';
      await payment.save();
    }

    // Create payment log entry
    const paymentLog = new PaymentLog({
      orderId: orderId,
      companyId: company._id,
      confirmedBy: confirmedBy || 'admin',
      dateConfirmed: new Date(),
      notes: adminNotes || 'Payment confirmed manually by admin',
      amount: company.monthlyCost
    });

    await paymentLog.save();

    return NextResponse.json({
      success: true,
      data: {
        orderId: orderId,
        companyName: company.name,
        subscriptionStatus: 'active',
        paymentDate: company.paymentDate,
        nextBillingDate: company.nextBillingDate,
        message: 'Payment confirmed successfully. Subscription is now active.'
      }
    });

  } catch (error) {
    console.error('Payment confirmation error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Get pending payments for admin dashboard
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';

    let query = { paymentMethod: 'bank_transfer' };
    
    if (status === 'pending') {
      query.status = 'pending';
    } else if (status === 'completed') {
      query.status = 'completed';
    }

    const payments = await Payment.find(query)
      .populate('companyId', 'name email phone subscriptionTier monthlyCost')
      .sort({ createdAt: -1 })
      .limit(50);

    const formattedPayments = payments.map(payment => ({
      orderId: payment.orderId,
      companyName: payment.companyId?.name || 'Unknown',
      companyEmail: payment.companyId?.email || 'Unknown',
      amount: payment.amount,
      status: payment.status,
      createdAt: payment.createdAt,
      completedAt: payment.completedAt,
      adminNotes: payment.adminNotes,
      confirmedBy: payment.confirmedBy
    }));

    return NextResponse.json({
      success: true,
      data: formattedPayments
    });

  } catch (error) {
    console.error('Get payments error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}


