import React from "react";
import { Save } from "lucide-react";

/**
 * Save Button Component
 * Reusable save button with consistent styling
 */
const SaveButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 bg-white border border-gray-300 hover:border-blue-500 px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-colors"
    >
      <Save size={16} />
      Save Changes
    </button>
  );
};

export default SaveButton;
