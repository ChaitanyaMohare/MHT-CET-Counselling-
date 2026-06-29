# Email Sender Configuration Update

## Change Email Sender to brixontech@gmail.com

To change all emails to be sent from `brixontech@gmail.com` instead of `sauravambhore@gmail.com`, update your `.env` file:

### Step 1: Update .env File

Open `.env` file and change these two lines:

```env
GMAIL_USER=brixontech@gmail.com
GMAIL_APP_PASSWORD=your_brixontech_app_password
```

**Important**: You need to generate a new App Password for the `brixontech@gmail.com` account.

### Step 2: Generate Gmail App Password for brixontech@gmail.com

1. **Login to Gmail**: Sign in to https://gmail.com with `brixontech@gmail.com`

2. **Go to Google Account Settings**: https://myaccount.google.com/

3. **Enable 2-Step Verification** (if not already enabled):
   - Click "Security" in the left menu
   - Scroll to "2-Step Verification"
   - Click "Get Started" and follow the steps

4. **Generate App Password**:
   - After enabling 2-Step Verification, go back to Security
   - Scroll down to "2-Step Verification" section
   - Click "App passwords" at the bottom
   - Select "Mail" as the app
   - Select "Windows Computer" as the device
   - Click "Generate"

5. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

6. **Paste it in .env** (remove spaces):
   ```env
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```

### Step 3: Restart the Server

After updating `.env`, you **MUST** restart the server:

```bash
# Stop the current server (Ctrl+C)
# Then start again:
npm start
```

### Step 4: Verify Email Configuration

When the server starts, you should see:
```
✅ SMTP server is ready to send emails
```

If you see an error, double-check:
- Email address is correct
- App password is correct (16 characters, no spaces)
- 2-Step Verification is enabled

## What Was Changed in Code

### 1. Fixed Premium Plan Price
- **Before**: ₹1,999
- **After**: ₹1,499

### 2. Updated Email Links
All buttons and links in emails now point to functional pages:

#### Quick Lead Email:
- **Choose Basic**: `https://praveshmitra.online/register?plan=Basic`
- **Choose Standard**: `https://praveshmitra.online/register?plan=Standard`
- **Choose Premium**: `https://praveshmitra.online/register?plan=Premium`
- **View All Plans**: `https://praveshmitra.online/packages`

#### Registration Email:
- All contact information is now clickable:
  - Phone: `tel:+919529679073` (opens dialer on mobile)
  - Email: `mailto:support@praveshmitra.in` (opens email client)
  - WhatsApp: `https://wa.me/919529679073` (opens WhatsApp)

### 3. Email Sender Configuration
The system uses `process.env.GMAIL_USER` for the sender email address, so changing the `.env` file will automatically update the sender for:
- Quick Lead emails
- Registration confirmation emails
- All other system emails

## Files Modified

1. `utils/mailer.js`:
   - Updated Premium price: ₹1,999 → ₹1,499
   - Changed package links from Cashfree to registration pages
   - Made phone, email, and WhatsApp links clickable
   - Email sender controlled by `GMAIL_USER` environment variable

## Testing After Update

### Test 1: Quick Lead Form
1. Go to homepage
2. Fill "Start Your Journey" form
3. Submit
4. Check email from `brixontech@gmail.com`
5. Verify Premium plan shows ₹1,499
6. Click "Choose Premium" button → Should redirect to registration

### Test 2: Registration Form
1. Go to `/packages`
2. Click "Select Premium Plan"
3. Fill registration form
4. Submit
5. Check email from `brixontech@gmail.com`
6. Verify price shows ₹1,499
7. Click phone/email/WhatsApp links → Should open respective apps

### Test 3: Server Logs
After form submission, check console:
```
✅ Quick Lead thank-you email sent to user@example.com
✅ Registration success email sent to user@example.com
```

## Security Notes

⚠️ **Important Security Reminders**:

1. **Never commit .env to git**
   - The `.env` file should be in `.gitignore`
   - Never share your app password

2. **Keep App Password Secret**
   - Don't share it in chat, email, or screenshots
   - Regenerate if compromised

3. **Use Environment Variables in Production**
   - On your hosting platform (Render, Heroku, etc.)
   - Add `GMAIL_USER` and `GMAIL_APP_PASSWORD` in their environment settings

## Current Configuration

After updating `.env` with brixontech credentials:

```
Email Sender: brixontech@gmail.com
Reply-To: brixontech@gmail.com
Display Name: Pravesh Mitra / Pravesh Mitra Counselling

Plans in Email:
- Basic: ₹499 → /register?plan=Basic
- Standard: ₹999 → /register?plan=Standard  
- Premium: ₹1,499 → /register?plan=Premium

Contact Links:
- Phone: tel:+919529679073
- Email: mailto:support@praveshmitra.in
- WhatsApp: https://wa.me/919529679073
- Packages: https://praveshmitra.online/packages
```

## Troubleshooting

### Issue: Emails not sending
**Solution**: 
1. Check `.env` has correct email and password
2. Verify 2-Step Verification is enabled
3. Regenerate app password if needed
4. Restart the server

### Issue: "Invalid login" error
**Solution**: 
- App password might be wrong
- Copy it carefully without spaces
- Try generating a new one

### Issue: Emails go to spam
**Solution**: 
- Ask recipients to mark as "Not Spam"
- Add sender to contacts
- Emails are already optimized for primary inbox

---

**Status**: ✅ Email configuration ready for brixontech@gmail.com

**Last Updated**: June 29, 2026
