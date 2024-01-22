from flask import Flask, request, jsonify
from supabase import create_client
from email.message import EmailMessage
import smtplib
import uuid
from flask_cors import CORS
import json
import pandas as pd

app = Flask(__name__)
CORS(app)

# Supabase configuration
url = "https://ayopcbsjgtycygsknkqc.supabase.co"
key = "YOUR_SUPABASE_KEY"
supabase = create_client(url, key)

# Route for user signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    user = data.get('username')
    email = data.get('email')
    passw = data.get('password')

    # Generate a unique verification token
    verification_token = str(uuid.uuid4())

    # Store user data along with the verification token in the database
    supabase.table('Authenticate').insert({
        "username": user,
        "email": email,
        "password": passw,
        "verify": verification_token,
        "verified": False  # Initially set as unverified
    }).execute()

    # Send verification email
    send_verification_email(email, verification_token, 'signup')

    return jsonify({"message": "Verification email sent. Please check your email to complete the signup process."})

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = data.get('username')
    passw = data.get('password')
    M = []
    response = supabase.table('Authenticate').select("*").execute()
    for i in response:
        try:
            for j in i[1]:
                M.append(j)    
        except:
            pass        
    df1 = pd.DataFrame(M)
    user_data = df1[df1['username'] == user]

    if not user_data.empty and user_data['password'].iloc[0] == passw:
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Invalid username or password"})

# Function to send verification email
def send_verification_email(email, verification_token, action):
    msg = EmailMessage()
    
    if action == 'signup':
        msg.set_content(f"Click the following link to verify your email: https://yourwebsite.com/verify?token={verification_token}")
        msg["Subject"] = "Email Verification"
    elif action == 'login':
        msg.set_content(f"Click the following link to login: https://yourwebsite.com/login")
        msg["Subject"] = "Login Instructions"
    
    msg["From"] = "shubh.bhatt67@gmail.com"  # Your Gmail email address
    msg["To"] = email

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login("shubh.bhatt67@gmail.com", "PASSWORD")  # Replace with your email and password
        server.send_message(msg)

# Route to get user profiles
@app.route('/dashboard', methods=['GET'])
def get_user_profiles():
    profiles = supabase.table('Authenticate').select('username', 'email').execute()
    return jsonify(profiles['data'])

# Route to manage user profile by user ID
@app.route('/dashboard/<user_id>', methods=['GET', 'PUT'])
def manage_user_profile(user_id):
    if request.method == 'GET':
        profile = supabase.table('Authenticate').select('username', 'email').eq('id', user_id).single().execute()
        return jsonify(profile['data'])
    elif request.method == 'PUT':
        data = request.json
        supabase.table('Authenticate').update(data).eq('id', user_id).execute()
        return jsonify({"message": "Profile updated successfully."})

if __name__ == '__main__':
    app.run(debug=True)
