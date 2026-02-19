/**
 * @file Home.js
 * @description Home page component displaying the list of registered users.
 * It handles the display logic for empty states and populates user cards.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

/**
 * Home Page Component.
 * Receives the list of users from the parent component and displays them.
 * It handles pluralization of the user count and renders a specific message if the list is empty.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.users - List of registered users passed from App state.
 * @param {string} props.users[].firstName - User's first name.
 * @param {string} props.users[].lastName - User's last name.
 * @param {string} props.users[].email - User's email address.
 * @param {string} props.users[].birthDate - User's birth date (ISO string).
 * @param {string} props.users[].city - User's city.
 * @param {string} props.users[].postalCode - User's postal code.
 * @param {string} props.users[].timestamp - Registration timestamp (ISO string).
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