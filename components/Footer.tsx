import React from "react";

export default function Footer() {
  return (
    <footer className="w-full px-12 pb-12 pt-8 flex items-center justify-between text-[11px] font-sans tracking-wide text-[#6F6761] mt-auto max-w-[1600px] mx-auto relative z-20">
      <div className="hover:text-[#A79D95] transition-colors duration-300 cursor-default flex items-center gap-[6px] tracking-[0.2em] uppercase">
        <span>&copy; SAHN {new Date().getFullYear()}</span>
      </div>
      
      <div className="flex items-center gap-8">
        <a href="#" className="hover:text-[#A79D95] transition-colors duration-300">
          Instagram
        </a>
        <a href="#" className="hover:text-[#A79D95] transition-colors duration-300">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
