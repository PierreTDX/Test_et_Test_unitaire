/**
 * @file App.test.js
 * @description Integration tests for the App component.
 * Verifies routing logic, initial rendering, and full user flows.
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import React from 'react';
import '@testing-library/jest-dom';
import axios from 'axios';

// Mock axios globally for this file
jest.mock('axios');

describe('App Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders home page by default', async () => {
    // Mock successful API call with empty list
    axios.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Use findByText to wait for the async useEffect
    const titleElement = await screen.findByText(/Registered Users/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('navigates to registration page', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Wait for home to load
    await screen.findByText(/Registered Users/i);

    fireEvent.click(screen.getByText(/Go to Registration/i));
    expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();
  });

  test('renders registration page directly on specific route', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter initialEntries={['/registration']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();
  });

  test('handles error when loading users gracefully', async () => {
    // Mock console.error to avoid polluting test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    // Mock API failure
    axios.get.mockRejectedValue(new Error('Network Error'));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Verify error message in UI
    expect(await screen.findByText(/Failed to load users from API/i)).toBeInTheDocument();

    // Verify error was logged
    expect(consoleSpy).toHaveBeenCalledWith("Error loading initial data", expect.any(Error));

    // Verify Home still renders (title)
    expect(screen.getByText(/Registered Users/i)).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  test('full registration flow updates user list', async () => {
    // 1. Initial load (empty)
    axios.get.mockResolvedValueOnce({ data: [] });
    // 2. Post response
    axios.post.mockResolvedValueOnce({ data: { id: 101 } });

    render(
      <MemoryRouter initialEntries={['/registration']}>
        <App />
      </MemoryRouter>
    );

    // Fill form with valid data
    fireEvent.change(screen.getByTestId('firstName-input'), { target: { value: 'New' } });
    fireEvent.change(screen.getByTestId('lastName-input'), { target: { value: 'User' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'new@user.com' } });
    fireEvent.change(screen.getByTestId('birthDate-input'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'City' } });
    fireEvent.change(screen.getByTestId('postalCode-input'), { target: { value: '12345' } });

    // Submit
    fireEvent.click(screen.getByTestId('submit-button'));

    // Wait for success message
    await waitFor(() => expect(screen.getByText(/Registration successful!/i)).toBeInTheDocument());

    // Navigate back to home manually
    fireEvent.click(screen.getByText(/Back to Home/i));

    // Verify redirection to Home
    expect(screen.getByText(/Registered Users/i)).toBeInTheDocument();

    // Verify new user is in the list (optimistic update or state update in App.js)
    expect(screen.getByText('New User')).toBeInTheDocument();
  });

  test('renders 404 page for unknown routes', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
