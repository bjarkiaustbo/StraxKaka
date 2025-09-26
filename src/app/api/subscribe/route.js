import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Company from '@/models/Company';
import Payment from '@/models/Payment';
import aurService from '@/lib/aurService';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { companyName, companyEmail, phone, employees } = body;

    // Validate required fields
    if (!companyName || !companyEmail || !phone || !employees || employees.length === 0) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate phone number format
    if (!/^\d{7}$/.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Phone number must be exactly 7 digits' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(companyEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if company already exists
    const existingCompany = await Company.findOne({
      $or: [
        { email: companyEmail },
        { phone: phone }
      ]
    });

    if (existingCompany) {
      return NextResponse.json(
        { success: false, error: 'Company with this email or phone already exists' },
        { status: 409 }
      );
    }

    // Create company
    const company = new Company({
      name: companyName,
      email: companyEmail,
      phone: phone,
      employees: employees.map(emp => ({
        name: emp.name,
        birthday: new Date(emp.birthday),
        cakeType: emp.cakeType,
        cakeSize: emp.cakeSize || 'medium',
        dietaryRestrictions: emp.dietaryRestrictions || '',
        specialNotes: emp.specialNotes || ''
      }))
    });

    // Calculate subscription details
    company.updateSubscription();

    // Save company
    await company.save();

    // Generate order ID
    const orderId = Payment.generateOrderId();

    // Create payment record
    const payment = new Payment({
      companyId: company._id,
      orderId: orderId,
      amount: company.monthlyCost,
      status: 'pending',
      billingPeriod: {
        start: new Date(),
        end: company.nextBillingDate
      }
    });

    await payment.save();

    // Create Aur charge
    const aurResult = await aurService.createCharge({
      msisdn: phone,
      amount: company.monthlyCost,
      description: `StraxKaka subscription - ${companyName}`,
      orderId: orderId
    });

    if (aurResult.success) {
      // Update payment with Aur details
      payment.aurToken = aurResult.aurToken;
      payment.status = 'processing';
      await payment.save();

      // Update company with Aur customer ID
      company.aurCustomerId = aurResult.aurToken;
      await company.save();


      return NextResponse.json({
        success: true,
        data: {
          companyId: company._id,
          orderId: orderId,
          amount: company.monthlyCost,
          status: 'payment_pending',
          aurToken: aurResult.aurToken,
          message: 'Subscription created successfully. Payment request sent to your phone.'
        }
      });
    } else {
      // Aur charge failed
      payment.status = 'failed';
      payment.failureReason = aurResult.error;
      await payment.save();

      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment request failed. Please try again.',
          details: aurResult.error
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Subscription creation error:', error);
    
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

