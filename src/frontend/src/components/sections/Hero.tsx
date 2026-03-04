import { ArrowRight, Play, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TYPEWRITER_PHRASES = [
  "Igniting Creativity with Digital Innovation",
  "We Build Stunning Web Experiences",
  "Branding That Sparks Recognition",
  "Transforming Ideas Into Digital Reality",
];

function useTypewriter(phrases: string[], speed = 60, pause = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (charIndex < current.length) {
            setDisplayText(current.slice(0, charIndex + 1));
            setCharIndex((c) => c + 1);
          } else {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(current.slice(0, charIndex - 1));
            setCharIndex((c) => c - 1);
          } else {
            setDeleting(false);
            setPhraseIndex((p) => (p + 1) % phrases.length);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex, phrases, speed, pause]);

  return displayText;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const colors = [
      "oklch(0.68 0.22 35)", // orange
      "oklch(0.82 0.2 85)", // gold
      "oklch(0.65 0.25 330)", // pink
      "oklch(0.7 0.15 260)", // blue-purple
    ];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.2,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.pulse += p.pulseSpeed;
        const opacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
      }

      // Draw subtle connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 100) * 0.08;
            ctx.strokeStyle = "oklch(0.68 0.22 35)";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

export function Hero() {
  const displayText = useTypewriter(TYPEWRITER_PHRASES);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--spark-bg)" }}
    >
      {/* Particle Background */}
      <ParticleCanvas />

      {/* Background gradient orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* Large orange orb */}
        <div
          className="absolute w-96 h-96 rounded-full animate-float"
          style={{
            background:
              "radial-gradient(circle, oklch(0.68 0.22 35 / 0.15) 0%, transparent 70%)",
            top: "10%",
            right: "5%",
            filter: "blur(40px)",
          }}
        />
        {/* Gold orb */}
        <div
          className="absolute w-80 h-80 rounded-full animate-float-delayed"
          style={{
            background:
              "radial-gradient(circle, oklch(0.82 0.2 85 / 0.12) 0%, transparent 70%)",
            bottom: "10%",
            left: "5%",
            filter: "blur(40px)",
          }}
        />
        {/* Pink orb */}
        <div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.25 330 / 0.1) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Floating spark icons */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 2 }}
      >
        {[
          {
            id: "spark-1",
            top: "15%",
            left: "8%",
            delay: "0s",
            size: "w-6 h-6",
          },
          {
            id: "spark-2",
            top: "25%",
            right: "12%",
            delay: "1s",
            size: "w-4 h-4",
          },
          {
            id: "spark-3",
            top: "65%",
            left: "15%",
            delay: "2s",
            size: "w-5 h-5",
          },
          {
            id: "spark-4",
            top: "75%",
            right: "8%",
            delay: "0.5s",
            size: "w-6 h-6",
          },
          {
            id: "spark-5",
            top: "40%",
            left: "3%",
            delay: "1.5s",
            size: "w-3 h-3",
          },
          {
            id: "spark-6",
            top: "55%",
            right: "5%",
            delay: "2.5s",
            size: "w-4 h-4",
          },
        ].map((pos) => (
          <div
            key={pos.id}
            className="absolute animate-float"
            style={{
              top: pos.top,
              left: "left" in pos ? pos.left : undefined,
              right: "right" in pos ? pos.right : undefined,
              animationDelay: pos.delay,
            }}
          >
            <Zap
              className={`${pos.size} text-spark-orange/40`}
              fill="currentColor"
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-foreground/80 mb-8 animate-fade-in">
          <Zap className="w-3.5 h-3.5 text-spark-orange" fill="currentColor" />
          <span>Creative Digital Studio</span>
          <span className="w-1.5 h-1.5 rounded-full bg-spark-orange animate-pulse" />
        </div>

        {/* Typewriter heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6">
          <span className="text-gradient-spark">
            {displayText}
            <span
              className="inline-block w-1 h-[0.85em] ml-1 bg-spark-orange align-middle"
              style={{ animation: "blink 1s step-end infinite" }}
            />
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-foreground/60 mb-10 font-medium tracking-wide animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          Web Design
          <span className="mx-3 text-spark-orange">•</span>
          Branding
          <span className="mx-3 text-spark-orange">•</span>
          Creative Technology
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={() => scrollTo("portfolio")}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl btn-spark text-white font-semibold text-lg shadow-spark hover:shadow-spark-lg transition-all duration-300"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            View Portfolio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={() => scrollTo("contact")}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl btn-glass font-semibold text-lg"
          >
            <Zap className="w-5 h-5 text-spark-orange group-hover:rotate-12 transition-transform" />
            Start a Project
          </button>
        </div>

        {/* Stats row */}
        <div
          className="flex items-center justify-center gap-8 sm:gap-12 mt-16 animate-fade-in-up"
          style={{ animationDelay: "0.7s" }}
        >
          {[
            { value: "120+", label: "Projects" },
            { value: "85+", label: "Clients" },
            { value: "5+", label: "Years" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gradient-spark font-display">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-foreground/50 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/30 animate-bounce">
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
