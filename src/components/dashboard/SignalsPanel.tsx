"use client";

import { motion } from "framer-motion";
import { insights } from "./data";

export default function SignalsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border-hair bg-panel/60"
    >
      <div className="flex items-center justify-between border-b border-border-hair px-5 py-4">
        <p className="font-body text-[13px] text-primary">Recent insights</p>
        <span className="font-mono text-[10.5px] text-faint">
          {insights.length} generated this week
        </span>
      </div>

      <div className="divide-y divide-border-hair">
        {insights.map((row, i) => (
          <motion.div
            key={row.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="group grid grid-cols-[70px_1fr_100px_86px] items-center gap-4 px-5 py-3.5 transition-colors hover:bg-panel-alt/60"
          >
            <span className="font-mono text-[10.5px] text-faint">{row.id}</span>
            <div>
              <p className="text-[13px] leading-snug text-primary">{row.title}</p>
              <p className="mt-0.5 font-mono text-[10.5px] text-faint">{row.source}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-14 overflow-hidden rounded-full bg-void/60">
                <div
                  className="h-full rounded-full bg-cyan"
                  style={{ width: `${row.confidence * 100}%` }}
                />
              </div>
              <span className="font-mono text-[10.5px] text-muted">
                {row.confidence.toFixed(2)}
              </span>
            </div>
            <span
              className={`justify-self-start rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] ${
                row.status === "Ready"
                  ? "bg-cyan/10 text-cyan"
                  : "bg-amber/10 text-amber"
              }`}
            >
              {row.status}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
