# User Registration and Authentication:
## Flask-Supabase-Authentication

This is a simple Flask and React.js application for user authentication using Supabase.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3 installed
- Node.js and npm installed
- Supabase account and API key
- Gmail account (for sending verification emails)

## Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/sasha643/Devzery_Assignment.git
   cd /YOUR_LOCAL_PATH_TO_THE_FOLDER/flask-server

2. Install the required Python packages:

   ```bash
   pip install -r requirements.txt

3. Replace placeholder values:

- Replace "YOUR_SUPABASE_KEY" in app.py with your actual Supabase API key.
- Replace "PASSWORD" in app.py with the password of your Gmail account (This can be generated from your gmail account from apppasswords).

## Running the Backend

- To run the Flask backend, execute the following commands:

   ```bash
   python server.py

## Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend

2. Install the required Node.js packages:

   ```bash
   npm install

## Usage

1. Open your web browser and navigate to http://localhost:3000.
2. Use the provided UI for user signup and login. Successful login will redirect to the profile page.

## Notes

- Ensure that your Supabase database has a table named Authenticate with appropriate columns.
- Update the email verification links in the send_verification_email function as needed.

# Explaination for verifying the email:

- Capture User Information:

Collect user details during the registration process, including username, email, and password.

- Generate Verification Token:

Generate a unique verification token (e.g., a UUID) at the time of registration.

- Store User Data with Token:

Store user data along with the verification token in the Supabase database.
Add a field to indicate the user's verification status (initially set to false).

- Send Verification Email:

Trigger an email containing a verification link to the user's provided email.
The link should include the verification token as a query parameter.

- Handle Verification Endpoint:

Create an endpoint (e.g., /verify) to handle verification requests.
Extract the token from the URL and verify its existence in the database.
If valid, update the user's record to mark them as verified.

- Allow Login for Verified Users Only:

During the login process, check whether the user is verified before granting access.
If unverified, display a message prompting the user to verify their email.

- Optional: Token Expiry:

Consider setting an expiry time for verification tokens to enhance security.
Invalidate tokens that haven't been used for verification after a specific period.

# Explaination for password reset

- Initiate Password Reset Request:

Implement a feature where users can initiate a password reset request.
This can be done through a "Forgot Password" link on the login page.

- Generate Secure Token:

When a password reset request is received, generate a secure, unique token.
The token should have a limited lifespan to enhance security.

- Link Token to User:

Associate the generated token with the user's account in the database.
This linkage ensures that the token is valid only for the user who initiated the reset request.

- Send Reset Email:

Compose an email containing a link with the generated secure token.
The link should lead to a password reset page on your application.

- Handle Reset Endpoint:

Create an endpoint (e.g., /reset-password) to handle password reset requests.
Extract the token from the URL and verify its validity.
If valid, allow the user to reset their password.

- Token Expiry:

Set an expiry time for password reset tokens to minimize security risks.
Invalidate tokens that haven't been used for password reset after a specific period.

- Secure Token Storage:

Store the tokens securely, using techniques such as encryption or hashing.
This prevents exposure of sensitive information even if the token data is somehow accessed.
