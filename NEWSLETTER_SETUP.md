# Newsletter Setup Guide

This guide explains how to set up automated newsletter sending for your blog.

## Features

- ✅ Newsletter subscription form on blog page
- ✅ Email validation and duplicate checking
- ✅ Beautiful HTML email templates
- ✅ File-based subscriber storage (upgradeable to database)
- ✅ API endpoint for sending newsletters

## Quick Start

### 1. Subscriber Storage

Subscribers are stored in `data/subscribers.json`. The file is created automatically when the first subscriber signs up.

### 2. Email Service Integration

To actually send emails, you need to integrate with an email service. Here are the recommended options:

#### Option A: Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Install the package:
   ```bash
   npm install resend
   ```
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=your_api_key_here
   NEWSLETTER_API_KEY=your_secret_admin_key
   ```
5. Uncomment the Resend code in `app/api/newsletter/send/route.ts`

#### Option B: SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Install the package:
   ```bash
   npm install @sendgrid/mail
   ```
4. Add to `.env.local`:
   ```
   SENDGRID_API_KEY=your_api_key_here
   NEWSLETTER_API_KEY=your_secret_admin_key
   ```
5. Uncomment the SendGrid code in `app/api/newsletter/send/route.ts`

#### Option C: Nodemailer (SMTP)

1. Install the package:
   ```bash
   npm install nodemailer
   ```
2. Add to `.env.local`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   NEWSLETTER_API_KEY=your_secret_admin_key
   ```

### 3. Sending Newsletters

To send a newsletter, make a POST request to `/api/newsletter/send`:

```bash
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "your_secret_admin_key",
    "title": "New Blog Post: Building Scalable ML Systems",
    "content": "<p>Check out my latest post about ML systems...</p>",
    "postUrl": "https://shashwatraj.com/blog/1"
  }'
```

Or create a simple admin page to send newsletters through a UI.

## Email Template

The newsletter uses a beautiful HTML template with:
- Gradient header with your name
- Responsive design
- Purple/blue color scheme matching your site
- Call-to-action button
- Footer with links

## Upgrading to Database

For production, consider upgrading from file-based storage to a database:

### MongoDB Example:

```typescript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('newsletter');
const subscribers = db.collection('subscribers');

// Add subscriber
await subscribers.insertOne({
  email: email.toLowerCase(),
  subscribedAt: new Date(),
  confirmed: false
});

// Get subscribers
const allSubscribers = await subscribers.find({ confirmed: true }).toArray();
```

### PostgreSQL Example:

```sql
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confirmed BOOLEAN DEFAULT FALSE
);
```

## Security Notes

1. Always validate email addresses
2. Implement rate limiting on the subscribe endpoint
3. Use environment variables for API keys
4. Consider adding email confirmation (double opt-in)
5. Add unsubscribe links to all emails
6. Comply with GDPR/CAN-SPAM regulations

## Testing

Test the subscription form:
1. Go to `/blog`
2. Enter your email in the newsletter form
3. Check `data/subscribers.json` to see the new subscriber

Test sending (without actual email service):
```bash
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Content-Type: application/json" \
  -d '{
    "apiKey": "your-secret-key",
    "title": "Test Newsletter",
    "content": "<p>This is a test</p>"
  }'
```

The response will include an `emailPreview` field with the HTML that would be sent.

## Next Steps

1. Set up your preferred email service
2. Add email confirmation flow
3. Create an admin dashboard for managing subscribers
4. Add unsubscribe functionality
5. Track email open rates and clicks
6. Set up automated newsletters for new blog posts
