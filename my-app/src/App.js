/**
 * @file App.js
 * @description Root component of the application.
 */
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './pages/RegistrationForm';
import Home from './pages/Home';
import { getFromLocalStorage } from './utils/validator';
import './styles/App.css';

/**
 * Module for React Components.
 * @module Components
 */

/**
 * Main Application Component.
 * Acts as the root component and state manager for the application.
 * It handles the routing configuration and manages the shared state (list of users)
 * across different pages.
 *
 * @component
 * @returns {JSX.Element} The rendered application.
 */
function App() {
  // Shared state: List of registered users
  const [users, setUsers] = useState([]);

  // Load initial data from localStorage
  useEffect(() => {
    try {
      const data = getFromLocalStorage();
      setUsers(data);
    } catch (error) {
      console.error("Error loading initial data", error);
    }
  }, []);

  /**
   * Handler to add a new user to the state and local storage.
   * This function is passed down to the RegistrationForm component.
   *
   * @param {Object} newUser - The user object created by the registration form.
   */
  const handleAddUser = (newUser) => {
    const userWithTimestamp = { ...newUser, timestamp: new Date().toISOString() };
    const updatedUsers = [...users, userWithTimestamp];
    setUsers(updatedUsers);
    localStorage.setItem('registrations', JSON.stringify(updatedUsers));
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home users={users} />} />
        <Route path="/registration" element={<RegistrationForm onUserAdd={handleAddUser} />} />
      </Routes>
    </div>
  );
}

export default App;