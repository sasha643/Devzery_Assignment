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
