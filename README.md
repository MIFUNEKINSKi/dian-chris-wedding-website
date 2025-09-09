# Dian & Christopher's Wedding Website

A beautiful, responsive wedding website with email invitation flow, RSVP functionality, and guest information.

## 🌸 Features

### Multi-Page Wedding Experience
- **Email Invitation** (`email-invitation.html`) - Email template to send to guests
- **Landing Page** (`invitation.html`) - Beautiful invitation card view
- **Main Website** (`index.html`) - Full wedding website with RSVP

### Core Functionality
- 📧 **Email Integration**: EmailJS-powered RSVP form
- 📱 **Responsive Design**: Works perfectly on all devices
- 🎨 **Pink/Rose Color Scheme**: Elegant gradient backgrounds
- 🎯 **Registry Links**: Clickable Cash App and West Elm registry links
- ⏰ **Live Countdown**: Real-time countdown to wedding day
- 📝 **RSVP Management**: Collect guest responses with dietary restrictions

## 🎯 User Flow

1. **Email Invitation** → Guests receive beautiful HTML email
2. **Landing Page** → Click "View Invitation" → Elegant invitation card
3. **Main Website** → Click "RSVP Now" → Full wedding website with RSVP form

## 🚀 Deployment

### GitHub Repository (Private)
```bash
# Initialize and push to GitHub
git init
git branch -m main
git add .
git commit -m "Initial commit: Wedding website with email flow"
git remote add origin https://github.com/YOUR_USERNAME/dian-chris-wedding-website.git
git push -u origin main
```

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Auto-deploy on every push
3. Get live URL: `https://dian-chris-wedding-website.vercel.app`

### Email Setup
1. Update `YOUR_WEBSITE_URL` in `email-invitation.html` with your live Vercel URL
2. Send HTML email to guests
3. Guests follow: Email → Landing Page → Main Website → RSVP
