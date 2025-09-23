import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    
    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook URL not configured' }, { status: 500 });
    }
    
    // Test data for your cake delivery system
    const testData = {
      event: 'test_webhook',
      timestamp: new Date().toISOString(),
      data: {
        companyName: 'Test Company',
        contactEmail: 'test@example.com',
        deliveryStatus: 'pending',
        employeeName: 'John Doe',
        cakeType: 'Chocolate',
        message: 'This is a test webhook from StraxKaka admin system'
      }
    };
    
    // Send test data to Make webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Test webhook sent successfully!',
        webhookUrl: webhookUrl,
        testData: testData
      });
    } else {
      return NextResponse.json({
        success: false,
        error: `Webhook failed: ${response.status}`,
        webhookUrl: webhookUrl
      }, { status: 500 });
    }
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      webhookUrl: process.env.MAKE_WEBHOOK_URL
    }, { status: 500 });
  }
}


export async function GET(request) {
  try {
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    
    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook URL not configured' }, { status: 500 });
    }
    
    // Test data for your cake delivery system
    const testData = {
      event: 'test_webhook',
      timestamp: new Date().toISOString(),
      data: {
        companyName: 'Test Company',
        contactEmail: 'test@example.com',
        deliveryStatus: 'pending',
        employeeName: 'John Doe',
        cakeType: 'Chocolate',
        message: 'This is a test webhook from StraxKaka admin system'
      }
    };
    
    // Send test data to Make webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Test webhook sent successfully!',
        webhookUrl: webhookUrl,
        testData: testData
      });
    } else {
      return NextResponse.json({
        success: false,
        error: `Webhook failed: ${response.status}`,
        webhookUrl: webhookUrl
      }, { status: 500 });
    }
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      webhookUrl: process.env.MAKE_WEBHOOK_URL
    }, { status: 500 });
  }
}
