import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "../../backend.d";
import { useGetAllBlogPosts } from "../../hooks/useQueries";

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: BigInt(1),
    title: "10 UI/UX Design Trends Dominating 2026",
    description:
      "From neomorphism to glassmorphism, we dive deep into the design trends that are shaping digital interfaces this year and how to leverage them for your brand.",
    thumbnailUrl: "",
    publishDate: BigInt(
      Date.now() * 1_000_000 - 2 * 24 * 60 * 60 * 1_000_000_000,
    ),
  },
  {
    id: BigInt(2),
    title: "Why Your Brand Needs a Digital-First Identity",
    description:
      "In a world where first impressions happen on screens, your brand's digital presence is your most powerful asset. Learn how to build one that lasts.",
    thumbnailUrl: "",
    publishDate: BigInt(
      Date.now() * 1_000_000 - 7 * 24 * 60 * 60 * 1_000_000_000,
    ),
  },
  {
    id: BigInt(3),
    title: "The Science Behind High-Converting Landing Pages",
    description:
      "We analyzed 200+ landing pages to uncover what makes visitors click. Discover the psychological triggers and design patterns that drive conversions.",
    thumbnailUrl: "",
    publishDate: BigInt(
      Date.now() * 1_000_000 - 14 * 24 * 60 * 60 * 1_000_000_000,
    ),
  },
];

const POST_GRADIENTS = [
  "from-orange-600/40 to-red-700/40",
  "from-blue-600/40 to-purple-700/40",
  "from-teal-600/40 to-cyan-700/40",
];

function formatDate(publishDate: bigint) {
  try {
    const ms = Number(publishDate) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Recently";
  }
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const gradient = POST_GRADIENTS[index % POST_GRADIENTS.length];
  const letter = post.title.charAt(0).toUpperCase();

  return (
    <article
      className="blog-card glass rounded-2xl overflow-hidden group"
      data-ocid={`blog.item.${index + 1}`}
    >
      {/* Thumbnail */}
      <div
        className={`relative h-52 bg-gradient-to-br ${gradient} overflow-hidden`}
      >
        {post.thumbnailUrl ? (
          <img
            src={post.thumbnailUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="text-white/10 text-9xl font-bold font-display select-none">
              {letter}
            </div>
            {/* Decorative lines */}
            <div className="absolute inset-0">
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-spark-orange text-white shadow-spark">
            Insights
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-foreground/40 text-xs mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.publishDate)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />5 min read
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold font-display text-foreground text-lg leading-snug mb-3 group-hover:text-gradient-spark transition-all duration-300 line-clamp-2">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-foreground/55 text-sm leading-relaxed line-clamp-3 mb-5">
          {post.description}
        </p>

        {/* Read More */}
        <button
          type="button"
          data-ocid={`blog.item.button.${index + 1}`}
          className="flex items-center gap-2 text-spark-orange text-sm font-semibold group/btn hover:gap-3 transition-all duration-200"
        >
          Read More
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
}

export function Blog() {
  const { data: fetchedPosts = [], isLoading } = useGetAllBlogPosts();
  const posts = fetchedPosts.length > 0 ? fetchedPosts : FALLBACK_POSTS;

  return (
    <section id="blog" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.7 0.15 220 / 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full glass border border-primary/30 text-sm font-medium text-spark-orange mb-4">
              Latest Insights
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display">
              From Our <span className="text-gradient-spark">Blog</span>
            </h2>
          </div>
          <button
            type="button"
            className="btn-glass px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 group"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["bk1", "bk2", "bk3"].map((k) => (
              <Skeleton key={k} className="h-96 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post, index) => (
              <BlogCard key={post.id.toString()} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
