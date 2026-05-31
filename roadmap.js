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

const html = htm.bind(React.createElement);
const STORAGE_KEY = "jesus-guide-roadmap-progress-v3";

const roadmap = [
  {
    id: "john",
    title: "Start Here: John",
    short: "Meet Jesus directly",
    tier: "Core path",
    cadence: "Daily",
    duration: "2 to 3 weeks",
    position: { x: 20, y: 200 },
    prerequisites: [],
    why: "John is the best entry point because it foregrounds who Jesus is, why he came, and what belief in him means without asking a beginner to already understand the full biblical storyline.",
    unlocksText: "Unlocks listening, translation comparison, and the rest of the Gospel path.",
    resources: ["Read John", "Listen to John", "Write one observation per chapter"],
  },
  {
    id: "listen-john",
    title: "Listen Through John",
    short: "Hear the Gospel aloud",
    tier: "Core path",
    cadence: "Daily",
    duration: "1 week",
    position: { x: 280, y: 80 },
    prerequisites: ["john"],
    why: "Listening helps the story cohere at the paragraph and scene level. It is especially useful before deep analysis.",
    unlocksText: "Makes Luke and Acts easier to absorb as narrative.",
    resources: ["BibleGateway audio", "Repeat key scenes", "Pray through what stands out"],
  },
  {
    id: "versions",
    title: "Compare Bible Versions",
    short: "See why wording differs",
    tier: "Addendum unlock",
    cadence: "Weekly",
    duration: "1 to 2 weeks",
    position: { x: 280, y: 320 },
    prerequisites: ["john"],
    why: "Translation work becomes meaningful once you already know what the passage is saying. Starting here after John gives differences enough context to matter.",
    unlocksText: "Prepares canon, Greek tools, and harder passages.",
    resources: ["NIV vs ESV", "CSB vs NLT", "Compare John 1 and John 3"],
  },
  {
    id: "canon",
    title: "Why John Is Not First",
    short: "Understand canon and ordering",
    tier: "Addendum unlock",
    cadence: "Weekly",
    duration: "1 week",
    position: { x: 540, y: 320 },
    prerequisites: ["john"],
    why: "This explains why John is first in the learning path but not the first book in the Bible, and how canonical ordering differs from reading order.",
    unlocksText: "Prepares the whole-Bible storyline and the traditions map.",
    resources: ["Law, history, poetry, prophecy", "Gospels, Acts, letters, Revelation", "Canonical vs chronological order"],
  },
  {
    id: "luke-acts",
    title: "Luke and Acts",
    short: "See the full movement",
    tier: "Core path",
    cadence: "Daily and weekly",
    duration: "4 to 6 weeks",
    position: { x: 560, y: 80 },
    prerequisites: ["john", "listen-john"],
    why: "Luke and Acts widen the lens from Jesus' life to the birth of the early church. They move the reader from one person to the movement around him.",
    unlocksText: "Unlocks the full Gospel comparison and Christian origins.",
    resources: ["Read Luke", "Read Acts", "Track people, places, speeches"],
  },
  {
    id: "gospels",
    title: "Matthew and Mark",
    short: "Compare the four portraits",
    tier: "Core path",
    cadence: "Weekly",
    duration: "3 to 5 weeks",
    position: { x: 860, y: 80 },
    prerequisites: ["luke-acts"],
    why: "The four Gospels overlap, but not redundantly. Reading them together clarifies what each writer is emphasizing about Jesus.",
    unlocksText: "Unlocks traditions, the Bible storyline, and long-form Gospel mastery.",
    resources: ["Compare emphasis", "Trace kingdom and discipleship", "Note overlap and difference"],
  },
  {
    id: "traditions",
    title: "Christian Traditions Map",
    short: "Catholic, Orthodox, Protestant",
    tier: "Addendum unlock",
    cadence: "Weekly",
    duration: "1 to 2 weeks",
    position: { x: 1110, y: 260 },
    prerequisites: ["gospels", "canon"],
    why: "Traditions make more sense after the person and story of Jesus are clear. This keeps the comparison grounded instead of tribal.",
    unlocksText: "Prepares specialization and teaching conversations.",
    resources: ["Authority", "Sacraments", "Worship", "Church structure"],
  },
  {
    id: "storyline",
    title: "Bible Storyline",
    short: "Creation to new creation",
    tier: "Core path",
    cadence: "Weekly",
    duration: "6 to 8 weeks",
    position: { x: 1110, y: 80 },
    prerequisites: ["gospels", "canon"],
    why: "Once Jesus and the Gospels are stable, the next major unlock is seeing how the whole Bible points toward and outward from him.",
    unlocksText: "Unlocks Paul's letters, context, and theology.",
    resources: ["Creation", "Covenant", "Exile", "Messiah", "Church", "Restoration"],
  },
  {
    id: "letters",
    title: "Romans and Ephesians",
    short: "Understand core doctrine",
    tier: "Core path",
    cadence: "Weekly",
    duration: "3 to 4 weeks",
    position: { x: 1380, y: 80 },
    prerequisites: ["storyline"],
    why: "Paul's letters make much more sense once the Gospels and the storyline are in place. They show how early Christians interpreted Jesus and salvation.",
    unlocksText: "Unlocks apologetics, formation, and synthesis.",
    resources: ["Grace", "Faith", "Church", "New life"],
  },
  {
    id: "context",
    title: "Historical World",
    short: "Judaism, Rome, geography",
    tier: "Addendum unlock",
    cadence: "Weekly or monthly",
    duration: "6 weeks",
    position: { x: 1380, y: 300 },
    prerequisites: ["storyline"],
    why: "Historical context matters more once you know what the text is trying to say. Then the background becomes illuminating instead of distracting.",
    unlocksText: "Unlocks language tools and historical confidence.",
    resources: ["Second Temple Judaism", "Roman empire", "Cities and roads", "Temple and sects"],
  },
  {
    id: "languages",
    title: "Greek and Latin Tools",
    short: "Use language responsibly",
    tier: "Deep dive",
    cadence: "Monthly",
    duration: "Ongoing",
    position: { x: 1660, y: 300 },
    prerequisites: ["versions", "context"],
    why: "Original-language tools are best used after translation and context categories already make sense. Otherwise they become noise or false confidence.",
    unlocksText: "Sharpens difficult passages and textual nuance.",
    resources: ["Interlinear", "Lexicon", "Compare translation choices"],
  },
  {
    id: "apologetics",
    title: "Apologetics",
    short: "Trustworthiness and objections",
    tier: "Deep dive",
    cadence: "Weekly or monthly",
    duration: "Ongoing",
    position: { x: 1660, y: 80 },
    prerequisites: ["letters", "traditions"],
    why: "Apologetics is stronger once the core message is already clear. Then evidence and objections reinforce the faith instead of replacing it.",
    unlocksText: "Unlocks confident explanation and public-facing study.",
    resources: ["Manuscripts", "Resurrection", "Canon", "Common objections"],
  },
  {
    id: "integrate",
    title: "Teach and Integrate",
    short: "Connect the branches",
    tier: "Mastery",
    cadence: "Yearly",
    duration: "Ongoing",
    position: { x: 1940, y: 190 },
    prerequisites: ["apologetics", "languages"],
    why: "The end state is synthesis. You should be able to explain why the path starts in John, how the branches connect, and what each addendum skill contributes.",
    unlocksText: "This is the mastery state: reading, explaining, and guiding others.",
    resources: ["Teach a study", "Write summaries", "Mentor a beginner", "Re-run the map with depth"],
  },
];

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
  const { title, short, tier, state, selected } = data;

  return html`
    <div className=${`rf-node rf-node-${state} ${selected ? "rf-node-selected" : ""}`}>
      ${React.createElement(Handle, {
        type: "target",
        position: Position.Left,
        className: "rf-handle",
      })}
      <div className="rf-node-top">
        <span className="rf-node-tier">${tier}</span>
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
            tier: item.tier,
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
            <p className="eyebrow">${selected.tier}</p>
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
