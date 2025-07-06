
# GOV.UK Notify Direct API Test Script

This Node.js script lets you send test emails using the [GOV.UK Notify API](https://www.notifications.service.gov.uk/) by generating the required JWT authentication token and making a direct API call.

## Features

- Loads configuration from a `.env` file
- Generates a JWT for GOV.UK Notify authentication
- Sends a real email (using your template and credentials) via the Notify API
- Prints all key variables and the API response for debugging

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- A GOV.UK Notify account with:
  - A valid API key
  - A template ID for the email you want to send
- The recipient email address (should be on your team or guest list if using a team/guest key)

## Setup

### 1. Clone or Download This Repository

```bash
git clone https://github.com/your-username/govuk-notify-node-test.git
cd govuk-notify-node-test
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

Create a file named `.env` in the root of the project with the following contents:

```env
GOV_NOTIFY_API_KEY=your-govuk-notify-api-key-here
GOV_NOTIFY_TEMPLATE_ID=your-template-id-here
RECIPIENT_EMAIL=recipient@example.com
VERIFY_URL=https://your-app.com/verify?token=example
RESET_URL=https://your-app.com/reset-password?token=example
```

- Replace the values with your real GOV.UK Notify API key, template ID, and recipient email address.
- Set the `VERIFY_URL` and/or `RESET_URL` if your template requires them as personalisation fields.

**Important:**  
Do **not** commit your `.env` file to public repositories. Add `.env` to your `.gitignore`.

## Usage

Run the script using Node.js:

```bash
node notify-send.js
```

The script will:

- Print the parsed variables and JWT token
- Print the request payload
- Send the email via GOV.UK Notify
- Print the HTTP status and response from the API

## Troubleshooting

- **403 AuthError:** Double-check your API key, template ID, and that the recipient email is allowed for your Notify account.
- **Invalid Key Format:** Ensure your API key is in the correct format:  
  `key_name-service_id-api_secret`
- **Missing Variables:** The script will exit if any required environment variable is missing.

## Customisation

- Adjust the `personalisation` object in `notify-send.js` to match your template’s required fields.
- To add more fields, update both your `.env` file and the script accordingly.

## License

MIT

**Questions or issues?**  
Open an issue or contact your GOV.UK Notify administrator.

Let me know if you want this tailored for a different filename, extra troubleshooting, or more advanced usage!

Sources
