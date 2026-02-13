import React from 'react';
import { render, screen } from '@testing-library/react';
import RegistrationForm from '../pages/RegistrationForm';

describe('RegistrationForm - Step 1 Basic Rendering', () => {
  test('renders form title', () => {
    render(<RegistrationForm />);
    expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();
  });

  test('renders all form fields', () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birth Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
  });
});
