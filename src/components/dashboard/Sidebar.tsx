"use client";

import { motion } from "framer-motion";
import {
  LayoutGrid,
  Radio,
  Bot,
  Settings,
  Search,
  Database,
  type LucideIcon,
} from "lucide-react";
import { sidebarItems, type TabKey } from "./data";

const icons: Record<TabKey, LucideIcon> = {
  overview: LayoutGrid,
  signals: Radio,
  automations: Bot,
};

export default function Sidebar({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
}) {
  return (
    <aside className="flex w-[196px] shrink-0 flex-col justify-between border-r border-border-hair bg-panel/60 px-3 py-4 md:w-[212px]">
      <div>
        <div className="mb-5 flex items-center gap-2 px-2">
          <Database size={14} className="text-cyan" />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            xai / core
          </span>
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-lg border border-border-hair bg-void/40 px-2.5 py-2">
          <Search size={13} className="text-faint" />
          <span className="font-mono text-[11px] text-faint">
            Search intelligence
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const Icon = icons[item.key];
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onChange(item.key)}
                className="relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-panel-alt"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon
                  size={15}
                  className={`relative z-10 ${
                    isActive ? "text-cyan" : "text-faint"
                  }`}
                />
                <span
                  className={`relative z-10 font-body text-[13px] ${
                    isActive ? "text-primary" : "text-muted"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2.5 rounded-lg border border-border-hair px-2.5 py-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo/20">
          <Settings size={12} className="text-indigo" />
        </span>
        <div className="leading-tight">
          <p className="font-body text-[12px] text-primary">Workspace</p>
          <p className="font-mono text-[10px] text-faint">v2.4 · stable</p>
        </div>
      </div>
    </aside>
  );
}
