/**
 * @file NotFound.js
 * @description 404 Not Found page component.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

/**
 * Not Found page component.
 * Displays a 404 error message with navigation back to home.
 *
 * @component
 * @returns {JSX.Element} The rendered 404 page.
 */
const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="light-container">
                <h1>404</h1>
            </div>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" className="submit-button" data-testid="home-button">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;