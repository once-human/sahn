"use client";

import { motion } from "framer-motion";

// Blur + opacity + upward drift
const enter = (delay: number, distance = 0) => ({
  initial: {
    opacity: 0,
    filter: "blur(18px)",
    y: distance,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
  },
  transition: {
    duration: 1.8,
    ease: [0.16, 1, 0.3, 1],
    delay,
    filter: { duration: 2.2, delay, ease: [0.16, 1, 0.3, 1] },
  },
});

export default function MysteryPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col bg-[#080807]">

      {/* Warm amber bloom — bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3.5, ease: "easeOut", delay: 0.3 }}
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%",
          left: "-10%",
          width: "80vw",
          height: "80vw",
          background: "radial-gradient(circle, rgba(199,160,106,0.22) 0%, rgba(199,160,106,0.09) 40%, transparent 68%)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />

      {/* Cool silver bloom — top right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: "easeOut", delay: 0.6 }}
        className="absolute pointer-events-none"
        style={{
          top: "-15%",
          right: "-15%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(245,241,235,0.12) 0%, rgba(245,241,235,0.04) 50%, transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      {/* Warm mid glow — behind headline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4.5, ease: "easeOut", delay: 0.9 }}
        className="absolute pointer-events-none"
        style={{
          top: "25%",
          left: "-5%",
          width: "60vw",
          height: "50vh",
          background: "radial-gradient(ellipse at 35% 50%, rgba(199,160,106,0.14) 0%, rgba(180,140,90,0.05) 45%, transparent 68%)",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      />

      {/* Extra: deep blue-purple cool counter-glow — right side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5, ease: "easeOut", delay: 1.2 }}
        className="absolute pointer-events-none"
        style={{
          top: "40%",
          right: "-5%",
          width: "45vw",
          height: "45vh",
          background: "radial-gradient(ellipse at 65% 50%, rgba(120,115,140,0.08) 0%, transparent 65%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 120%)",
          zIndex: 1,
        }}
      />

      {/* Grain */}
      <div className="grain-overlay" style={{ zIndex: 2 }} />

      {/* Header */}
      <motion.header
        {...enter(0.1)}
        className="absolute top-0 left-0 right-0 flex items-start px-10 lg:px-16 pt-10 lg:pt-14"
        style={{ zIndex: 20 }}
      >
        <span
          className="font-sans text-[11px] uppercase tracking-[0.62em] font-medium select-none"
          style={{ color: "rgba(245,241,235,0.7)" }}
        >
          S A H N
        </span>
      </motion.header>

      {/* Main */}
      <main
        className="flex-1 flex flex-col justify-center px-10 lg:px-16 pb-0 pt-16"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="flex flex-col">

          {/* Line 1 */}
          <motion.div {...enter(0.4, 10)} className="overflow-visible">
            <h1
              className="font-serif font-normal leading-[0.93] tracking-tight select-none"
              style={{
                fontSize: "clamp(52px, 8.5vw, 110px)",
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
                background: "linear-gradient(135deg, #F5F1EB 0%, #DDD9D2 55%, #BFB9B0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              The right people
            </h1>
          </motion.div>

          {/* Line 2 */}
          <motion.div {...enter(0.65, 10)} className="overflow-visible">
            <h1
              className="font-serif font-normal leading-[0.93] tracking-tight select-none"
              style={{
                fontSize: "clamp(52px, 8.5vw, 110px)",
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
                background: "linear-gradient(135deg, #F5F1EB 0%, #DDD9D2 55%, #BFB9B0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              for your next event.
            </h1>
          </motion.div>

          {/* Sub-line */}
          <motion.p
            {...enter(1.2, 8)}
            className="font-sans font-normal mt-9 leading-relaxed"
            style={{ fontSize: "clamp(13px, 1.15vw, 15px)", letterSpacing: "0.01em", maxWidth: "44ch" }}
          >
            <span style={{ color: "#7A7168" }}>Vendor discovery for events.</span>
            <span style={{ color: "rgba(122,113,104,0.42)" }}>&nbsp; Structured, private, deliberate.</span>
          </motion.p>

          {/* City */}
          <motion.p
            {...enter(1.7, 6)}
            className="font-sans font-medium uppercase mt-6"
            style={{ fontSize: "11px", letterSpacing: "0.24em", color: "rgba(122,113,104,0.45)" }}
          >
            Bengaluru &nbsp;&middot;&nbsp; Pune
          </motion.p>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        {...enter(2.2, 4)}
        className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-10 lg:px-16 pb-10 lg:pb-12"
        style={{ zIndex: 20 }}
      >
        <span
          className="font-sans text-[11px] font-medium"
          style={{ color: "rgba(122,113,104,0.28)", letterSpacing: "0.06em" }}
        >
          2025
        </span>

        <a
          href="mailto:hello@sahn.in"
          className="group font-sans text-[12px] font-normal transition-all duration-700"
          style={{ color: "rgba(122,113,104,0.5)", letterSpacing: "0.02em" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#B0A89F"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(122,113,104,0.5)"; }}
        >
          Request early access
          <span
            className="inline-block ml-1 transition-transform duration-500 group-hover:translate-x-[3px]"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </a>
      </motion.footer>
    </div>
  );
}
