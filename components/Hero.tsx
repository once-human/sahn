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
      <header className="absolute top-0 left-0 w-full flex items-center justify-between px-6 lg:px-12 pt-8 lg:pt-14 pb-8 z-50">
        <div className="font-sans text-[11px] uppercase tracking-[0.4em] font-medium text-[#F4EEE7]">
          S A H N
        </div>
        
        <nav className="flex items-center gap-6 lg:gap-12 text-[#F2ECE5] text-[13px] font-medium tracking-wide">
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity duration-300">
            About
          </a>
          <a 
            href="#" 
            className="flex items-center gap-[6px] border border-[#3A2E25] px-5 py-2.5 rounded-[10px] hover:border-[#554639] transition-colors duration-300"
          >
            <span className="opacity-90">Join early access</span>
            <span className="w-[5px] h-[5px] rounded-full bg-[#E5D2BA] block ml-1" />
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col lg:flex-row mt-24 lg:mt-0 border-b border-[#3A2E25]/30 bg-[#0D0D0D]">
        
        {/* Left Column */}
        <div className="w-full lg:w-[45%] h-auto lg:h-full flex flex-col justify-center px-12 lg:pl-[12%] lg:pr-[5%] pt-10 lg:pb-0 pb-12 z-10 relative">
          <h1 className="font-serif text-[#F2ECE5] text-[4.5rem] leading-[1.02] font-medium tracking-tight mb-6">
            Every great<br />
            event begins<br />
            with a plan.
          </h1>
          
          <div className="flex flex-col gap-[18px] text-[rgba(242,236,229,0.60)] text-[1.05rem] leading-[1.6] max-w-[28rem] font-sans mb-10">
            <p>
              It comes to life with the<br />right people.
            </p>
            <p>
              Sahn helps organizers find the people<br />
              they can trust, before the event begins.
            </p>
          </div>
          
          <div>
            <a href="#" className="group inline-flex items-center text-[#F2ECE5] text-[15px] font-medium relative pb-2">
              <span>Join early access</span>
              <span className="ml-4 transform transition-transform duration-[400ms] ease-out group-hover:translate-x-[6px] inline-block font-serif text-lg">
                →
              </span>
              <span className="absolute bottom-0 left-0 w-[calc(100%-1.25rem)] h-[1px] bg-[#F2ECE5]/30" />
            </a>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="w-full lg:w-[55%] h-[60vh] lg:h-full relative flex items-center justify-center pt-8 pb-16 lg:pb-0">
          <motion.div 
            style={{ x, y }} 
            className="absolute lg:-right-[5%] lg:-top-[5%] w-[150%] lg:w-[175%] max-w-[1400px] aspect-[4/3] flex-shrink-0 z-0 pointer-events-none"
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
                className="object-contain relative z-10 transform -rotate-[3deg] [filter:drop-shadow(30px_40px_50px_rgba(0,0,0,0.85))_drop-shadow(15px_20px_20px_rgba(0,0,0,0.7))_drop-shadow(5px_5px_10px_rgba(0,0,0,0.9))]"
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
