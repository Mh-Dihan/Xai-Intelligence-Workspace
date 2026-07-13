"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { automations } from "./data";

export default function AutomationsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {automations.map((a, i) => (
        <motion.div
          key={a.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.45 }}
          whileHover={{ y: -3 }}
          className="rounded-xl border border-border-hair bg-panel/60 p-4 transition-colors hover:border-cyan/40"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo/15">
              <Zap size={13} className="text-indigo" />
            </span>
            <span
              className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] ${
                a.state === "Active"
                  ? "bg-cyan/10 text-cyan"
                  : "bg-faint/10 text-faint"
              }`}
            >
              {a.state}
            </span>
          </div>
          <p className="text-[13px] leading-snug text-primary">{a.name}</p>
          <p className="mt-2 font-mono text-[10.5px] text-faint">
            {a.runs.toLocaleString()} runs
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
