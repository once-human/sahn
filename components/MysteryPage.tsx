"use client";

import { motion, useReducedMotion } from "framer-motion";

// Spring-based Apple-style enter
const rise = (delay: number) => ({
  initial: {
    opacity: 0,
    y: 14,
    filter: "blur(16px)",
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
  },
  transition: {
    delay,
    duration: 0,
    opacity:  { delay, duration: 1.6, ease: [0.25, 0.1, 0.25, 1] },
    y:        { delay, duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    filter:   { delay, duration: 2.0, ease: [0.16, 1, 0.3, 1] },
    scale:    { delay, duration: 1.6, ease: [0.16, 1, 0.3, 1] },
  },
});

const glowIn = (delay: number, duration = 3.8) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay, duration, ease: [0.16, 1, 0.3, 1] },
});

// Gradient text style — with paddingBottom to prevent descender clip
const gradientText: React.CSSProperties = {
  fontSize: "clamp(50px, 8.2vw, 108px)",
  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
  fontWeight: 400,
  lineHeight: 0.93,
  // Gradient via background-clip — paddingBottom prevents "g" / "p" descender cut
  background: "linear-gradient(160deg, #F8F4EE 0%, #E8E2D8 45%, #C8BFB4 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  paddingBottom: "0.18em",    // extend bounding box so descenders are painted
  marginBottom: "-0.18em",   // cancel the layout impact
  display: "block",
};

export default function MysteryPage() {
  return (
    <div
      className="relative w-full h-screen flex flex-col select-none"
      style={{ background: "#07070A", overflow: "hidden" }}
    >
      {/* ── Layer 0: Atmospheric gradient blobs ── */}

      {/* Amber warmth — lower-left, large, primary glow */}
      <motion.div
        {...glowIn(0.2, 4.5)}
        className="absolute pointer-events-none"
        style={{
          bottom: "-25%", left: "-12%",
          width: "85vw", height: "85vw",
          background:
            "radial-gradient(circle at 35% 65%, rgba(199,160,106,0.28) 0%, rgba(199,140,80,0.10) 38%, transparent 66%)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      {/* Cool ivory — top-right opposite corner */}
      <motion.div
        {...glowIn(0.5, 5)}
        className="absolute pointer-events-none"
        style={{
          top: "-20%", right: "-18%",
          width: "65vw", height: "65vw",
          background:
            "radial-gradient(circle, rgba(240,236,228,0.14) 0%, rgba(220,216,208,0.05) 45%, transparent 70%)",
          filter: "blur(110px)",
          zIndex: 0,
        }}
      />

      {/* Warm mid halo — exactly behind headline text */}
      <motion.div
        {...glowIn(0.8, 5.5)}
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "-8%",
          width: "65vw", height: "60vh",
          background:
            "radial-gradient(ellipse at 28% 55%, rgba(199,160,106,0.18) 0%, rgba(180,140,90,0.07) 40%, transparent 66%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      {/* Muted blue-violet counter — right side */}
      <motion.div
        {...glowIn(1.2, 6)}
        className="absolute pointer-events-none"
        style={{
          top: "35%", right: "-8%",
          width: "50vw", height: "50vh",
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(110,108,140,0.10) 0%, transparent 62%)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />

      {/* Vignette — strong cinematic frame */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(4,4,8,0.55) 80%, rgba(2,2,6,0.85) 100%)",
          zIndex: 1,
        }}
      />

      {/* Grain */}
      <div className="grain-overlay" style={{ zIndex: 2, opacity: 0.022 }} />

      {/* ── Header ── */}
      <motion.header
        {...rise(0.1)}
        className="absolute top-0 left-0 right-0 flex items-start"
        style={{ padding: "3rem 4.5rem 0", zIndex: 30 }}
      >
        <span
          className="font-sans uppercase"
          style={{
            fontSize: "11px",
            letterSpacing: "0.64em",
            fontWeight: 500,
            color: "rgba(245,241,235,0.65)",
          }}
        >
          S A H N
        </span>
      </motion.header>

      {/* ── Main content ── */}
      <main
        className="flex-1 flex flex-col justify-center"
        style={{ padding: "0 4.5rem", paddingTop: "5rem", position: "relative", zIndex: 10 }}
      >
        <div>
          {/* Headline line 1 */}
          <motion.div {...rise(0.38)}>
            <span style={gradientText}>The right people</span>
          </motion.div>

          {/* Headline line 2 — 200ms behind */}
          <motion.div {...rise(0.58)}>
            <span style={gradientText}>for your next event.</span>
          </motion.div>

          {/* Sub-line */}
          <motion.p
            {...rise(1.15)}
            className="font-sans"
            style={{
              fontSize: "clamp(13px, 1.1vw, 15px)",
              marginTop: "2.4rem",
              lineHeight: 1.6,
              letterSpacing: "0.01em",
              maxWidth: "42ch",
            }}
          >
            <span style={{ color: "#7A7268" }}>Vendor discovery for events.</span>
            <span style={{ color: "rgba(120,112,104,0.4)" }}>
              {" "}Structured, private, deliberate.
            </span>
          </motion.p>

          {/* City */}
          <motion.p
            {...rise(1.55)}
            className="font-sans uppercase"
            style={{
              fontSize: "10.5px",
              marginTop: "1.6rem",
              letterSpacing: "0.26em",
              fontWeight: 500,
              color: "rgba(120,112,104,0.4)",
            }}
          >
            Bengaluru &nbsp;&middot;&nbsp; Pune
          </motion.p>
        </div>
      </main>

      {/* ── Footer ── */}
      <motion.footer
        {...rise(2.0)}
        className="absolute bottom-0 left-0 right-0 flex items-end justify-between"
        style={{ padding: "0 4.5rem 3rem", zIndex: 30 }}
      >
        <span
          className="font-sans"
          style={{
            fontSize: "11px",
            letterSpacing: "0.07em",
            color: "rgba(120,112,104,0.25)",
          }}
        >
          2025
        </span>

        <a
          href="mailto:hello@sahn.in"
          className="group font-sans"
          style={{
            fontSize: "12px",
            letterSpacing: "0.015em",
            color: "rgba(120,112,104,0.45)",
            textDecoration: "none",
            transition: "color 0.6s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#B0A89E")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(120,112,104,0.45)")}
        >
          Request early access
          <span
            style={{
              display: "inline-block",
              marginLeft: "5px",
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}
            className="group-hover:translate-x-[4px]"
          >
            &rarr;
          </span>
        </a>
      </motion.footer>
    </div>
  );
}
