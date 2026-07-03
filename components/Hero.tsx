"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 50, stiffness: 100, mass: 2 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const x = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const y = useTransform(springY, [-0.5, 0.5], [-6, 6]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const xPct = e.clientX / innerWidth - 0.5;
      const yPct = e.clientY / innerHeight - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden flex flex-col">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-10 z-50">
        <div className="font-sans text-[11px] uppercase tracking-[0.4em] font-medium text-[#F4EEE7]">
          S A H N
        </div>
        
        <nav className="flex items-center gap-8 text-[#F4EEE7] text-sm">
          <a href="#" className="opacity-80 hover:opacity-100 transition-opacity duration-300">
            About
          </a>
          <a 
            href="#" 
            className="flex items-center gap-2 border border-white/10 px-5 py-2.5 rounded-[10px] opacity-90 hover:opacity-100 hover:border-white/30 transition-all duration-300"
          >
            <span>Join early access</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4EEE7]/60 block" />
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full flex">
        
        {/* Left Column */}
        <div className="w-[42%] h-full flex flex-col justify-center pl-[12%] pr-[5%] pt-10">
          <h1 className="font-serif text-[#F4EEE7] text-[4.5rem] leading-[1.05] font-medium tracking-tight mb-8">
            Every great<br />
            event begins<br />
            with a plan.
          </h1>
          
          <div className="flex flex-col gap-6 text-[#F4EEE7]/60 text-lg leading-[1.6] max-w-[28rem] font-sans mb-12">
            <p>
              It comes to life with the<br />right people.
            </p>
            <p className="text-[0.95rem]">
              Sahn helps organizers find the people<br />
              they can trust, before the event begins.
            </p>
          </div>
          
          <div>
            <a href="#" className="group inline-flex items-center text-[#F4EEE7] text-[15px] font-medium relative pb-1.5">
              <span>Join early access</span>
              <span className="ml-3 transform transition-transform duration-[400ms] ease-out group-hover:translate-x-1 inline-block font-serif text-lg">
                →
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F4EEE7]/30 transition-colors duration-[400ms] group-hover:bg-[#F4EEE7]" />
            </a>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="w-[58%] h-full relative flex items-center justify-center pt-8">
          <motion.div 
            style={{ x, y }} 
            className="relative w-[150%] max-w-[1350px] aspect-[4/3]"
          >
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full h-full relative"
            >
              <Image 
                src="/notebook.png"
                alt="Sahn Notebook"
                fill
                className="object-contain relative z-10 transform -rotate-[3deg] [filter:drop-shadow(0_30px_40px_rgba(0,0,0,0.85))_drop-shadow(0_10px_15px_rgba(0,0,0,0.6))]"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </motion.div>
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}
