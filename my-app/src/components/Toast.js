/**
 * @file Toast.js
 * @description Reusable Toast component for notifications (Error, Success, Loading).
 */
import React, { useEffect } from 'react';
import '../styles/Toast.css';

/**
 * Toast Component.
 *
 * @param {Object} props
 * @param {string} props.message - The message to display. If null/empty, toast is hidden.
 * @param {'error'|'success'|'loading'} [props.type='info'] - The type of toast.
 * @param {Function} [props.onClose] - Function to call when closing the toast.
 * @param {number} [props.duration=5000] - Duration in ms before auto-close (ignored if type is loading).
 */
const Toast = ({ message, type = 'info', onClose, duration = 5000, ...props }) => {

    useEffect(() => {
        // Auto-close logic: Only if duration is set, onClose is provided, and it's not a loading state
        if (message && duration && onClose && type !== 'loading') {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose, type]);

    if (!message) return null;

    return (
        <div className={`toast toast-${type}`} {...props}>
            <span>{message}</span>
            {onClose && type !== 'loading' && (
                <button className="toast-close" onClick={onClose}>&times;</button>
            )}
        </div>
    );
};

export default Toast;