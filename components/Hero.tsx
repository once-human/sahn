"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ── Cinematic animation variants ────────────────────────────────────────────

const wordVariants = {
  hidden: { opacity: 0, filter: "blur(16px)", y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      delay: 0.06 * i,
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const lineVariants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      delay: 0.55 + 0.14 * i,
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const notebookVariants = {
  hidden: { opacity: 0, scale: 0.93, filter: "blur(28px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.15,
    },
  },
};

// ── Animated headline ────────────────────────────────────────────────────────

function BlurWord({ word, index }: { word: string; index: number }) {
  return (
    <motion.span
      custom={index}
      variants={wordVariants}
      initial="hidden"
      animate="visible"
      className="inline-block"
      style={{ marginRight: "0.22em" }}
    >
      {word}
    </motion.span>
  );
}

function AnimatedHeadline({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <BlurWord key={i} word={w} index={i} />
      ))}
    </>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { damping: 50, stiffness: 100, mass: 2 };
  const springX = useSpring(mouseX, springCfg);
  const springY = useSpring(mouseY, springCfg);
  const x = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const y = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  // Shared notebook entry delays
  const entryDelays = [0.75, 1.05, 1.35, 1.65];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100vh] overflow-visible z-20 flex flex-col items-center"
    >
      <div className="notebook-bloom" />

      {/* ── Header (CTAs removed) ── */}
      <motion.header
        initial={{ opacity: 0, y: -18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-full flex items-center justify-between px-6 lg:px-12 pt-8 lg:pt-14 pb-8 z-50 max-w-[1600px] mx-auto right-0"
      >
        <div className="font-sans text-[11px] uppercase tracking-[0.65em] font-medium text-[#F4EEE7]">
          S A H N
        </div>
      </motion.header>

      {/* ── Main Content ── */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row mt-24 lg:mt-0 relative z-10">

        {/* Left Column (CTA removed) */}
        <div className="w-full lg:w-[45%] h-auto lg:h-full flex flex-col justify-center px-12 lg:pl-[12%] lg:pr-[5%] pt-10 lg:pb-0 pb-12 z-20">
          <h1 className="font-serif text-[#F3ECE5] text-[4.5rem] leading-[0.95] font-[500] tracking-tight mb-6 flex flex-wrap">
            <span className="w-full flex flex-wrap">
              <AnimatedHeadline text="Every great event begins with a plan." />
            </span>
          </h1>

          <div className="flex flex-col gap-[18px] text-[#F3ECE5] opacity-[58%] text-[1.05rem] leading-[1.6] max-w-[28rem] font-sans">
            {[
              "It comes to life with the right people.",
              "Sahn helps organizers find the people they can trust, before the event begins.",
            ].map((line, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Right Column — Notebook */}
        <div className="w-full lg:w-[55%] h-[60vh] lg:h-full relative flex items-center justify-center pt-8 pb-16 lg:pb-0 z-10">
          <motion.div
            style={{ x, y }}
            variants={notebookVariants}
            initial="hidden"
            animate="visible"
            className="absolute w-[55%] sm:w-[65%] lg:w-[86.25%] max-w-[250px] sm:max-w-[375px] lg:max-w-[810px] aspect-[2/3] pointer-events-none -ml-[10px] sm:-ml-[25px] lg:-ml-[52.5px] mt-[20px] sm:mt-[40px] lg:mt-[80px] transform-gpu will-change-transform"
          >
            {/* Floating + rotation wrapper */}
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full relative transform-gpu will-change-transform -rotate-[3deg]"
            >
              <Image
                src="/notebook.png"
                alt="Sahn Notebook"
                fill
                className="object-contain z-10 [filter:drop-shadow(4px_4px_5px_rgba(0,0,0,0.8))_drop-shadow(20px_25px_30px_rgba(0,0,0,0.22))_drop-shadow(40px_50px_60px_rgba(0,0,0,0.1))] will-change-[transform,filter]"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />

              {/*
                Right-page overlay — coordinates tuned to notebook.png geometry.
                Since wrapper aspect ratio is exactly 2:3 matching the image (1024x1536):
                The spine is at exactly 50%.
                Right page area: left 54%, width 33%, top 16%, height 68%.
              */}
              <div
                className="absolute z-20 select-none pointer-events-none overflow-hidden"
                style={{
                  top: "16%",
                  left: "54%",
                  width: "33%",
                  height: "68%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  paddingRight: "1%",
                }}
              >
                {[
                  {
                    date: "March 2",
                    body: ["Need a photographer", "for the tech fest."],
                    resolved: "Found through Rohan.",
                  },
                  {
                    date: "March 5",
                    body: ["Looking for AV team", "for mainstage."],
                    resolved: "Connected by Aniket.",
                  },
                  {
                    date: "March 8",
                    body: ["Speaker from Bangalore", "needs accommodation."],
                    resolved: "Hospitality partner sorted.",
                  },
                  {
                    date: "March 11",
                    body: ["Everything is coming together."],
                    resolved: null,
                    heart: true,
                  },
                ].map((entry, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      delay: entryDelays[idx],
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "1px" }}
                  >
                    {/* Date */}
                    <span
                      style={{
                        fontFamily: "var(--font-shadows-into-light), 'Shadows Into Light', 'Patrick Hand', cursive",
                        fontSize: "clamp(8px, 1vw, 13px)",
                        color: "rgba(201,164,112,0.85)",
                        letterSpacing: "0.04em",
                        marginBottom: "1px",
                      }}
                    >
                      {entry.date}
                    </span>

                    {/* Body lines */}
                    <span
                      style={{
                        fontFamily: "var(--font-shadows-into-light), 'Shadows Into Light', 'Patrick Hand', cursive",
                        fontSize: "clamp(9px, 1.1vw, 15px)",
                        color: "rgba(255,255,255,0.82)",
                        lineHeight: 1.32,
                      }}
                    >
                      {entry.body.map((l, li) => (
                        <React.Fragment key={li}>
                          {l}
                          {li < entry.body.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                      {entry.heart && (
                        <span style={{ color: "rgba(201,164,112,0.75)", marginLeft: "0.4em" }}>
                          ♥
                        </span>
                      )}
                    </span>

                    {/* Resolved line */}
                    {entry.resolved && (
                      <span
                        style={{
                          fontFamily: "var(--font-shadows-into-light), 'Shadows Into Light', 'Patrick Hand', cursive",
                          fontSize: "clamp(8px, 0.95vw, 13px)",
                          color: "rgba(201,164,112,0.75)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3em",
                          marginTop: "2px",
                          fontStyle: "italic",
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: "0.9em", height: "0.9em", flexShrink: 0 }}
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        {entry.resolved}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
