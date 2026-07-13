"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import ParticleField from "./ParticleField";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [labelState, setLabelState] = useState("raw");

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
      progressRef.current = p;
      setLabelState(p < 0.33 ? "raw" : p < 0.75 ? "structuring" : "structured");
      raf = requestAnimationFrame(onScroll);
    };
    raf = requestAnimationFrame(onScroll);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[220vh] w-full bg-void"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 9], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ParticleField progressRef={progressRef} />
            </Suspense>
          </Canvas>
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, transparent 0%, transparent 30%, var(--bg-void) 78%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-6 flex items-center gap-2 rounded-full border border-border-soft bg-panel/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            state: {labelState}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[13vw] font-medium leading-[0.95] tracking-tight text-primary sm:text-[7.5vw] md:text-[5.6vw]"
          >
            Raw signal,
            <br />
            <span className="bg-gradient-to-r from-indigo via-primary to-cyan bg-clip-text text-transparent">
              structured intelligence.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 max-w-[540px] text-balance font-body text-[15px] leading-relaxed text-muted md:text-[16px]"
          >
            Xai ingests the noise of raw data and, in real time, resolves it
            into structure &mdash; then hands your team the insight and the
            automation to act on it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="mt-10 flex items-center gap-4"
          >
            <a
              href="#flow"
              className="rounded-full bg-primary px-6 py-3 font-mono text-[12px] uppercase tracking-[0.1em] text-void transition-transform hover:scale-[1.03]"
            >
              See it structure data
            </a>
            <a
              href="#dashboard"
              className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted transition-colors hover:text-primary"
            >
              View workspace &rarr;
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-9 z-10 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            scroll to structure
          </span>
          <span className="relative h-9 w-[1px] overflow-hidden bg-border-soft">
            <motion.span
              className="absolute left-0 top-0 h-full w-full bg-cyan"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
