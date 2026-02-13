import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
});
