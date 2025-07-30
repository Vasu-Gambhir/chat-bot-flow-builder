import React from "react";
import { ArrowLeft } from "lucide-react";

/**
 * Settings Panel Component
 * Provides interface to edit selected node properties
 */
const SettingsPanel = ({ selectedNode, onBack, onTextChange }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Settings Header */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded">
          <ArrowLeft size={20} />
        </button>
        <span className="font-medium">Message</span>
      </div>

      {/* Settings Content */}
      <div className="p-4 flex-1">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text
          </label>
          <textarea
            value={selectedNode?.data?.text || ""}
            onChange={(e) => onTextChange(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your message..."
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
