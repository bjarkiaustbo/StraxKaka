# StraxKaka Subscription System Documentation

## Overview
Complete full-stack subscription service with Aur payment integration for automated birthday cake deliveries.

## Tech Stack
- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Payments**: Aur Payment Gateway
- **Scheduling**: node-cron for recurring billing

## Features Implemented

### 1. Frontend Pages
- **`/subscribe`** - Company registration form with employee CSV upload
- **`/dashboard`** - Admin dashboard for managing subscriptions
- **`/subscription`** - Existing subscription management page

### 2. API Endpoints
- **`POST /api/subscribe`** - Create new subscription
- **`POST /api/aur/orderupdate`** - Aur webhook for payment updates
- **`GET /api/aur/status`** - Check payment status
- **`POST /api/billing/process`** - Process recurring billing
- **`GET /api/billing/process`** - Get billing statistics

### 3. Database Models
- **Company** - Company information and subscription details
- **Payment** - Payment records and Aur integration data

### 4. Services
- **AurService** - Payment gateway integration
- **RecurringBillingService** - Automated monthly billing
- **MongoDB** - Database connection management

## Setup Instructions

### 1. Environment Variables
Create `.env.local` file:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/straxkaka

# Aur Payment Integration
AUR_WEB_TOKEN=your_aur_web_token_here
AUR_SECRET=your_aur_secret_key_here
CALLBACK_URL=https://yourdomain.com/api/aur/orderupdate

# Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development
```

### 2. Install Dependencies
```bash
npm install mongoose axios node-cron crypto
```

### 3. Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in environment variables
3. Models will be created automatically on first use

### 4. Aur Payment Setup
1. Register for Aur developer account
2. Get API credentials from Aur dashboard
3. Update environment variables with your credentials
4. Configure webhook URL in Aur dashboard

## Usage

### Company Registration
1. Navigate to `/subscribe`
2. Fill in company information:
   - Company Name
   - Company Email
   - Phone Number (7 digits for Aur)
   - Employees (CSV format)
3. Submit form
4. Payment request sent to phone via Aur

### Employee CSV Format
```csv
Name,Birthday,Cake Type,Size,Dietary Restrictions,Notes
Jón Jónsson,1990-05-15,Súkkulaði,medium,Engar,Extra súkkulaði
Anna Anna,1985-12-03,Vanillu,large,Laktósa,Ókeypis
```

### Payment Flow
1. Company submits registration
2. Aur charge request sent to phone
3. User completes payment on phone
4. Aur sends webhook to `/api/aur/orderupdate`
5. Payment status updated in database
6. Company subscription activated

### Recurring Billing
- Runs daily at 9:00 AM Iceland time
- Processes all due subscriptions
- Creates new Aur charge requests
- Handles failed payment retries
- Suspends subscriptions after 3 failed attempts

## API Reference

### POST /api/subscribe
Create new company subscription.

**Request Body:**
```json
{
  "companyName": "StraxKaka ehf.",
  "companyEmail": "orders@straxkaka.is",
  "phone": "1234567",
  "employees": [
    {
      "name": "Jón Jónsson",
      "birthday": "1990-05-15",
      "cakeType": "Súkkulaði",
      "cakeSize": "medium",
      "dietaryRestrictions": "",
      "specialNotes": ""
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "companyId": "64f8b2c1a2b3c4d5e6f7g8h9",
    "orderId": "STRAX_1234567890_ABC123",
    "amount": 3000,
    "status": "payment_pending",
    "aurToken": "aur_token_here",
    "message": "Subscription created successfully. Payment request sent to your phone."
  }
}
```

### POST /api/aur/orderupdate
Aur webhook for payment status updates.

**Request Body (from Aur):**
```json
{
  "orderid": "STRAX_1234567890_ABC123",
  "status": "FINISHED",
  "transactionid": "txn_123456",
  "amount": "3000",
  "msisdn": "1234567",
  "timestamp": "2024-01-15T10:05:00Z"
}
```

**Response:**
```json
{
  "received": true
}
```

### GET /api/aur/status
Check payment status.

**Query Parameters:**
- `orderId` - Order ID to check
- `token` - Aur token to check

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "STRAX_1234567890_ABC123",
    "status": "completed",
    "aurStatus": "FINISHED",
    "amount": 3000,
    "isSuccessful": true,
    "isFailed": false,
    "isPending": false
  }
}
```

## Database Schema

### Company Model
```javascript
{
  name: String,                    // Company name
  email: String,                   // Company email
  phone: String,                   // 7-digit phone number
  employees: [EmployeeSchema],     // Array of employees
  subscriptionStatus: String,      // pending_payment, active, suspended, cancelled
  subscriptionTier: String,        // small, medium, large, enterprise
  monthlyCost: Number,             // Monthly cost in ISK
  nextBillingDate: Date,           // Next billing date
  aurCustomerId: String,           // Aur customer ID
  lastPaymentDate: Date,           // Last successful payment
  createdAt: Date,
  updatedAt: Date
}
```

### Payment Model
```javascript
{
  companyId: ObjectId,             // Reference to Company
  orderId: String,                 // Unique order ID
  amount: Number,                  // Payment amount in ISK
  status: String,                  // pending, processing, completed, failed, cancelled, refunded
  aurToken: String,                // Aur transaction token
  aurTransactionId: String,        // Aur transaction ID
  aurStatus: String,               // Aur payment status
  aurResponse: Mixed,              // Full Aur response
  paymentMethod: String,           // aur, stripe, paypal
  billingPeriod: {                 // Billing period
    start: Date,
    end: Date
  },
  isRecurring: Boolean,            // Is this a recurring payment
  parentPaymentId: ObjectId,       // Reference to parent payment for retries
  failureReason: String,           // Reason for failure
  retryCount: Number,              // Number of retry attempts
  nextRetryDate: Date,             // Next retry date
  createdAt: Date,
  updatedAt: Date,
  completedAt: Date
}
```

## Aur Integration

### Test Environment
- **Base URL**: `https://test-backendapi.aurapp.is/figo/api/v1/store/web`
- **Test Phone**: Use any 7-digit number for testing

### Production Environment
- **Base URL**: `https://api.aurapp.is/figo/api/v1/store/web`
- **Real Phone**: Use actual Icelandic phone numbers

### HMAC Generation
```javascript
const hmac = crypto
  .createHmac('sha256', AUR_SECRET)
  .update(`${msisdn}${amount}${description}${orderId}`)
  .digest('hex');
```

## Security Considerations

1. **Environment Variables**: Never commit secrets to version control
2. **Webhook Validation**: Validate Aur webhook signatures
3. **Input Validation**: Validate all user inputs
4. **Rate Limiting**: Implement rate limiting on API endpoints
5. **Error Handling**: Don't expose sensitive information in errors

## Monitoring and Logging

### Key Metrics to Monitor
- Payment success rate
- Failed payment retry rate
- Subscription activation rate
- Revenue per month
- Customer churn rate

### Logging
- All payment events
- Webhook processing
- Billing failures
- API errors

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check `MONGODB_URI` environment variable
   - Ensure MongoDB is running
   - Check network connectivity

2. **Aur Payment Failed**
   - Verify `AUR_WEB_TOKEN` and `AUR_SECRET`
   - Check phone number format (7 digits)
   - Verify webhook URL is accessible

3. **Recurring Billing Not Working**
   - Check cron job is running
   - Verify timezone settings
   - Check for errors in logs

4. **Webhook Not Receiving Updates**
   - Verify webhook URL in Aur dashboard
   - Check server accessibility
   - Verify webhook signature validation

## Development

### Running Locally
```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev
```

### Testing
```bash
# Test subscription creation
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"companyName":"Test Company","companyEmail":"test@example.com","phone":"1234567","employees":[{"name":"Test User","birthday":"1990-01-01","cakeType":"Chocolate","cakeSize":"medium"}]}'

# Test payment status
curl "http://localhost:3000/api/aur/status?orderId=STRAX_1234567890_ABC123"
```

## Deployment

### Vercel Deployment
1. Set environment variables in Vercel dashboard
2. Deploy from GitHub
3. Configure webhook URL in Aur dashboard
4. Start recurring billing service

### Other Platforms
1. Set up MongoDB database
2. Configure environment variables
3. Deploy application
4. Set up cron job for recurring billing
5. Configure webhook URL in Aur dashboard

## Support

For technical support or questions:
- Email: orders.straxkaka@outlook.com
- Phone: +354 790 4777

## License

This project is proprietary to StraxKaka. All rights reserved.


