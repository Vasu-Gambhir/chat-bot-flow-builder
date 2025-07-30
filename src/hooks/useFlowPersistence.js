import { useEffect, useCallback, useState } from "react";

/**
 * Custom hook for flow persistence
 * Handles saving and loading flow data to/from localStorage
 */
export const useFlowPersistence = (nodes, edges, setNodes, setEdges) => {
  const STORAGE_KEY = "chatbot-flow-builder";
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Format last saved time
  const formatLastSaved = (timestamp) => {
    const now = new Date();
    const saved = new Date(timestamp);
    const diffMs = now - saved;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "just now";
    if (diffMins === 1) return "1 minute ago";
    if (diffMins < 60) return `${diffMins} minutes ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return "1 hour ago";
    if (diffHours < 24) return `${diffHours} hours ago`;

    return saved.toLocaleDateString();
  };

  // Load flow from localStorage on mount
  useEffect(() => {
    try {
      const savedFlow = localStorage.getItem(STORAGE_KEY);
      if (savedFlow) {
        const {
          nodes: savedNodes,
          edges: savedEdges,
          timestamp,
        } = JSON.parse(savedFlow);
        if (savedNodes && Array.isArray(savedNodes)) {
          setNodes(savedNodes);
        }
        if (savedEdges && Array.isArray(savedEdges)) {
          setEdges(savedEdges);
        }
        if (timestamp) {
          setLastSaved(formatLastSaved(timestamp));
        }
      }
    } catch (error) {
      console.warn("Failed to load saved flow:", error);
      // Clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [setNodes, setEdges]);

  // Update last saved display every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const savedFlow = localStorage.getItem(STORAGE_KEY);
      if (savedFlow) {
        try {
          const { timestamp } = JSON.parse(savedFlow);
          if (timestamp) {
            setLastSaved(formatLastSaved(timestamp));
          }
        } catch (error) {
          console.warn("Failed to update last saved time:", error);
        }
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Save flow to localStorage
  const saveFlow = useCallback(() => {
    try {
      const timestamp = new Date().toISOString();
      const flowData = {
        nodes,
        edges,
        timestamp,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flowData));
      setLastSaved(formatLastSaved(timestamp));
      return { success: true, error: null };
    } catch (error) {
      console.error("Failed to save flow:", error);
      return { success: false, error: error.message };
    }
  }, [nodes, edges]);

  // Auto-save flow when nodes or edges change (debounced)
  useEffect(() => {
    // Only auto-save if there are nodes or edges
    if (nodes.length > 0 || edges.length > 0) {
      setIsAutoSaving(true);
      const timeoutId = setTimeout(() => {
        saveFlow();
        setIsAutoSaving(false);
      }, 1000); // Debounce for 1 second

      return () => {
        clearTimeout(timeoutId);
        setIsAutoSaving(false);
      };
    }
  }, [nodes, edges, saveFlow]);

  // Clear saved flow
  const clearFlow = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setNodes([]);
      setEdges([]);
      setLastSaved(null);
      return { success: true, error: null };
    } catch (error) {
      console.error("Failed to clear flow:", error);
      return { success: false, error: error.message };
    }
  }, [setNodes, setEdges]);

  return { saveFlow, clearFlow, isAutoSaving, lastSaved };
};
