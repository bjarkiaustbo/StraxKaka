import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const submissions = JSON.parse(process.env.STRAXKAKA_SUBSCRIPTIONS || '[]');
    
    // Get payment status overview
    const paymentStatus = {
      total: submissions.length,
      paid: submissions.filter(sub => sub.status === 'paid').length,
      pending: submissions.filter(sub => sub.status === 'pending_payment').length,
      overdue: submissions.filter(sub => {
        // Check if payment is overdue (more than 30 days)
        const lastPayment = sub.lastPaymentDate ? new Date(sub.lastPaymentDate) : new Date(sub.dateCreated);
        const daysSincePayment = Math.floor((new Date() - lastPayment) / (1000 * 60 * 60 * 24));
        return sub.status === 'pending_payment' && daysSincePayment > 30;
      }).length
    };
    
    // Get overdue payments details
    const overduePayments = submissions.filter(sub => {
      const lastPayment = sub.lastPaymentDate ? new Date(sub.lastPaymentDate) : new Date(sub.dateCreated);
      const daysSincePayment = Math.floor((new Date() - lastPayment) / (1000 * 60 * 60 * 24));
      return sub.status === 'pending_payment' && daysSincePayment > 30;
    }).map(sub => ({
      companyName: sub.companyName,
      contactEmail: sub.contactEmail,
      contactPhone: sub.contactPhone,
      monthlyCost: sub.monthlyCost,
      daysOverdue: Math.floor((new Date() - new Date(sub.lastPaymentDate || sub.dateCreated)) / (1000 * 60 * 60 * 24)),
      lastPaymentDate: sub.lastPaymentDate,
      orderId: sub.orderId
    }));
    
    return NextResponse.json({
      success: true,
      paymentStatus,
      overduePayments
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { companyId, status, amount, paymentDate } = await request.json();
    
    // Update payment status
    // This would update the admin system
    
    return NextResponse.json({
      success: true,
      message: 'Payment status updated',
      companyId,
      status
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function GET(request) {
  try {
    const submissions = JSON.parse(process.env.STRAXKAKA_SUBSCRIPTIONS || '[]');
    
    // Get payment status overview
    const paymentStatus = {
      total: submissions.length,
      paid: submissions.filter(sub => sub.status === 'paid').length,
      pending: submissions.filter(sub => sub.status === 'pending_payment').length,
      overdue: submissions.filter(sub => {
        // Check if payment is overdue (more than 30 days)
        const lastPayment = sub.lastPaymentDate ? new Date(sub.lastPaymentDate) : new Date(sub.dateCreated);
        const daysSincePayment = Math.floor((new Date() - lastPayment) / (1000 * 60 * 60 * 24));
        return sub.status === 'pending_payment' && daysSincePayment > 30;
      }).length
    };
    
    // Get overdue payments details
    const overduePayments = submissions.filter(sub => {
      const lastPayment = sub.lastPaymentDate ? new Date(sub.lastPaymentDate) : new Date(sub.dateCreated);
      const daysSincePayment = Math.floor((new Date() - lastPayment) / (1000 * 60 * 60 * 24));
      return sub.status === 'pending_payment' && daysSincePayment > 30;
    }).map(sub => ({
      companyName: sub.companyName,
      contactEmail: sub.contactEmail,
      contactPhone: sub.contactPhone,
      monthlyCost: sub.monthlyCost,
      daysOverdue: Math.floor((new Date() - new Date(sub.lastPaymentDate || sub.dateCreated)) / (1000 * 60 * 60 * 24)),
      lastPaymentDate: sub.lastPaymentDate,
      orderId: sub.orderId
    }));
    
    return NextResponse.json({
      success: true,
      paymentStatus,
      overduePayments
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { companyId, status, amount, paymentDate } = await request.json();
    
    // Update payment status
    // This would update the admin system
    
    return NextResponse.json({
      success: true,
      message: 'Payment status updated',
      companyId,
      status
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
