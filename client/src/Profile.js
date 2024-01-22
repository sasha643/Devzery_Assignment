// Profile.js

import React from 'react';

const Profile = ({ username, email }) => {
    return (
        <div>
            <h1>User Profile</h1>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
        </div>
    );
};

export default Profile;
