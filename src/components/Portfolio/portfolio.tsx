"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Instagram, Youtube, Linkedin, Flame, Search, MapPin, Activity, Award, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  platform: "instagram" | "youtube" | "linkedin" | "tiktok" | "seo" | "offline";
  metricValue: string;
  metricLabel: string;
  subMetricValue: string;
  subMetricLabel: string;
  retentionCurve: string;
  tacticLogs: string[];
}

const defaultItems: PortfolioItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
    title: "Oasis Concert ft. Salim-Sulaiman",
    category: "Concert PR",
    description: "AWA MEDIA's first major PR campaign — full-scale PR & Influencer Marketing for the Oasis Concert featuring Salim-Sulaiman in 2022.",
    platform: "instagram",
    metricValue: "500K+",
    metricLabel: "EVENT REACH",
    subMetricValue: "50+",
    subMetricLabel: "MEDIA MENTIONS",
    retentionCurve: "M 10,20 Q 80,40 180,60 T 290,50",
    tacticLogs: [
      "[PR]: Comprehensive media outreach & press releases",
      "[Influencer]: Regional creator invitation & content",
      "[Digital]: Awareness and digital promotions",
      "[Coverage]: Multi-platform event coverage"
    ]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop",
    title: "Havmor × Gujarat Titans IPL 2023",
    category: "Brand Partnership",
    description: "First-ever PR campaign for Havmor Ice Cream sponsorship with Gujarat Titans during IPL 2023 — a landmark brand partnership.",
    platform: "instagram",
    metricValue: "2M+",
    metricLabel: "CAMPAIGN REACH",
    subMetricValue: "100+",
    subMetricLabel: "INFLUENCER POSTS",
    retentionCurve: "M 10,20 Q 80,30 180,85 T 290,65",
    tacticLogs: [
      "[Strategy]: Sponsorship-integrated PR campaign design",
      "[Influencer]: Cricket + food influencer activation",
      "[Content]: Match-day content strategy & execution",
      "[Result]: First-ever brand partnership PR for Havmor"
    ]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    title: "Samsung Influencer Campaign",
    category: "Influencer Marketing",
    description: "National-scale influencer marketing campaign for Samsung, driving brand engagement across Pan India with curated creator activations.",
    platform: "instagram",
    metricValue: "5M+",
    metricLabel: "TOTAL REACH",
    subMetricValue: "200+",
    subMetricLabel: "CREATORS ACTIVATED",
    retentionCurve: "M 10,20 Q 80,50 180,40 T 290,30",
    tacticLogs: [
      "[Network]: Pan India influencer curation & briefing",
      "[Content]: Product-integrated content strategy",
      "[Execution]: Multi-city simultaneous activation",
      "[Analytics]: Real-time campaign performance tracking"
    ]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=600&fit=crop",
    title: "IIM Ahmedabad PR Campaign",
    category: "Institutional PR",
    description: "Strategic PR campaign for the Indian Institute of Management Ahmedabad — elevating institutional visibility through targeted media coverage.",
    platform: "linkedin",
    metricValue: "1M+",
    metricLabel: "MEDIA REACH",
    subMetricValue: "30+",
    subMetricLabel: "PRESS FEATURES",
    retentionCurve: "M 10,20 Q 80,25 180,55 T 290,45",
    tacticLogs: [
      "[PR]: Institutional media outreach & positioning",
      "[Content]: Academic event coverage strategy",
      "[Digital]: Social media amplification campaign",
      "[Result]: Enhanced institutional digital presence"
    ]
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    title: "AP Dhillon Concert PR",
    category: "Concert PR",
    description: "Major concert PR campaign for AP Dhillon's India tour — complete media management, influencer activations, and digital promotions.",
    platform: "instagram",
    metricValue: "3M+",
    metricLabel: "CAMPAIGN IMPRESSIONS",
    subMetricValue: "75+",
    subMetricLabel: "MEDIA PLACEMENTS",
    retentionCurve: "M 10,20 Q 80,45 180,50 T 290,40",
    tacticLogs: [
      "[Pre-event]: Buzz creation & media teasers",
      "[Influencer]: Creator-led ticket promotion campaign",
      "[Live]: Real-time event content & media coverage",
      "[Post-event]: Media syndication & highlight PR"
    ]
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1461896836934-bd45ba054df6?w=800&h=600&fit=crop",
    title: "Women's Premier League 2026",
    category: "Sports Marketing",
    description: "Premium PR & influencer campaign for the Women's Premier League (WPL) 2026 — one of India's largest women's sporting events.",
    platform: "instagram",
    metricValue: "10M+",
    metricLabel: "DIGITAL REACH",
    subMetricValue: "500+",
    subMetricLabel: "CONTENT PIECES",
    retentionCurve: "M 10,20 Q 80,35 180,75 T 290,55",
    tacticLogs: [
      "[Strategy]: Integrated sports marketing PR plan",
      "[Influencer]: Sports + lifestyle creator activations",
      "[Content]: Match-day social media blitz",
      "[Impact]: Pan India digital PR coverage"
    ]
  }
];

// Scrambled characters on card hover
function ScrambledText({ text, active }: { text: string; active: boolean }) {
  const [displayVal, setDisplayVal] = useState(text);

  useEffect(() => {
    if (!active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayVal(text);
      return;
    }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*";
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayVal(() =>
        text
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iterations += 0.5;
      if (iterations >= text.length) {
        setDisplayVal(text);
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [active, text]);

  return <span>{displayVal}</span>;
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeAudit, setActiveAudit] = useState<PortfolioItem | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const prevCategoryRef = useRef<string>("all");

  const [isMobile, setIsMobile] = useState(false);

  const metricRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subMetricRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories = ["all", ...new Set(defaultItems.map((item) => item.category))];

  const filteredItems =
    selectedCategory === "all"
      ? defaultItems
      : defaultItems.filter((item) => item.category === selectedCategory);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram size={14} className="text-[#FF1493]" />;
      case "tiktok":
        return <Flame size={14} className="text-[#FF6B35]" />;
      case "youtube":
        return <Youtube size={14} className="text-red-500" />;
      case "linkedin":
        return <Linkedin size={14} className="text-blue-500" />;
      case "seo":
        return <Search size={14} className="text-[#00E0FF]" />;
      case "offline":
        return <MapPin size={14} className="text-emerald-500" />;
      default:
        return <Award size={14} />;
    }
  };

  // Reset active slide index when category changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveSlide(0);
    if (gridRef.current) {
      gridRef.current.scrollLeft = 0;
    }
  }, [selectedCategory]);

  // Handle mobile horizontal swipe scrolling indicator
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.scrollWidth / filteredItems.length;
    const index = Math.round(scrollPosition / cardWidth);
    if (index >= 0 && index < filteredItems.length) {
      setActiveSlide(index);
    }
  };

  // Handle MouseMove for 3D Tilt and Cursor Light following on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (isMobile) return;
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // Calculate rotation angles
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; // Max 8 degrees tilt
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIdx(null);
    if (isMobile) return;
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  // Heading word-split text
  const headingText = "OUR CAMPAIGN PORTFOLIO";
  const headingWords = headingText.split(" ");

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Heading: word-split reveal animation
      const wordInners = headingWordsRef.current.filter(Boolean);
      if (wordInners.length) {
        gsap.fromTo(
          wordInners,
          { y: "100%" },
          {
            y: "0%",
            duration: 0.8,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Grid cards: staggered entrance
      const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  // Category filter change animation
  const animateFilteredCards = useCallback(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children);
    if (cards.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
        }
      );
    }
  }, []);

  useEffect(() => {
    if (prevCategoryRef.current !== selectedCategory) {
      prevCategoryRef.current = selectedCategory;
      requestAnimationFrame(() => {
        animateFilteredCards();
      });
    }
  }, [selectedCategory, animateFilteredCards]);

  // Count-up animation for metric numbers whenever filteredItems updates
  useEffect(() => {
    // Reset arrays
    metricRefs.current = metricRefs.current.slice(0, filteredItems.length);
    subMetricRefs.current = subMetricRefs.current.slice(0, filteredItems.length);

    filteredItems.forEach((item, index) => {
      const metricEl = metricRefs.current[index];
      const subMetricEl = subMetricRefs.current[index];

      if (metricEl) {
        const fullValue = item.metricValue;
        const numericMatch = fullValue.match(/[\d,.]+/);
        const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
        const unit = fullValue.replace(/[\d,.]+/, "").trim();
        const decimalPlaces = fullValue.includes(".") ? 1 : 0;

        if (numericValue > 0) {
          const numObj = { number: 0 };
          gsap.fromTo(numObj,
            { number: 0 },
            {
              number: numericValue,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                if (metricRefs.current[index]) {
                  const formatted = numObj.number.toFixed(decimalPlaces);
                  metricRefs.current[index]!.textContent = (fullValue.startsWith("+") ? "+" : "") + formatted + unit;
                }
              }
            }
          );
        } else {
          metricEl.textContent = fullValue;
        }
      }

      if (subMetricEl) {
        const fullValue = item.subMetricValue;
        const numericMatch = fullValue.match(/[\d,.]+/);
        const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
        const unit = fullValue.replace(/[\d,.]+/, "").trim();
        const decimalPlaces = fullValue.includes(".") ? 1 : 0;

        if (numericValue > 0) {
          const numObj = { number: 0 };
          gsap.fromTo(numObj,
            { number: 0 },
            {
              number: numericValue,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                if (subMetricRefs.current[index]) {
                  const formatted = numObj.number.toFixed(decimalPlaces);
                  subMetricRefs.current[index]!.textContent = (fullValue.startsWith("+") ? "+" : "") + formatted + unit;
                }
              }
            }
          );
        } else {
          subMetricEl.textContent = fullValue;
        }
      }
    });
  }, [filteredItems]);

  // Main Modal Path drawing animation
  useEffect(() => {
    if (!activeAudit) return;
    const path = document.querySelector(".modal-curve-path");
    if (path) {
      const length = (path as SVGPathElement).getTotalLength() || 350;
      gsap.fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1.4, ease: "power2.out", delay: 0.3 }
      );
    }
  }, [activeAudit]);

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative w-full py-24 lg:py-32 bg-card overflow-hidden border-t border-black/5 dark:border-white/5"
    >
      {/* Background glow decoration */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-primary/4 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Section */}
        <div ref={headerRef} className="text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#FF1493]/20 bg-[#FF1493]/5 text-[#FF1493] text-[10px] font-extrabold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles size={10} />
              <span>CAMPAIGN SHOWCASE</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-foreground uppercase leading-none tracking-tight mb-4">
              {headingWords.map((word, i) => (
                <span key={i} className="word-mask mr-[0.3em] last:mr-0">
                  <span
                    className="word-inner"
                    ref={(el) => { headingWordsRef.current[i] = el; }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
              Real campaigns, real results. Explore our PR & influencer marketing case studies.
            </p>
          </div>

          {/* Categories Selector */}
          <div className="flex flex-wrap gap-2 h-fit bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 p-1.5 rounded-2xl backdrop-blur-sm shadow-inner">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-[9px] font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Case Grid / Mobile Horizontal Carousel Swiper */}
        <div 
          ref={gridRef} 
          onScroll={handleScroll}
          className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 max-w-7xl mx-auto"
        >
          {filteredItems.map((item, i) => {
            const isHovered = hoveredIdx === i;

            return (
              <div
                key={item.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                onClick={() => setActiveAudit(item)}
                className="credential-card p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-sm flex flex-col justify-between min-h-[480px] hover:shadow-2xl hover:border-transparent dark:hover:border-transparent transition-all duration-500 cursor-pointer relative z-10 snap-center shrink-0 w-[85vw] lg:w-auto"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                {/* Flowing Laser Border (SVG Rect Chase on desktop only) */}
                {!isMobile && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <rect
                      x="1"
                      y="1"
                      width="calc(100% - 2px)"
                      height="calc(100% - 2px)"
                      rx="24"
                      fill="none"
                      stroke="url(#case-chase-gradient)"
                      strokeWidth="2"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 dash-offset-anim"
                    />
                  </svg>
                )}

                {/* Mouse-Following Radial Light Glow */}
                {!isMobile && (
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,20,147,0.08), transparent 80%)",
                    }}
                  />
                )}

                {/* Top Section */}
                <div className="flex flex-col gap-4" style={{ transform: "translateZ(30px)" }}>
                  {/* Image Header with floating tags */}
                  <div className="relative h-44 rounded-2xl overflow-hidden border border-black/5 dark:border-white/10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    
                    {/* Category and platform badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 border border-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full text-[8px] font-extrabold uppercase tracking-wider text-white">
                      {getPlatformIcon(item.platform)}
                      <span>{item.category}</span>
                    </div>

                    <div className="absolute top-3 right-3 text-[8px] font-mono font-bold text-white/50 bg-black/25 px-2 py-1 rounded-md">
                      LOG_0{item.id}
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading text-base font-black uppercase tracking-tight text-foreground line-clamp-1 group-hover:text-[#FF1493] transition-colors duration-300">
                      <ScrambledText text={item.title} active={isHovered} />
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-semibold line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Central Divider */}
                <div className="w-full h-px bg-black/5 dark:bg-white/10 my-2" />

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4" style={{ transform: "translateZ(40px)" }}>
                  <div className="flex flex-col">
                    <span 
                      ref={(el) => { metricRefs.current[i] = el; }}
                      className="text-xl sm:text-2xl font-heading font-black bg-gradient-to-r from-[#FF6B35] to-[#FF1493] bg-clip-text text-transparent leading-none mb-1"
                    >
                      0
                    </span>
                    <span className="text-[8.5px] text-muted-foreground font-bold uppercase tracking-wider leading-none">
                      {item.metricLabel}
                    </span>
                  </div>

                  <div className="flex flex-col border-l border-black/5 dark:border-white/10 pl-4">
                    <span 
                      ref={(el) => { subMetricRefs.current[i] = el; }}
                      className="text-xl sm:text-2xl font-heading font-black bg-gradient-to-r from-[#FF1493] to-[#9B59B6] bg-clip-text text-transparent leading-none mb-1"
                    >
                      0
                    </span>
                    <span className="text-[8.5px] text-muted-foreground font-bold uppercase tracking-wider leading-none">
                      {item.subMetricLabel}
                    </span>
                  </div>
                </div>

                {/* Mini SVG Curve Preview */}
                <div className="mt-4 bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 rounded-2xl p-2 relative flex items-center justify-center overflow-hidden" style={{ transform: "translateZ(20px)" }}>
                  <svg className="w-full h-8 text-foreground/25 group-hover:text-[#FF1493] transition-colors duration-500 overflow-visible" viewBox="0 0 300 80">
                    <path
                      d={item.retentionCurve}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      className="mini-curve-path"
                    />
                  </svg>
                  <span className="absolute bottom-1 right-3 text-[6.5px] font-mono font-bold text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    LIVE_RETENTION_CURVE
                  </span>
                </div>

                {/* Footer action trigger */}
                <div className="mt-4 flex items-center justify-between text-[8.5px] font-black uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors duration-300" style={{ transform: "translateZ(20px)" }}>
                  <div className="flex items-center gap-1">
                    <span>DECONSTRUCT AUDIT</span>
                    <ChevronRight size={10} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                  <span className="font-mono text-muted-foreground/45">[SYS_READ_0{item.id}]</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile Page Dot Indicators */}
        {isMobile && (
          <div className="flex justify-center gap-1.5 mt-5">
            {filteredItems.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === idx ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Case Deconstruction Audit Report Overlay Modal */}
      <AnimatePresence>
        {activeAudit && (
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setActiveAudit(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="relative max-w-2xl w-full rounded-3xl border border-[#FF1493]/20 bg-card/90 backdrop-blur-2xl shadow-[0_25px_60px_rgba(255,20,147,0.12)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Modal Top Bar */}
              <div className="bg-[#FF1493]/5 text-foreground px-5 py-4 flex items-center justify-between border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-[#FF1493] animate-pulse" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                    DECONSTRUCTION_LOG // {activeAudit.title.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => setActiveAudit(null)}
                  className="w-6 h-6 rounded-full border border-border text-foreground hover:bg-muted flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                
                {/* Campaign Header details */}
                <div className="flex flex-col sm:flex-row gap-6 justify-between items-start border-b border-border pb-6">
                  <div className="flex flex-col gap-2.5 max-w-sm">
                    <span className="inline-flex items-center gap-1.5 border border-border px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground w-fit bg-muted/20">
                      {getPlatformIcon(activeAudit.platform)}
                      <span>{activeAudit.category}</span>
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-foreground leading-snug">
                      {activeAudit.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                      {activeAudit.description}
                    </p>
                  </div>

                  {/* Main Image Thumbnail */}
                  <div className="relative w-full sm:w-36 aspect-video sm:aspect-square rounded-2xl border border-border bg-neutral-900 shrink-0 overflow-hidden shadow-sm">
                    <Image
                      src={activeAudit.image}
                      alt={activeAudit.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* SVG Retention curve mapping */}
                <div className="rounded-2xl border border-border/60 p-5 bg-muted/10 relative">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2 mb-3">
                    <span>Campaign Performance Curve</span>
                    <span className="text-[#FF1493] font-bold text-[9px]">SOURCE: AUDITED_ANALYTICS</span>
                  </div>

                  <div className="relative h-24 w-full border border-border/40 rounded-xl bg-background flex items-center justify-center p-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 150">
                      <line x1="10" y1="0" x2="10" y2="140" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                      <line x1="80" y1="0" x2="80" y2="140" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="3" />
                      <line x1="180" y1="0" x2="180" y2="140" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="3" />
                      <line x1="290" y1="0" x2="290" y2="140" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                      
                      <line x1="10" y1="20" x2="290" y2="20" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="4" />
                      <line x1="10" y1="75" x2="290" y2="75" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="4" />
                      <line x1="10" y1="130" x2="290" y2="130" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="4" />

                      {/* Area Fill */}
                      <path
                        d={`${activeAudit.retentionCurve} L 290,140 L 10,140 Z`}
                        fill="rgba(255, 20, 147, 0.03)"
                      />

                      {/* Path Line */}
                      <path
                        d={activeAudit.retentionCurve}
                        fill="none"
                        stroke="url(#modal-chase-gradient)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        className="modal-curve-path"
                      />

                      {/* Active Markers */}
                      <circle cx="10" cy="20" r="3.5" fill="#FF6B35" />
                      <circle cx="290" cy="50" r="3.5" fill="#9B59B6" />
                    </svg>

                    {/* Chart Labels */}
                    <span className="absolute bottom-1 left-2 font-mono text-[8px] opacity-40">0s (Start)</span>
                    <span className="absolute bottom-1 left-[25%] font-mono text-[8px] opacity-40">3s (Hook)</span>
                    <span className="absolute bottom-1 left-[58%] font-mono text-[8px] opacity-40">15s (Core)</span>
                    <span className="absolute bottom-1 right-2 font-mono text-[8px] opacity-40">30s (CTA)</span>
                  </div>
                </div>

                {/* Tactic Log Breakdown */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2 mb-1">
                    Chronological Campaign Logs
                  </span>
                  <div className="rounded-2xl border border-border/60 p-4 bg-black/5 dark:bg-white/5 font-mono text-[10px] text-foreground/85 flex flex-col gap-2 max-h-40 overflow-y-auto">
                    {activeAudit.tacticLogs.map((log, index) => (
                      <div key={index} className="flex gap-2">
                        <span className="text-[#FF1493] select-none">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActiveAudit(null)}
                  className="w-full bg-foreground text-background py-3.5 px-6 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-[#FF1493] hover:text-white hover:scale-[1.01]"
                >
                  Close Audit Report
                </button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global SVG gradients definition */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="modal-chase-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#FF1493" />
            <stop offset="100%" stopColor="#9B59B6" />
          </linearGradient>
          <linearGradient id="case-chase-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#FF1493" />
            <stop offset="100%" stopColor="#9B59B6" />
          </linearGradient>
        </defs>
      </svg>

      <style jsx>{`
        .word-mask {
          overflow: hidden;
          vertical-align: bottom;
        }
        .word-inner {
          will-change: transform;
        }
        
        /* Laser border chase animation keyframes */
        @keyframes borderChase {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -1000; }
        }
        .dash-offset-anim {
          stroke-dasharray: 120, 600;
          animation: borderChase 4.5s linear infinite;
        }

        /* Loop drawing anim for mini curves on hover */
        @keyframes drawMiniCurve {
          from { stroke-dashoffset: 300; }
          to { stroke-dashoffset: 0; }
        }
        
        .credential-card:hover .mini-curve-path {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: drawMiniCurve 2.5s ease-out forwards;
        }

        /* Hiding scrollbars completely */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}