/**
 * @file Toast.test.js
 * @description Unit tests for the Toast component.
 * Verifies rendering, styling classes, and auto-close behavior.
 */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Toast from '../components/Toast';

describe('Toast Component Unit Tests', () => {

    test('renders nothing when message is empty', () => {
        const { container } = render(<Toast message="" />);
        expect(container).toBeEmptyDOMElement();
    });

    test('renders error message with correct styling', () => {
        const { container } = render(<Toast message="Error occurred" type="error" />);

        expect(screen.getByText('Error occurred')).toBeInTheDocument();
        // Verify the specific CSS class for error is applied
        expect(container.querySelector('.toast-error')).toBeInTheDocument();
    });

    test('renders loading message with correct styling', () => {
        const { container } = render(<Toast message="Loading..." type="loading" />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
        expect(container.querySelector('.toast-loading')).toBeInTheDocument();
    });

    test('calls onClose when close button is clicked', () => {
        const handleClose = jest.fn();
        render(<Toast message="Close me" onClose={handleClose} />);

        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);

        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    test('does not render close button for loading type', () => {
        render(<Toast message="Loading..." type="loading" onClose={jest.fn()} />);
        // Loading toasts should not be dismissible by the user
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    test('auto-closes after duration', () => {
        jest.useFakeTimers();
        const handleClose = jest.fn();
        const duration = 3000;

        render(<Toast message="Auto close" onClose={handleClose} duration={duration} />);

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(duration);
        });

        expect(handleClose).toHaveBeenCalledTimes(1);
        jest.useRealTimers();
    });
});