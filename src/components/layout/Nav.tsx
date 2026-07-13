"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Platform", href: "#flow" },
  { label: "Workspace", href: "#dashboard" },
  { label: "Core", href: "#core" },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border-hair/80 bg-void/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-6 w-6 items-center justify-center">
            <span className="absolute inset-0 rounded-[6px] border border-indigo/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          <span className="font-display text-[15px] font-medium tracking-tight text-primary">
            Xai
          </span>
          <span className="ml-1 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-faint sm:inline">
            / intelligence workspace
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#dashboard"
          className="group flex items-center gap-2 rounded-full border border-border-soft bg-panel px-4 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-primary transition-colors hover:border-indigo/60"
        >
          Enter workspace
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.header>
  );
}
