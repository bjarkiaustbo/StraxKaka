import { NextResponse } from 'next/server';
import recurringBilling from '@/lib/recurringBilling';

export async function POST(request) {
  try {
    // This endpoint can be called manually or by a cron job
    const result = await recurringBilling.processRecurringBilling();
    
    return NextResponse.json({
      success: true,
      message: 'Recurring billing processed successfully',
      result: result
    });

  } catch (error) {
    console.error('Billing processing error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process recurring billing',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const stats = await recurringBilling.getBillingStats();
    
    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Billing stats error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get billing statistics',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}


