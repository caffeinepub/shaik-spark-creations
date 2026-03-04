import { Award, Lightbulb, TrendingUp, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGetStats } from "../../hooks/useQueries";

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

function useAnimatedCounter(target: number, started: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started || target === 0) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress >= 1) clearInterval(interval);
    }, 16);

    return () => clearInterval(interval);
  }, [target, duration, started]);

  return count;
}

function StatCard({
  stat,
  started,
  index,
}: {
  stat: StatItem;
  started: boolean;
  index: number;
}) {
  const count = useAnimatedCounter(stat.value, started, 2000 + index * 200);
  const Icon = stat.icon;

  return (
    <div
      className="glass rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300"
      style={{
        border: `1px solid ${stat.color}22`,
        boxShadow: started ? `0 0 30px ${stat.color}15` : "none",
        transition: "box-shadow 0.5s ease, transform 0.3s ease",
      }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${stat.color}15`,
          border: `1px solid ${stat.color}30`,
        }}
      >
        <Icon className="w-7 h-7" style={{ color: stat.color }} />
      </div>

      {/* Number */}
      <div
        className="text-5xl sm:text-6xl font-bold font-display mb-2 transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${stat.color}, oklch(0.95 0.01 0))`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count.toLocaleString()}
        {stat.suffix}
      </div>

      {/* Label */}
      <p className="text-foreground/60 text-base font-medium">{stat.label}</p>

      {/* Animated bottom bar */}
      <div
        className="mt-4 h-0.5 w-0 mx-auto rounded-full transition-all duration-1000 group-hover:w-3/4"
        style={{
          background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
        }}
      />
    </div>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const { data: stats } = useGetStats();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const statItems: StatItem[] = [
    {
      icon: TrendingUp,
      value: Number(stats?.projectCount ?? 120),
      suffix: "+",
      label: "Projects Completed",
      color: "oklch(0.68 0.22 35)",
    },
    {
      icon: Users,
      value: Number(stats?.clientCount ?? 85),
      suffix: "+",
      label: "Happy Clients",
      color: "oklch(0.82 0.2 85)",
    },
    {
      icon: Lightbulb,
      value: Number(stats?.expertCount ?? 15),
      suffix: "+",
      label: "Creative Experts",
      color: "oklch(0.65 0.25 330)",
    },
    {
      icon: Award,
      value: Number(stats?.yearsOfExperience ?? 5),
      suffix: "+",
      label: "Years Experience",
      color: "oklch(0.7 0.15 220)",
    },
  ];

  return (
    <section
      className="section-padding relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.14 0.04 280 / 0.5) 0%, oklch(0.12 0.02 255) 50%, oklch(0.14 0.03 300 / 0.3) 100%)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.68 0.22 35 / 0.3), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.68 0.22 35 / 0.3), transparent)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-primary/30 text-sm font-medium text-spark-orange mb-4">
            By the Numbers
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
            Our <span className="text-gradient-spark">Impact</span>
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            Proven results backed by years of dedication and innovation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statItems.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              started={started}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
