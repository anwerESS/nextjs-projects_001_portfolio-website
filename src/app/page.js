"use client"; // unnecessary (it's a good pratice to have as many SSC as possible)
import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
    </div>
  );
}
