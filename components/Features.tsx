"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.1 * i,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const headingVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      className="w-full text-[#F3ECE5] px-12 py-32 flex flex-col items-center"
    >
      <div className="w-full max-w-[1200px]">
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-serif text-[2.5rem] leading-[1.2] font-[500] tracking-tight mb-24"
        >
          Built on trust. Designed for people.
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8 w-full">
          {[
            {
              label: "Real connections",
              desc: "We connect you with people, not just profiles.",
              icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A470" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ),
            },
            {
              label: "Trusted by organizers",
              desc: "Verified professionals. Personal recommendations.",
              icon: (
                <svg width="32" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A470" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
            },
            {
              label: "Stronger together",
              desc: "Communities that help each other grow.",
              icon: (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C9A470" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ),
            },
          ].map((feat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col items-center text-center flex-1"
            >
              <div className="mb-8 h-12 flex items-center justify-center">{feat.icon}</div>
              <h3 className="text-[15px] font-medium tracking-wide mb-4">{feat.label}</h3>
              <p className="text-[14px] text-[#F3ECE5] opacity-[58%] leading-[1.6] max-w-[220px]">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
