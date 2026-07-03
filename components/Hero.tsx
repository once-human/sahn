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

// ── Kalam inline style helper ────────────────────────────────────────────────
const kalam: React.CSSProperties = {
  fontFamily: "var(--font-kalam), 'Kalam', 'Patrick Hand', cursive",
};

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

  // Shared notebook entry props
  const entryDelays = [0.75, 1.05, 1.35, 1.65];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100vh] overflow-visible z-20 flex flex-col items-center"
    >
      <div className="notebook-bloom" />

      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-full flex items-center justify-between px-6 lg:px-12 pt-8 lg:pt-14 pb-8 z-50 max-w-[1600px] mx-auto right-0"
      >
        <div className="font-sans text-[11px] uppercase tracking-[0.65em] font-medium text-[#F4EEE7]">
          S A H N
        </div>
        <nav className="flex items-center gap-6 lg:gap-12 text-[#F2ECE5] text-[13px] font-medium tracking-wide">
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity duration-300">
            About
          </a>
          <a
            href="#"
            className="flex items-center gap-[6px] border border-white/15 px-[16px] py-[10px] rounded-[10px] hover:border-white/35 hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
          >
            <span className="opacity-90">Join early access</span>
            <span className="w-[5px] h-[5px] rounded-full bg-white/50 block ml-1" />
          </a>
        </nav>
      </motion.header>

      {/* ── Main Content ── */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row mt-24 lg:mt-0 relative z-10">

        {/* Left Column */}
        <div className="w-full lg:w-[45%] h-auto lg:h-full flex flex-col justify-center px-12 lg:pl-[12%] lg:pr-[5%] pt-10 lg:pb-0 pb-12 z-20">
          <h1 className="font-serif text-[#F3ECE5] text-[4.5rem] leading-[0.95] font-[500] tracking-tight mb-6 flex flex-wrap">
            <span className="w-full flex flex-wrap">
              <AnimatedHeadline text="Every great event begins with a plan." />
            </span>
          </h1>

          <div className="flex flex-col gap-[18px] text-[#F3ECE5] opacity-[58%] text-[1.05rem] leading-[1.6] max-w-[28rem] font-sans mb-12">
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

          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="#" className="group inline-flex items-center text-[#F3ECE5] text-[15px] font-medium relative">
              <span className="relative pb-1">
                Join early access
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F2ECE5]/30 origin-left transition-transform duration-400 ease-out group-hover:scale-x-110" />
              </span>
              <span className="ml-4 transform transition-transform duration-400 ease-out group-hover:translate-x-[4px] inline-block font-serif text-lg pb-1">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right Column — Notebook */}
        <div className="w-full lg:w-[55%] h-[60vh] lg:h-full relative flex items-center justify-center pt-8 pb-16 lg:pb-0 z-10">
          <motion.div
            style={{ x, y }}
            variants={notebookVariants}
            initial="hidden"
            animate="visible"
            className="absolute w-[110%] sm:w-[130%] lg:w-[172.5%] max-w-[500px] sm:max-w-[750px] lg:max-w-[1620px] aspect-[4/3] pointer-events-none -ml-[20px] sm:-ml-[50px] lg:-ml-[105px] mt-[20px] sm:mt-[40px] lg:mt-[80px] transform-gpu will-change-transform"
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
                PNG is 3:4-ish portrait in a 4:3 landscape container.
                The rendered image sits centered; right page occupies roughly:
                  horizontal: 51% → 86% of container width
                  vertical:   14% → 88% of container height
              */}
              <div
                className="absolute z-20 select-none pointer-events-none overflow-hidden"
                style={{
                  top: "14%",
                  left: "51%",
                  width: "35%",
                  height: "74%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  paddingRight: "2%",
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
                    initial={{ opacity: 0, filter: "blur(10px)", y: 6 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      delay: entryDelays[idx],
                      duration: 1.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ display: "flex", flexDirection: "column", gap: "1px" }}
                  >
                    {/* Date */}
                    <span
                      style={{
                        ...kalam,
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
                        ...kalam,
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
                          ...kalam,
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
