#!/usr/bin/env python3
"""
Wedding Email Invitation Sender
A custom script for sending personalized wedding invitations

Requirements:
pip install pandas smtplib-ssl

Usage:
1. Update email settings in the script
2. Prepare guest list CSV file
3. Run: python send_wedding_invitations.py
"""

import pandas as pd
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import time
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('wedding_email_log.txt'),
        logging.StreamHandler()
    ]
)

class WeddingEmailSender:
    def __init__(self):
        # Email Configuration - UPDATED WITH YOUR DETAILS
        self.smtp_server = "smtp.gmail.com"  # Gmail SMTP
        self.smtp_port = 587
        self.sender_email = "dian.christopher.wedding@gmail.com"  # YOUR WEDDING EMAIL
        self.sender_password = "cmjehopyagttxgnf"  # YOUR CORRECT APP PASSWORD
        self.sender_name = "Dian & Christopher"
        
        # Website Configuration
        self.website_url = "https://dian-chris-wedding-website-git-main-mifunekinskis-projects.vercel.app"  # Your main branch Vercel site
        
        # Load HTML template
        self.load_email_template()
        
    def load_email_template(self):
        """Load the HTML email template"""
        try:
            with open('email-invitation-python.html', 'r', encoding='utf-8') as file:
                self.email_template = file.read()
            logging.info("Email template loaded successfully")
        except FileNotFoundError:
            logging.error("email-invitation-python.html not found")
            raise
            
    def personalize_email(self, guest_data):
        """Personalize email content for each guest"""
        # Create personalized greeting
        if pd.notna(guest_data['First Name']) and pd.notna(guest_data['Last Name']):
            greeting = f"{guest_data['First Name']} {guest_data['Last Name']}"
        elif pd.notna(guest_data['Full Name']):
            greeting = guest_data['Full Name']
        else:
            greeting = "Friend"
            
        # Prepare email content
        email_content = self.email_template
        
        # Replace placeholders
        email_content = email_content.replace("{guest_name}", greeting)
        email_content = email_content.replace("{website_url}", self.website_url)
        
        # Add plus-one message if applicable
        if guest_data.get('Plus One', '').lower() == 'yes':
            plus_one_msg = '<p class="plus-one-note">You\'re welcome to bring a guest!</p>'
        else:
            plus_one_msg = ''
        
        email_content = email_content.replace("{plus_one_message}", plus_one_msg)
        
        return email_content
        
    def create_email_message(self, guest_data, email_content):
        """Create email message with proper headers"""
        message = MIMEMultipart("alternative")
        
        # Email headers
        guest_name = guest_data.get('First Name', guest_data.get('Full Name', 'Friend'))
        message["Subject"] = f"{guest_name}, You're Invited to Our Wedding! 💕"
        message["From"] = f"{self.sender_name} <{self.sender_email}>"
        message["To"] = guest_data['Email Address']
        message["Reply-To"] = self.sender_email
        
        # Attach HTML content
        html_part = MIMEText(email_content, "html")
        message.attach(html_part)
        
        return message
        
    def send_email(self, guest_data):
        """Send email to a single guest"""
        try:
            # Personalize content
            email_content = self.personalize_email(guest_data)
            
            # Create message
            message = self.create_email_message(guest_data, email_content)
            
            # Create secure connection and send
            context = ssl.create_default_context()
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.sender_email, self.sender_password)
                
                text = message.as_string()
                server.sendmail(self.sender_email, guest_data['Email Address'], text)
                
            logging.info(f"✅ Email sent to {guest_data['Email Address']}")
            return True
            
        except Exception as e:
            logging.error(f"❌ Failed to send to {guest_data['Email Address']}: {str(e)}")
            return False
            
    def send_bulk_emails(self, csv_file_path, delay_seconds=5):
        """Send emails to all guests in CSV file"""
        try:
            # Load guest list
            guests_df = pd.read_csv(csv_file_path)
            logging.info(f"Loaded {len(guests_df)} guests from {csv_file_path}")
            
            # Track results
            successful_sends = 0
            failed_sends = 0
            
            # Send emails
            for index, guest in guests_df.iterrows():
                if pd.isna(guest['Email Address']):
                    logging.warning(f"Skipping row {index + 1}: No email address")
                    continue
                    
                logging.info(f"Sending to {guest['Email Address']} ({index + 1}/{len(guests_df)})")
                
                if self.send_email(guest):
                    successful_sends += 1
                else:
                    failed_sends += 1
                    
                # Delay between emails to avoid spam detection
                if index < len(guests_df) - 1:  # Don't delay after last email
                    time.sleep(delay_seconds)
                    
            # Summary
            logging.info(f"\n📊 SUMMARY:")
            logging.info(f"✅ Successful: {successful_sends}")
            logging.info(f"❌ Failed: {failed_sends}")
            logging.info(f"📧 Total processed: {successful_sends + failed_sends}")
            
        except FileNotFoundError:
            logging.error(f"CSV file not found: {csv_file_path}")
        except Exception as e:
            logging.error(f"Error in bulk sending: {str(e)}")
            
    def send_test_email(self, test_email):
        """Send a test email to verify setup"""
        test_guest = {
            'Email Address': test_email,
            'First Name': 'Test',
            'Last Name': 'Guest',
            'Plus One': 'Yes'
        }
        
        logging.info(f"Sending test email to {test_email}")
        return self.send_email(test_guest)

def main():
    """Main function to run the email sender"""
    print("🎉 Wedding Email Invitation Sender")
    print("=" * 40)
    
    # Initialize sender
    sender = WeddingEmailSender()
    
    while True:
        print("\nOptions:")
        print("1. Send test email")
        print("2. Send to all guests")
        print("3. Exit")
        
        choice = input("\nEnter your choice (1-3): ").strip()
        
        if choice == "1":
            test_email = input("Enter test email address: ").strip()
            if test_email:
                sender.send_test_email(test_email)
            else:
                print("Please enter a valid email address")
                
        elif choice == "2":
            csv_file = input("Enter CSV file path (or press Enter for 'guest-list-template.csv'): ").strip()
            if not csv_file:
                csv_file = "guest-list-template.csv"
                
            confirm = input(f"Send emails to all guests in {csv_file}? (yes/no): ").strip().lower()
            if confirm == "yes":
                delay = input("Delay between emails in seconds (default 5): ").strip()
                try:
                    delay = int(delay) if delay else 5
                except ValueError:
                    delay = 5
                    
                sender.send_bulk_emails(csv_file, delay)
            else:
                print("Cancelled")
                
        elif choice == "3":
            print("Goodbye! 💕")
            break
            
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()