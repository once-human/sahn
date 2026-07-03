"use client";

import React, { useEffect, useState } from "react";

// ─── CSS keyframes ─────────────────────────────────────────────────────────────
// writeClip:    the main "pen writing left-to-right" reveal for all text
// drawBox:      SVG stroke animation — checkbox rectangle (perimeter ≈ 64)
// drawMark:     SVG stroke animation — checkmark polyline (length ≈ 22)
// drawEllipse:  SVG stroke animation — circle around "Venue confirmed." (≈ 260)
// drawCurve:    SVG stroke animation — curved underline (length ≈ 105)
// drawArrow:    SVG stroke animation — tiny margin arrow (length ≈ 18)

const KF = `
@keyframes writeClip {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0   0% 0 0); }
}
@keyframes drawBox {
  from { stroke-dashoffset: 64;  }
  to   { stroke-dashoffset: 0;   }
}
@keyframes drawMark {
  from { stroke-dashoffset: 22;  }
  to   { stroke-dashoffset: 0;   }
}
@keyframes drawEllipse {
  from { stroke-dashoffset: 260; }
  to   { stroke-dashoffset: 0;   }
}
@keyframes drawCurve {
  from { stroke-dashoffset: 105; }
  to   { stroke-dashoffset: 0;   }
}
@keyframes drawArrow {
  from { stroke-dashoffset: 18;  }
  to   { stroke-dashoffset: 0;   }
}
`;

// ─── Easing + font stacks ─────────────────────────────────────────────────────

// Slightly decelerated curve — pen slows slightly at end of each word
const EASE = "cubic-bezier(0.22, 0.0, 0.08, 1.0)";

// Person 1: organized, dates + tasks — Shadows Into Light (airy, neat, fine-liner feel)
const F1 = "var(--font-shadows-into-light), 'Shadows Into Light', cursive";
// Person 2: confirmations, recommendations — Patrick Hand (slightly rounder, warmer)
const F2 = "var(--font-patrick-hand), 'Patrick Hand', cursive";

// Ink colours
const INK1 = "rgba(239, 231, 219, 0.90)"; // warm white — Person 1
const INK2 = "rgba(196, 154, 98,  0.88)"; // warm gold  — Person 2
const DATE_COLOR = "rgba(196, 154, 98, 0.78)";
const MARGIN_COLOR = "rgba(196, 154, 98, 0.22)";
const LAST_COLOR = "rgba(239, 231, 219, 0.28)";

// ─── Tiny helper: return animation + clip-path style for text reveal ──────────

function wr(at: number, dur: number, on: boolean): React.CSSProperties {
  return {
    clipPath: "inset(0 100% 0 0)",
    animation: on ? `writeClip ${dur}ms ${EASE} ${at}ms both` : "none",
  };
}

// Return animation style for SVG stroke-draw
function sa(kf: string, at: number, dur: number, on: boolean): React.CSSProperties {
  return { animation: on ? `${kf} ${dur}ms ease ${at}ms both` : "none" };
}

// ─── Date label ───────────────────────────────────────────────────────────────

function ds(rot: number): React.CSSProperties {
  return {
    display: "block",
    fontFamily: F1,
    fontSize: "clamp(7.5px, 0.75vw, 10.5px)",
    color: DATE_COLOR,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    transform: `rotate(${rot}deg)`,
    transformOrigin: "left center",
    marginBottom: "3px",
  };
}

// ─── Body line ────────────────────────────────────────────────────────────────

function ls(rot: number, p: 1 | 2 = 1): React.CSSProperties {
  return {
    display: "block",
    fontFamily: p === 1 ? F1 : F2,
    fontSize: "clamp(9.5px, 0.95vw, 13px)",
    color: p === 1 ? INK1 : INK2,
    lineHeight: 1.52,
    transform: `rotate(${rot}deg)`,
    transformOrigin: "left center",
    wordBreak: "break-word" as const,
    overflowWrap: "break-word" as const,
  };
}

// ─── CheckRow — checkbox SVG + checkmark SVG + confirmation text ──────────────

interface CR {
  boxAt: number;
  markAt: number;
  textAt: number;
  textDur: number;
  text: string;
  rot: number;
  on: boolean;
}

function CheckRow({ boxAt, markAt, textAt, textDur, text, rot, on }: CR) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "5px",
        marginTop: "3px",
        transform: `rotate(${rot}deg)`,
        transformOrigin: "left center",
      }}
    >
      {/* Box + checkmark drawn together in one SVG */}
      <svg
        width="13"
        height="13"
        viewBox="0 0 16 16"
        fill="none"
        style={{ flexShrink: 0, marginTop: "2px" }}
      >
        {/* Checkbox rectangle — draws first */}
        <rect
          x="1.5"
          y="1.5"
          width="13"
          height="13"
          rx="1.5"
          stroke="#C49A62"
          strokeWidth="1.2"
          strokeDasharray="64"
          strokeDashoffset="64"
          style={sa("drawBox", boxAt, 350, on)}
        />
        {/* Checkmark — draws after box completes */}
        <polyline
          points="3.5,8.5 6.5,12 12.5,4"
          fill="none"
          stroke="#C49A62"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="22"
          strokeDashoffset="22"
          style={sa("drawMark", markAt, 300, on)}
        />
      </svg>

      {/* Confirmation text — Person 2 writing */}
      <span
        style={{
          fontFamily: F2,
          fontSize: "clamp(9px, 0.88vw, 12px)",
          color: INK2,
          lineHeight: 1.45,
          display: "inline-block",
          clipPath: "inset(0 100% 0 0)",
          animation: on
            ? `writeClip ${textDur}ms ${EASE} ${textAt}ms both`
            : "none",
        }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Ellipse doodle — wraps around "Venue confirmed." ────────────────────────

function EllipseDoodle({ at, on }: { at: number; on: boolean }) {
  return (
    <svg
      viewBox="0 0 120 22"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: "-3px",
        left: "-5px",
        width: "calc(100% + 10px)",
        height: "calc(100% + 7px)",
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <ellipse
        cx="60"
        cy="11"
        rx="57"
        ry="9.5"
        fill="none"
        stroke="#C49A62"
        strokeWidth="1.0"
        strokeLinecap="round"
        strokeDasharray="260"
        strokeDashoffset="260"
        style={sa("drawEllipse", at, 720, on)}
      />
    </svg>
  );
}

// ─── Curved underline — under "Everything's ready." ───────────────────────────

function CurvedUnderline({ at, on }: { at: number; on: boolean }) {
  return (
    <svg
      viewBox="0 0 100 6"
      preserveAspectRatio="none"
      style={{
        display: "block",
        width: "58%",
        height: "4px",
        marginTop: "1px",
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <path
        d="M 0 3 Q 25 1.5 50 3 Q 75 4.5 100 3"
        fill="none"
        stroke="rgba(196,154,98,0.48)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="105"
        strokeDashoffset="105"
        style={sa("drawCurve", at, 520, on)}
      />
    </svg>
  );
}

// ─── Tiny arrow — sits next to the "check availability" margin note ──────────

function TinyArrow({ at, on }: { at: number; on: boolean }) {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        marginLeft: "2px",
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <path
        d="M 0 4 L 7 4 M 4.5 1.5 L 7 4 L 4.5 6.5"
        stroke="rgba(196,154,98,0.3)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="18"
        strokeDashoffset="18"
        style={sa("drawArrow", at, 350, on)}
      />
    </svg>
  );
}

// ─── Margin notes data ────────────────────────────────────────────────────────

const MARGIN = [
  { text: "call tomorrow",        at: 1600,  dur: 380, top: "3.5%", rot:  1.1, arrow: false },
  { text: "check availability",   at: 7100,  dur: 490, top: "30%",  rot: -0.7, arrow: true  },
  { text: "confirm payment",      at: 12800, dur: 400, top: "52%",  rot:  0.9, arrow: false },
  { text: "ask for invoice",      at: 18800, dur: 420, top: "69%",  rot: -1.0, arrow: false },
  { text: "don't forget badges",  at: 22300, dur: 560, top: "84%",  rot:  0.8, arrow: false },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function NotebookOverlay() {
  const [on, setOn] = useState(false);

  // Animation begins exactly once, 1 second after mount
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // Entry gap
  const E: React.CSSProperties = { marginBottom: "clamp(5px, 0.5vw, 8px)" };

  return (
    <>
      {/* Inject keyframes into document */}
      <style dangerouslySetInnerHTML={{ __html: KF }} />

      {/*
        ── Overlay geometry ──────────────────────────────────────────────────
        notebook.png is 1024 × 1536 (exactly 2:3).
        The wrapper container is aspect-[2/3] so the image fills it with no
        letterboxing — overlay % coordinates map directly to image pixels.

        Right page visual bounds (measured from the PNG):
          Spine:       ~50% (512px)
          Right edge:  ~96% (983px)
          Top paper:   ~8%  (123px)
          Bottom paper:~92% (1412px)

        Content area with specified margins:
          48px top margin:  8% + 3.1% = ~11.5% → use 12%
          40px outer margin: 96% - 2.6% = ~93%  → right edge at 93%
          Inner gutter (larger, fold side): 50% + 4% = ~54%
          Content width: 93% - 54% = 39% → use 38% (keeps breathing room)
          Content height: 92% - 12% = 80% → use 76%
      */}
      <div
        className="absolute select-none pointer-events-none overflow-hidden"
        style={{
          top: "12%",
          left: "54%",
          width: "38%",
          height: "76%",
          zIndex: 20,
        }}
      >
        {/* ── Margin notes — absolutely positioned on right edge ── */}
        {MARGIN.map((n) => (
          <span
            key={n.text}
            style={{
              position: "absolute",
              right: "1%",
              top: n.top,
              fontFamily: F1,
              fontSize: "clamp(5px, 0.5vw, 7px)",
              color: MARGIN_COLOR,
              transform: `rotate(${n.rot}deg)`,
              transformOrigin: "right center",
              whiteSpace: "nowrap",
              ...wr(n.at, n.dur, on),
            }}
          >
            {n.text}
            {n.arrow && <TinyArrow at={n.at + n.dur + 200} on={on} />}
          </span>
        ))}

        {/* ── Story — flex column, content stacks top-to-bottom ── */}
        <div
          style={{
            paddingLeft: "9%",
            paddingRight: "13%",
            paddingTop: "2%",
            paddingBottom: "1%",
          }}
        >

          {/* ══ March 2 ══ */}
          <div style={E}>
            {/* Date — Person 1 */}
            <span style={{ ...ds(-0.2), ...wr(0, 240, on) }}>March 2</span>
            {/* Tasks — Person 1 */}
            <span style={{ ...ls(0.4), ...wr(380, 560, on) }}>
              Need a photographer
            </span>
            <span style={{ ...ls(-0.3), ...wr(1050, 690, on) }}>
              for the founders meetup.
            </span>
            {/* Confirmation — Person 2 */}
            <CheckRow
              boxAt={2640}
              markAt={3000}
              textAt={3410}
              textDur={640}
              text="Found through Sumedha."
              rot={0.3}
              on={on}
            />
          </div>

          {/* ══ March 5 ══ */}
          <div style={E}>
            <span style={{ ...ds(-0.1), ...wr(5350, 240, on) }}>March 5</span>
            <span style={{ ...ls(0.5), ...wr(5700, 640, on) }}>
              Looking for an AV team
            </span>
            <span style={{ ...ls(-0.4), ...wr(6450, 560, on) }}>
              for the main stage.
            </span>
            <CheckRow
              boxAt={7900}
              markAt={8260}
              textAt={8670}
              textDur={550}
              text="Connected by Onkar."
              rot={0.6}
              on={on}
            />
          </div>

          {/* ══ March 7 ══ */}
          <div style={E}>
            <span style={{ ...ds(0.2), ...wr(10550, 240, on) }}>March 7</span>
            <span style={{ ...ls(-0.3), ...wr(10890, 460, on) }}>
              Speaker arriving
            </span>
            <span style={{ ...ls(0.5), ...wr(11450, 350, on) }}>
              from Mumbai.
            </span>
            <span style={{ ...ls(-0.2), ...wr(11900, 590, on) }}>
              Needs accommodation.
            </span>
            <CheckRow
              boxAt={13390}
              markAt={13750}
              textAt={14160}
              textDur={580}
              text="Sriya knows a place."
              rot={0.35}
              on={on}
            />
          </div>

          {/* ══ March 10 ══ */}
          <div style={E}>
            <span style={{ ...ds(-0.4), ...wr(16200, 265, on) }}>March 10</span>
            <span style={{ ...ls(0.35), ...wr(16570, 680, on) }}>
              Coffee with Navaneethe.
            </span>
            {/*
              "Venue confirmed." has an ellipse doodle drawn around it.
              The outer span is position:relative so the SVG can be absolute.
              The inner span holds the text with the clip-path animation.
            */}
            <span style={{ position: "relative", display: "block" }}>
              <span style={{ ...ls(-0.1), ...wr(17360, 460, on) }}>
                Venue confirmed.
              </span>
              <EllipseDoodle at={18150} on={on} />
            </span>
          </div>

          {/* ══ March 13 ══ */}
          <div style={E}>
            <span style={{ ...ds(0.3), ...wr(19900, 265, on) }}>March 13</span>
            <span style={{ ...ls(-0.2), ...wr(20270, 430, on) }}>
              Need volunteers
            </span>
            <span style={{ ...ls(0.6), ...wr(20810, 520, on) }}>
              for registrations.
            </span>
            <CheckRow
              boxAt={22230}
              markAt={22590}
              textAt={23000}
              textDur={870}
              text="Atharva shared three contacts."
              rot={0.25}
              on={on}
            />
          </div>

          {/* ══ March 16 ══ */}
          <div>
            <span style={{ ...ds(-0.3), ...wr(25200, 265, on) }}>March 16</span>
            <span style={{ ...ls(0.5), ...wr(25570, 550, on) }}>
              Everything&apos;s ready.
            </span>
            {/* Curved underline drawn beneath */}
            <CurvedUnderline at={26380} on={on} />
          </div>

          {/* ══ Next event... — small afterthought, bottom-right ══ */}
          <div
            style={{
              marginTop: "clamp(3px, 0.3vw, 5px)",
              paddingLeft: "35%",
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontFamily: F1,
                fontSize: "clamp(6.5px, 0.62vw, 8.5px)",
                color: LAST_COLOR,
                transform: "rotate(0.8deg)",
                transformOrigin: "left center",
                letterSpacing: "0.04em",
                ...wr(27150, 380, on),
              }}
            >
              Next event...
            </span>
          </div>

        </div>
      </div>
    </>
  );
}
