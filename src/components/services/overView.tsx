"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Video,
  Youtube,
  Share2,
  Palette,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  slug: string;
}

interface ServicesOverviewProps {
  image?: string;
  services?: Service[];
}

const ServicesOverview = ({
  image = "/services_creative.png",
  services: customServices,
}: ServicesOverviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Refs for animations
  const containerRef = useRef(null);
  const headerTitleRef = useRef(null);
  const headerDescRef = useRef(null);
  const imageWrapRef = useRef(null);
  const carouselWrapRef = useRef(null);
  const navWrapRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  const defaultServices: Service[] = [
    {
      slug: "short-form-production",
      icon: Video,
      title: "Short-Form Production",
      description:
        "High-impact 9:16 videos for TikTok, Instagram Reels, and YouTube Shorts. Engineered with scroll-stopping hooks, fast retention-focused editing cuts, and professional sound design.",
    },
    {
      slug: "long-form-growth",
      icon: Youtube,
      title: "Long-Form Growth",
      description:
        "Complete editing, content structuring, high-CTR thumbnail styling, and metadata optimization for YouTube channels and podcasts to build long-term subscriber loyalty.",
    },
    {
      slug: "social-media-management",
      icon: Share2,
      title: "Platform Management",
      description:
        "Hands-on scheduling, native caption writing, comment moderation, trend newsjacking, and weekly community scaling blueprints across all platforms.",
    },
    {
      slug: "branding-design",
      icon: Palette,
      title: "Creator Brand & Identity",
      description:
        "Visual layouts, custom color grading presets, custom thumbnail styles, brand deck configurations, and uniform media skins tailored to your personal creator brand.",
    },
    {
      slug: "strategy-auditing",
      icon: TrendingUp,
      title: "Growth Auditing & Consulting",
      description:
        "Granular review of viewer drop-off analytics, demographic analytics, retention curve fixes, CTR audits, and platform-specific audio/keyword recommendations.",
    },
  ];

  const services = customServices || defaultServices;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= services.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? services.length - 1 : prev - 1));
  };

  const handleManualNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      nextSlide();
    } else {
      prevSlide();
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  // Auto play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  // Detect Mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // MOBILE (Repeatable IntersectionObserver)
  useEffect(() => {
    if (!isMobile) return;

    const titleEl = headerTitleRef.current;
    const descEl = headerDescRef.current;
    const imgEl = imageWrapRef.current;
    const carouselEl = carouselWrapRef.current;
    const navEl = navWrapRef.current;

    if (!titleEl || !descEl || !imgEl || !carouselEl || !navEl) return;

    gsap.set([titleEl, descEl], { opacity: 0, y: 25 });
    gsap.set(imgEl, { opacity: 0, y: 35, scale: 0.95 });
    gsap.set(carouselEl, { opacity: 0, y: 28 });
    gsap.set(navEl, { opacity: 0, y: 18 });

    const animateIn = (el: Element, type: "text" | "image" | "box") => {
      if (type === "text") {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
      }
      if (type === "image") {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
        });
      }
      if (type === "box") {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
      }
    };

    const animateOut = (el: Element, type: "text" | "image" | "box") => {
      if (type === "text") {
        gsap.to(el, { opacity: 0, y: 25, duration: 0.35, ease: "power2.out" });
      }
      if (type === "image") {
        gsap.to(el, {
          opacity: 0,
          y: 35,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.out",
        });
      }
      if (type === "box") {
        gsap.to(el, { opacity: 0, y: 28, duration: 0.35, ease: "power2.out" });
      }
    };

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animateIn(entry.target, "image");
          else animateOut(entry.target, "image");
        });
      },
      { threshold: 0.15 }
    );

    const blockObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animateIn(entry.target, "box");
          else animateOut(entry.target, "box");
        });
      },
      { threshold: 0.25 }
    );

    blockObserver.observe(titleEl);
    blockObserver.observe(descEl);
    blockObserver.observe(carouselEl);
    blockObserver.observe(navEl);
    imageObserver.observe(imgEl);

    return () => {
      imageObserver.disconnect();
      blockObserver.disconnect();
    };
  }, [isMobile]);

  useGSAP(
    () => {
      if (isMobile) return;

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
      ScrollTrigger.refresh();

      const titleEl = headerTitleRef.current;
      const descEl = headerDescRef.current;
      const imgEl = imageWrapRef.current;
      const carouselEl = carouselWrapRef.current;
      const navEl = navWrapRef.current;

      if (!titleEl || !descEl || !imgEl || !carouselEl || !navEl) return;

      gsap.set([titleEl, descEl], { opacity: 0, x: -40 });
      gsap.set(imgEl, { opacity: 0, x: -40 });
      gsap.set([carouselEl, navEl], { opacity: 0, x: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(titleEl, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 0)
        .to(descEl, { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" }, 0.15)
        .to(imgEl, { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" }, 0.2)
        .to(
          carouselEl,
          { opacity: 1, x: 0, duration: 0.85, ease: "power2.out" },
          0.25
        )
        .to(navEl, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, 0.45);
    },
    { scope: containerRef, dependencies: [isMobile], revertOnUpdate: true }
  );

  return (
    <div
      id="services"
      ref={containerRef}
      className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-background transition-colors duration-500 border-t border-black/5 dark:border-white/5"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2
          ref={headerTitleRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-3 uppercase tracking-tight"
        >
          What We{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #FF6B35 0%, #FF1493 50%, #9D00FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Offer
          </span>
        </h2>
        <p
          ref={headerDescRef}
          className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl font-medium"
        >
          Complete visual production and optimization packages designed for creator growth.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Right Side - Image */}
        <div
          ref={imageWrapRef}
          className="order-1 lg:order-2 w-full h-[300px] sm:h-[350px] lg:h-auto rounded-3xl overflow-hidden shadow-xl border border-black/5 dark:border-white/10"
        >
          <img
            src={image}
            alt="AWA Social Services"
            className="w-full h-full object-cover select-none"
          />
        </div>

        {/* Left Side - Carousel */}
        <div className="order-2 lg:order-1 flex flex-col justify-between space-y-6">
          {/* Service Card */}
          <div
            ref={carouselWrapRef}
            className="group/card relative overflow-hidden rounded-3xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md shadow-lg p-6 sm:p-8 xl:p-10 min-h-[360px] sm:min-h-[320px] lg:min-h-[380px]"
          >
            {/* Visual Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5 dark:bg-white/10 z-20">
              <div
                className="h-full bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9D00FF] transition-all duration-700 ease-out shadow-[0_0_8px_rgba(255,20,147,0.5)]"
                style={{ width: `${((currentIndex + 1) / services.length) * 100}%` }}
              />
            </div>

            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`absolute inset-0 p-6 sm:p-8 xl:p-10 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    currentIndex === index
                      ? "opacity-100 translate-x-0 scale-100 rotate-0 blur-0 pointer-events-auto"
                      : "opacity-0 translate-x-full scale-95 blur-[2px] pointer-events-none"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-md"
                    style={{
                      background:
                        "linear-gradient(135deg, #FF6B35 0%, #FF1493 50%, #9D00FF 100%)",
                    }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-foreground mb-3 uppercase tracking-wide">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed mb-6 font-medium">
                    {service.description}
                  </p>

                  {/* Learn More Button */}
                  <Link
                    href={`#contact`}
                    className="group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-black/10 dark:border-white/20 bg-transparent px-6 py-2.5 text-xs sm:text-sm font-bold text-foreground transition-all duration-500 hover:border-transparent hover:text-white hover:shadow-xl active:scale-95"
                  >
                    <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9D00FF] transition-transform duration-500 ease-out group-hover/btn:translate-y-0" />
                    <span className="relative z-10">Inquire Now</span>
                    <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-foreground transition-all duration-500 group-hover/btn:bg-white group-hover/btn:text-black group-hover/btn:-rotate-45">
                      <ChevronRight size={14} />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div
            ref={navWrapRef}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={() => handleManualNavigation('prev')}
              className="w-10 h-10 bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 text-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/60 dark:hover:bg-white/15 hover:scale-105 active:scale-95 shadow-sm"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 5000);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === index
                      ? "w-6 h-2"
                      : "w-2 h-2 bg-black/10 dark:bg-white/15 hover:bg-black/20 dark:hover:bg-white/30"
                  }`}
                  style={
                    currentIndex === index
                      ? {
                          background:
                            "linear-gradient(135deg, #FF6B35 0%, #FF1493 100%)",
                        }
                      : {}
                  }
                  aria-label={`Go to service ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => handleManualNavigation('next')}
              className="w-10 h-10 bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 text-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/60 dark:hover:bg-white/15 hover:scale-105 active:scale-95 shadow-sm"
              aria-label="Next service"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesOverview;