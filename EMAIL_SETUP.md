# Email Setup Guide for StraxKaka

This guide explains how to set up email functionality for the StraxKaka website to receive contact form submissions and subscription notifications.

## 📧 What Emails Are Sent

1. **Contact Form Submissions** - When someone fills out the contact form
2. **Subscription Notifications** - When someone subscribes to StraxKaka

All emails are sent to: `orders.straxkaka@outlook.com`

## 🔧 Setup Instructions

### Option 1: Gmail (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Add to your `.env.local` file**:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-character-app-password
SMTP_FROM=your-gmail@gmail.com
```

### Option 2: Outlook/Hotmail

1. **Enable 2-Factor Authentication** on your Outlook account
2. **Generate an App Password**:
   - Go to Microsoft Account security settings
   - Security → Advanced security options → App passwords
   - Create a new app password
3. **Add to your `.env.local` file**:

```env
# Email Configuration
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=orders.straxkaka@outlook.com
SMTP_PASS=your-app-password
SMTP_FROM=orders.straxkaka@outlook.com
```

### Option 3: Custom SMTP Server

If you have your own email server:

```env
# Email Configuration
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
SMTP_FROM=your-email@yourdomain.com
```

## 🚀 Testing the Email System

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Test the contact form**:
   - Go to `/contact`
   - Fill out the form
   - Submit it
   - Check your email inbox

3. **Test subscription emails**:
   - Go to `/subscription`
   - Complete a subscription
   - Check your email inbox

## 📱 Email Features

### Contact Form Emails Include:
- ✅ Sender's name and email
- ✅ Company name (if provided)
- ✅ Phone number (if provided)
- ✅ Full message
- ✅ Timestamp in Icelandic timezone
- ✅ Reply-to set to sender's email

### Subscription Emails Include:
- ✅ Company name
- ✅ Contact information
- ✅ Subscription tier
- ✅ Monthly cost
- ✅ Timestamp in Icelandic timezone
- ✅ Reply-to set to company email

## 🔒 Security Notes

- **Never commit your `.env.local` file** to version control
- **Use app passwords** instead of your main account password
- **Keep your SMTP credentials secure**
- **Test in development** before deploying to production

## 🐛 Troubleshooting

### Common Issues:

1. **"Authentication failed"**:
   - Check your app password is correct
   - Ensure 2FA is enabled on your email account

2. **"Connection timeout"**:
   - Check your SMTP_HOST and SMTP_PORT settings
   - Try different ports (587, 465, 25)

3. **"Invalid credentials"**:
   - Double-check SMTP_USER and SMTP_PASS
   - Make sure you're using an app password, not your regular password

4. **Emails not received**:
   - Check spam/junk folder
   - Verify SMTP_FROM email address
   - Check server logs for error messages

### Debug Mode:

Add this to your `.env.local` to see detailed email logs:

```env
NODE_ENV=development
```

## 📧 Email Templates

The emails use professional HTML templates with:
- StraxKaka branding (yellow theme)
- Responsive design
- Clear formatting
- Easy-to-read information
- Direct reply functionality

## 🚀 Production Deployment

When deploying to Vercel:

1. **Add environment variables** in Vercel dashboard:
   - Go to your project settings
   - Add all SMTP_* variables
   - Make sure to use production email credentials

2. **Test after deployment**:
   - Submit a test contact form
   - Complete a test subscription
   - Verify emails are received

## 📞 Support

If you need help setting up email functionality:
1. Check this guide first
2. Review the server logs for error messages
3. Test with a simple email service first (like Gmail)
4. Contact support if issues persist

---

**Note**: The email system is now fully functional and will send emails to `orders.straxkaka@outlook.com` once you configure the SMTP settings in your `.env.local` file.
