# Aur Merchant Setup Guide for StraxKaka

## Overview
This guide explains how to set up your Aur merchant account to receive payments from StraxKaka customers.

## How Aur Payments Work

### Payment Flow:
1. **Customer subscribes** to StraxKaka service
2. **System sends payment request** to customer's phone via Aur
3. **Customer receives SMS** with payment link
4. **Customer pays** from their Aur account
5. **Money is transferred** to YOUR Aur merchant account
6. **You receive the payment** in your Aur account

## Step 1: Contact Aur for Merchant Account

### Required Information:
- **Business Name**: StraxKaka
- **Business Type**: Software/Technology Services
- **Contact Person**: Your name and contact details
- **Business Address**: Your business address
- **Tax ID**: Your Icelandic tax identification number
- **Bank Account**: Your Icelandic bank account for settlements

### Contact Methods:
- **Email**: merchant@aurapp.is
- **Phone**: +354 800 1234 (Aur customer service)
- **Website**: https://aurapp.is/merchant

## Step 2: Merchant Account Requirements

### Documentation Needed:
1. **Business Registration Certificate**
2. **Tax Certificate** (skattframtalsyfirlýsing)
3. **Bank Account Statement**
4. **ID Document** (passport or driver's license)
5. **Business Plan** (brief description of StraxKaka service)

### Technical Requirements:
1. **Webhook URL** for payment notifications
2. **SSL Certificate** for secure communication
3. **API Integration** capability

## Step 3: Get Your Merchant Credentials

After approval, Aur will provide you with:

### API Credentials:
```env
AUR_WEB_TOKEN=merchant_web_token_here
AUR_SECRET=merchant_secret_key_here
AUR_MERCHANT_ID=your_merchant_id_here
```

### Webhook Configuration:
- **Webhook URL**: `https://yourdomain.com/api/aur/orderupdate`
- **Authentication**: HMAC signature validation
- **Events**: Payment success, failure, cancellation

## Step 4: Configure Your Environment

### Update .env.local:
```env
# Aur Merchant Configuration
AUR_WEB_TOKEN=your_merchant_web_token_here
AUR_SECRET=your_merchant_secret_key_here
AUR_MERCHANT_ID=your_merchant_id_here
CALLBACK_URL=https://yourdomain.com/api/aur/orderupdate

# Database
MONGODB_URI=mongodb://localhost:27017/straxkaka

# Next.js
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NODE_ENV=production
```

## Step 5: Test Your Integration

### Test Environment:
- **Test URL**: `https://test-backendapi.aurapp.is/figo/api/v1/store/web`
- **Test Phone**: Use any 7-digit number for testing
- **Test Amount**: Use small amounts (1-10 ISK) for testing

### Test Process:
1. **Set NODE_ENV=development** for test environment
2. **Use test credentials** provided by Aur
3. **Test payment flow** with test phone numbers
4. **Verify webhook** receives payment updates
5. **Check merchant dashboard** for test transactions

## Step 6: Go Live

### Production Setup:
1. **Switch to production URLs** and credentials
2. **Set NODE_ENV=production**
3. **Configure production webhook URL**
4. **Test with real phone numbers**
5. **Monitor first real transactions**

## Payment Processing Details

### Transaction Flow:
```
Customer Phone → Aur Payment Gateway → Your Merchant Account
```

### Settlement:
- **Frequency**: Daily or weekly (configurable)
- **Method**: Bank transfer to your account
- **Currency**: ISK (Icelandic Krona)
- **Fees**: Aur charges merchant fees (typically 1-3%)

### Fees Structure:
- **Setup Fee**: Usually waived for small businesses
- **Transaction Fee**: 1-3% per transaction
- **Monthly Fee**: 0-500 ISK depending on volume
- **Settlement Fee**: Usually included in transaction fee

## Monitoring and Management

### Aur Merchant Dashboard:
- **Real-time transactions**
- **Settlement reports**
- **Customer payment status**
- **Refund management**
- **Analytics and reporting**

### StraxKaka Admin Dashboard:
- **Subscription management**
- **Payment tracking**
- **Customer management**
- **Revenue analytics**

## Security Considerations

### API Security:
- **HMAC signatures** for all requests
- **HTTPS only** for all communications
- **Webhook validation** to prevent fraud
- **Rate limiting** to prevent abuse

### Data Protection:
- **PCI DSS compliance** (handled by Aur)
- **GDPR compliance** for EU customers
- **Secure storage** of merchant credentials
- **Regular security audits**

## Troubleshooting

### Common Issues:

#### 1. Payment Not Received
- Check webhook URL is accessible
- Verify HMAC signature validation
- Check merchant account status
- Contact Aur support

#### 2. Webhook Not Working
- Verify webhook URL is correct
- Check SSL certificate
- Test webhook endpoint manually
- Check server logs

#### 3. API Errors
- Verify credentials are correct
- Check API endpoint URLs
- Verify request format
- Check rate limits

### Support Contacts:
- **Aur Technical Support**: tech@aurapp.is
- **Aur Merchant Support**: merchant@aurapp.is
- **Aur Phone Support**: +354 800 1234

## Revenue Tracking

### Monthly Revenue Calculation:
```javascript
// Example: Calculate monthly revenue
const monthlyRevenue = activeSubscriptions.reduce((total, subscription) => {
  return total + subscription.monthlyCost;
}, 0);

console.log(`Monthly Revenue: ${monthlyRevenue.toLocaleString('is-IS')} ISK`);
```

### Revenue Projections:
- **10 companies × 3,000 ISK = 30,000 ISK/month**
- **50 companies × 5,000 ISK = 250,000 ISK/month**
- **100 companies × 10,000 ISK = 1,000,000 ISK/month**

## Legal Considerations

### Terms of Service:
- **Payment terms** and conditions
- **Refund policy** for customers
- **Service level agreements**
- **Data protection policies**

### Tax Implications:
- **VAT reporting** (24% VAT in Iceland)
- **Income tax** on business revenue
- **Quarterly tax returns**
- **Annual financial statements**

## Next Steps

1. **Contact Aur** to start merchant application
2. **Gather required documentation**
3. **Complete merchant application**
4. **Get API credentials**
5. **Configure environment variables**
6. **Test integration thoroughly**
7. **Go live with production**

## Support

For technical support with StraxKaka integration:
- **Email**: orders.straxkaka@outlook.com
- **Phone**: +354 790 4777

For Aur merchant support:
- **Email**: merchant@aurapp.is
- **Phone**: +354 800 1234

