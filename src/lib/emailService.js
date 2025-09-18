import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send contact form email
export const sendContactEmail = async (formData) => {
  const { name, email, company, phone, message } = formData;
  
  try {
    const transporter = createTransporter();
    
    // Email content
    const emailContent = `
New Contact Form Submission from StraxKaka Website

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
Sent from StraxKaka Contact Form
Time: ${new Date().toLocaleString('is-IS', { timeZone: 'Atlantic/Reykjavik' })}
    `.trim();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
          New Contact Form Submission from StraxKaka Website
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>Sent from StraxKaka Contact Form</p>
          <p>Time: ${new Date().toLocaleString('is-IS', { timeZone: 'Atlantic/Reykjavik' })}</p>
        </div>
      </div>
    `;

    // Send mail
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'orders.straxkaka@outlook.com',
      subject: `New Contact Form Submission from ${name}`,
      text: emailContent,
      html: htmlContent,
      replyTo: email, // Allow direct reply to the sender
    });

    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Send subscription confirmation email
export const sendSubscriptionConfirmation = async (subscriptionData) => {
  const { companyName, contactName, contactEmail, tier, monthlyCost } = subscriptionData;
  
  try {
    const transporter = createTransporter();
    
    const emailContent = `
New Subscription Request from StraxKaka Website

Company: ${companyName}
Contact Name: ${contactName}
Contact Email: ${contactEmail}
Subscription Tier: ${tier}
Monthly Cost: ${monthlyCost}

---
Sent from StraxKaka Subscription System
Time: ${new Date().toLocaleString('is-IS', { timeZone: 'Atlantic/Reykjavik' })}
    `.trim();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
          New Subscription Request from StraxKaka Website
        </h2>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Company:</strong> ${companyName}</p>
          <p><strong>Contact Name:</strong> ${contactName}</p>
          <p><strong>Contact Email:</strong> <a href="mailto:${contactEmail}">${contactEmail}</a></p>
          <p><strong>Subscription Tier:</strong> ${tier}</p>
          <p><strong>Monthly Cost:</strong> ${monthlyCost}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>Sent from StraxKaka Subscription System</p>
          <p>Time: ${new Date().toLocaleString('is-IS', { timeZone: 'Atlantic/Reykjavik' })}</p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'orders.straxkaka@outlook.com',
      subject: `New Subscription Request from ${companyName}`,
      text: emailContent,
      html: htmlContent,
      replyTo: contactEmail,
    });

    console.log('Subscription email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Subscription email sending failed:', error);
    return { success: false, error: error.message };
  }
};
