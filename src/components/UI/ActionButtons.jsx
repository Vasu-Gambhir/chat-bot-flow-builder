import React from "react";
import { Save, RotateCcw } from "lucide-react";

/**
 * Action Buttons Component
 * Contains save and clear buttons for the flow builder
 */
const ActionButtons = ({ onSave, onClear }) => {
  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <button
        onClick={onClear}
        className="bg-white border border-gray-300 hover:border-red-500 hover:text-red-600 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors"
        title="Clear Flow"
      >
        <RotateCcw size={16} />
        Clear
      </button>

      <button
        onClick={onSave}
        className="bg-white border border-gray-300 hover:border-blue-500 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors"
      >
        <Save size={16} />
        Save Changes
      </button>
    </div>
  );
};

export default ActionButtons;
