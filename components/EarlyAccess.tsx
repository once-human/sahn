"use client";

import React, { useState } from "react";

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setMessage("You're on the list.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Failed to join. Please try again.");
    }
  };

  return (
    <section className="w-full text-[#F3ECE5] px-12 py-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-[600px] text-center">
        <h2 className="font-serif text-[2.5rem] leading-[1.2] font-[500] tracking-tight mb-4">
          Starting with Pune and Bengaluru.
        </h2>
        <p className="text-[15px] text-[#F3ECE5] opacity-[58%] mb-12">
          Get early access and be part of the first community.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-[500px] mx-auto relative">
          <div className="flex-1 w-full relative">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading" || status === "success"}
              className="w-full bg-transparent border-b border-[#3A2E25] px-2 py-3 text-[15px] text-[#F3ECE5] placeholder:text-[#F3ECE5] placeholder:opacity-[30%] focus:outline-none focus:border-[#F3ECE5]/50 transition-colors disabled:opacity-50"
            />
            {message && (
              <p className={`absolute -bottom-8 left-0 text-[13px] ${status === 'success' ? 'text-[#C9A470]' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="group inline-flex items-center text-[#F3ECE5] text-[15px] font-medium relative pt-2"
          >
            <span className="relative pb-1">
              {status === "loading" ? "Joining..." : status === "success" ? "Joined" : "Join early access"}
              {status === "idle" && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F3ECE5]/30 origin-left transition-transform duration-400 ease-out group-hover:scale-x-110" />
              )}
            </span>
            {status === "idle" && (
              <span className="ml-4 transform transition-transform duration-400 ease-out group-hover:translate-x-[4px] inline-block font-serif text-lg pb-1">
                →
              </span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
