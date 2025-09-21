# 🐍 Custom Email Script Setup

## Quick Setup Instructions for Python Email Script

### Prerequisites
```bash
pip install pandas
```

### Configuration Steps:

1. **Update Email Settings** in `send_wedding_invitations.py`:
   ```python
   self.sender_email = "your_email@gmail.com"  # Your Gmail
   self.sender_password = "your_app_password"  # Gmail App Password
   self.website_url = "https://your-website.com"  # Your website URL
   ```

2. **Gmail App Password Setup**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in the script

3. **Prepare Guest List**:
   - Use `guest-list-template.csv`
   - Fill with your actual guest data

### Usage:
```bash
python send_wedding_invitations.py
```

### Features:
- ✅ Personalized greetings
- ✅ Plus-one conditional messages  
- ✅ Bulk sending with delays
- ✅ Test email functionality
- ✅ Error logging and tracking
- ✅ Send progress monitoring

### Safety Features:
- 5-second delay between emails (customizable)
- Comprehensive error logging
- Test mode for verification
- Progress tracking

This script is a backup option if Mailchimp doesn't work for your needs!