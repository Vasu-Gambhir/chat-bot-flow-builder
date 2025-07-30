import React from "react";
import ReactFlow, { Controls, Background } from "reactflow";

/**
 * Flow Canvas Component
 * Wraps ReactFlow with all necessary props and configuration
 */
const FlowCanvas = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onPaneClick,
  onInit,
  nodeTypes,
  reactFlowWrapper,
  onDrop,
  onDragOver,
}) => {
  return (
    <div
      className="h-full w-full"
      ref={reactFlowWrapper}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onInit={onInit}
        nodeTypes={nodeTypes}
        connectionLineType="smoothstep"
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
        }}
      >
        <Controls />
        <Background variant="dots" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
