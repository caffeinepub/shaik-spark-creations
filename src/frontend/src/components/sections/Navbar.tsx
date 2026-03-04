import { Menu, Moon, Sun, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = [
        "home",
        "services",
        "portfolio",
        "about",
        "blog",
        "contact",
      ];
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-white/10 shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-spark flex items-center justify-center shadow-spark group-hover:shadow-spark-lg transition-shadow duration-300">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-lg font-bold font-display hidden sm:block">
              <span className="text-gradient-spark">Shaik Spark</span>
              <span className="text-foreground/80 ml-1 font-medium">
                Creations
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <button
                type="button"
                key={link.label}
                data-ocid="nav.link"
                onClick={() => scrollToSection(link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-underline ${
                  activeSection === link.href.replace("#", "")
                    ? "text-gradient-spark"
                    : "text-foreground/70 hover:text-foreground"
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side: theme toggle + hamburger */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              type="button"
              data-ocid="nav.toggle"
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-xl glass flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-primary/50 transition-all duration-200 hover:shadow-spark"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* CTA button - desktop */}
            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl btn-spark text-sm font-semibold text-white"
            >
              <Zap className="w-3.5 h-3.5" />
              Get Started
            </button>

            {/* Hamburger - mobile */}
            <button
              type="button"
              data-ocid="nav.open_modal_button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl glass flex items-center justify-center text-foreground/70 hover:text-foreground transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/10 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.label}
                data-ocid="nav.link"
                onClick={() => scrollToSection(link.href)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === link.href.replace("#", "")
                    ? "bg-primary/10 text-gradient-spark"
                    : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 pb-1">
              <button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="block w-full text-center px-4 py-3 rounded-xl btn-spark text-sm font-semibold text-white"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
