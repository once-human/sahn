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
    <section className="w-full px-12 py-48 flex flex-col items-center justify-center relative z-20">
      <div className="w-full max-w-[600px] text-center">
        <h2 className="font-sans text-[18px] text-[#F5F1EB] leading-[1.6] mb-4">
          Starting with Pune and Bengaluru.
        </h2>
        <p className="text-[12px] text-[#A79D95] uppercase tracking-[0.18em] mb-16 font-medium">
          Be part of the first community
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
              className="w-full bg-transparent border-b border-[rgba(199,160,106,0.25)] px-2 py-4 text-[18px] text-[#F5F1EB] placeholder:text-[#A79D95] placeholder:opacity-50 focus:outline-none focus:border-[rgba(199,160,106,0.5)] transition-colors disabled:opacity-50"
            />
            {message && (
              <p className={`absolute -bottom-8 left-0 text-[12px] ${status === 'success' ? 'text-[#C7A06A]' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="group inline-flex items-center text-[#F5F1EB] text-[18px] relative pt-2"
          >
            <span className="relative pb-1">
              {status === "loading" ? "Joining..." : status === "success" ? "Joined" : "Join waitlist"}
              {status === "idle" && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[rgba(199,160,106,0.35)] origin-left transition-transform duration-400 ease-out group-hover:scale-x-110" />
              )}
            </span>
            {status === "idle" && (
              <span className="ml-4 transform transition-transform duration-400 ease-out group-hover:translate-x-[4px] inline-block font-serif text-[18px] pb-1 text-[#C7A06A]">
                →
              </span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
