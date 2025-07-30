import { useCallback } from "react";

/**
 * Custom hook for flow validation
 * Encapsulates all flow validation logic
 */
export const useFlowValidation = (nodes, edges) => {
  const validateFlow = useCallback(() => {
    if (nodes.length <= 1) {
      return { isValid: true, error: "" };
    }

    // Find nodes with empty target handles (no incoming edges)
    const nodesWithIncomingEdges = new Set(edges.map((edge) => edge.target));
    const nodesWithoutIncomingEdges = nodes.filter(
      (node) => !nodesWithIncomingEdges.has(node.id)
    );

    // If more than one node has no incoming edges, it's an error
    if (nodesWithoutIncomingEdges.length > 1) {
      return { isValid: false, error: "Cannot save Flow" };
    }

    return { isValid: true, error: "" };
  }, [nodes, edges]);

  return { validateFlow };
};
