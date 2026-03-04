import {
  Code2,
  Layers,
  Palette,
  PenTool,
  TrendingUp,
  Video,
} from "lucide-react";
import { useEffect, useRef } from "react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Full-stack web applications built with cutting-edge technologies. From React frontends to robust backends, we deliver performance-first solutions.",
    gradient: "from-orange-500 to-red-500",
    glow: "oklch(0.68 0.22 35)",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centered interfaces that delight and convert. We craft intuitive experiences backed by research, prototyping, and pixel-perfect execution.",
    gradient: "from-pink-500 to-purple-500",
    glow: "oklch(0.65 0.25 330)",
  },
  {
    icon: Layers,
    title: "Branding",
    description:
      "Strategic brand identities that resonate and stick. Logo design, brand guidelines, tone of voice — everything you need to stand out.",
    gradient: "from-yellow-400 to-orange-500",
    glow: "oklch(0.82 0.2 85)",
  },
  {
    icon: PenTool,
    title: "Graphic Design",
    description:
      "Visual content that communicates your message powerfully. Posters, infographics, social assets, and print materials with creative edge.",
    gradient: "from-blue-500 to-cyan-500",
    glow: "oklch(0.7 0.15 220)",
  },
  {
    icon: Video,
    title: "Video Editing",
    description:
      "Cinematic video content that captures attention in seconds. Motion graphics, brand films, reels, and promotional videos crafted for impact.",
    gradient: "from-purple-500 to-indigo-500",
    glow: "oklch(0.55 0.22 280)",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Data-driven campaigns that grow your audience and revenue. SEO, social media strategy, paid ads, and analytics reporting.",
    gradient: "from-green-500 to-teal-500",
    glow: "oklch(0.65 0.2 160)",
  },
];

function useScrollReveal(ref: React.RefObject<Element | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((child, i) => {
            setTimeout(() => child.classList.add("visible"), i * 100);
          });
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.68 0.22 35 / 0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-primary/30 text-sm font-medium text-spark-orange mb-4">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
            Our <span className="text-gradient-spark">Services</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            We deliver end-to-end digital solutions that help businesses grow,
            inspire audiences, and dominate their markets.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                data-ocid={`services.card.${index + 1}`}
                className="service-card glass rounded-2xl p-7 cursor-pointer reveal group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${service.glow}22 0%, ${service.glow}11 100%)`,
                    border: `1px solid ${service.glow}33`,
                    boxShadow: `0 0 20px ${service.glow}20`,
                  }}
                >
                  <Icon
                    className="w-7 h-7 transition-all duration-300"
                    style={{ color: service.glow }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold font-display text-foreground mb-3 group-hover:text-gradient-spark transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom border glow on hover */}
                <div
                  className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${service.glow}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
