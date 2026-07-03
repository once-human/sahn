import React from "react";

export default function Footer() {
  return (
    <footer className="w-full px-12 py-10 flex items-center justify-between text-[11px] font-sans tracking-wide text-[#F2ECE5]/40 mt-auto">
      <div>
        &copy; SAHN 2025
      </div>
      
      <div className="flex items-center gap-8">
        <a href="#" className="hover:text-[#F2ECE5]/80 transition-colors duration-300">
          Instagram
        </a>
        <a href="#" className="hover:text-[#F2ECE5]/80 transition-colors duration-300">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
