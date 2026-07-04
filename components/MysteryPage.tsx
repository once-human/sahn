"use client";

import { motion } from "framer-motion";

// Apple-style: blur + opacity + lift, per-property easing
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 12, filter: "blur(14px)", scale: 0.985 },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
  transition: {
    delay,
    duration: 0,
    opacity: { delay, duration: 1.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    y:       { delay, duration: 1.3, ease: [0.16, 1, 0.3, 1]   as [number, number, number, number] },
    filter:  { delay, duration: 1.9, ease: [0.16, 1, 0.3, 1]   as [number, number, number, number] },
    scale:   { delay, duration: 1.5, ease: [0.16, 1, 0.3, 1]   as [number, number, number, number] },
  },
});

const glowIn = (delay: number, duration = 3.8) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay, duration, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function MysteryPage() {
  return (
    <div
      className="relative w-full flex flex-col select-none"
      style={{
        background: "#07070A",
        // Use dvh (dynamic viewport height) for mobile Safari correctness
        minHeight: "100svh",
        height: "100svh",
        overflow: "hidden",
      }}
    >
      {/* ── Atmospheric gradient blobs ── */}

      {/* Amber warmth — lower-left */}
      <motion.div
        {...glowIn(0.2, 4.5)}
        className="absolute pointer-events-none"
        style={{
          bottom: "-25%", left: "-12%",
          width: "85vw", height: "85vw",
          background: "radial-gradient(circle at 35% 65%, rgba(199,160,106,0.17) 0%, rgba(199,140,80,0.06) 38%, transparent 66%)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      {/* Cool ivory — top-right */}
      <motion.div
        {...glowIn(0.5, 5)}
        className="absolute pointer-events-none"
        style={{
          top: "-20%", right: "-18%",
          width: "65vw", height: "65vw",
          background: "radial-gradient(circle, rgba(240,236,228,0.08) 0%, rgba(220,216,208,0.03) 45%, transparent 70%)",
          filter: "blur(110px)",
          zIndex: 0,
        }}
      />

      {/* Warm halo — behind headline */}
      <motion.div
        {...glowIn(0.8, 5.5)}
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "-8%",
          width: "65vw", height: "60vh",
          background: "radial-gradient(ellipse at 28% 55%, rgba(199,160,106,0.11) 0%, rgba(180,140,90,0.04) 40%, transparent 66%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      {/* Blue-violet counter — right */}
      <motion.div
        {...glowIn(1.2, 6)}
        className="absolute pointer-events-none"
        style={{
          top: "35%", right: "-8%",
          width: "50vw", height: "50vh",
          background: "radial-gradient(ellipse at 60% 50%, rgba(110,108,140,0.06) 0%, transparent 62%)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(4,4,8,0.55) 80%, rgba(2,2,6,0.85) 100%)",
          zIndex: 1,
        }}
      />

      {/* Grain */}
      <div className="grain-overlay" style={{ zIndex: 2, opacity: 0.022 }} />

      {/* ── Header ── */}
      <motion.header
        {...rise(0.1)}
        className="absolute top-0 left-0 right-0 z-30"
        style={{ padding: "clamp(1.25rem, 4vw, 3rem) clamp(1.25rem, 5vw, 4.5rem) 0" }}
      >
        <span
          className="font-sans uppercase"
          style={{
            fontSize: "clamp(9px, 1.8vw, 11px)",
            letterSpacing: "0.64em",
            fontWeight: 500,
            color: "rgba(245,241,235,0.65)",
          }}
        >
          S A H N
        </span>
      </motion.header>

      {/* ── Main ── */}
      <main
        className="flex-1 flex flex-col justify-center z-10"
        style={{
          padding: "0 clamp(1.25rem, 5vw, 4.5rem)",
          paddingTop: "clamp(4rem, 10vw, 5rem)",
          paddingBottom: "clamp(3rem, 8vw, 4rem)",
        }}
      >
        <div>
          {/* Line 1 */}
          <motion.div {...rise(0.38)}>
            <span
              className="font-serif block"
              style={{
                fontSize: "clamp(36px, 9.5vw, 108px)",
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
                lineHeight: 0.93,
                background: "linear-gradient(160deg, #F8F4EE 0%, #E8E2D8 45%, #C8BFB4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                paddingBottom: "0.18em",
                marginBottom: "-0.18em",
              }}
            >
              The right people
            </span>
          </motion.div>

          {/* Line 2 */}
          <motion.div {...rise(0.58)}>
            <span
              className="font-serif block"
              style={{
                fontSize: "clamp(36px, 9.5vw, 108px)",
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
                lineHeight: 0.93,
                background: "linear-gradient(160deg, #F8F4EE 0%, #E8E2D8 45%, #C8BFB4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                paddingBottom: "0.18em",
                marginBottom: "-0.18em",
              }}
            >
              for your next event.
            </span>
          </motion.div>

          {/* Sub-line */}
          <motion.p
            {...rise(1.15)}
            className="font-sans"
            style={{
              fontSize: "clamp(12px, 2.2vw, 15px)",
              marginTop: "clamp(1.4rem, 4vw, 2.4rem)",
              lineHeight: 1.65,
              letterSpacing: "0.01em",
              maxWidth: "42ch",
            }}
          >
            <span style={{ color: "#7A7268" }}>Vendor discovery for events.</span>
            <span style={{ color: "rgba(120,112,104,0.4)" }}> Structured, private, deliberate.</span>
          </motion.p>

          {/* City */}
          <motion.p
            {...rise(1.55)}
            className="font-sans uppercase"
            style={{
              fontSize: "clamp(9px, 1.8vw, 10.5px)",
              marginTop: "clamp(1rem, 3vw, 1.6rem)",
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
        className="absolute bottom-0 left-0 right-0 flex items-end justify-between z-30"
        style={{
          padding: "0 clamp(1.25rem, 5vw, 4.5rem) clamp(1.25rem, 4vw, 3rem)",
        }}
      >
        <span
          className="font-sans"
          style={{
            fontSize: "clamp(9px, 1.8vw, 11px)",
            letterSpacing: "0.07em",
            color: "rgba(120,112,104,0.25)",
          }}
        >
          2026
        </span>

        <a
          href="mailto:hello@sahn.in"
          className="group font-sans"
          style={{
            fontSize: "clamp(10px, 2vw, 12px)",
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
