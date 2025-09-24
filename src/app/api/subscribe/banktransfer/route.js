import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Company from '@/models/Company';
import Payment from '@/models/Payment';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { 
      companyName, 
      companyEmail, 
      phone, 
      employees, 
      subscriptionTier, 
      monthlyCost,
      paymentMethod 
    } = body;

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

    // Generate unique order ID
    const orderId = Payment.generateOrderId();

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
      })),
      subscriptionStatus: 'pending_payment',
      subscriptionTier: subscriptionTier,
      monthlyCost: monthlyCost,
      orderId: orderId
    });

    // Save company
    await company.save();

    // Create payment record
    const payment = new Payment({
      companyId: company._id,
      orderId: orderId,
      amount: monthlyCost,
      status: 'pending',
      paymentMethod: 'bank_transfer',
      billingPeriod: {
        start: new Date(),
        end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      }
    });

    await payment.save();

    // Get bank details from environment variables
    const bankDetails = {
      bankName: process.env.BANK_NAME || 'Íslandsbanki',
      accountNumber: process.env.BANK_ACCOUNT || '1234567890',
      iban: process.env.BANK_IBAN || 'IS123456789012345678901234',
      reference: orderId,
      amount: monthlyCost
    };

    return NextResponse.json({
      success: true,
      data: {
        companyId: company._id,
        orderId: orderId,
        amount: monthlyCost,
        status: 'pending_payment',
        paymentMethod: 'bank_transfer',
        bankDetails: bankDetails,
        message: 'Bank transfer details generated successfully. Please complete the transfer to activate your subscription.'
      }
    });

  } catch (error) {
    console.error('Bank transfer subscription creation error:', error);
    
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


