"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { throughput, signalMix } from "./data";
import { TrendingUp, Activity, Sparkles } from "lucide-react";

const stats = [
  {
    label: "Events ingested",
    value: "2.4M",
    delta: "+12.4%",
    icon: Activity,
  },
  {
    label: "Structured today",
    value: "86%",
    delta: "+3.1%",
    icon: TrendingUp,
  },
  {
    label: "Insights generated",
    value: "128",
    delta: "+18",
    icon: Sparkles,
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function OverviewPanel() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-5"
    >
      <motion.div variants={item} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border-hair bg-panel/60 p-4 transition-colors hover:border-indigo/50"
          >
            <div className="mb-3 flex items-center justify-between">
              <s.icon size={15} className="text-indigo" />
              <span className="font-mono text-[10px] text-cyan">{s.delta}</span>
            </div>
            <p className="font-display text-[22px] font-medium text-primary">
              {s.value}
            </p>
            <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>

      <motion.div
        variants={item}
        className="rounded-xl border border-border-hair bg-panel/60 p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-body text-[13px] text-primary">
              Ingestion vs. structured throughput
            </p>
            <p className="font-mono text-[10.5px] text-faint">last 7 days</p>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10.5px] text-faint">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-dim" /> raw
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> structured
            </span>
          </div>
        </div>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={throughput} margin={{ left: -20, right: 10 }}>
              <defs>
                <linearGradient id="raw-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6c7cff" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#6c7cff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="structured-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4fe8c8" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#4fe8c8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#1c1e2a" />
              <XAxis
                dataKey="t"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#565a70", fontSize: 10.5, fontFamily: "var(--font-mono)" }}
              />
              <Tooltip
                contentStyle={{
                  background: "#12141c",
                  border: "1px solid #262837",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                labelStyle={{ color: "#8b8ea3" }}
              />
              <Area
                type="monotone"
                dataKey="raw"
                stroke="#6c7cff"
                strokeWidth={1.8}
                fill="url(#raw-fill)"
              />
              <Area
                type="monotone"
                dataKey="structured"
                stroke="#4fe8c8"
                strokeWidth={1.8}
                fill="url(#structured-fill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="rounded-xl border border-border-hair bg-panel/60 p-5"
      >
        <p className="mb-4 font-body text-[13px] text-primary">Signal mix</p>
        <div className="flex flex-col gap-3">
          {signalMix.map((s) => (
            <div key={s.name} className="flex items-center gap-3">
              <span className="w-[120px] shrink-0 font-mono text-[11px] text-muted">
                {s.name}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-void/60">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo to-cyan"
                />
              </div>
              <span className="w-8 shrink-0 text-right font-mono text-[11px] text-faint">
                {s.value}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
