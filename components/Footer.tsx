import React from "react";

export default function Footer() {
  return (
    <footer className="w-full px-12 pb-12 pt-8 flex items-center justify-between text-[11px] font-sans tracking-wide text-[#F3ECE5] opacity-[20%] mt-auto max-w-[1600px] mx-auto relative z-20">
      <div className="hover:opacity-100 transition-opacity duration-300 cursor-default">
        &copy; Sahn 2024
      </div>
      
      <div className="flex items-center gap-8">
        <a href="#" className="hover:opacity-100 transition-opacity duration-300">
          Instagram
        </a>
        <a href="#" className="hover:opacity-100 transition-opacity duration-300">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
