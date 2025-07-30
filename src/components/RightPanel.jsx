import React from "react";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";

/**
 * Right Panel Container Component
 * Switches between Nodes Panel and Settings Panel based on selection
 */
const RightPanel = ({ selectedNode, onBack, onTextChange, onDragStart }) => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          onBack={onBack}
          onTextChange={onTextChange}
        />
      ) : (
        <NodesPanel onDragStart={onDragStart} />
      )}
    </div>
  );
};

export default RightPanel;
