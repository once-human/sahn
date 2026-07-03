import React from "react";

export default function Features() {
  return (
    <section className="w-full bg-transparent text-[#F2ECE5] px-12 py-32 flex flex-col items-center">
      <div className="w-full max-w-[1200px]">
        <h2 className="font-serif text-[2.5rem] leading-[1.2] font-medium tracking-tight mb-24">
          Built on trust. Designed for people.
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8 w-full">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="mb-8 h-12 flex items-center justify-center">
              <svg 
                width="36" height="36" viewBox="0 0 24 24" 
                fill="none" stroke="#E5D2BA" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-[15px] font-medium tracking-wide mb-4">Real connections</h3>
            <p className="text-[14px] text-[rgba(242,236,229,0.60)] leading-[1.6] max-w-[200px]">
              We connect you with<br />people, not just profiles.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="mb-8 h-12 flex items-center justify-center">
              <svg 
                width="32" height="36" viewBox="0 0 24 24" 
                fill="none" stroke="#E5D2BA" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-[15px] font-medium tracking-wide mb-4">Trusted by organizers</h3>
            <p className="text-[14px] text-[rgba(242,236,229,0.60)] leading-[1.6] max-w-[220px]">
              Verified professionals.<br />Personal recommendations.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="mb-8 h-12 flex items-center justify-center">
              <svg 
                width="34" height="34" viewBox="0 0 24 24" 
                fill="none" stroke="#E5D2BA" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h3 className="text-[15px] font-medium tracking-wide mb-4">Stronger together</h3>
            <p className="text-[14px] text-[rgba(242,236,229,0.60)] leading-[1.6] max-w-[200px]">
              Communities that help<br />each other grow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
