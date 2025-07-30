import { useCallback } from "react";

/**
 * Custom hook for drag and drop functionality
 * Handles all drag and drop operations for the flow builder
 */
export const useDragAndDrop = (reactFlowInstance, nodes, setNodes) => {
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Create new node with unique ID
      const newNode = {
        id: `node_${Date.now()}`,
        type,
        position,
        data: { text: `test message ${nodes.length + 1}` },
      };

      setNodes((nodes) => [...nodes, newNode]);
    },
    [reactFlowInstance, nodes, setNodes]
  );

  const onDragStart = useCallback((event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }, []);

  return { onDragOver, onDrop, onDragStart };
};
