"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import CoreField from "./CoreField";

export default function Signature() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = -rect.top;
        const p = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
        progressRef.current = p;
        setPct(Math.round(p * 100));
      }
      raf = requestAnimationFrame(onScroll);
    };
    raf = requestAnimationFrame(onScroll);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="core"
      ref={sectionRef}
      className="relative h-[260vh] w-full bg-void"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 7], fov: 42 }} dpr={[1, 1.5]}>
            <Suspense fallback={null}>
              <CoreField progressRef={progressRef} />
            </Suspense>
          </Canvas>
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 20%, var(--bg-void) 82%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-faint"
          >
            The intelligence core
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-[760px] font-display text-[10vw] font-medium leading-[0.98] tracking-tight text-primary sm:text-[4.6vw]"
          >
            Data doesn&rsquo;t wait to be organized.
            <br />
            <span className="text-muted">It organizes itself.</span>
          </motion.h2>

          <div className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            <span className="h-[1px] w-10 bg-border-soft" />
            coherence {pct}%
            <span className="h-[1px] w-10 bg-border-soft" />
          </div>
        </div>
      </div>
    </section>
  );
}
