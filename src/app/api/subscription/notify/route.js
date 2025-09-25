import { sendDetailedSubscriptionNotification } from '@/lib/emailService';

export async function POST(request) {
  try {
    const subscriptionData = await request.json();
    
    // Send detailed email notification
    const result = await sendDetailedSubscriptionNotification(subscriptionData);
    
    if (result.success) {
      return Response.json({ 
        success: true, 
        message: 'Email notification sent successfully',
        messageId: result.messageId 
      });
    } else {
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
