"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-border-hair bg-base px-6 py-16 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="max-w-[420px] font-display text-[8vw] font-medium leading-[1.02] tracking-tight text-primary sm:text-[2.6vw]">
            Give your data somewhere to become intelligence.
          </h3>
          <a
            href="#hero"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-void transition-transform hover:scale-[1.03]"
          >
            Start structuring
          </a>
        </motion.div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
              Product
            </p>
            <ul className="mt-3 flex flex-col gap-2 font-body text-[13px] text-muted">
              <li><a href="#hero" className="hover:text-primary">Overview</a></li>
              <li><a href="#flow" className="hover:text-primary">Insight flow</a></li>
              <li><a href="#dashboard" className="hover:text-primary">Workspace</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
              Xai
            </p>
            <ul className="mt-3 flex flex-col gap-2 font-body text-[13px] text-muted">
              <li className="text-faint">Concept build — not a live product</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1400px] items-center justify-between border-t border-border-hair pt-6 font-mono text-[10.5px] text-faint">
        <span>&copy; {new Date().getFullYear()} Xai Workspace</span>
        <span>Raw data → structured intelligence → action</span>
      </div>
    </footer>
  );
}
