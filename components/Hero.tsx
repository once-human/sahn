"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import NotebookOverlay from "@/components/NotebookOverlay";

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
      </motion.header>

      {/* ── Main Content ── */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row mt-24 lg:mt-0 relative z-10">

        {/* Left Column */}
        <div className="w-full lg:w-[45%] h-auto lg:h-full flex flex-col justify-center px-12 lg:pl-[12%] lg:pr-[5%] pt-10 lg:pb-0 pb-12 z-20">
          <h1 className="font-serif text-[#F3ECE5] text-[3rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[0.95] font-[500] tracking-tight mb-6 flex flex-wrap">
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
          {/*
            Parallax outer wrapper.
            aspect-[2/3] matches notebook.png exactly (1024×1536).
            Because container and image share the same 2:3 ratio,
            object-contain fills 100% — zero letterboxing.
            Overlay coordinates therefore map 1:1 to image pixels.
          */}
          <motion.div
            style={{ x, y }}
            variants={notebookVariants}
            initial="hidden"
            animate="visible"
            className="absolute w-[55%] sm:w-[65%] lg:w-[86.25%] max-w-[250px] sm:max-w-[375px] lg:max-w-[810px] aspect-[2/3] pointer-events-none -ml-[10px] sm:-ml-[25px] lg:-ml-[52.5px] mt-[20px] sm:mt-[40px] lg:mt-[80px] transform-gpu will-change-transform"
          >
            {/*
              Floating + rotation wrapper.
              Both the image and the writing overlay rotate together (-3deg)
              so the handwriting stays perfectly aligned with the page angle.
            */}
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full relative transform-gpu will-change-transform -rotate-[3deg]"
            >
              {/* The notebook image — static, never modified */}
              <Image
                src="/notebook.png"
                alt="Sahn Notebook"
                fill
                className="object-contain z-10 [filter:drop-shadow(4px_4px_5px_rgba(0,0,0,0.8))_drop-shadow(20px_25px_30px_rgba(0,0,0,0.22))_drop-shadow(40px_50px_60px_rgba(0,0,0,0.1))] will-change-[transform,filter]"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />

              {/*
                The living notebook overlay.
                Sits absolutely on top of the image, clipped to the right page.
                Animates independently — notebook floats, writing runs once.
              */}
              <NotebookOverlay />

            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
