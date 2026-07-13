"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StageIngest from "./StageIngest";
import StageAnalyze from "./StageAnalyze";
import StageGenerate from "./StageGenerate";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    id: "ingest",
    index: "01",
    title: "Ingest data",
    copy: "Every event, log, and record streams in from wherever it lives — APIs, warehouses, sensors — and lands in one unified pipeline.",
    Graphic: StageIngest,
  },
  {
    id: "analyze",
    index: "02",
    title: "Analyze with AI",
    copy: "Models trace relationships across the pipeline, scoring signal against noise and clustering what matters into structured intelligence.",
    Graphic: StageAnalyze,
  },
  {
    id: "generate",
    index: "03",
    title: "Generate insight",
    copy: "Structure resolves into a decision-ready brief — surfaced, ranked, and wired straight into the automation that acts on it.",
    Graphic: StageGenerate,
  },
];

export default function InsightFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      const distance = () => track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${distance() * 1.15}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel) => {
        const art = panel.querySelector("[data-art]");
        const copy = panel.querySelectorAll("[data-copy]");
        const line = panel.querySelector("[data-line]");

        gsap.fromTo(
          art,
          { opacity: 0, scale: 0.86, filter: "blur(6px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 70%",
              end: "left 20%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          copy,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 60%",
              end: "left 25%",
              scrub: true,
            },
          }
        );

        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 75%",
                end: "right 60%",
                scrub: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="flow"
      ref={containerRef}
      className="relative overflow-hidden bg-base"
    >
      <div
        ref={trackRef}
        className="flex h-screen w-max flex-nowrap items-stretch"
      >
        <div className="flex h-full w-[46vw] min-w-[340px] shrink-0 flex-col justify-center border-r border-border-hair px-8 md:px-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Insight flow
          </span>
          <h2 className="mt-5 font-display text-[9vw] font-medium leading-[0.98] tracking-tight text-primary sm:text-[4.4vw]">
            How raw
            <br />
            becomes ready.
          </h2>
          <p className="mt-6 max-w-[380px] text-[15px] leading-relaxed text-muted">
            Three stages, one continuous pipeline. Keep scrolling &mdash; the
            page moves sideways through the pipeline the same way your data
            does.
          </p>
        </div>

        {stages.map((stage, i) => (
          <div
            key={stage.id}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="relative flex h-full w-[86vw] shrink-0 flex-col justify-center border-r border-border-hair px-8 md:w-[64vw] md:px-16"
          >
            <div className="grid h-full max-h-[560px] grid-rows-[1fr_auto] gap-10 py-16 md:grid-cols-[1fr_1fr] md:grid-rows-1 md:items-center md:gap-14 md:py-0">
              <div data-art className="order-2 flex items-center justify-center md:order-1">
                <stage.Graphic />
              </div>

              <div className="order-1 md:order-2">
                <span data-copy className="font-mono text-[12px] tracking-[0.14em] text-cyan">
                  {stage.index}
                </span>
                <h3
                  data-copy
                  className="mt-3 font-display text-[7vw] font-medium leading-[1] tracking-tight text-primary sm:text-[2.6vw] md:text-[2.4vw]"
                >
                  {stage.title}
                </h3>
                <p data-copy className="mt-4 max-w-[400px] text-[14.5px] leading-relaxed text-muted">
                  {stage.copy}
                </p>
                <span
                  data-line
                  className="mt-8 block h-px w-full origin-left bg-gradient-to-r from-indigo via-cyan to-transparent"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex h-full w-[30vw] min-w-[220px] shrink-0 items-center justify-center px-8">
          <a
            href="#dashboard"
            className="group flex flex-col items-center gap-4 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-border-soft transition-colors group-hover:border-cyan">
              <span className="h-2 w-2 rounded-full bg-cyan transition-transform group-hover:scale-150" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted group-hover:text-primary">
              Enter the workspace
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
