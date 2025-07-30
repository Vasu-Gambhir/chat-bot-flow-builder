Chatbot Flow Builder
A React-based visual flow builder for creating chatbot conversation flows using drag-and-drop functionality.

🚀 Live Demo
Live Demo Link - Replace with actual deployment URL

📋 Features

Visual Flow Builder: Drag and drop interface for building chatbot flows
Text Nodes: Support for text message nodes with editable content
Connection Management: Connect nodes with smooth animated edges
Validation: Flow validation before saving to ensure proper structure
Settings Panel: Edit node properties through an intuitive interface
Extensible Architecture: Easy to add new node types and features

🛠️ Technology Stack

React 18 - UI Framework
React Flow - Flow visualization library
Tailwind CSS - Styling framework
Lucide React - Icons
JavaScript - Programming language

📁 Project Structure

src/
├── components/
│ ├── Nodes/
│ │ └── TextNode.jsx # Custom text node component
│ ├── UI/
│ │ ├── ErrorMessage.jsx # Error display component
│ │ ├── ActionButton.jsx # Action Button component
│ │ ├── StatusIndicator.jsx # Status Indicator component
│ │ └── SaveButton.jsx # Save button component
│ ├── ChatbotFlowBuilder.jsx # Main component
│ ├── FlowCanvas.jsx # React Flow wrapper
│ ├── RightPanel.jsx # Right panel container
│ ├── NodesPanel.jsx # Draggable nodes panel
│ ├── SettingsPanel.jsx # Node settings panel
│ └── DraggableNodeItem.jsx # Individual draggable node
├── hooks/
│ ├── useFlowValidation.js # Flow validation logic
│ ├── useFlowPersistence.js # Node persisting on reload logic
│ └── useDragAndDrop.js # Drag & drop functionality
├── config/
│ └── nodeTypes.js # Node types configuration
├── App.js # App entry point
├── index.js # React DOM entry point
└── index.css # Global styles

🏗️ Installation & Setup

Clone the repository
bash - git clone https://github.com/yourusername/chatbot-flow-builder.git
cd chatbot-flow-builder

Install dependencies
bash - npm install

Start development server
bash - npm start

Build for production
bash - npm run build

📖 Usage

Adding Nodes -
Drag the "Message" node from the right panel
Drop it onto the canvas to create a new text node
Multiple nodes can be added to build complex flows

Connecting Nodes -
Click and drag from the source handle (right side) of a node
Connect to the target handle (left side) of another node
Each source handle can only have one outgoing connection
Target handles can accept multiple incoming connections

Editing Node Content -
Click on any node to select it
The right panel will switch to settings mode
Edit the text content in the textarea
Use the back arrow to return to the nodes panel

Saving Flows -
Click the "Save Changes" button in the top-right corner
The system validates the flow before saving
Error messages appear if validation fails (e.g., multiple unconnected start nodes)

🎯 Validation Rules -

The flow builder enforces these validation rules:
Single Entry Point: Only one node can be without incoming connections (start node)
Connected Flow: All nodes should be part of a connected flow structure
Valid Connections: Source handles can only have one outgoing edge

🔧 Extending the Application

Adding New Node Types -
Create the Node Component
javascript// components/Nodes/YourNewNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';

const YourNewNode = ({ data, selected }) => {
return (

<div className="your-node-styles">
{/_ Your node content _/}
<Handle type="target" position={Position.Left} />
<Handle type="source" position={Position.Right} />
</div>
);
};

export default YourNewNode;

Register the Node Type -
javascript// config/nodeTypes.js
import YourNewNode from '../components/Nodes/YourNewNode';

export const nodeTypes = {
textNode: TextNode,
yourNewNode: YourNewNode, // Add your new node
};

Add to Nodes Panel -
javascript// components/NodesPanel.js
<DraggableNodeItem
  nodeType="yourNewNode"
  icon={YourIcon}
  label="Your Node"
  onDragStart={onDragStart}
/>

Customizing Validation -
Modify the useFlowValidation hook to add custom validation rules:
javascript// hooks/useFlowValidation.js
const validateFlow = useCallback(() => {
// Add your custom validation logic here
// Return { isValid: boolean, error: string }
}, [nodes, edges]);

🐛 Common Issues & Solutions

Issue: Nodes not appearing after drag & drop
Solution: Ensure reactFlowInstance is properly initialized before dropping
Issue: Connections not working
Solution: Verify handle positions and types are correctly set
Issue: Styling issues
Solution: Make sure Tailwind CSS is properly configured and React Flow styles are imported

🤝 Contributing

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
