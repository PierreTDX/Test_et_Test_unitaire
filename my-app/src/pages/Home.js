/**
 * @file Home.js
 * @description Home page component displaying the list of registered users.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

/**
 * Home Page Component.
 * Fetches and displays users from local storage.
 *
 * @memberof module:Components
 * @param {Object} props
 * @param {Array} props.users - List of registered users passed from App
 * @returns {JSX.Element} The rendered home page.
 */
const Home = ({ users = [] }) => {
    return (
        <div className="home-container">
            <h1>Registered Users</h1>
            {users.length > 0 && (
                <h2>
                    {users.length} registered user{users.length > 1 ? 's' : ''}
                </h2>
            )}

            <div className="user-list">
                {users.length === 0 ? (
                    <div className="no-users">
                        <p>No users registered yet.</p>
                    </div>
                ) : (
                    users.map((user, index) => (
                        <div key={index} className="user-card">
                            <h3>{user.firstName} {user.lastName}</h3>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Birth Date:</strong> {new Date(user.birthDate).toLocaleDateString()}</p>
                            <p><strong>Location:</strong> {user.postalCode} {user.city}</p>
                            <p className="user-date">Registered: {new Date(user.timestamp).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>

            <Link to="/registration" className="submit-button">Go to Registration</Link>
        </div>
    );
};

export default Home;