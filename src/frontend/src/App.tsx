import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { Blog } from "./components/sections/Blog";
import { Chatbot } from "./components/sections/Chatbot";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import { Hero } from "./components/sections/Hero";
import { Navbar } from "./components/sections/Navbar";
import { Portfolio } from "./components/sections/Portfolio";
import { Services } from "./components/sections/Services";
import { Stats } from "./components/sections/Stats";
import { Team } from "./components/sections/Team";
import { Testimonials } from "./components/sections/Testimonials";
import { useSeedData } from "./hooks/useQueries";

// Scroll reveal hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".reveal");
    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, []);
}

// Custom cursor hook
function useCustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    const trail = document.getElementById("cursor-trail");
    if (!cursor || !trail) return;

    let trailX = 0;
    let trailY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let animId: number;

    const moveCursor = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursor.style.left = `${cursorX - 6}px`;
      cursor.style.top = `${cursorY - 6}px`;
    };

    const animateTrail = () => {
      trailX += (cursorX - trailX) * 0.1;
      trailY += (cursorY - trailY) * 0.1;
      trail.style.left = `${trailX - 15}px`;
      trail.style.top = `${trailY - 15}px`;
      animId = requestAnimationFrame(animateTrail);
    };

    document.addEventListener("mousemove", moveCursor);
    animId = requestAnimationFrame(animateTrail);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animId);
    };
  }, []);
}

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.colorScheme = "light";
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Seed data on first load
  useSeedData();

  // Enable scroll reveal
  useScrollReveal();

  // Enable custom cursor (desktop only)
  useCustomCursor();

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : "light"}`}>
      {/* Custom cursor elements */}
      <div id="custom-cursor" className="hidden md:block" />
      <div id="cursor-trail" className="hidden md:block" />

      <Toaster richColors />

      {/* Navigation */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* Main content */}
      <main>
        {/* Hero */}
        <Hero />

        {/* Services */}
        <Services />

        {/* Portfolio */}
        <Portfolio />

        {/* Stats */}
        <Stats />

        {/* Testimonials */}
        <Testimonials />

        {/* Team */}
        <Team />

        {/* Blog */}
        <Blog />

        {/* Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}
