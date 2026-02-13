import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationForm from '../pages/RegistrationForm';

describe('RegistrationForm Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders all form fields', () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birth Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  test('renders form title', () => {
    render(<RegistrationForm />);
    expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();
  });

  test('submit button is disabled when form is empty', () => {
    render(<RegistrationForm />);
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeDisabled();
  });

  test('displays error for invalid first name on blur', () => {
    render(<RegistrationForm />);

    const firstNameInput = screen.getByTestId('firstName-input');

    fireEvent.change(firstNameInput, { target: { value: '123' } });
    fireEvent.blur(firstNameInput);

    expect(screen.getByTestId('firstName-error')).toBeInTheDocument();
  });

  test('displays error for invalid email', () => {
    render(<RegistrationForm />);

    const emailInput = screen.getByTestId('email-input');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    expect(screen.getByTestId('email-error')).toBeInTheDocument();
  });

  test('displays error for invalid postal code', () => {
    render(<RegistrationForm />);

    const postalCodeInput = screen.getByTestId('postalCode-input');

    fireEvent.change(postalCodeInput, { target: { value: '123' } });
    fireEvent.blur(postalCodeInput);

    expect(screen.getByTestId('postalCode-error')).toBeInTheDocument();
  });

  test('successfully submits valid form and saves to localStorage', async () => {
    render(<RegistrationForm />);

    const validDate = new Date();
    validDate.setFullYear(validDate.getFullYear() - 20);
    const dateString = validDate.toISOString().split('T')[0];

    fireEvent.change(screen.getByTestId('firstName-input'), {
      target: { value: 'Jean' }
    });
    fireEvent.change(screen.getByTestId('lastName-input'), {
      target: { value: 'Dupont' }
    });
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'jean.dupont@example.com' }
    });
    fireEvent.change(screen.getByTestId('birthDate-input'), {
      target: { value: dateString }
    });
    fireEvent.change(screen.getByTestId('city-input'), {
      target: { value: 'Paris' }
    });
    fireEvent.change(screen.getByTestId('postalCode-input'), {
      target: { value: '75001' }
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('success-message')).toBeInTheDocument();
    });

    const savedData = JSON.parse(localStorage.getItem('registrations'));
    expect(savedData).toHaveLength(1);
  });
});