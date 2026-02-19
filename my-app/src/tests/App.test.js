import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import React from 'react';
import '@testing-library/jest-dom';
import * as validator from '../utils/validator';

test('renders home page by default', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const titleElement = screen.getByText(/Registered Users/i);
  expect(titleElement).toBeInTheDocument();
});

test('navigates to registration page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText(/Go to Registration/i));
  expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();
});

test('renders registration page directly on specific route', () => {
  render(
    <MemoryRouter initialEntries={['/registration']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();
});

test('handles error when loading users gracefully', () => {
  // Mock console.error to avoid polluting test output
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

  // Mock getFromLocalStorage to throw an error
  jest.spyOn(validator, 'getFromLocalStorage').mockImplementation(() => {
    throw new Error('Storage access denied');
  });

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Verify error was logged (message matches App.js) and component didn't crash
  expect(consoleSpy).toHaveBeenCalledWith("Error loading initial data", expect.any(Error));
  expect(screen.getByText(/Registered Users/i)).toBeInTheDocument();

  // Cleanup
  consoleSpy.mockRestore();
  jest.restoreAllMocks();
});
