# StraxKaka Website Deployment Guide

## 🚀 Production Readiness Checklist

### ✅ Completed
- [x] SEO optimization with meta tags and structured data
- [x] Custom 404 and error pages
- [x] Security headers configuration
- [x] Google Analytics integration
- [x] Mobile-responsive design
- [x] Legal pages (Privacy, Terms, Cookies, Legal Notice)
- [x] Contact information updated
- [x] Performance optimizations

### 🔧 Environment Variables
Create a `.env.local` file with:
```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact Form (optional)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Site URL
NEXT_PUBLIC_SITE_URL=https://www.straxkaka.is
```

### 🌐 Deployment Options

#### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

#### Option 2: Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Set environment variables in Netlify dashboard

#### Option 3: Self-hosted
1. Build: `npm run build`
2. Start: `npm start`
3. Configure reverse proxy (nginx/Apache)
4. Set up SSL certificate

### 📊 Analytics Setup
1. Create Google Analytics account
2. Get tracking ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Verify tracking in GA dashboard

### 🔒 Security
- HTTPS enabled (automatic on Vercel/Netlify)
- Security headers configured
- No sensitive data in client-side code

### 📱 Testing
- [ ] Test all pages on mobile devices
- [ ] Test contact form functionality
- [ ] Verify all links work correctly
- [ ] Check page load speeds
- [ ] Test error pages (404, 500)

### 🎯 Performance
- Images optimized for web
- Lazy loading implemented
- Minified CSS/JS
- Gzip compression enabled

### 📈 SEO
- Meta tags optimized
- Structured data added
- Sitemap generated
- Robots.txt configured
- Open Graph tags added

## 🚀 Quick Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`
4. Set environment variables in Vercel dashboard

## 📞 Support
- Email: orders.straxkaka@outlook.com
- Phone: +354 790 4777

