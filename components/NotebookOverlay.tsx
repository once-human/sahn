"use client";

import React, { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CSS KEYFRAMES
// charReveal  — left-to-right clip sweep, one character at a time (pen feel)
// drawStroke  — SVG stroke-dashoffset → 0 (doodles, circles, underlines)
// ─────────────────────────────────────────────────────────────────────────────
const KF = `
@keyframes charReveal {
  from { clip-path: inset(0 110% 0 0); }
  to   { clip-path: inset(0  -5% 0 0); }
}
@keyframes drawStroke {
  to   { stroke-dashoffset: 0; }
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────

// Person 1 — Onkar  (Shadows Into Light: thin, airy, organised)
const F1 = "var(--font-shadows-into-light), 'Shadows Into Light', cursive";
// Person 2 — Friend (Patrick Hand: casual, rounder, warm)
const F2 = "var(--font-patrick-hand), 'Patrick Hand', cursive";

const FS1      = "clamp(6px, 0.65vw, 8.5px)";   // body — person 1
const FS2      = "clamp(5.5px, 0.6vw, 8px)";    // body — person 2
const FS_HEAD  = "clamp(8px, 0.85vw, 11px)";    // static heading
const FS_SUB   = "clamp(5.5px, 0.6vw, 8px)";    // static sub-lines
const FS_MARGIN = "clamp(4.5px, 0.5vw, 6.5px)"; // margin note

const INK1 = "rgba(237,231,219,0.91)";   // warm white   — Onkar
const INK2 = "rgba(196,154, 98,0.88)";   // warm gold    — Friend

// ─────────────────────────────────────────────────────────────────────────────
// CHARACTER ANIMATION ENGINE
// Each non-space character gets its own left→right clip sweep lasting ~38ms.
// Delays are pre-computed so the total segment fills `durMs` exactly.
// ─────────────────────────────────────────────────────────────────────────────

/** Relative stroke weight for each character glyph. */
function cw(c: string): number {
  if (c === " ") return 0;                                          // instant
  if (".,;:!?'\"()".includes(c)) return 0.42;
  if ("il1|ɪ".includes(c))       return 0.60;
  if ("tjfr".includes(c))        return 0.75;
  if ("acenvos".includes(c))     return 0.95;
  if ("bdhkpquxy".includes(c))   return 1.10;
  if ("gz".includes(c))          return 1.15;
  if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(c)) return 1.25;
  if ("mM".includes(c))          return 1.40;
  if ("wW".includes(c))          return 1.35;
  if ("→↓←↑".includes(c))       return 0.80;
  return 1.0;
}

interface CE { char: string; delay: number; }

/** Build a character sequence where total timing ≈ durMs. */
function seq(text: string, startMs: number, durMs: number): CE[] {
  const chars = [...text];
  const weights = chars.map(cw);
  const total   = weights.reduce((a, b) => a + b, 0);
  const mpu     = total > 0 ? durMs / total : 0;
  let t = 0;
  return chars.map((char, i) => {
    const d = { char, delay: startMs + t };
    t += weights[i] * mpu;
    return d;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAR RENDERER  — renders a pre-built CE[] as animated inline spans
// ─────────────────────────────────────────────────────────────────────────────
function Chars({ s, on }: { s: CE[]; on: boolean }) {
  return (
    <>
      {s.map(({ char, delay }, i) =>
        char === " " ? (
          <span key={i} style={{ display: "inline-block" }}>&nbsp;</span>
        ) : (
          <span
            key={i}
            style={{
              display: "inline-block",
              clipPath: "inset(0 110% 0 0)",
              animation: on ? `charReveal 38ms linear ${delay}ms both` : "none",
            }}
          >
            {char}
          </span>
        )
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WRITTEN LINE  — renders one line of animated handwriting
// ─────────────────────────────────────────────────────────────────────────────
interface WLProps {
  text  : string;
  s     : number;         // startMs
  d     : number;         // durMs
  p     : 1 | 2;          // person
  on    : boolean;
  rot?  : number;         // slight tilt in degrees
  style?: React.CSSProperties;
}

function WL({ text, s, d, p, on, rot = 0, style }: WLProps) {
  return (
    <div
      style={{
        display          : "block",
        fontFamily       : p === 1 ? F1 : F2,
        fontSize         : p === 1 ? FS1 : FS2,
        color            : p === 1 ? INK1 : INK2,
        lineHeight       : 1.52,
        transform        : rot ? `rotate(${rot}deg)` : undefined,
        transformOrigin  : "left center",
        marginBottom     : "0.5px",
        ...style,
      }}
    >
      <Chars s={seq(text, s, d)} on={on} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/** CSS style for animated SVG stroke (drives drawStroke keyframe). */
function da(at: number, dur: number, dash: number, on: boolean): React.CSSProperties {
  return (
    <svg
      viewBox="0 0 110 28"
      preserveAspectRatio="none"
      style={{
        position: "absolute", top: "-5px", left: "-8px",
        width: "calc(100% + 16px)", height: "calc(100% + 10px)",
        overflow: "visible", pointerEvents: "none",
      }}
    >
      <path
        d="M 55,2 C 93,-2 114,6 111,14 C 108,22 91,29 55,27 C 19,29 -4,22 0,14 C -4,6 17,0 55,2 Z"
        fill="none" stroke={INK2} strokeWidth="1.1" strokeLinecap="round"
        style={da(at, dur, 310, on)}
      />
    </svg>
  );
}

// ── Rough oval (Extension boards) ─────────────────────────────────────────────
function RoughOval({ at, dur, on }: { at: number; dur: number; on: boolean }) {
  return (
    <svg
      viewBox="0 0 120 26"
      preserveAspectRatio="none"
      style={{
        position: "absolute", top: "-4px", left: "-7px",
        width: "calc(100% + 14px)", height: "calc(100% + 8px)",
        overflow: "visible", pointerEvents: "none",
      }}
    >
      <path
        d="M 60,2 C 101,-2 124,6 121,13 C 118,20 100,26 60,25 C 20,26 -2,20 -1,13 C -2,6 19,0 60,2 Z"
        fill="none" stroke={INK2} strokeWidth="1.0" strokeLinecap="round"
        style={da(at, dur, 295, on)}
      />
    </svg>
  );
}

// ── Wavy underline ─────────────────────────────────────────────────────────────
function Underline({
  at, dur, on, color = INK1,
}: { at: number; dur: number; on: boolean; color?: string }) {
  return (
    <svg
      viewBox="0 0 100 4"
      preserveAspectRatio="none"
      style={{
        display: "block", width: "100%", height: "4px",
        overflow: "visible", pointerEvents: "none",
      }}
    >
      <path
        d="M 0,2 Q 25,3 50,2 Q 75,1 100,2"
        fill="none" stroke={color} strokeWidth="1.15" strokeLinecap="round"
        style={da(at, dur, 103, on)}
      />
    </svg>
  );
}

// ── Cross-out stroke ──────────────────────────────────────────────────────────
function CrossOut({ at, dur, on }: { at: number; dur: number; on: boolean }) {
  return (
    <svg
      viewBox="0 0 100 2"
      preserveAspectRatio="none"
      style={{
        position: "absolute", top: "52%", left: "-1px",
        width: "calc(100% + 2px)", height: "3px",
        overflow: "visible", pointerEvents: "none",
      }}
    >
      <line
        x1="0" y1="1" x2="100" y2="1"
        stroke="rgba(237,231,219,0.60)"
        strokeWidth="1.25" strokeLinecap="round"
        style={da(at, dur, 104, on)}
      />
    </svg>
  );
}

// ── Tiny phone handset doodle ─────────────────────────────────────────────────
function PhoneDoodle({ at, dur, on }: { at: number; dur: number; on: boolean }) {
  return (
    <svg
      width="11" height="11"
      viewBox="0 0 12 12"
      fill="none"
      style={{ display: "inline-block", verticalAlign: "middle", overflow: "visible" }}
    >
      <path
        d="M 3,1 C 2.2,1 1.5,1.8 1.5,2.8 L 1.5,4.5 C 2,6.1 3,7 4.5,7.5 C 5.1,7.7 5.6,7.5 6,7 L 6.4,6.5 C 7,5.9 7.5,6 8,6.5 L 9,7.6 C 9.5,8.1 9.5,8.6 9,9.1 L 8.5,9.6 C 8,10.1 7.8,10.9 8.1,11.5 C 8.7,11.5 9.3,11.2 9.7,10.8 C 10.6,9.8 11,8.8 11,7.8 C 11,5.8 9.5,4.2 8.5,3.2 C 7.5,2.2 5.9,1.3 4.4,1.1 C 3.9,1.03 3.4,1 3,1 Z"
        stroke="rgba(196,154,98,0.45)"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="55"
        strokeDashoffset="55"
        style={{ animation: on ? `drawStroke ${dur}ms ease ${at}ms both` : "none" }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE TEXTURE ELEMENTS  (static, visible from load)
// ─────────────────────────────────────────────────────────────────────────────

function CoffeeStain() {
  return (
    <div
      style={{
        position: "absolute", bottom: "14%", left: "3.5%",
        width: "clamp(25px,2.9vw,38px)", height: "clamp(25px,2.9vw,38px)",
        borderRadius: "50%",
        border: "1.5px solid rgba(101,67,33,0.13)",
        boxShadow: "inset 0 0 6px rgba(101,67,33,0.07)",
        pointerEvents: "none",
      }}
    />
  );
}

function GraphiteSmudge() {
  return (
    <div
      style={{
        position: "absolute", top: "72%", left: "11%",
        width: "clamp(20px,2.3vw,32px)", height: "clamp(7px,0.8vw,10px)",
        borderRadius: "50%",
        background: "rgba(188,188,188,0.04)",
        filter: "blur(3px)",
        transform: "rotate(-13deg)",
        pointerEvents: "none",
      }}
    />
  );
}

function Fingerprint() {
  return (
    <svg
      viewBox="0 0 26 32"
      fill="none"
      style={{
        position: "absolute", top: "61%", right: "4%",
        width: "clamp(15px,1.7vw,22px)", height: "clamp(19px,2.1vw,28px)",
        opacity: 0.045,
        transform: "rotate(8deg)",
        pointerEvents: "none",
      }}
    >
      {[
        "M 13,16 Q 9,13 9,10 Q 9,7 13,7 Q 17,7 17,10 Q 17,13 13,16",
        "M 13,20 Q 6,14 6,9 Q 6,4 13,4 Q 20,4 20,9 Q 20,14 13,20",
        "M 13,24 Q 3,15 3,8 Q 3,1 13,1 Q 23,1 23,8 Q 23,15 13,24",
        "M 13,28 Q 0,16 0,7 Q 0,-2 13,-2 Q 26,-2 26,7 Q 26,16 13,28",
      ].map((d, i) => (
        <path key={i} d={d} stroke="rgba(210,190,160,1)" strokeWidth="0.85" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function FoldedCorner() {
  return (
    <div
      style={{
        position: "absolute", bottom: "2.5%", right: "1.5%",
        width: "clamp(10px,1.2vw,16px)", height: "clamp(10px,1.2vw,16px)",
        background: "linear-gradient(225deg,rgba(44,35,27,0.55) 0%,rgba(37,29,22,0.28) 45%,transparent 72%)",
        clipPath: "polygon(100% 0,100% 100%,0 100%)",
        pointerEvents: "none",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STICKY NOTE  (tape static, handwriting animated)
// ─────────────────────────────────────────────────────────────────────────────
function StickyNote({ on }: { on: boolean }) {
  const fs = "clamp(5px,0.55vw,7px)";
  return (
    <div
      style={{
        position: "absolute", top: "37%", left: "67%",
        width: "clamp(40px,4.5vw,60px)",
        background: "rgba(242,233,212,0.07)",
        border: "0.5px solid rgba(242,233,212,0.06)",
        borderRadius: "1px",
        padding: "clamp(3px,0.3vw,5px) clamp(4px,0.4vw,6px)",
        transform: "rotate(2.2deg)",
        pointerEvents: "none",
        zIndex: 25,
      }}
    >
      {/* Tape strip — static, never animated */}
      <div
        style={{
          position: "absolute", top: "-4px", left: "18%",
          width: "32%", height: "6px",
          background: "rgba(242,233,212,0.07)",
          borderRadius: "1px",
          transform: "rotate(-0.6deg)",
        }}
      />
      {/* Handwritten text */}
      <div style={{ fontFamily: F1, fontSize: fs, color: INK1, lineHeight: 1.4 }}>
        <div style={{ display: "block" }}>
          <Chars s={seq("Remember", 88000, 1000)} on={on} />
        </div>
        <div style={{ display: "block" }}>
          <Chars s={seq("name badges.", 89100, 900)} on={on} />
        </div>
        {/* Small star */}
        <div
          style={{
            fontSize: "clamp(4px,0.4vw,5px)",
            color: "rgba(196,154,98,0.30)",
            marginTop: "2px",
            display: "block",
          }}
        >
          <span
            style={{
              display: "inline-block",
              clipPath: "inset(0 110% 0 0)",
              animation: on ? "charReveal 38ms linear 90100ms both" : "none",
            }}
          >
            ☆
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MARGIN NOTE  (left margin of right page, appears at 61s)
// ─────────────────────────────────────────────────────────────────────────────
function MarginNote({ on }: { on: boolean }) {
  return (
    <div
      style={{
        position: "absolute", top: "17%", left: "50.5%",
        fontFamily: F1,
        fontSize: FS_MARGIN,
        color: "rgba(237,231,219,0.24)",
        transform: "rotate(-0.9deg)",
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        pointerEvents: "none",
        zIndex: 15,
      }}
    >
      <div style={{ display: "block" }}>
        <Chars s={seq("Call Sriya", 61000, 900)} on={on} />
      </div>
      <div style={{ display: "block" }}>
        <Chars s={seq("tomorrow.", 61900, 650)} on={on} />
      </div>
      <div style={{ marginTop: "2px", display: "flex", alignItems: "center" }}>
        <PhoneDoodle at={63000} dur={600} on={on} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC CONTENT  (already written before animation — visible from load)
// ─────────────────────────────────────────────────────────────────────────────
function StaticContent() {
  return (
    <div>
      {/* Event heading — larger */}
      <div
        style={{
          fontFamily: F1,
          fontSize: FS_HEAD,
          color: INK1,
          lineHeight: 1.3,
          letterSpacing: "0.01em",
          marginBottom: "2px",
        }}
      >
        Design Systems Meetup
      </div>

      {/* Sub-details */}
      {["Bengaluru", "Saturday \u2022 6:30 PM"].map((line, i) => (
        <div
          key={i}
          style={{
            fontFamily: F1,
            fontSize: FS_SUB,
            color: INK1,
            opacity: 0.80,
            lineHeight: 1.5,
          }}
        >
          {line}
        </div>
      ))}

      {/* → 180–200 people with static underline */}
      <div
        style={{
          display: "inline-block",
          fontFamily: F1,
          fontSize: FS_SUB,
          color: INK1,
          opacity: 0.80,
          lineHeight: 1.5,
        }}
      >
        {"→"}&nbsp;180{"–"}200 people
        <div
          style={{
            height: "1px",
            background: "rgba(237,231,219,0.26)",
            marginTop: "1px",
            borderRadius: "0.5px",
          }}
        />
      </div>

      <div style={{ height: "clamp(5px,0.5vw,8px)" }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LEFT PAGE
// ─────────────────────────────────────────────────────────────────────────────
function LeftPage({ on }: { on: boolean }) {
  // Deterministic micro-rotation per line (feels handwritten, not robotic)
  const r = (n: number) => (((n * 7) % 9) - 4) * 0.07;
  const gap = <div style={{ height: "clamp(2px,0.25vw,4px)" }} />;
  const INDENT = { paddingLeft: "1.05em" } as React.CSSProperties;

  return (
    <div
      style={{
        position: "absolute",
        top: "12%", left: "10%", width: "36%", height: "76%",
        overflow: "hidden",
        zIndex: 10,
      }}
    >
      {/* Textures live on left page */}
      <CoffeeStain />
      <GraphiteSmudge />

      <div style={{ paddingLeft: "5%", paddingRight: "3%", paddingTop: "1%" }}>
        {/* ── Static ── */}
        <StaticContent />

        {/* ── 3.0s  Need venue  (Onkar, 2.5s) ── */}
        <WL text="Need venue" s={3000} d={2500} p={1} on={on} rot={r(1)} />

        {/* ── 6.5s  → Ask Rishi  (Onkar, 1.5s) ── */}
        <WL text="→ Ask Rishi" s={6500} d={1500} p={1} on={on} rot={r(2)} style={INDENT} />

        {/* ── 9.0s  ClayWorks, Indiranagar?  (Friend, 2.0s) + circle at 11.8s ── */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: "0.5px" }}>
          <WL
            text="ClayWorks, Indiranagar?"
            s={9000} d={2000} p={2} on={on} rot={r(3)}
            style={{ display: "inline-block" }}
          />
          <RoughCircle at={11800} dur={900} on={on} />
        </div>

        {gap}

        {/* ── 15.5s  Need AV  (Onkar, 2.0s) ── */}
        <WL text="Need AV" s={15500} d={2000} p={1} on={on} rot={r(4)} />

        {/* ── 18.8s  → Navaneeth knows someone.  (Friend, 2.3s) ── */}
        <WL text="→ Navaneeth knows someone." s={18800} d={2300} p={2} on={on} rot={r(5)} style={INDENT} />

        {/* ── 22.1s  Used them for React Bangalore.  (Friend, 2.4s) ── */}
        <WL text="Used them for React Bangalore." s={22100} d={2400} p={2} on={on} rot={r(6)} style={INDENT} />

        {gap}

        {/* ── 26.5s  Need photographer  (Onkar, 2.4s) ── */}
        <WL text="Need photographer" s={26500} d={2400} p={1} on={on} rot={r(7)} />

        {/* ── 31.2s  → Ask Ananya.  (Friend, 1.8s) ── */}
        <WL text="→ Ask Ananya." s={31200} d={1800} p={2} on={on} rot={r(8)} style={INDENT} />

        {/* ── 33.3s  She worked with Atharva last month.  (Friend, 2.8s) ── */}
        <WL text="She worked with Atharva last month." s={33300} d={2800} p={2} on={on} rot={r(9)} style={INDENT} />

        {gap}

        {/* ── 37.8s  Met Karthik.  (Onkar, 1.7s) ── */}
        <WL text="Met Karthik." s={37800} d={1700} p={1} on={on} rot={r(10)} />

        {/* ── 39.8s  Loved his work.  (Onkar, 1.8s) + underline at 42s ── */}
        <div>
          <WL text="Loved his work." s={39800} d={1800} p={1} on={on} rot={r(11)} />
          <div style={{ width: "clamp(35px,4.5vw,60px)" }}>
            <Underline at={42000} dur={400} on={on} />
          </div>
        </div>

        {gap}

        {/* ── 45.0s  Coffee?  (Friend, 1.0s) ── */}
        <WL text="Coffee?" s={45000} d={1000} p={2} on={on} rot={r(12)} />

        {/* ── 46.5s  Sponsor first :)  (Friend, 1.5s) ── */}
        <WL text="Sponsor first :)" s={46500} d={1500} p={2} on={on} rot={r(13)} style={INDENT} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RIGHT PAGE
// ─────────────────────────────────────────────────────────────────────────────
function RightPage({ on }: { on: boolean }) {
  const r = (n: number) => (((n * 11 + 3) % 9) - 4) * 0.07;
  const gap = <div style={{ height: "clamp(2px,0.25vw,4px)" }} />;
  const INDENT = { paddingLeft: "1.05em" } as React.CSSProperties;

  return (
    <div
      style={{
        position: "absolute",
        top: "12%", left: "54%", width: "36%", height: "76%",
        overflow: "hidden",
        zIndex: 10,
      }}
    >
      {/* Textures live on right page */}
      <Fingerprint />
      <FoldedCorner />

      {/* Sticky note — absolutely positioned in right page space */}
      <StickyNote on={on} />

      <div style={{ paddingLeft: "3%", paddingRight: "4%", paddingTop: "1%" }}>

        {/* ── 50.5s  Volunteers  (Onkar, 1.8s) ── */}
        <WL text="Volunteers" s={50500} d={1800} p={1} on={on} rot={r(1)} />

        {/* ── 52.8s  RVCE?  (Onkar, 1.0s) + cross-out at 54.0s ── */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <WL
            text="RVCE?"
            s={52800} d={1000} p={1} on={on} rot={r(2)}
            style={{ display: "inline-block", opacity: 0.72 }}
          />
          <CrossOut at={54000} dur={300} on={on} />
        </div>

        {/* ── 54.6s  IIIT-B  (Friend, 1.0s) ── */}
        <WL text="IIIT-B" s={54600} d={1000} p={2} on={on} rot={r(3)} />

        {/* ── 56.0s  ↓ Sumedha can coordinate.  (Onkar, 2.4s) ── */}
        <WL text="↓ Sumedha can coordinate." s={56000} d={2400} p={1} on={on} rot={r(4)} />

        {/* Vertical breathing space while margin note appears (61–64s) */}
        <div style={{ height: "clamp(4px,0.4vw,6px)" }} />
        <div style={{ height: "clamp(4px,0.4vw,6px)" }} />

        {/* ── 66.5s  Extension boards.  (Onkar, 1.6s) + oval at 68.6s ── */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: "0.5px" }}>
          <WL
            text="Extension boards."
            s={66500} d={1600} p={1} on={on} rot={r(5)}
            style={{ display: "inline-block" }}
          />
          <RoughOval at={68600} dur={800} on={on} />
        </div>

        {/* ── 70.0s  Don't trust the venue :(  (Friend, 2.2s) ── */}
        <WL text="Don’t trust the venue :(" s={70000} d={2200} p={2} on={on} rot={r(6)} />

        {gap}

        {/* ── 75.0s  Wi-Fi backup?  (Onkar, 1.7s) ── */}
        <WL text="Wi-Fi backup?" s={75000} d={1700} p={1} on={on} rot={r(7)} />

        {/* ── 77.2s  → Onkar hotspot?  (Onkar, 2.0s) + cross-out at 79.6s ── */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <WL
            text="→ Onkar hotspot?"
            s={77200} d={2000} p={1} on={on} rot={r(8)}
            style={{ display: "inline-block", opacity: 0.72 }}
          />
          <CrossOut at={79600} dur={400} on={on} />
        </div>

        {/* ── 80.2s  No :)  (Friend, 1.0s) ── */}
        <WL text="No :)" s={80200} d={1000} p={2} on={on} rot={r(9)} />

        {gap}

        {/* ── 84.0s  Registration closes Friday.  (Onkar, 2.3s) + underline 86.8s ── */}
        <div>
          <WL text="Registration closes Friday." s={84000} d={2300} p={1} on={on} rot={r(10)} />
          <Underline at={86800} dur={400} on={on} />
        </div>

        {/* Gap while sticky note writes (88–90s) */}
        <div style={{ height: "clamp(10px,1.2vw,16px)" }} />

        {/* ── 95.0s  We're ready.  (Onkar, 2.5s) ── */}
        <WL text="We’re ready." s={95000} d={2500} p={1} on={on} rot={r(11)} />

        {gap}

        {/* ── 105.0s  Next event...  (Onkar, 2.8s, slightly faded) ── */}
        <WL
          text="Next event..."
          s={105000} d={2800} p={1} on={on} rot={r(12)}
          style={{ color: "rgba(237,231,219,0.42)" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function NotebookOverlay() {
  const [on, setOn] = useState(false);

  // Start immediately. All character delays start at ≥ 3000ms,
  // so the spec's "0–2.8s silence" is implicit in the timing.
  // No loop. No restart. The notebook stays exactly as written.
  useEffect(() => {
    setOn(true);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KF }} />

      {/*
        Full-notebook overlay — covers the entire aspect-[2/3] container.
        overflow:hidden clips EVERYTHING (text + doodles) to notebook bounds.
        No rotation here (spec: "Do not rotate it").
      */}
      <div
        className="absolute inset-0 select-none pointer-events-none"
        style={{ zIndex: 20, overflow: "hidden" }}
      >
        {/* Margin note lives in notebook-coordinate space */}
        <MarginNote on={on} />

        <LeftPage  on={on} />
        <RightPage on={on} />
      </div>
    </>
  );
}
