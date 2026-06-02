"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExternalLink, Instagram, Youtube, Linkedin, Flame } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  platform?: "instagram" | "youtube" | "linkedin" | "tiktok";
  metrics?: {
    label: string;
    value: string;
  }[];
}

interface PortfolioProps {
  items?: PortfolioItem[];
}

const Portfolio = ({
  items: customItems,
}: PortfolioProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxImage, setLightboxImage] = useState<PortfolioItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  const defaultItems: PortfolioItem[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      title: "SaaS Founder Organic Series",
      category: "TikTok/Shorts",
      description: "Structured a 30-day vertical content series using curiosity loops that generated huge signups.",
      platform: "tiktok",
      metrics: [
        { label: "Reach", value: "1.8M" },
        { label: "Conversions", value: "12K+" },
      ],
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
      title: "Ecom Brand Apparel Launch",
      category: "Instagram Reels",
      description: "Paced product showcases with custom editing sound-fx that drove organic checkouts.",
      platform: "instagram",
      metrics: [
        { label: "Reach", value: "2.2M" },
        { label: "Direct ROI", value: "380%" },
      ],
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
      title: "Tech Channel Editing",
      category: "YouTube Explainer",
      description: "Optimized click-through rate with high-contrast thumbnails and visual pacing cuts.",
      platform: "youtube",
      metrics: [
        { label: "Views", value: "850K" },
        { label: "CTR Boost", value: "+11.2%" },
      ],
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop",
      title: "Fintech App Hook Strategy",
      category: "TikTok/Shorts",
      description: "Hooked scrolling viewers in the first 2 seconds using bold text layouts and transitions.",
      platform: "tiktok",
      metrics: [
        { label: "Views", value: "3.1M" },
        { label: "App Installs", value: "45K" },
      ],
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      title: "Executive Thought Leadership",
      category: "LinkedIn Carousels",
      description: "Formatted complex company frameworks into clean, swipeable PDF presentation pages.",
      platform: "linkedin",
      metrics: [
        { label: "Impressions", value: "420K" },
        { label: "Warm Leads", value: "340" },
      ],
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
      title: "Organic Skincare Promotion",
      category: "Instagram Reels",
      description: "Aesthetic lifestyle styling utilizing trending reels audios to expand organic reach.",
      platform: "instagram",
      metrics: [
        { label: "Reach", value: "1.5M" },
        { label: "Engagement", value: "18.5%" },
      ],
    },
  ];

  const items = customItems || defaultItems;
  const categories = ["all", ...new Set(items.map((item) => item.category))];

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const getPlatformIcon = (platform?: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "tiktok":
        return <Flame className="w-4 h-4 text-[#00f2fe]" />;
      case "youtube":
        return <Youtube className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile animations
  useEffect(() => {
    if (!isMobile || hasAnimatedRef.current) return;

    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const filtersEl = filtersRef.current;
    const gridEl = gridRef.current;

    if (!titleEl || !subtitleEl || !filtersEl || !gridEl) return;

    gsap.set([titleEl, subtitleEl], { opacity: 0, y: 20 });
    gsap.set(filtersEl, { opacity: 0, y: 15 });
    gsap.set(gridEl.children, { opacity: 0, y: 25 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            gsap.to(titleEl, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
            gsap.to(subtitleEl, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", delay: 0.08 });
            gsap.to(filtersEl, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", delay: 0.12 });
            gsap.to(gridEl.children, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
              stagger: 0.06,
              delay: 0.18,
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current!);

    return () => observer.disconnect();
  }, [isMobile]);

  // Desktop animations
  useGSAP(
    () => {
      if (isMobile || hasAnimatedRef.current) return;

      const titleEl = titleRef.current;
      const subtitleEl = subtitleRef.current;
      const filtersEl = filtersRef.current;
      const gridEl = gridRef.current;

      if (!titleEl || !subtitleEl || !filtersEl || !gridEl) return;

      gsap.set([titleEl, subtitleEl], { opacity: 0, y: 30 });
      gsap.set(filtersEl, { opacity: 0, y: 15 });
      gsap.set(gridEl.children, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none none",
          once: true,
          onEnter: () => {
            hasAnimatedRef.current = true;
          }
        },
      });

      tl.to(titleEl, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
        .to(subtitleEl, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.3")
        .to(filtersEl, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.25")
        .to(
          gridEl.children,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.08,
          },
          "-=0.2"
        );
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  return (
    <>
      <div
        id="portfolio"
        ref={containerRef}
        className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-background transition-colors duration-500 overflow-hidden border-t border-black/5 dark:border-white/5"
      >
        {/* Decorative background gradients */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-gradient-to-br from-pink-500 to-indigo-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-gradient-to-br from-amber-500 to-cyan-500 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2
              ref={titleRef}
              className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 tracking-tight uppercase"
              style={{
                background:
                  "linear-gradient(135deg, #FF6B35 0%, #FF1493 50%, #9D00FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Viral Proof & Metrics
            </h2>
            <p
              ref={subtitleRef}
              className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto font-medium"
            >
              Explore actual results and campaigns we ran that shattered reach benchmarks.
            </p>
          </div>

          {/* Category Filters */}
          <div
            ref={filtersRef}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? "text-white shadow-md transform scale-105"
                    : "bg-white/40 dark:bg-white/5 text-muted-foreground border border-black/5 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 hover:text-foreground"
                }`}
                style={
                  selectedCategory === category
                    ? {
                        background:
                          "linear-gradient(135deg, #FF6B35 0%, #FF1493 100%)",
                      }
                    : {}
                }
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/40 dark:bg-white/5 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl border border-black/5 dark:border-white/10"
                onClick={() => setLightboxImage(item)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Platform Icon */}
                  {item.platform && (
                    <div className="absolute top-4 right-4 w-9 h-9 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white">
                      {getPlatformIcon(item.platform)}
                    </div>
                  )}

                  {/* Expand Icon */}
                  <div className="absolute top-4 left-4 w-9 h-9 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-2">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, #FF6B35 0%, #FF1493 100%)",
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-foreground text-lg font-black mb-1 line-clamp-1 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2 font-medium">
                    {item.description}
                  </p>

                  {/* Metrics Row */}
                  {item.metrics && (
                    <div className="grid grid-cols-2 gap-3">
                      {item.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center p-3 bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl">
                          <div
                            className="text-lg font-black bg-gradient-to-r from-[#FF6B35] to-[#9D00FF] bg-clip-text text-transparent"
                          >
                            {metric.value}
                          </div>
                          <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white dark:bg-zinc-950 border border-black/5 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 rounded-full flex items-center justify-center text-foreground hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-square md:aspect-auto min-h-[300px]">
                <Image
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 50vw"
                  quality={80}
                  priority
                  className="object-cover"
                />
              </div>

              <div className="p-8 sm:p-10 flex flex-col justify-center gap-4">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white w-fit"
                  style={{
                    background:
                      "linear-gradient(135deg, #FF6B35 0%, #FF1493 100%)",
                  }}
                >
                  {lightboxImage.category}
                </span>

                <h3 className="text-foreground text-2xl sm:text-3xl font-black uppercase leading-tight">
                  {lightboxImage.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-semibold">
                  {lightboxImage.description}
                </p>

                {lightboxImage.metrics && (
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {lightboxImage.metrics.map((metric, idx) => (
                      <div key={idx} className="p-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl">
                        <div
                          className="text-2xl font-black bg-gradient-to-r from-[#FF6B35] to-[#FF1493] bg-clip-text text-transparent"
                        >
                          {metric.value}
                        </div>
                        <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
};

export default Portfolio;