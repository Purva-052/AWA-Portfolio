"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExternalLink, Instagram, Facebook, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  platform?: "instagram" | "facebook" | "linkedin" | "event" | "ad";
  metrics?: {
    label: string;
    value: string;
  }[];
}

interface PortfolioProps {
  items?: PortfolioItem[];
  backgroundColor?: string;
}

const Portfolio = ({
  items: customItems,
  backgroundColor = "#ffffff",
}: PortfolioProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxImage, setLightboxImage] = useState<PortfolioItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  const defaultItems: PortfolioItem[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
      title: "Summer Fashion Campaign",
      category: "Social Media",
      description: "Instagram carousel campaign for luxury fashion brand",
      platform: "instagram",
      metrics: [
        { label: "Reach", value: "2.5M" },
        { label: "Engagement", value: "18.5%" },
      ],
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
      title: "Tech Product Launch",
      category: "Digital Ads",
      description: "Paid advertising campaign for SaaS product",
      platform: "ad",
      metrics: [
        { label: "CTR", value: "8.2%" },
        { label: "Conversions", value: "1,200+" },
      ],
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      title: "Food Festival Event",
      category: "Events",
      description: "Brand activation at annual food festival",
      platform: "event",
      metrics: [
        { label: "Attendees", value: "5,000+" },
        { label: "Samples", value: "10K+" },
      ],
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      title: "B2B LinkedIn Series",
      category: "Social Media",
      description: "Thought leadership content for enterprise clients",
      platform: "linkedin",
      metrics: [
        { label: "Impressions", value: "850K" },
        { label: "Leads", value: "340" },
      ],
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
      title: "Brand Awareness Video",
      category: "Content Creation",
      description: "Cinematic brand story for corporate rebrand",
      platform: "facebook",
      metrics: [
        { label: "Views", value: "3.2M" },
        { label: "Shares", value: "45K" },
      ],
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop",
      title: "Influencer Collaboration",
      category: "Influencer Marketing",
      description: "Multi-platform influencer partnership campaign",
      platform: "instagram",
      metrics: [
        { label: "Reach", value: "1.8M" },
        { label: "ROI", value: "420%" },
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
        return <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "facebook":
        return <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "linkedin":
        return <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />;
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

  // Mobile animations - Simplified for performance
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

  // Desktop animations - Optimized
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
        ref={containerRef}
        className="relative w-full py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1400px] 2xl:max-w-[1800px] mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-7 md:mb-8 lg:mb-10">
            <h2
              ref={titleRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2 sm:mb-3 md:mb-4"
              style={{
                background:
                  "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              OUR WORK SPEAKS FOR ITSELF
            </h2>
            <p
              ref={subtitleRef}
              className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-2xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Explore our portfolio of successful campaigns that delivered real results
            </p>
          </div>

          {/* Category Filters */}
          <div
            ref={filtersRef}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-7 md:mb-8 lg:mb-10"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-2 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-2 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? "text-white shadow-lg transform scale-105"
                    : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
                }`}
                style={
                  selectedCategory === category
                    ? {
                        background:
                          "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
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
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7"
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.01] hover:shadow-xl border border-white/10"
                onClick={() => setLightboxImage(item)}
                style={{
                  willChange: "transform",
                  transform: "translate3d(0, 0, 0)",
                  background:"#0a0a0a",
                }}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Platform Icon - Smaller */}
                  {item.platform && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                      {getPlatformIcon(item.platform)}
                    </div>
                  )}

                  {/* Expand Icon - Smaller */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-7 h-7 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-1.5 sm:p-2 md:p-2.5">
                  <div className="mb-0.5 sm:mb-1">
                    <span
                      className="inline-block px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider"
                      style={{
                        background:
                          "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-white text-[10px] sm:text-xs md:text-sm font-bold mb-0.5 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-[9px] sm:text-[10px] mb-1.5 sm:mb-2 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Metrics */}
                  {item.metrics && (
                    <div className="grid grid-cols-2 gap-1">
                      {item.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center p-1 sm:p-1.5 bg-white/5 rounded-lg">
                          <div
                            className="text-xs sm:text-sm md:text-base font-black mb-0"
                            style={{
                              background:
                                "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            {metric.value}
                          </div>
                          <div className="text-gray-400 text-[8px] sm:text-[9px]">
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
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-square md:aspect-auto">
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

              <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-center">
                <span
                  className="inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6 w-fit"
                  style={{
                    background:
                      "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                  }}
                >
                  {lightboxImage.category}
                </span>

                <h3 className="text-white text-3xl sm:text-4xl font-black mb-4">
                  {lightboxImage.title}
                </h3>
                <p className="text-gray-300 text-lg mb-8">
                  {lightboxImage.description}
                </p>

                {lightboxImage.metrics && (
                  <div className="grid grid-cols-2 gap-4">
                    {lightboxImage.metrics.map((metric, idx) => (
                      <div key={idx} className="p-5 bg-white/5 rounded-xl">
                        <div
                          className="text-3xl font-black mb-2"
                          style={{
                            background:
                              "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {metric.value}
                        </div>
                        <div className="text-gray-400 text-sm uppercase tracking-wider">
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
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Portfolio;