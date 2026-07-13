export default function StageIngest() {
  const sources = [
    { x: 24, y: 40 },
    { x: 24, y: 90 },
    { x: 24, y: 140 },
    { x: 24, y: 190 },
    { x: 24, y: 240 },
  ];
  const target = { x: 260, y: 140 };

  return (
    <svg
      viewBox="0 0 320 280"
      className="h-[240px] w-full max-w-[360px] md:h-[300px]"
      fill="none"
    >
      {sources.map((s, i) => (
        <g key={i}>
          <path
            d={`M ${s.x} ${s.y} C ${s.x + 90} ${s.y}, ${target.x - 90} ${target.y}, ${target.x - 26} ${target.y}`}
            stroke="url(#ingest-line)"
            strokeWidth="1.4"
            className="animate-dash"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
          <circle
            cx={s.x}
            cy={s.y}
            r="4.5"
            fill="var(--accent-cyan)"
            className="animate-node-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        </g>
      ))}

      <circle
        cx={target.x}
        cy={target.y}
        r="26"
        stroke="var(--accent-indigo)"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <circle cx={target.x} cy={target.y} r="10" fill="var(--accent-indigo)" />
      <circle
        cx={target.x}
        cy={target.y}
        r="16"
        stroke="var(--accent-indigo)"
        strokeWidth="1"
        opacity="0.35"
        className="animate-node-pulse"
      />

      <defs>
        <linearGradient id="ingest-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent-indigo)" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
