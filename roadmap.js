import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import htm from "htm";
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
} from "@xyflow/react";

import { roadmapNodes as roadmap } from "./roadmap-data.js";

const html = htm.bind(React.createElement);
const STORAGE_KEY = "jesus-guide-roadmap-progress-v3";

const nodeIndex = Object.fromEntries(roadmap.map((item) => [item.id, item]));
const roadmapIds = new Set(roadmap.map((item) => item.id));
const initialSelected = roadmap[0].id;

function getDescendants(nodeId) {
  const descendants = new Set();
  const queue = [nodeId];

  while (queue.length) {
    const current = queue.shift();
    roadmap.forEach((item) => {
      if (item.prerequisites.includes(current) && !descendants.has(item.id)) {
        descendants.add(item.id);
        queue.push(item.id);
      }
    });
  }

  return descendants;
}

function normalizeCompleted(list) {
  const source = new Set((Array.isArray(list) ? list : []).filter((id) => roadmapIds.has(id)));
  const normalized = new Set();
  let changed = true;

  while (changed) {
    changed = false;
    roadmap.forEach((item) => {
      if (source.has(item.id) && item.prerequisites.every((id) => normalized.has(id))) {
        if (!normalized.has(item.id)) {
          normalized.add(item.id);
          changed = true;
        }
      }
    });
  }

  return roadmap.map((item) => item.id).filter((id) => normalized.has(id));
}

function loadCompleted() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeCompleted(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

function saveCompleted(completed) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  } catch {
    return;
  }
}

function isUnlocked(node, completedSet) {
  return node.prerequisites.every((id) => completedSet.has(id));
}

function nodeState(node, completedSet) {
  if (completedSet.has(node.id)) return "complete";
  if (isUnlocked(node, completedSet)) return "unlocked";
  return "locked";
}

function getUnlockedChildren(nodeId) {
  return roadmap.filter((item) => item.prerequisites.includes(nodeId)).map((item) => item.title);
}

function RoadmapNode({ data }) {
  const { title, short, track, state, selected } = data;

  return html`
    <div className=${`rf-node rf-node-${state} ${selected ? "rf-node-selected" : ""}`}>
      ${React.createElement(Handle, {
        type: "target",
        position: Position.Left,
        className: "rf-handle",
      })}
      <div className="rf-node-top">
        <span className="rf-node-track">${track}</span>
        <span className=${`rf-node-state rf-node-state-${state}`}>${state}</span>
      </div>
      <h3>${title}</h3>
      <p>${short}</p>
      ${React.createElement(Handle, {
        type: "source",
        position: Position.Right,
        className: "rf-handle",
      })}
    </div>
  `;
}

function RoadmapApp() {
  const [completed, setCompleted] = useState(loadCompleted);
  const [selectedId, setSelectedId] = useState(initialSelected);

  useEffect(() => {
    saveCompleted(completed);
  }, [completed]);

  const completedSet = useMemo(() => new Set(completed), [completed]);
  const selected = nodeIndex[selectedId] || roadmap[0];

  const nodes = useMemo(
    () =>
      roadmap.map((item) => {
        const state = nodeState(item, completedSet);
        return {
          id: item.id,
          type: "roadmap",
          position: item.position,
          draggable: false,
          selectable: true,
          connectable: false,
          data: {
            title: item.title,
            short: item.short,
            track: item.track,
            state,
            selected: selectedId === item.id,
          },
        };
      }),
    [completedSet, selectedId],
  );

  const edges = useMemo(
    () =>
      roadmap.flatMap((item) =>
        item.prerequisites.map((sourceId) => {
          const sourceComplete = completedSet.has(sourceId);
          const targetUnlocked = isUnlocked(item, completedSet);
          const active = sourceComplete || targetUnlocked;

          return {
            id: `${sourceId}-${item.id}`,
            source: sourceId,
            target: item.id,
            type: "smoothstep",
            animated: targetUnlocked && !completedSet.has(item.id),
            markerEnd: { type: MarkerType.ArrowClosed },
            style: {
              stroke: active ? "#6e754b" : "rgba(31, 33, 23, 0.16)",
              strokeWidth: active ? 2.4 : 1.3,
            },
          };
        }),
      ),
    [completedSet],
  );

  const total = roadmap.length;
  const unlockedCount = roadmap.filter((item) => nodeState(item, completedSet) !== "locked").length;
  const selectedUnlocked = isUnlocked(selected, completedSet);
  const selectedComplete = completedSet.has(selected.id);
  const selectedChildren = getUnlockedChildren(selected.id);
  const flow = React.createElement(
    ReactFlow,
    {
      nodes,
      edges,
      nodeTypes: { roadmap: RoadmapNode },
      fitView: true,
      style: { width: "100%", height: "100%" },
      minZoom: 0.45,
      maxZoom: 1.2,
      nodesConnectable: false,
      nodesDraggable: false,
      elementsSelectable: true,
      proOptions: { hideAttribution: true },
      onNodeClick: (_, node) => setSelectedId(node.id),
    },
    React.createElement(Background, {
      gap: 20,
      size: 1.2,
      color: "rgba(31, 33, 23, 0.08)",
    }),
    React.createElement(MiniMap, {
      pannable: true,
      zoomable: true,
      nodeStrokeWidth: 3,
      nodeColor: (node) => {
        const state = node.data.state;
        if (state === "complete") return "#5a8a5e";
        if (state === "unlocked") return "#6e754b";
        return "#a7ae8b";
      },
    }),
    React.createElement(Controls),
  );

  function toggleComplete() {
    if (!selectedUnlocked) return;

    setCompleted((current) => {
      const set = new Set(current);
      if (set.has(selected.id)) {
        const descendants = getDescendants(selected.id);
        set.delete(selected.id);
        descendants.forEach((id) => set.delete(id));
      } else {
        set.add(selected.id);
      }
      return normalizeCompleted(roadmap.map((item) => item.id).filter((id) => set.has(id)));
    });
  }

  function resetProgress() {
    setCompleted([]);
    setSelectedId(initialSelected);
  }

  return html`
    <div className="roadmap-react-shell">
      <div className="roadmap-react-meta">
        <article className="roadmap-stat-card">
          <span>Completed</span>
          <strong>${completed.length}/${total}</strong>
        </article>
        <article className="roadmap-stat-card">
          <span>Unlocked</span>
          <strong>${unlockedCount}/${total}</strong>
        </article>
        <article className="roadmap-stat-card">
          <span>Current Node</span>
          <strong>${selected.title}</strong>
        </article>
      </div>

      <div className="roadmap-react-layout">
        <div className="roadmap-flow-frame">${flow}</div>

        <aside className="roadmap-detail-panel">
          <div className="roadmap-detail-head">
            <p className="eyebrow">${selected.track}</p>
            <h3>${selected.title}</h3>
            <p>${selected.why}</p>
          </div>

          <div className="roadmap-detail-grid">
            <div className="roadmap-detail-card">
              <span>Status</span>
              <strong>${selectedComplete ? "Complete" : selectedUnlocked ? "Unlocked" : "Locked"}</strong>
            </div>
            <div className="roadmap-detail-card">
              <span>Cadence</span>
              <strong>${selected.cadence}</strong>
            </div>
            <div className="roadmap-detail-card">
              <span>Duration</span>
              <strong>${selected.duration}</strong>
            </div>
          </div>

          <div className="roadmap-detail-block">
            <h4>Why it ties here</h4>
            <p>${selected.unlocksText}</p>
          </div>

          <div className="roadmap-detail-block">
            <h4>Prerequisites</h4>
            <div className="roadmap-chip-row">
              ${(selected.prerequisites.length ? selected.prerequisites : ["None"]).map((id) => {
                const label = nodeIndex[id] ? nodeIndex[id].title : id;
                return html`<span className="pill">${label}</span>`;
              })}
            </div>
          </div>

          <div className="roadmap-detail-block">
            <h4>What this unlocks</h4>
            <div className="roadmap-chip-row">
              ${(selectedChildren.length ? selectedChildren : ["No further nodes"]).map(
                (label) => html`<span className="pill">${label}</span>`,
              )}
            </div>
          </div>

          <div className="roadmap-detail-block">
            <h4>Suggested reps</h4>
            <ul className="bullets">
              ${selected.resources.map((item) => html`<li>${item}</li>`)}
            </ul>
          </div>

          <div className="roadmap-detail-actions">
            <button className="button button-primary" disabled=${!selectedUnlocked} onClick=${toggleComplete}>
              ${selectedComplete ? "Mark incomplete" : "Mark complete"}
            </button>
            <button className="button button-secondary" onClick=${resetProgress}>Reset progress</button>
          </div>
        </aside>
      </div>
    </div>
  `;
}

const root = document.getElementById("roadmap-app");
if (root) {
  createRoot(root).render(html`<${RoadmapApp} />`);
}
