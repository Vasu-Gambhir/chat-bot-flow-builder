import React from "react";

/**
 * Error Message Component
 * Displays validation errors with auto-dismiss functionality
 */
const ErrorMessage = ({ show, message }) => {
  if (!show) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
};

export default ErrorMessage;
