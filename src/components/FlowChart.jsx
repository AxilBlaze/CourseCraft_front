import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre'; // For auto-layout

const getLayoutedElements = (nodes, edges) => {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: 'TB' }); // Top to Bottom layout
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach(node => g.setNode(node.id, { width: 150, height: 50 }));
  edges.forEach(edge => g.setEdge(edge.source, edge.target));

  dagre.layout(g);

  return {
    nodes: nodes.map(node => {
      const pos = g.node(node.id);
      return { ...node, position: { x: pos.x, y: pos.y } };
    }),
    edges
  };
};

const FlowChart = ({ skills }) => {
  const [elements, setElements] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    if (!skills || skills.length === 0) return;

    const nodes = skills.map(skill => ({
      id: skill,
      data: { label: skill },
      position: { x: 0, y: 0 }, // Dagre will adjust this
      type: 'default',
    }));

    const edges = skills
      .slice(1)
      .map((skill, index) => ({ id: `e${index}`, source: skills[index - 1], target: skill }));

    setElements(getLayoutedElements(nodes, edges));
  }, [skills]);

  return (
    <div style={{ width: '100%', height: '500px' }} className="p-4 bg-white shadow-lg rounded-lg">
      {elements.nodes.length === 0 ? (
        <p className="text-gray-400">No skills selected</p>
      ) : (
        <ReactFlow nodes={elements.nodes} edges={elements.edges}>
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      )}
    </div>
  );
};

export default FlowChart;
