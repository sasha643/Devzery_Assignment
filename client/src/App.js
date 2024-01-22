// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthForm from './SignupForm';
import Profile from './Profile';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    const handleLogin = (data) => {
        setLoggedIn(true);
        setUserData(data);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUserData({});
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={!loggedIn ? <AuthForm onLogin={handleLogin} /> : <Navigate to="/profile" />} />
                <Route
                    path="/profile"
                    element={
                        loggedIn ? (
                            <Profile {...userData} onLogout={handleLogout} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route index element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
