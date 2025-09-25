# Telegram Bot Setup Instructions

## API Key Integration Complete ✅

Your Telegram Bot API key has been successfully integrated into both contact forms:
- **API Key**: `8380849170:AAGJIxZ3a4iY9tYv9hMzkHMXDSNk-4yLEdE`
- **Contact Page**: Full form with first name, last name, email, phone, and message
- **Home Page**: Simplified form with full name, email, and message

## Next Steps - Get Your Chat ID

To complete the setup, you need to get your Telegram Chat ID:

### Method 1: Using @userinfobot
1. Open Telegram and search for `@userinfobot`
2. Start a conversation with the bot
3. Send any message to the bot
4. The bot will reply with your Chat ID (a number like `123456789`)
5. Copy this Chat ID

### Method 2: Using @getidsbot
1. Open Telegram and search for `@getidsbot`
2. Start a conversation with the bot
3. Send any message to the bot
4. The bot will reply with your Chat ID

### Method 3: Using Telegram Web
1. Go to https://web.telegram.org
2. Open your chat with the bot
3. Look at the URL - it will contain your Chat ID

## Update the Chat ID

Once you have your Chat ID, replace `YOUR_CHAT_ID_HERE` in both files:

### In `contact.html` (line 903):
```javascript
const TELEGRAM_CHAT_ID = 'YOUR_ACTUAL_CHAT_ID_HERE';
```

### In `index.html` (line 2052):
```javascript
const TELEGRAM_CHAT_ID = 'YOUR_ACTUAL_CHAT_ID_HERE';
```

## How It Works

### Contact Page Form
- **Fields**: First Name, Last Name, Email, Phone, Message
- **Telegram Message Format**:
```
📧 New Contact Form Message

👤 Name: John Doe
📧 Email: john@example.com
📞 Phone: +1234567890

💬 Message:
Hello, I'm interested in enrollment...

🏫 Sent from: Bakka Secondary School Contact Page
⏰ Time: 12/25/2024, 2:30:45 PM
```

### Home Page Form
- **Fields**: Full Name, Email, Message
- **Telegram Message Format**:
```
📧 New Contact Form Message

👤 Name: Jane Smith
📧 Email: jane@example.com

💬 Message:
I would like to know more about...

🏫 Sent from: Bakka Secondary School Home Page
⏰ Time: 12/25/2024, 2:30:45 PM
```

## Testing

1. Open your website
2. Fill out either contact form
3. Submit the form
4. Check your Telegram for the message
5. You should receive a well-formatted message with all the details

## Troubleshooting

If messages aren't being sent:
1. Verify your Chat ID is correct
2. Make sure you've started a conversation with your bot
3. Check the browser console for any error messages
4. Ensure your bot token is correct

## Security Note

The API key is visible in the client-side code. For production use, consider:
- Using a server-side proxy to hide the API key
- Implementing rate limiting
- Adding additional validation

Your Telegram integration is now ready to use! 🚀
