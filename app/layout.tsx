import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Caveat } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import CinematicBackground from "@/components/CinematicBackground";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAHN",
  description: "The place where the people behind great events find each other.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.variable} ${cormorant.variable} ${caveat.variable} min-h-full flex flex-col font-sans`}>
        <SmoothScroll>
          <CinematicBackground />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
