import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "../../backend.d";
import { useGetAllTestimonials } from "../../hooks/useQueries";

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: BigInt(1),
    clientName: "Sarah Chen",
    company: "TechVision Labs",
    photoUrl: "",
    starRating: BigInt(5),
    review:
      "Shaik Spark Creations transformed our brand identity completely. The attention to detail and creative vision they brought to our project was extraordinary. Our website traffic doubled within 3 months!",
  },
  {
    id: BigInt(2),
    clientName: "Marcus Williams",
    company: "InnovatePro",
    photoUrl: "",
    starRating: BigInt(5),
    review:
      "Absolutely phenomenal work! The UI/UX design they delivered exceeded all expectations. Our users love the new interface and our conversion rates have improved by 45%. Highly recommended!",
  },
  {
    id: BigInt(3),
    clientName: "Priya Sharma",
    company: "GlobalEdge Solutions",
    photoUrl: "",
    starRating: BigInt(5),
    review:
      "The team's creativity and professionalism is unmatched. They delivered our complete brand overhaul on time and the results speak for themselves. Our brand recognition has never been stronger.",
  },
  {
    id: BigInt(4),
    clientName: "James Rodriguez",
    company: "StartupLaunch",
    photoUrl: "",
    starRating: BigInt(4),
    review:
      "Working with Shaik Spark was a game-changer for our startup. They understood our vision immediately and delivered a product that truly represents who we are. Outstanding digital marketing results!",
  },
];

const STAR_POSITIONS = [0, 1, 2, 3, 4];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {STAR_POSITIONS.map((i) => (
        <Star
          key={`star-${i}`}
          className="w-4 h-4"
          fill={i < rating ? "oklch(0.82 0.2 85)" : "transparent"}
          stroke={i < rating ? "oklch(0.82 0.2 85)" : "oklch(0.6 0.04 240)"}
        />
      ))}
    </div>
  );
}

function Avatar({ name, photoUrl }: { name: string; photoUrl: string }) {
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={name}
        className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
      />
    );
  }
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-14 h-14 rounded-full bg-gradient-spark flex items-center justify-center text-white font-bold text-lg font-display shadow-spark">
      {initials}
    </div>
  );
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { data: fetchedTestimonials = [], isLoading } = useGetAllTestimonials();

  const testimonials =
    fetchedTestimonials.length > 0
      ? fetchedTestimonials
      : FALLBACK_TESTIMONIALS;

  const len = testimonials.length;

  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % len);
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [len]);

  const restartAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % len);
    }, 5000);
  };

  const goTo = (index: number) => {
    setCurrentIndex((index + len) % len);
    restartAutoPlay();
  };

  const prev = () => goTo(currentIndex - 1);
  const next = () => goTo(currentIndex + 1);

  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </section>
    );
  }

  const current = testimonials[currentIndex];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.82 0.2 85 / 0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-primary/30 text-sm font-medium text-spark-orange mb-4">
            Client Love
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
            What Clients <span className="text-gradient-spark">Say</span>
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            Real stories from clients who trusted us to transform their digital
            presence.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative">
          <div
            key={currentIndex}
            className="glass rounded-3xl p-8 md:p-12 animate-fade-in"
            data-ocid={`testimonials.item.${currentIndex + 1}`}
          >
            {/* Quote icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
              style={{
                background: "oklch(0.68 0.22 35 / 0.15)",
                border: "1px solid oklch(0.68 0.22 35 / 0.3)",
              }}
            >
              <Quote className="w-6 h-6 text-spark-orange" />
            </div>

            {/* Stars */}
            <StarRating rating={Number(current.starRating)} />

            {/* Review */}
            <blockquote className="text-foreground/80 text-lg sm:text-xl leading-relaxed mt-6 mb-8 font-medium italic">
              "{current.review}"
            </blockquote>

            {/* Client info */}
            <div className="flex items-center gap-4">
              <Avatar name={current.clientName} photoUrl={current.photoUrl} />
              <div>
                <div className="font-bold text-foreground font-display text-lg">
                  {current.clientName}
                </div>
                <div className="text-foreground/50 text-sm">
                  {current.company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Prev/Next */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-ocid="testimonials.pagination_prev"
                onClick={prev}
                className="w-11 h-11 rounded-xl glass flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-primary/50 transition-all duration-200 hover:shadow-spark"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                data-ocid="testimonials.pagination_next"
                onClick={next}
                className="w-11 h-11 rounded-xl glass flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-primary/50 transition-all duration-200 hover:shadow-spark"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  type="button"
                  key={t.id.toString()}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-8 h-2 bg-spark-orange shadow-spark"
                      : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="text-foreground/40 text-sm font-medium">
              {currentIndex + 1} / {testimonials.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
