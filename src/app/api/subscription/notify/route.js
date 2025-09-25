import { sendDetailedSubscriptionNotification } from '@/lib/emailService';

export async function POST(request) {
  try {
    console.log('Email notification API called');
    const subscriptionData = await request.json();
    console.log('Subscription data received for email:', subscriptionData.companyName);
    
    // Check if email credentials are configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('Email credentials not configured, skipping email notification');
      return Response.json({ 
        success: false, 
        message: 'Email service not configured',
        error: 'SMTP credentials not set' 
      });
    }
    
    // Send detailed email notification
    const result = await sendDetailedSubscriptionNotification(subscriptionData);
    
    if (result.success) {
      console.log('Email sent successfully:', result.messageId);
      return Response.json({ 
        success: true, 
        message: 'Email notification sent successfully',
        messageId: result.messageId 
      });
    } else {
      console.error('Email sending failed:', result.error);
      return Response.json({ 
        success: false, 
        error: result.error 
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Subscription notification API error:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to send email notification' 
    }, { status: 500 });
  }
}
