# Newsletter Quick Start Guide

## ✅ Setup Complete!

Your newsletter system is now configured with Resend and ready to use.

## 📧 What's Working

1. **Subscription Form** - Live on `/blog` page
2. **Welcome Emails** - Automatically sent when someone subscribes
3. **Newsletter Sending** - Send newsletters to all subscribers
4. **Admin Panel** - Easy interface to send newsletters

## 🚀 Next Steps

### 1. Install Resend Package

Run this command in your terminal:
```bash
npm install resend
```

### 2. Verify Your Domain (Optional but Recommended)

Currently using: `onboarding@resend.dev` (Resend's test domain)

To use your own domain:
1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your domain (e.g., `shashwatraj.com`)
3. Add the DNS records they provide
4. Update the `from` field in both API routes:
   - `app/api/newsletter/subscribe/route.ts`
   - `app/api/newsletter/send/route.ts`
   
   Change from:
   ```typescript
   from: 'Shashwat Raj <onboarding@resend.dev>'
   ```
   To:
   ```typescript
   from: 'Shashwat Raj <newsletter@shashwatraj.com>'
   ```

### 3. Set Your Admin API Key

In `.env.local`, change:
```
NEWSLETTER_API_KEY=your-secret-admin-key-change-this
```

To something secure like:
```
NEWSLETTER_API_KEY=my-super-secret-key-12345
```

## 📝 How to Use

### Send a Newsletter

1. Go to `/admin/newsletter`
2. Fill in:
   - **Title**: Email subject line
   - **Content**: Your message (HTML supported)
   - **Post URL**: Link to your blog post (optional)
   - **API Key**: Your NEWSLETTER_API_KEY from .env.local
3. Click "Send Newsletter"

### Example Newsletter Content

```html
<p>Hey there! 👋</p>
<p>I just published a new blog post about building scalable ML systems.</p>
<p>In this post, you'll learn:</p>
<ul>
  <li>How to deploy ML models in production</li>
  <li>Best practices for monitoring</li>
  <li>Scaling strategies</li>
</ul>
<p>Hope you enjoy it!</p>
```

### Check Subscribers

Subscribers are stored in `data/subscribers.json`. You can view them there.

## 🎨 Email Template

Your newsletters use a beautiful HTML template with:
- Purple gradient header
- Your name and branding
- Responsive design
- "Read Full Post" button (if URL provided)
- Footer with links

## 🧪 Testing

1. Subscribe with your own email on `/blog`
2. Check your inbox for the welcome email
3. Send a test newsletter from `/admin/newsletter`
4. Verify it looks good

## 📊 Monitoring

Check your Resend dashboard at [resend.com/emails](https://resend.com/emails) to see:
- Delivery status
- Open rates (if tracking enabled)
- Bounces and errors

## 🔒 Security

- API key is required to send newsletters
- Email validation prevents invalid addresses
- Duplicate checking prevents re-subscription
- File-based storage (upgrade to database for production)

## 🚨 Important Notes

1. **Resend Free Tier**: 100 emails/day, 3,000 emails/month
2. **Test Domain**: `onboarding@resend.dev` has limitations
3. **Verified Domain**: Recommended for production use
4. **Rate Limiting**: Consider adding to prevent abuse

## 📈 Upgrade to Database (Future)

When you have many subscribers, upgrade from file storage to a database:
- MongoDB
- PostgreSQL
- Supabase
- PlanetScale

See `NEWSLETTER_SETUP.md` for database examples.

## 🎉 You're All Set!

Your newsletter system is ready to go. Start collecting subscribers and sending great content!
