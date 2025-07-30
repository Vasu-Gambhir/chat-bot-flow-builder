import TextNode from "../components/Nodes/TextNode";

/**
 * Node types configuration
 * Extensible configuration for different node types
 * To add new node types:
 * 1. Create the node component in components/Nodes/
 * 2. Import it here
 * 3. Add it to the nodeTypes object
 * 4. Add corresponding draggable item in NodesPanel
 */

export const nodeTypes = {
  textNode: TextNode,
  // Future node types can be added here
  // conditionalNode: ConditionalNode,
  // apiNode: ApiNode,
  // etc.
};
