/**
 * @file App.js
 * @description Root component of the application.
 */
import React from 'react';
import RegistrationForm from './pages/RegistrationForm';

/**
 * Module for React Components.
 * @module Components
 */

/**
 * Main Application Component.
 * Renders the RegistrationForm.
 *
 * @memberof module:Components
 * @returns {JSX.Element} The rendered application.
 */
function App() {
  return (
    <div className="App">
      <RegistrationForm />
    </div>
  );
}

export default App;