import Hero from "@/components/Hero";
import EarlyAccess from "@/components/EarlyAccess";

import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col relative z-0">
      <Hero />
      <EarlyAccess />
      <Footer />
      
      {/* Cinematic Background Layer */}
      <div className="cinematic-bg" />
      <div className="grain-overlay" />
    </main>
  );
}
