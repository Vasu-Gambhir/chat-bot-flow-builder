import React from "react";
import { CheckCircle, Clock } from "lucide-react";

/**
 * Status Indicator Component
 * Shows the current save status of the flow
 */
const StatusIndicator = ({ isAutoSaving, lastSaved }) => {
  if (isAutoSaving) {
    return (
      <div className="absolute bottom-4 right-4 bg-white border border-gray-300 px-3 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm text-gray-600">
        <Clock size={16} className="animate-spin" />
        Auto-saving...
      </div>
    );
  }

  if (lastSaved) {
    return (
      <div className="absolute bottom-4 right-4 bg-white border border-green-300 px-3 py-2 rounded-lg shadow-md flex items-center gap-2 text-sm text-green-600">
        <CheckCircle size={16} />
        Saved {lastSaved}
      </div>
    );
  }

  return null;
};

export default StatusIndicator;
