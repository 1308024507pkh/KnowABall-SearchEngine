import React from "react";
import Graph from "react-graph-vis";

const graph = {
    nodes: [
        { id: 1, label: "DOH", group: "keyword", color: "red" },
        { id: 2, label: "health agency", group: "attribute" },
        { id: 3, label: "PH", group: "keyword" },
        { id: 4, label: "imposed", group: "relationship" },
        { id: 5, label: "ECQ", group: "keyword" },
        { id: 6, label: "coverage", group: "attribute" },
        { id: 7, label: "duration", group: "attribute" },
        { id: 8, label: "agency", group: "attribute" },
        { id: 9, label: "luzon", group: "term" },
        { id: 10, label: "1 month", group: "term" },
        { id: 11, label: "IATF", group: "term" },
        { id: 12, label: "affected", group: "relationship" },
        { id: 13, label: "covid", group: "keyword" },
        { id: 14, label: "subclass", group: "relationship" },
        { id: 15, label: "Corona virus", group: "keyword" }
    ],
    edges: [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 12 },
        { from: 12, to: 13 },
        { from: 13, to: 14 },
        { from: 14, to: 15 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
        { from: 5, to: 6 },
        { from: 5, to: 7 },
        { from: 5, to: 8 },
        { from: 6, to: 9 },
        { from: 7, to: 10 },
        { from: 8, to: 11 }
    ]
};

const options = {
    groups: {
        keyword: {
            color: { background: "#ffa3a3", border: "#ffa3a3" },
            shape: "circle",
            scaling: { min: 20 }
        },
        relationship: {
            color: { background: "#a9d2a9", border: "#a9d2a9" },
            shape: "box"
        },
        attribute: {
            color: { background: "lightblue", border: "lightblue" },
            shape: "box"
        },
        term: {
            color: { background: "#f1d78b", border: "#f1d78b" },
            shapeProperties: { borderDashes: true },
            shape: "box"
        }
    },
    layout: {
        hierarchical: false
    },
    edges: {
        color: "#000000"
    }
};

const events = {
    select: function(event) {
        var { nodes, edges } = event;
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
    }
};

export default function knowledgeGraph() {
    return (
        <div>
            <Graph
                graph={graph}
                options={options}
                events={events}
                style={{ height: "640px", fontFamily: 'sans-serif', textAlign: 'center' }}
            />
        </div>
    );
}