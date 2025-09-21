# 📧 Wedding Email Invitation Setup Guide

## 🎯 Complete Mailchimp Setup for Your Wedding Invitations

### Step 1: Create Mailchimp Account
1. Go to [mailchimp.com](https://mailchimp.com)
2. Sign up for free account (up to 500 contacts)
3. Verify your email address

### Step 2: Set Up Your Audience (Contact List)
1. **Create Audience**:
   - Click "Audience" → "Create Audience"
   - Name: "Wedding Guest List"
   - Default email: dian.christopher.wedding@gmail.com
   - Company: "Dian & Christopher's Wedding"

2. **Add Custom Fields** (Optional - for invitation personalization only):
   - Go to Audience → Settings → Audience fields and *|MERGE|* tags
   - Add these fields if you want personalized invitations:
     - `PLUS_ONE` (Text) - "Yes" or "No" (for plus-one message in email)
     - `NOTES` (Text) - Personal notes for close family/friends
   
   **Note**: Detailed info like dietary restrictions, guest counts, etc. will be collected through your website's RSVP form, not Mailchimp.

### Step 3: Import Your Guest List
1. **Prepare CSV File**:
   - Use the `guest-list-template.csv` file provided
   - **Minimum required**: Email Address, First Name, Last Name
   - **Optional**: Plus One (for personalized invitation message)
   - Save as CSV format

2. **Import Process**:
   - Audience → Import contacts → Upload file
   - Select your CSV file
   - Map columns to Mailchimp fields:
     - Email Address → Email Address
     - First Name → FNAME
     - Last Name → LNAME
     - Plus One → PLUS_ONE (optional)
   
   **Note**: You don't need to import dietary restrictions, phone numbers, etc. since guests will provide this info through your website's RSVP form.

### Step 4: Create Email Campaign
1. **Start Campaign**:
   - Click "Create" → "Email"
   - Choose "Regular" campaign
   - Name: "Wedding Invitation - [Date]"

2. **Setup Recipients**:
   - Select your wedding audience
   - Choose "Send to entire audience" or create segments

3. **Campaign Info**:
   - Subject: "You're Invited to Dian & Christopher's Wedding! 💕"
   - Preview text: "Save the date for our special day at Eden Rift Vineyards"
   - From name: "Dian & Christopher"
   - From email: dian.christopher.wedding@gmail.com
   - Reply-to: dian.christopher.wedding@gmail.com

### Step 5: Design Your Email
1. **Choose Template**:
   - Select "Code your own" → "Import HTML"
   - Copy and paste from `email-invitation-mailchimp.html`

2. **Update Merge Tags**:
   - Replace `*|WEBSITE_URL|*` with your actual website URL
   - Verify all merge tags are correct:
     - `*|FNAME|*` - First name
     - `*|LNAME|*` - Last name
     - `*|IF:PLUS_ONE|*` - Conditional plus-one message

### Step 6: Test Your Email
1. **Send Test**:
   - Click "Preview and Test"
   - Send test to yourself
   - Check on desktop and mobile
   - Verify all links work

2. **Preview Merge Tags**:
   - Use "Preview merge tags" to see personalization
   - Test with different contact examples

### Step 7: Schedule and Send
1. **Final Review**:
   - Check recipient count
   - Verify subject line and preview text
   - Confirm all links point to correct URLs

2. **Send Options**:
   - Send immediately
   - Schedule for optimal time (Tuesday-Thursday, 10am-2pm)
   - Consider time zones of your guests

### Step 8: Track Results
1. **Monitor Campaign**:
   - Open rates (aim for 20-25%)
   - Click rates (aim for 2-5%)
   - Who opened/clicked

2. **Follow Up**:
   - Send reminder to non-openers after 1 week
   - Personal follow-up for important guests

## 🔧 Merge Tag Reference

| Merge Tag | Description | Example |
|-----------|-------------|---------|
| `*|FNAME|*` | First name | "Sarah" |
| `*|LNAME|*` | Last name | "Johnson" |
| `*|EMAIL|*` | Email address | "sarah@email.com" |
| `*|IF:PLUS_ONE|*` | Show if plus-one allowed | Conditional content |
| `*|DIETARY|*` | Dietary restrictions | "Vegetarian" |
| `*|WEBSITE_URL|*` | Your website URL | Replace with actual URL |

## 📱 Mobile Optimization Tips
- Keep subject line under 50 characters
- Use single-column layout (already done)
- Test on multiple devices
- Ensure buttons are finger-friendly (15px+ padding)

## 🎨 Personalization Ideas

### Subject Line Variations:
- "Sarah & John, You're Invited to Our Wedding! 💕"
- "Save the Date: Dian & Christopher's Wedding"
- "You're Invited! June 14, 2025 at Eden Rift Vineyards"

### Content Personalization:
- Individual vs. couple addressing
- Plus-one mentions for eligible guests
- Personal notes for close family/friends

## 🚨 Troubleshooting

### Common Issues:
1. **Images not loading**: Upload images to Mailchimp's content studio
2. **High spam score**: Avoid excessive caps and exclamation marks
3. **Low open rates**: Test different subject lines
4. **Merge tags not working**: Check field mapping in audience settings

### Email Client Testing:
- Gmail (most important)
- Apple Mail (iPhone/iPad)
- Outlook
- Yahoo Mail

## 💡 Pro Tips
1. **Segment your audience**: VIPs, family, friends, colleagues
2. **A/B test subject lines**: Test with small groups first
3. **Time zone considerations**: Schedule for your guests' locations
4. **Follow-up strategy**: Plan reminder emails for non-responders
5. **RSVP tracking**: Monitor website analytics to track responses

## 📊 Success Metrics
- **Open Rate**: 25-30% (wedding invitations typically perform well)
- **Click Rate**: 5-10% (high intent audience)
- **RSVP Rate**: Track on your website
- **Unsubscribe Rate**: Should be very low (<0.5%)

Need help with any step? Check Mailchimp's support docs or reach out for assistance!