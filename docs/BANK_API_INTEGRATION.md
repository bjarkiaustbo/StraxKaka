# Bank API Integration Guide for StraxKaka

## Overview
This guide explains how to integrate bank payment APIs for subscription payments in the StraxKaka system.

## Icelandic Bank APIs

### 1. **Landsbankinn API**
- **Documentation**: https://api.landsbankinn.is/
- **Features**: Payment processing, account verification
- **Requirements**: Business account, API credentials
- **Pricing**: Contact for pricing

### 2. **Arion Bank API**
- **Documentation**: https://developer.arionbanki.is/
- **Features**: Payment gateway, subscription management
- **Requirements**: Business account, API credentials
- **Pricing**: Contact for pricing

### 3. **Íslandsbanki API**
- **Documentation**: https://api.islandsbanki.is/
- **Features**: Payment processing, recurring payments
- **Requirements**: Business account, API credentials
- **Pricing**: Contact for pricing

## International Payment Providers

### 1. **Stripe (Recommended)**
- **Documentation**: https://stripe.com/docs
- **Features**: 
  - Recurring subscriptions
  - Multiple payment methods
  - Webhook support
  - Dashboard analytics
- **Pricing**: 1.4% + 1.8 ISK per transaction
- **Setup**: Easy integration with React/Next.js

### 2. **PayPal**
- **Documentation**: https://developer.paypal.com/
- **Features**: 
  - Subscription billing
  - Multiple currencies
  - Mobile payments
- **Pricing**: 2.9% + fixed fee per transaction

### 3. **Adyen**
- **Documentation**: https://docs.adyen.com/
- **Features**: 
  - Global payment methods
  - Recurring payments
  - Advanced fraud protection
- **Pricing**: Contact for pricing

## Implementation Steps

### Phase 1: Stripe Integration (Recommended)

#### 1. Install Stripe Dependencies
```bash
npm install @stripe/stripe-js stripe
```

#### 2. Create Stripe Configuration
```typescript
// src/lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
```

#### 3. Create Payment Component
```typescript
// src/components/PaymentForm.tsx
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentForm({ subscriptionData, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Error:', error);
    } else {
      // Send payment method to your backend
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          subscriptionData: subscriptionData
        })
      });

      const result = await response.json();
      if (result.success) {
        onSuccess(result.subscription);
      }
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-300 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50"
      >
        {isProcessing ? 'Processing...' : `Pay ${subscriptionData.monthlyCost} ISK/month`}
      </button>
    </form>
  );
}
```

#### 4. Create API Route for Payment Processing
```typescript
// src/app/api/create-subscription/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { paymentMethodId, subscriptionData } = await request.json();

    // Create customer
    const customer = await stripe.customers.create({
      email: subscriptionData.contactEmail,
      name: subscriptionData.companyName,
      metadata: {
        companyId: subscriptionData.companyId,
      },
    });

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        price_data: {
          currency: 'isk',
          product_data: {
            name: `StraxKaka ${subscriptionData.tier} Plan`,
          },
          unit_amount: subscriptionData.monthlyCost * 100, // Convert to öre
          recurring: {
            interval: 'month',
          },
        },
      }],
      default_payment_method: paymentMethodId,
      expand: ['latest_invoice.payment_intent'],
    });

    return NextResponse.json({
      success: true,
      subscription: {
        id: subscription.id,
        status: subscription.status,
        customerId: customer.id,
      }
    });

  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { success: false, error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}
```

#### 5. Update Subscription Context
```typescript
// Add to SubscriptionContext.tsx
const updateSubscriptionStatus = async (companyId: string, paymentData: any) => {
  try {
    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyId,
        paymentData
      })
    });

    const result = await response.json();
    
    if (result.success) {
      updateCompany(companyId, {
        subscriptionStatus: 'active',
        subscriptionStartDate: new Date().toISOString(),
        subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        stripeCustomerId: result.customerId,
        stripeSubscriptionId: result.subscriptionId
      });
    }
  } catch (error) {
    console.error('Payment processing error:', error);
  }
};
```

### Phase 2: Webhook Handling

#### 1. Create Webhook Endpoint
```typescript
// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'invoice.payment_succeeded':
      // Handle successful payment
      const invoice = event.data.object as Stripe.Invoice;
      console.log('Payment succeeded for subscription:', invoice.subscription);
      break;

    case 'invoice.payment_failed':
      // Handle failed payment
      const failedInvoice = event.data.object as Stripe.Invoice;
      console.log('Payment failed for subscription:', failedInvoice.subscription);
      break;

    case 'customer.subscription.deleted':
      // Handle subscription cancellation
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription cancelled:', subscription.id);
      break;
  }

  return NextResponse.json({ received: true });
}
```

### Phase 3: Environment Variables

#### 1. Add to .env.local
```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database (for production)
DATABASE_URL=postgresql://...
```

### Phase 4: Database Schema Updates

#### 1. Add Payment Fields to Company Table
```sql
ALTER TABLE companies ADD COLUMN stripe_customer_id VARCHAR(255);
ALTER TABLE companies ADD COLUMN stripe_subscription_id VARCHAR(255);
ALTER TABLE companies ADD COLUMN payment_method_id VARCHAR(255);
ALTER TABLE companies ADD COLUMN last_payment_date TIMESTAMP;
ALTER TABLE companies ADD COLUMN next_payment_date TIMESTAMP;
```

## Testing

### 1. Stripe Test Cards
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

### 2. Test Webhooks
Use Stripe CLI to forward webhooks to local development:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Security Considerations

1. **Never expose secret keys** in client-side code
2. **Validate webhook signatures** to ensure authenticity
3. **Use HTTPS** in production
4. **Implement rate limiting** on API endpoints
5. **Log all payment events** for audit trails

## Production Deployment

1. **Update environment variables** with production keys
2. **Configure webhook endpoints** in Stripe dashboard
3. **Set up monitoring** for failed payments
4. **Implement retry logic** for failed webhook deliveries
5. **Add email notifications** for payment events

## Monitoring and Analytics

1. **Stripe Dashboard** - Payment analytics and customer management
2. **Custom Analytics** - Track subscription metrics
3. **Error Monitoring** - Sentry or similar for error tracking
4. **Performance Monitoring** - Track API response times

## Support and Maintenance

1. **Regular security updates** for Stripe SDK
2. **Monitor webhook delivery** success rates
3. **Backup payment data** regularly
4. **Test payment flows** after any updates
5. **Keep documentation updated** with any changes

## Cost Estimation

### Stripe Fees (Icelandic Market)
- **Transaction Fee**: 1.4% + 1.8 ISK per transaction
- **Monthly Subscription**: 3,000 ISK = ~42 ISK fee
- **Annual Cost**: ~500 ISK per subscription

### Alternative: Direct Bank Integration
- **Setup Cost**: 50,000-100,000 ISK
- **Monthly Fee**: 5,000-10,000 ISK
- **Transaction Fee**: 0.5-1% per transaction
- **Development Time**: 2-3 months

## Recommendation

**Start with Stripe** for the following reasons:
1. **Faster implementation** (1-2 weeks vs 2-3 months)
2. **Lower initial cost** (no setup fees)
3. **Better documentation** and support
4. **Easier testing** and debugging
5. **Global payment methods** for international customers

**Consider direct bank integration** later if:
- Transaction volume exceeds 1,000 per month
- Cost savings justify development investment
- Need for specific Icelandic payment methods
- Regulatory requirements for local processing

