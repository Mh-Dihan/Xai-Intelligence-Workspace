export default function StageAnalyze() {
  const nodes = [
    { x: 60, y: 60 },
    { x: 150, y: 40 },
    { x: 240, y: 70 },
    { x: 50, y: 150 },
    { x: 160, y: 150 },
    { x: 250, y: 160 },
    { x: 100, y: 230 },
    { x: 210, y: 235 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 4],
    [2, 5],
    [3, 4],
    [4, 5],
    [3, 6],
    [4, 6],
    [4, 7],
    [5, 7],
  ];

  return (
    <svg
      viewBox="0 0 300 280"
      className="h-[240px] w-full max-w-[360px] md:h-[300px]"
      fill="none"
    >
      <rect x="0" y="0" width="300" height="280" rx="18" stroke="var(--border-soft)" />

      <g opacity="0.55">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="var(--accent-indigo)"
            strokeWidth="1"
          />
        ))}
      </g>

      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 4 ? 7 : 4}
          fill={i === 4 ? "var(--accent-cyan)" : "var(--accent-indigo)"}
          className="animate-node-pulse"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}

      <clipPath id="scan-clip">
        <rect x="0" y="0" width="300" height="280" rx="18" />
      </clipPath>
      <g clipPath="url(#scan-clip)">
        <rect
          x="0"
          y="0"
          width="300"
          height="46"
          fill="url(#scan-gradient)"
          className="animate-scan"
        />
      </g>

      <defs>
        <linearGradient id="scan-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent-cyan)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
