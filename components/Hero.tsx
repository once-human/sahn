"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax setup for mouse movement only (6px translation, no rotation)
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
    <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden flex flex-col items-center">
      
      {/* 
        This bloom sits behind everything in the Hero to give the notebook 
        a very faint warm separation as requested (Layer 5).
      */}
      <div className="notebook-bloom" />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between px-6 lg:px-12 pt-8 lg:pt-14 pb-8 z-50 max-w-[1600px] mx-auto right-0">
        <div className="font-sans text-[11px] uppercase tracking-[0.65em] font-medium text-[#F4EEE7]">
          S A H N
        </div>
        
        <nav className="flex items-center gap-6 lg:gap-12 text-[#F2ECE5] text-[13px] font-medium tracking-wide">
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity duration-300">
            About
          </a>
          <a 
            href="#" 
            className="flex items-center gap-[6px] border border-[rgba(201,164,112,0.35)] px-[16px] py-[10px] rounded-[10px] hover:border-[rgba(201,164,112,0.7)] transition-colors duration-300"
          >
            <span className="opacity-90">Join early access</span>
            <span className="w-[5px] h-[5px] rounded-full bg-[#C9A470] block ml-1" />
          </a>
        </nav>
      </header>

      {/* Main Content (Max 1600px, 45/55 split) */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row mt-24 lg:mt-0 relative z-10">
        
        {/* Left Column (45%) */}
        <div className="w-full lg:w-[45%] h-auto lg:h-full flex flex-col justify-center px-12 lg:pl-[12%] lg:pr-[5%] pt-10 lg:pb-0 pb-12 z-20">
          <h1 className="font-serif text-[#F3ECE5] text-[4.5rem] leading-[0.95] font-[500] tracking-tight mb-6">
            Every great<br />
            event begins<br />
            with a plan.
          </h1>
          
          <div className="flex flex-col gap-[18px] text-[#F3ECE5] opacity-[58%] text-[1.05rem] leading-[1.6] max-w-[28rem] font-sans mb-12">
            <p>
              It comes to life with the<br />right people.
            </p>
            <p>
              Sahn helps organizers find the people<br />
              they can trust, before the event begins.
            </p>
          </div>
          
          <div>
            <a href="#" className="group inline-flex items-center text-[#F3ECE5] text-[15px] font-medium relative">
              <span className="relative pb-1">
                Join early access
                {/* Underline begins underneath text only, expands on hover */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F2ECE5]/30 origin-left transition-transform duration-400 ease-out group-hover:scale-x-110" />
              </span>
              <span className="ml-4 transform transition-transform duration-400 ease-out group-hover:translate-x-[4px] inline-block font-serif text-lg pb-1">
                →
              </span>
            </a>
          </div>
        </div>
        
        {/* Right Column (55%) */}
        <div className="w-full lg:w-[55%] h-[60vh] lg:h-full relative flex items-center justify-center pt-8 pb-16 lg:pb-0 z-10">
          {/* 
            Notebook Wrapper
            +20% larger than previous, translated left ~70px, up ~35px.
          */}
          <motion.div 
            style={{ x, y }} 
            className="relative w-[115%] max-w-[1080px] aspect-[4/3] flex-shrink-0 -ml-[70px] -mt-[35px] pointer-events-none"
          >
            {/* Vertical floating only (max 2px, 12s, easeInOut) */}
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full h-full relative"
            >
              
              {/* 
                Custom Shadows underneath the notebook.
                Notebook is rotated -3deg, shadows follow it roughly.
              */}
              <div className="absolute inset-0 z-0 transform -rotate-[3deg]">
                {/* Large ambient shadow (Very soft, large, 10% opacity, falls down & right) */}
                <div className="absolute top-[10%] left-[10%] w-[90%] h-[90%] bg-black/10 blur-[80px] rounded-[20px] translate-x-[50px] translate-y-[50px]" />
                
                {/* Medium shadow (Wide, soft, 22% opacity) */}
                <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] bg-black/22 blur-[40px] rounded-[10px] translate-x-[30px] translate-y-[30px]" />
                
                {/* Contact shadow (Small, very dark, immediately below) */}
                <div className="absolute top-[2%] left-[2%] w-[95%] h-[95%] bg-black/60 blur-[15px] rounded-[5px] translate-x-[10px] translate-y-[15px]" />
              </div>

              <Image 
                src="/notebook.png"
                alt="Sahn Notebook"
                fill
                className="object-contain relative z-10 transform -rotate-[3deg]"
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
