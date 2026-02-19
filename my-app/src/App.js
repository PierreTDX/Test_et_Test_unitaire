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
 * Handles shared state (list of users) and routing.
 *
 * @memberof module:Components
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

  // Handler to add a new user (passed to RegistrationForm)
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