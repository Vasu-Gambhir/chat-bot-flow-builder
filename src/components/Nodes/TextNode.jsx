import React from "react";
import { Handle, Position } from "reactflow";
import { MessageSquare } from "lucide-react";

/**
 * Custom Text Node Component
 * Represents a text message node in the chatbot flow
 */
const TextNode = ({ data, selected }) => {
  return (
    <div
      className={`bg-white border-2 rounded-lg shadow-md min-w-[200px] ${
        selected ? "border-blue-500" : "border-gray-200"
      }`}
    >
      {/* Node Header */}
      <div className="bg-teal-200 px-3 py-2 rounded-t-lg flex items-center gap-2">
        <MessageSquare size={16} className="text-teal-700" />
        <span className="text-teal-700 font-medium text-sm">Send Message</span>
        <div className="w-2 h-2 bg-green-500 rounded-full ml-auto"></div>
      </div>

      {/* Node Content */}
      <div className="p-3 bg-gray-50 rounded-b-lg">
        <div className="text-gray-700 text-sm">
          {data.text || "Enter your message..."}
        </div>
      </div>

      {/* Target Handle (Input) */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />

      {/* Source Handle (Output) */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
    </div>
  );
};

export default TextNode;
