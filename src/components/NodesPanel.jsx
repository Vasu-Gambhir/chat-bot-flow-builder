import React from "react";
import { MessageSquare } from "lucide-react";
import DraggableNodeItem from "./DraggableNodeItem";

/**
 * Nodes Panel Component
 * Houses all available node types for drag and drop
 */
const NodesPanel = ({ onDragStart }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Nodes Panel Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-800">Nodes Panel</h3>
      </div>

      {/* Available Nodes */}
      <div className="p-4">
        <DraggableNodeItem
          nodeType="textNode"
          icon={MessageSquare}
          label="Message"
          onDragStart={onDragStart}
        />

        <div className="mt-2 text-xs text-gray-500 text-center">
          Drag to add nodes to canvas
        </div>
      </div>

      {/* Future node types placeholder */}
      <div className="flex-1 p-4">
        <div className="text-xs text-gray-400 text-center">
          More node types coming soon...
        </div>
      </div>
    </div>
  );
};

export default NodesPanel;
