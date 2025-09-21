# 🧪 Mailchimp Test Campaign Instructions

## Quick Test Setup with Your Test Emails

### Step 1: Import Test Guest List
1. In Mailchimp, go to **Audience** → **Import contacts**
2. Upload the `test-guest-list.csv` file
3. Map the fields:
   - Email Address → Email Address
   - First Name → FNAME  
   - Last Name → LNAME
   - Plus One → PLUS_ONE

### Step 2: Create Test Campaign
1. **Create** → **Email** → **Regular**
2. **Campaign name**: "Wedding Invitation TEST - Do Not Send"
3. **Recipients**: Select your wedding audience
4. **Campaign Info**:
   - Subject: "TEST: You're Invited to Dian & Christopher's Wedding! 💕"
   - From: "Dian & Christopher" <dian.christopher.wedding@gmail.com>

### Step 3: Import Your Email Template
1. **Design Email** → **Code your own** → **Import HTML**
2. Copy content from `email-invitation-mailchimp.html`
3. **Replace** `*|WEBSITE_URL|*` with your actual website URL

### Step 4: Test the Personalization
**Preview how each test email will look:**

- **chrismooreindia55@gmail.com**: "Dear Christopher Moore,"
- **dan.jodiehighroller@gmail.com**: "Dear Mr. and Mrs. Johnson," + No plus-one message
- **sadfsdfasdfsfdsdafadsf@gmail.com**: "Dear Sarah Smith," + Plus-one message
- **chrismoorespam@gmail.com**: "Dear Dr. Williams," + No plus-one message  
- **moorexchristopher@gmail.com**: "Dear The Anderson Family," + No plus-one message

### Step 5: Send Test
1. **Preview and Test** → **Send a test email**
2. **Send to**: Enter one of your test emails first
3. Check how it looks on desktop and mobile
4. Verify all links work (should go to your website)

### Step 6: Send to All Test Recipients (Optional)
⚠️ **Only if you want to send actual test emails**
1. Review the recipient list (should be 5 test emails)
2. **Send** to test the full personalization system
3. Check each email account to see the personalized greetings

## 📋 What to Check:
- ✅ Personalized greetings work correctly
- ✅ Plus-one messages appear only for eligible guests
- ✅ Links point to your wedding website
- ✅ Email renders properly on mobile/desktop
- ✅ From address shows "Dian & Christopher"
- ✅ Luxury styling displays correctly

## 🚨 Important:
- This is a **TEST** - mark campaign clearly as test
- These are fake/test recipients  
- Once testing is complete, delete test campaign
- Create new campaign for real guest list

Ready to test your beautiful wedding invitations! 🎉