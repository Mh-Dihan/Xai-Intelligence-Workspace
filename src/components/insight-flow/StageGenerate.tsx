export default function StageGenerate() {
  const lines = [0.9, 0.65, 0.78, 0.42];

  return (
    <svg
      viewBox="0 0 300 280"
      className="h-[240px] w-full max-w-[360px] md:h-[300px]"
      fill="none"
    >
      <rect
        x="20"
        y="24"
        width="160"
        height="200"
        rx="12"
        stroke="var(--border-soft)"
        fill="var(--bg-panel)"
      />
      <circle cx="42" cy="50" r="3" fill="var(--accent-amber)" />
      <circle cx="54" cy="50" r="3" fill="var(--accent-cyan)" />
      <circle cx="66" cy="50" r="3" fill="var(--accent-indigo)" />

      {lines.map((w, i) => (
        <rect
          key={i}
          x="36"
          y={78 + i * 26}
          width={130 * w}
          height="7"
          rx="3.5"
          fill={i === 0 ? "var(--accent-indigo)" : "var(--border-soft)"}
          className={i === 0 ? "animate-node-pulse" : ""}
        />
      ))}

      <path
        d="M 180 130 C 210 130, 210 130, 236 130"
        stroke="var(--accent-cyan)"
        strokeWidth="1.5"
        className="animate-dash"
      />

      <g className="animate-drift">
        <circle
          cx="256"
          cy="130"
          r="30"
          stroke="var(--accent-cyan)"
          strokeWidth="1.4"
          opacity="0.5"
        />
        <path
          d="M258 112 L244 134 H256 L252 150 L268 126 H256 Z"
          fill="var(--accent-amber)"
        />
      </g>

      <text
        x="20"
        y="252"
        fill="var(--text-faint)"
        fontSize="9"
        fontFamily="var(--font-mono)"
        letterSpacing="1.5"
      >
        BRIEF_042 · CONFIDENCE 0.94
      </text>
    </svg>
  );
}
