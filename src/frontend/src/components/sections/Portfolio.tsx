import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Eye, X } from "lucide-react";
import { useState } from "react";
import type { PortfolioItem } from "../../backend.d";
import { useGetAllPortfolioItems } from "../../hooks/useQueries";

const CATEGORIES = [
  "All",
  "Websites",
  "Logos",
  "Posters",
  "Videos",
  "Social Media",
];

const CATEGORY_GRADIENTS: Record<string, string> = {
  Websites: "from-orange-600 to-red-700",
  Logos: "from-yellow-500 to-orange-600",
  Posters: "from-pink-600 to-purple-700",
  Videos: "from-blue-600 to-indigo-700",
  "Social Media": "from-teal-500 to-cyan-600",
  Default: "from-slate-600 to-slate-800",
};

function getGradient(category: string) {
  return CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS.Default;
}

interface LightboxProps {
  item: PortfolioItem;
  onClose: () => void;
}

function Lightbox({ item, onClose }: LightboxProps) {
  return (
    <dialog
      open
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none max-h-none m-0 border-0"
      data-ocid="portfolio.modal"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-default border-0"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      />

      {/* Modal */}
      <div className="relative z-10 max-w-2xl w-full glass rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up">
        {/* Preview */}
        <div
          className={`h-64 bg-gradient-to-br ${getGradient(item.category)} relative`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/20 text-8xl font-bold font-display">
              {item.title.charAt(0)}
            </div>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/40 text-white backdrop-blur-sm">
              {item.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3
            id="lightbox-title"
            className="text-2xl font-bold font-display text-foreground mb-3"
          >
            {item.title}
          </h3>
          <p className="text-foreground/60 leading-relaxed">
            {item.description}
          </p>

          <div className="flex items-center gap-3 mt-6">
            <button
              type="button"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-spark text-white text-sm font-semibold"
            >
              <ExternalLink className="w-4 h-4" />
              View Project
            </button>
            <button
              type="button"
              data-ocid="portfolio.modal.close_button"
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-glass text-sm font-semibold"
            >
              Close
            </button>
          </div>
        </div>

        {/* Close button */}
        <button
          type="button"
          data-ocid="portfolio.modal.close_button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </dialog>
  );
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const { data: allItems = [], isLoading } = useGetAllPortfolioItems();

  const filteredItems =
    activeCategory === "All"
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="section-padding relative overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.25 330 / 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-primary/30 text-sm font-medium text-spark-orange mb-4">
            Our Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
            Featured <span className="text-gradient-spark">Portfolio</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            A curated showcase of our finest work — from groundbreaking websites
            to iconic brand identities.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid="portfolio.tab"
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "btn-spark text-white shadow-spark"
                  : "glass text-foreground/70 hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["pk1", "pk2", "pk3", "pk4", "pk5", "pk6"].map((k) => (
              <Skeleton key={k} className="h-64 rounded-2xl" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20" data-ocid="portfolio.empty_state">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-foreground/50 text-lg">
              No projects in this category yet.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
              <button
                type="button"
                key={item.id.toString()}
                data-ocid={`portfolio.item.${index + 1}`}
                className="portfolio-card glass rounded-2xl overflow-hidden cursor-pointer break-inside-avoid w-full text-left"
                onClick={() => setSelectedItem(item)}
              >
                {/* Thumbnail */}
                <div
                  className={`relative bg-gradient-to-br ${getGradient(item.category)} ${
                    index % 3 === 0 ? "h-56" : index % 3 === 1 ? "h-44" : "h-64"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/15 text-7xl font-bold font-display">
                      {item.title.charAt(0)}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-5">
                    <div className="flex items-center gap-2 text-white">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">View Project</span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold font-display text-foreground text-sm leading-snug">
                      {item.title}
                    </h3>
                    <span className="shrink-0 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-spark-orange">
                      {item.category}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
}
