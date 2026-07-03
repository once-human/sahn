import Hero from "@/components/Hero";
import Features from "@/components/Features";
import EarlyAccess from "@/components/EarlyAccess";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col relative z-0">
      <Hero />
      <Features />
      <EarlyAccess />
      <Footer />
      
      {/* Cinematic Background Layer */}
      <div className="cinematic-bg" />
      <div className="grain-overlay" />
    </main>
  );
}
