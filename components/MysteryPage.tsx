"use client";

import { motion } from "framer-motion";

const fade = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay },
});

export default function MysteryPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">

      {/* Grain */}
      <div className="grain-overlay" />

      {/* Header */}
      <motion.header
        {...fade(0)}
        className="absolute top-0 left-0 right-0 flex items-start px-10 lg:px-16 pt-10 lg:pt-14 z-20"
      >
        <span
          className="font-sans text-[11px] uppercase tracking-[0.62em] font-medium select-none"
          style={{ color: "rgba(245,241,235,0.75)" }}
        >
          S A H N
        </span>
      </motion.header>

      {/* Main content — vertically centered, left-aligned */}
      <main className="flex-1 flex flex-col justify-center px-10 lg:px-16 pb-0 pt-16">

        {/* Headline */}
        <div className="flex flex-col">
          <motion.h1
            {...fade(0.5)}
            className="font-serif font-normal leading-[0.94] tracking-tight select-none"
            style={{
              fontSize: "clamp(52px, 8vw, 104px)",
              color: "#F5F1EB",
              maxWidth: "16ch",
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', 'Cormorant', Georgia, serif",
              fontWeight: 400,
            }}
          >
            The right people
            <br />
            for your next event.
          </motion.h1>

          {/* Sub-line */}
          <motion.p
            {...fade(1.1)}
            className="font-sans font-normal mt-8 leading-relaxed"
            style={{
              fontSize: "clamp(13px, 1.2vw, 15px)",
              color: "#7A7168",
              letterSpacing: "0.01em",
              maxWidth: "44ch",
            }}
          >
            Vendor discovery for events.
            <span style={{ color: "rgba(122,113,104,0.5)" }}> &nbsp;Structured, private, deliberate.</span>
          </motion.p>

          {/* City */}
          <motion.p
            {...fade(1.6)}
            className="font-sans font-medium uppercase mt-6"
            style={{
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "rgba(122,113,104,0.55)",
            }}
          >
            Bengaluru &nbsp;&middot;&nbsp; Pune
          </motion.p>
        </div>
      </main>

      {/* Bottom bar */}
      <motion.footer
        {...fade(2.0)}
        className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-10 lg:px-16 pb-10 lg:pb-12 z-20"
      >
        {/* Left — year or nothing */}
        <span
          className="font-sans text-[11px] font-medium"
          style={{ color: "rgba(122,113,104,0.35)", letterSpacing: "0.06em" }}
        >
          2025
        </span>

        {/* Right — CTA */}
        <a
          href="mailto:hello@sahn.in"
          className="group font-sans text-[12px] font-normal transition-all duration-500"
          style={{
            color: "rgba(122,113,104,0.6)",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#A79D95";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(122,113,104,0.6)";
          }}
        >
          Request early access
          <span
            className="inline-block ml-1 transition-transform duration-500 group-hover:translate-x-1"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </a>
      </motion.footer>
    </div>
  );
}
