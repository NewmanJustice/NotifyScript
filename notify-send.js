// notify-send.js

require('dotenv').config();
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch'); // npm install node-fetch@2

// Load variables from .env or use placeholders
const fullApiKey = process.env.GOV_NOTIFY_API_KEY || '<YOUR_GOV_NOTIFY_API_KEY>';
const templateId = process.env.GOV_NOTIFY_TEMPLATE_ID || '<YOUR_TEMPLATE_ID>';
const recipientEmail = process.env.RECIPIENT_EMAIL || '<RECIPIENT_EMAIL>';
const verifyUrl = process.env.VERIFY_URL || '<VERIFY_URL_PLACEHOLDER>';
const resetUrl = process.env.RESET_URL || '<RESET_URL_PLACEHOLDER>';

// Personalisation object (adjust keys as needed for your template)
const personalisation = {
  verify_url: verifyUrl,
  reset_url: resetUrl,
};

// Parse the API key
const parts = fullApiKey.split('-');
if (parts.length < 3) {
  console.error('Invalid GOV_NOTIFY_API_KEY format. Expected format: key_name-service_id-api_secret');
  process.exit(1);
}

const keyName = parts[0];
const serviceId = parts.slice(1, 6).join('-');    // 1 to 5 (inclusive)
const apiSecret = parts.slice(6).join('-');       // 6 to end

console.log('Key Name:', keyName);
console.log('Service ID:', serviceId);
console.log('API Secret:', apiSecret);
console.log('Template ID:', templateId);
console.log('Recipient Email:', recipientEmail);
console.log('Personalisation:', personalisation);

// Create JWT payload
const payload = {
  iss: serviceId,
  iat: Math.floor(Date.now() / 1000),
};

console.log('JWT Payload:', payload);

// Generate JWT
const token = jwt.sign(payload, apiSecret, { algorithm: 'HS256', header: { typ: 'JWT', alg: 'HS256' } });

console.log('Generated JWT token:', token);

// Prepare request body
const body = {
  email_address: recipientEmail,
  template_id: templateId,
  personalisation: personalisation,
};

console.log('\nRequest body:', JSON.stringify(body, null, 2));

// Send POST request to GOV.UK Notify
(async () => {
  try {
    const response = await fetch('https://api.notifications.service.gov.uk/v2/notifications/email', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    console.log('\nResponse status:', response.status);
    console.log('Response body:', text);
  } catch (err) {
    console.error('Error sending request:', err);
  }
})();

