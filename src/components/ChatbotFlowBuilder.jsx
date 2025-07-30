import React, { useState, useCallback, useRef } from "react";
import {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import FlowCanvas from "./FlowCanvas";
import RightPanel from "./RightPanel";
import ErrorMessage from "./UI/ErrorMessage";
import ActionButtons from "./UI/ActionButtons";
import StatusIndicator from "./UI/StatusIndicator";
import { useFlowValidation } from "../hooks/useFlowValidation";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useFlowPersistence } from "../hooks/useFlowPersistence";
import { nodeTypes } from "../config/nodeTypes";

/**
 * Main Chatbot Flow Builder Component
 * Orchestrates all components and manages global state
 */
const ChatbotFlowBuilder = () => {
  // React Flow state management
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // UI state management
  const [selectedNode, setSelectedNode] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  // Refs for drag and drop functionality
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Custom hooks
  const { validateFlow } = useFlowValidation(nodes, edges);
  const { onDragOver, onDrop, onDragStart } = useDragAndDrop(
    reactFlowInstance,
    nodes,
    setNodes
  );
  const { saveFlow, clearFlow, isAutoSaving, lastSaved } = useFlowPersistence(
    nodes,
    edges,
    setNodes,
    setEdges
  );

  // Handle connection between nodes with validation
  const onConnect = useCallback(
    (params) => {
      // Check if source handle already has an edge (only one edge per source)
      const existingEdge = edges.find(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle
      );

      if (existingEdge) {
        // Remove existing edge before adding new one
        setEdges((eds) => eds.filter((edge) => edge.id !== existingEdge.id));
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  // Handle clicking on empty canvas
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Update selected node's text content
  const updateNodeText = useCallback(
    (text) => {
      if (!selectedNode) return;

      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, text } }
            : node
        )
      );

      // Update selectedNode state to reflect changes
      setSelectedNode((prev) => ({ ...prev, data: { ...prev.data, text } }));
    },
    [selectedNode, setNodes]
  );

  // Handle going back from settings panel
  const handleBackToNodesPanel = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Helper function to show messages
  const showMessageWithType = useCallback(
    (msg, type = "error", duration = 3000) => {
      setMessage(msg);
      setMessageType(type);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), duration);
    },
    []
  );

  // Clear flow handler
  const handleClear = useCallback(() => {
    if (nodes.length === 0 && edges.length === 0) {
      showMessageWithType("No flow to clear", "error", 2000);
      return;
    }

    if (
      window.confirm(
        "Are you sure you want to clear the entire flow? This action cannot be undone."
      )
    ) {
      const { success, error } = clearFlow();
      if (success) {
        setSelectedNode(null); // Clear selection
        showMessageWithType("Flow cleared successfully!", "success", 2000);
      } else {
        showMessageWithType(`Failed to clear: ${error}`, "error");
      }
    }
  }, [clearFlow, nodes.length, edges.length, showMessageWithType]);

  // Save flow handler
  const handleSave = useCallback(() => {
    setShowMessage(false);

    const { isValid, error } = validateFlow();
    if (!isValid) {
      showMessageWithType(error, "error");
      return;
    }

    // Save flow to localStorage
    const { success, error: saveError } = saveFlow();
    if (success) {
      console.log("Flow saved successfully!", { nodes, edges });
      showMessageWithType("Flow saved successfully!", "success", 2000);
    } else {
      showMessageWithType(`Failed to save: ${saveError}`, "error");
    }
  }, [validateFlow, saveFlow, nodes, edges, showMessageWithType]);

  return (
    <div className="h-screen w-screen bg-gray-100 flex">
      {/* Message Display */}
      <ErrorMessage show={showMessage} message={message} type={messageType} />

      {/* Main Flow Area */}
      <div className="flex-1 relative">
        <ReactFlowProvider>
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            reactFlowWrapper={reactFlowWrapper}
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
        </ReactFlowProvider>

        {/* Action Buttons */}
        <ActionButtons onSave={handleSave} onClear={handleClear} />

        {/* Status Indicator */}
        <StatusIndicator isAutoSaving={isAutoSaving} lastSaved={lastSaved} />
      </div>

      {/* Right Panel */}
      <RightPanel
        selectedNode={selectedNode}
        onBack={handleBackToNodesPanel}
        onTextChange={updateNodeText}
        onDragStart={onDragStart}
      />
    </div>
  );
};

export default ChatbotFlowBuilder;
