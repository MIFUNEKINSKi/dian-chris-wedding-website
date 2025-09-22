#!/usr/bin/env python3
"""
Quick test email sender for wedding invitations
"""

import sys
import os

# Add the current directory to the path to import the wedding email sender
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from send_wedding_invitations import WeddingEmailSender

def send_test_emails():
    """Send test emails to a list of test addresses"""
    
    # Test email addresses - add your test emails here
    test_emails = [
        "dian.christopher.wedding@gmail.com",  # Your wedding email
        "chrismoore@mifunekinski.com"          # Your personal email
    ]
    
    print("🎉 Starting Wedding Email Test")
    print("=" * 40)
    
    # Initialize sender
    try:
        sender = WeddingEmailSender()
        print("✅ Email sender initialized successfully")
    except Exception as e:
        print(f"❌ Failed to initialize email sender: {e}")
        return
    
    # Send test emails
    successful = 0
    failed = 0
    
    for email in test_emails:
        print(f"\n📧 Sending test email to: {email}")
        try:
            success = sender.send_test_email(email)
            if success:
                successful += 1
                print(f"✅ Successfully sent to {email}")
            else:
                failed += 1
                print(f"❌ Failed to send to {email}")
        except Exception as e:
            failed += 1
            print(f"❌ Error sending to {email}: {e}")
    
    print(f"\n📊 Test Results:")
    print(f"✅ Successful: {successful}")
    print(f"❌ Failed: {failed}")
    print(f"📧 Total: {successful + failed}")
    
    if successful > 0:
        print("\n🎉 Test emails sent successfully! Check your inbox.")
    else:
        print("\n⚠️  No emails were sent successfully. Please check your configuration.")

if __name__ == "__main__":
    send_test_emails()