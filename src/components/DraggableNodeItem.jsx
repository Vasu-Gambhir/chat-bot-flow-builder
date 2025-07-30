import React from "react";

/**
 * Draggable Node Item Component
 * Individual draggable node item for the nodes panel
 */
const DraggableNodeItem = ({ nodeType, icon: Icon, label, onDragStart }) => {
  return (
    <div
      className="border-2 border-dashed border-blue-300 rounded-lg p-4 cursor-move hover:border-blue-500 hover:bg-blue-50 transition-colors"
      draggable
      onDragStart={(event) => onDragStart(event, nodeType)}
    >
      <div className="flex flex-col items-center gap-2">
        <Icon size={24} className="text-blue-600" />
        <span className="text-sm font-medium text-blue-600">{label}</span>
      </div>
    </div>
  );
};

export default DraggableNodeItem;
