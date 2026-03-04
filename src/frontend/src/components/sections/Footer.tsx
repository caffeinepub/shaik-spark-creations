import { Heart, Zap } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiX,
  SiYoutube,
} from "react-icons/si";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  "Web Development",
  "UI/UX Design",
  "Branding",
  "Graphic Design",
  "Video Editing",
  "Digital Marketing",
];

const SOCIAL_LINKS = [
  { icon: SiX, href: "https://twitter.com/shaiksparkcreations", label: "X" },
  {
    icon: SiInstagram,
    href: "https://instagram.com/shaiksparkcreations",
    label: "Instagram",
  },
  {
    icon: SiLinkedin,
    href: "https://linkedin.com/company/shaiksparkcreations",
    label: "LinkedIn",
  },
  {
    icon: SiFacebook,
    href: "https://facebook.com/shaiksparkcreations",
    label: "Facebook",
  },
  {
    icon: SiYoutube,
    href: "https://youtube.com/@shaiksparkcreations",
    label: "YouTube",
  },
];

export function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.02 255) 0%, oklch(0.10 0.025 260) 100%)",
        }}
      />

      {/* Orange top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.68 0.22 35 / 0.5) 30%, oklch(0.82 0.2 85 / 0.5) 60%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <button
              type="button"
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-2 group w-fit"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-spark flex items-center justify-center shadow-spark">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-lg font-bold font-display">
                <span className="text-gradient-spark">Shaik Spark</span>
              </span>
            </button>

            <p className="text-foreground/50 text-sm leading-relaxed max-w-xs">
              We ignite creativity and transform digital visions into
              extraordinary realities. Your success is our spark.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 flex-wrap">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl glass flex items-center justify-center text-foreground/50 hover:text-spark-orange hover:border-spark-orange/30 transition-all duration-200 hover:shadow-spark"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold font-display text-foreground mb-5 text-base">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-ocid="nav.link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-foreground/50 hover:text-spark-orange text-sm transition-colors duration-200 hover-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold font-display text-foreground mb-5 text-base">
              Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service}>
                  <button
                    type="button"
                    onClick={() => scrollTo("#services")}
                    className="text-foreground/50 hover:text-spark-orange text-sm transition-colors duration-200 hover-underline text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold font-display text-foreground mb-5 text-base">
              Stay Updated
            </h4>
            <p className="text-foreground/50 text-sm mb-4 leading-relaxed">
              Get the latest design trends and creative insights delivered to
              your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email..."
                className="flex-1 min-w-0 px-3 py-2.5 rounded-xl text-sm glass border border-border/50 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50"
              />
              <button
                type="button"
                className="px-4 py-2.5 rounded-xl btn-spark text-white text-sm font-semibold shrink-0"
              >
                <Zap className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border/50 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground/40 text-sm">
            © {currentYear} Shaik Spark Creations. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/40 hover:text-foreground/70 text-sm transition-colors flex items-center gap-1.5"
          >
            Built with{" "}
            <Heart className="w-3.5 h-3.5 text-spark-orange fill-spark-orange" />{" "}
            using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
