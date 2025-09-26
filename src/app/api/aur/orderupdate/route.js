import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Company from '@/models/Company';
import Payment from '@/models/Payment';
import aurService from '@/lib/aurService';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Process webhook payload
    const webhookData = aurService.processWebhook(body);
    
    if (webhookData.error) {
      console.error('Webhook processing error:', webhookData.error);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const { orderId, status, transactionId, isSuccessful, isFailed } = webhookData;

    // Find payment by order ID
    const payment = await Payment.findOne({ orderId: orderId });
    
    if (!payment) {
      console.error('Payment not found for order ID:', orderId);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // Update payment status
    payment.aurStatus = status;
    payment.aurTransactionId = transactionId;
    payment.aurResponse = body;

    if (isSuccessful) {
      payment.status = 'completed';
      payment.completedAt = new Date();
    } else if (isFailed) {
      payment.status = 'failed';
      payment.failureReason = webhookData.errorMessage || 'Payment cancelled';
    }

    await payment.save();

    // Update company subscription status
    const company = await Company.findById(payment.companyId);
    
    if (company) {
      if (isSuccessful) {
        company.subscriptionStatus = 'active';
        company.lastPaymentDate = new Date();
        company.nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      } else if (isFailed) {
        company.subscriptionStatus = 'suspended';
      }

      await company.save();

      console.log(`Payment ${orderId} updated: ${status} for company ${company.name}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    // Always return 200 to Aur to prevent retries
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

// Handle GET requests (for webhook verification)
export async function GET() {
  return NextResponse.json({ 
    message: 'Aur webhook endpoint is active',
    timestamp: new Date().toISOString()
  }, { status: 200 });
}

