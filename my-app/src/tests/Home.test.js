/**
 * @file Home.test.js
 * @description Integration tests for the Home component.
 * Verifies data fetching, rendering of user lists, and empty states.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';
import * as validator from '../utils/validator';

describe('Home Page Integration Tests', () => {
    // Reset mocks after each test to ensure clean state
    afterEach(() => {
        jest.restoreAllMocks();
    });

    // Helper to render with Router context (needed for <Link>)
    const renderWithRouter = (component) => {
        return render(<MemoryRouter>{component}</MemoryRouter>);
    };

    test('renders home page title', () => {
        jest.spyOn(validator, 'getFromLocalStorage').mockReturnValue([]);
        renderWithRouter(<Home />);
        expect(screen.getByText(/Registered Users/i)).toBeInTheDocument();
    });

    test('displays message when no users are registered', () => {
        jest.spyOn(validator, 'getFromLocalStorage').mockReturnValue([]);
        renderWithRouter(<Home />);
        expect(screen.getByText(/No users registered yet/i)).toBeInTheDocument();
    });

    test('displays user cards when users are registered', async () => {
        const mockUsers = [
            {
                firstName: 'Jean',
                lastName: 'Dupont',
                email: 'jean.dupont@example.com',
                birthDate: '1990-01-01',
                city: 'Paris',
                postalCode: '75001',
                timestamp: new Date('2023-01-01').toISOString()
            },
            {
                firstName: 'Marie',
                lastName: 'Curie',
                email: 'marie.curie@example.com',
                birthDate: '1867-11-07',
                city: 'Warsaw',
                postalCode: '99999',
                timestamp: new Date('2023-01-02').toISOString()
            }
        ];

        // Mock the storage retrieval
        jest.spyOn(validator, 'getFromLocalStorage').mockReturnValue(mockUsers);

        renderWithRouter(<Home />);

        // Use findByText to wait for the re-render caused by useEffect
        expect(await screen.findByText('Jean Dupont')).toBeInTheDocument();
        expect(screen.getByText('Marie Curie')).toBeInTheDocument();

        // Check for other details
        expect(screen.getByText(/jean.dupont@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/Paris/i)).toBeInTheDocument();

        // Ensure "No users" message is gone
        expect(screen.queryByText(/No users registered yet/i)).not.toBeInTheDocument();
    });

    test('renders link to registration page', () => {
        jest.spyOn(validator, 'getFromLocalStorage').mockReturnValue([]);
        renderWithRouter(<Home />);

        const link = screen.getByRole('link', { name: /Go to Registration/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/registration');
    });

    test('handles error when loading users gracefully', () => {
        // Mock console.error to avoid polluting test output
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        // Mock getFromLocalStorage to throw an error
        jest.spyOn(validator, 'getFromLocalStorage').mockImplementation(() => {
            throw new Error('Storage access denied');
        });

        renderWithRouter(<Home />);

        // Verify error was logged and component didn't crash
        expect(consoleSpy).toHaveBeenCalledWith("Error loading users", expect.any(Error));
        expect(screen.getByText(/Registered Users/i)).toBeInTheDocument();
    });
});