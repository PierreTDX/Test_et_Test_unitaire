/**
 * @file RegistrationForm.js
 * @description Main registration form component handling user interactions and validation.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateIdentity, validateEmail, validatePostalCode, validateCity, calculateAge } from '../utils/validator.js';
import Toast from '../components/Toast';
import '../styles/RegistrationForm.css';

/**
 * Registration form component.
 * Handles user input, validation, and submission to the parent component.
 * It manages local state for form data, validation errors, and success messages.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onUserAdd - Callback function executed upon successful registration.
 *                                     Receives the user data object as an argument.
 * @param {Array} [props.existingUsers] - List of existing users to check for duplicates.
 * @returns {JSX.Element} The rendered registration form.
 */
const RegistrationForm = ({ onUserAdd, existingUsers = [] }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        city: '',
        postalCode: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Handles input changes.
     * Updates state and clears errors/success messages on user interaction.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Clear success message when user starts typing
        if (successMessage) {
            setSuccessMessage('');
        }
    };

    /**
     * Handles input blur events.
     * Triggers validation for the specific field that lost focus.
     *
     * @param {React.FocusEvent<HTMLInputElement>} e - The focus event.
     */
    const handleBlur = (e) => {
        const { name, value } = e.target;
        let errorMsg = '';
        try {
            if (name === 'firstName') validateIdentity(value);
            if (name === 'lastName') validateIdentity(value);
            if (name === 'email') validateEmail(value, existingUsers);
            if (name === 'postalCode') validatePostalCode(value);
            if (name === 'city') validateCity(value);
            if (name === 'birthDate') calculateAge({ birth: new Date(value) });
        } catch (e) {
            errorMsg = e.message;
        }

        if (errorMsg) {
            setErrors(prev => ({ ...prev, [name]: errorMsg }));
        }
    };

    /**
     * Checks if the entire form is valid.
     * Used to toggle the disabled state of the submit button.
     *
     * @returns {boolean} True if the form is valid, false otherwise.
     */
    const isFormValid = () => {
        const { isValid } = validateForm(formData);
        return isValid;
    };

    /**
     * Validates all form fields against the validator rules.
     *
     * @param {Object} data - The form data to validate.
     * @param {string} data.firstName - First name.
     * @returns {{isValid: boolean, errors: Object}} The validation result object.
     */
    const validateForm = (data) => {
        const errors = {};

        try {
            validateIdentity(data.firstName);
        } catch (e) {
            errors.firstName = e.message;
        }

        try {
            validateIdentity(data.lastName);
        } catch (e) {
            errors.lastName = e.message;
        }

        try {
            validateEmail(data.email, existingUsers);
        } catch (e) {
            errors.email = e.message;
        }

        try {
            validatePostalCode(data.postalCode);
        } catch (e) {
            errors.postalCode = e.message;
        }

        try {
            calculateAge({ birth: new Date(data.birthDate) });
        } catch (e) {
            errors.birthDate = e.message;
        }

        try {
            validateCity(data.city);
        } catch (e) {
            errors.city = e.message;
        }

        return { isValid: Object.keys(errors).length === 0, errors };
    };

    /**
     * Handles form submission.
     * Validates all fields, triggers the parent callback if valid,
     * and resets the form state.
     *
     * @param {React.SyntheticEvent<HTMLFormElement>} e - The submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validateForm(formData);

        if (validation.isValid) {
            setIsSubmitting(true);
            try {
                // call onUserAdd to update App's state and API
                if (onUserAdd) {
                    await onUserAdd(formData);
                }
                setSuccessMessage('Registration successful!');
                setErrors({});
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    birthDate: '',
                    city: '',
                    postalCode: ''
                });
            } catch (e) {
                setErrors({ submit: e.message });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(validation.errors);
            setSuccessMessage('');
        }
    };

    return (
        <div className="registration-form-container">
            <h1>Registration Form</h1>

            {/* Boutons de test pour les Toasts */}
            {/* <div style={{ position: 'fixed', top: 10, left: 10, zIndex: 10000, display: 'flex', gap: '5px' }}>
                <button type="button" onClick={() => setIsSubmitting(prev => !prev)}>Toggle Loading</button>
                <button type="button" onClick={() => setErrors(prev => ({ ...prev, submit: "Erreur critique simulée !" }))}>Trigger Error</button>
                <button type="button" onClick={() => setSuccessMessage("Opération réussie !")}>Trigger Success</button>
                <button type="button" onClick={() => { setErrors({}); setSuccessMessage(''); setIsSubmitting(false); }}>Clear All</button>
            </div> */}

            <div className="toast-container">
                <Toast
                    message={successMessage}
                    type="success"
                    onClose={() => setSuccessMessage('')}
                    data-testid="success-message"
                />
                <Toast
                    message={errors.submit}
                    type="error"
                    onClose={() => setErrors(prev => ({ ...prev, submit: null }))}
                    data-testid="submit-error"
                />
                <Toast
                    message={isSubmitting ? "Registration in progress..." : null}
                    type="loading"
                    data-testid="loading-toast"
                />
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.firstName ? 'error' : ''}
                        data-testid="firstName-input"
                    />
                    {errors.firstName && (
                        <span className="error-message" data-testid="firstName-error">
                            {errors.firstName}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.lastName ? 'error' : ''}
                        data-testid="lastName-input"
                    />
                    {errors.lastName && (
                        <span className="error-message" data-testid="lastName-error">
                            {errors.lastName}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email ? 'error' : ''}
                        data-testid="email-input"
                    />
                    {errors.email && (
                        <span className="error-message" data-testid="email-error">
                            {errors.email}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="birthDate">Birth Date *</label>
                    <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.birthDate ? 'error' : ''}
                        data-testid="birthDate-input"
                        min="1900-01-01"
                    />
                    {errors.birthDate && (
                        <span className="error-message" data-testid="birthDate-error">
                            {errors.birthDate}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.city ? 'error' : ''}
                        data-testid="city-input"
                    />
                    {errors.city && (
                        <span className="error-message" data-testid="city-error">
                            {errors.city}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code *</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.postalCode ? 'error' : ''}
                        data-testid="postalCode-input"
                        maxLength="5"
                    />
                    {errors.postalCode && (
                        <span className="error-message" data-testid="postalCode-error">
                            {errors.postalCode}
                        </span>
                    )}
                </div>

                <button type="submit" className="submit-button" data-testid="submit-button" disabled={!isFormValid() || isSubmitting}>
                    Register
                </button>
            </form>
            <Link to="/" className="submit-button" data-testid="back-button">
                Back to Home
            </Link>
        </div>
    );
};

export default RegistrationForm;
