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
    <section className="w-full bg-[#0D0D0D] border-b border-[#3A2E25]/30 text-[#F2ECE5] px-12 py-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-[600px] text-center">
        <h2 className="font-serif text-[2.5rem] leading-[1.2] font-medium tracking-tight mb-4">
          Starting with Pune and Bengaluru.
        </h2>
        <p className="text-[15px] text-[rgba(242,236,229,0.60)] mb-12">
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
              className="w-full bg-transparent border-b border-[#3A2E25] px-2 py-3 text-[15px] text-[#F2ECE5] placeholder:text-[#F2ECE5]/30 focus:outline-none focus:border-[#F2ECE5]/50 transition-colors disabled:opacity-50"
            />
            {message && (
              <p className={`absolute -bottom-8 left-0 text-[13px] ${status === 'success' ? 'text-[#E5D2BA]' : 'text-red-400'}`}>
                {message}
              </p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="group flex items-center gap-[6px] border border-[#3A2E25] px-6 py-2.5 rounded-[10px] hover:border-[#554639] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            <span className="opacity-90 text-[13px] font-medium tracking-wide">
              {status === "loading" ? "Joining..." : status === "success" ? "Joined" : "Join early access"}
            </span>
            <span className="ml-2 transform transition-transform duration-[400ms] ease-out group-hover:translate-x-1 inline-block font-serif text-lg opacity-90">
              →
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}
