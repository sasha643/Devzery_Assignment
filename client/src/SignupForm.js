// AuthForm.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Import your CSS file

const AuthForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Use a cleanup function to clear the messages after 5 seconds
        let timer;
        if (successMessage || errorMessage) {
            timer = setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
            }, 5000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [successMessage, errorMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const endpoint = isLogin ? 'login' : 'signup';
            const requestData = isLogin
                ? { username, password }
                : { username, email, password };

            const response = await fetch(`http://localhost:5000/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(data.message);

                // If it's a successful login, pass user data to the parent component
                if (isLogin) {
                    onLogin(data.user); // Assuming the server response includes user data

                    // Navigate to /profile only for successful login
                    navigate('/profile');
                }

                // If it's a successful signup, reset the form fields after a delay
                if (!isLogin) {
                    setTimeout(() => {
                        setUsername('');
                        setEmail('');
                        setPassword('');
                    }, 5000); // Reset after 5 seconds
                }
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message);

                // Optional: You can handle other cases here if needed
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <h1>{isLogin ? 'Login' : 'Signup'} Form</h1>
            {loading && <p className="loading-message">Loading...</p>}
            {successMessage && (
                <p className={`response-message success-message ${successMessage && 'fade-out'}`}>
                    {successMessage}
                </p>
            )}
            {errorMessage && (
                <p className={`response-message fail-message`}>
                    {errorMessage}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label>
                            Email:
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </div>
                )}
                <br />
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit" disabled={loading}>
                    {isLogin ? 'Login' : 'Signup'}
                </button>
            </form>
            <p onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'New user? Sign up!' : 'Already have an account? Log in!'}
            </p>
        </div>
    );
};

export default AuthForm;
