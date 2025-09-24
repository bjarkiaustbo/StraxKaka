import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Company from '@/models/Company';
import Payment from '@/models/Payment';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const companyId = searchParams.get('companyId');

    if (!orderId && !companyId) {
      return NextResponse.json(
        { success: false, error: 'orderId or companyId parameter is required' },
        { status: 400 }
      );
    }

    // Find company by orderId or companyId
    let company;
    if (orderId) {
      company = await Company.findOne({ orderId: orderId });
    } else {
      company = await Company.findById(companyId);
    }

    if (!company) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      );
    }

    // Get latest payment for this company
    const payment = await Payment.findOne({ companyId: company._id })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: {
        companyId: company._id,
        companyName: company.name,
        orderId: company.orderId,
        subscriptionStatus: company.subscriptionStatus,
        subscriptionTier: company.subscriptionTier,
        monthlyCost: company.monthlyCost,
        employeeCount: company.employees.length,
        paymentDate: company.paymentDate,
        nextBillingDate: company.nextBillingDate,
        createdAt: company.createdAt,
        payment: payment ? {
          orderId: payment.orderId,
          amount: payment.amount,
          status: payment.status,
          paymentMethod: payment.paymentMethod,
          createdAt: payment.createdAt,
          completedAt: payment.completedAt
        } : null
      }
    });

  } catch (error) {
    console.error('Subscription status error:', error);
    
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


