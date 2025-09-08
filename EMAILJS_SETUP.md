# EmailJS Setup Guide for Wedding RSVP Form

Your wedding website now uses EmailJS to send RSVP responses directly to your email. Follow these steps to complete the setup:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the instructions to connect your email account
5. **Note down your Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

### Template Content:
```
Subject: New Wedding RSVP from {{fullName}}

Hello,

You have received a new RSVP for your wedding:

Name: {{fullName}}
Email: {{email}}
Attendance: {{attendanceText}}
Number of Guests: {{guests}}
Dietary Restrictions: {{dietary}}
Special Message: {{message}}

Submitted on: {{submissionDate}}

Best regards,
Wedding Website
```

4. **Note down your Template ID**

## Step 4: Get Your User ID (Public Key)

1. Go to "Account" in your EmailJS dashboard
2. Find your "Public Key" (also called User ID)
3. **Note down this Public Key**

## Step 5: Update Your Website

1. Open `script.js` in your website files
2. Find the `EMAILJS_CONFIG` section at the top
3. Replace the placeholder values:

```javascript
const EMAILJS_CONFIG = {
    serviceID: 'your_actual_service_id',     // From Step 2
    templateID: 'your_actual_template_id',   // From Step 3
    userID: 'your_actual_public_key'         // From Step 4
};
```

## Step 6: Test Your Setup

1. Open your wedding website
2. Fill out the RSVP form with test data
3. Submit the form
4. Check your email - you should receive the RSVP notification

## Email Template Variables Available:

- `{{firstName}}` - Guest's first name
- `{{lastName}}` - Guest's last name
- `{{fullName}}` - Full name (first + last)
- `{{email}}` - Guest's email address
- `{{attendance}}` - "yes" or "no"
- `{{attendanceText}}` - "Yes, will attend" or "Cannot attend"
- `{{guests}}` - Number of guests
- `{{dietary}}` - Dietary restrictions
- `{{message}}` - Special message from guest
- `{{submissionDate}}` - Date the form was submitted

## EmailJS Free Plan Limits:

- 200 emails per month
- EmailJS branding in emails
- Perfect for most wedding websites

## Troubleshooting:

1. **Form not sending**: Check browser console for errors
2. **Not receiving emails**: Check spam folder
3. **"Failed to send" error**: Verify all IDs are correct in script.js
4. **Template not working**: Make sure variable names match exactly (case-sensitive)

## Security Note:

The User ID (Public Key) is safe to include in your website code - it's designed to be public. Your actual email credentials remain secure with EmailJS.

---

Once completed, your wedding guests will be able to RSVP directly through your website, and you'll receive all responses in your email inbox!
