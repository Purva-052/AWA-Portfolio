"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Users,
  FileText,
  TrendingUp,
  Building2,
  Share2,
  Palette,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface ServicesOverviewProps {
  image?: string;
  services?: Service[];
  backgroundColor?: string;
}

const ServicesOverview = ({
  image = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
  services: customServices,
  backgroundColor = "#f5f5f5",
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

  const defaultServices = [
    {
      icon: Users,
      title: "Influencer Marketing",
      description:
        "Connect with influential voices to expand your brand's reach and build authentic connections with your target audience",
    },
    {
      icon: FileText,
      title: "Content Creation",
      description:
        "Craft compelling narratives and visual stories that engage, inspire, and convert your audience across all platforms",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description:
        "Drive measurable growth through data-driven strategies, performance optimization, and innovative digital campaigns",
    },
    {
      icon: Building2,
      title: "Indoor & Outdoor Marketing",
      description:
        "Capture attention with impactful traditional advertising solutions that complement your digital presence",
    },
    {
      icon: Share2,
      title: "Social Media Management",
      description:
        "Build and nurture thriving communities across social platforms with strategic content and engagement",
    },
    {
      icon: Palette,
      title: "Branding & Design",
      description:
        "Create distinctive visual identities that resonate with your audience and set your brand apart from competitors",
    },
    {
      icon: Calendar,
      title: "Event Marketing & PR",
      description:
        "Design memorable experiences and generate meaningful media coverage that amplifies your brand message",
    },
  ];

  const services = customServices || defaultServices;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= services.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? services.length - 1 : prev - 1));
  };

  // Helper function for manual navigation
  const handleManualNavigation = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      nextSlide();
    } else {
      prevSlide();
    }
    setIsAutoPlaying(false);
    // Resume auto-play after 3 seconds
    setTimeout(() => setIsAutoPlaying(true), 500);
  };

  // Auto play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  // Detect Mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // MOBILE (Repeatable IntersectionObserver like AboutUs)
  useEffect(() => {
    if (!isMobile) return;

    const titleEl = headerTitleRef.current;
    const descEl = headerDescRef.current;
    const imgEl = imageWrapRef.current;
    const carouselEl = carouselWrapRef.current;
    const navEl = navWrapRef.current;

    if (!titleEl || !descEl || !imgEl || !carouselEl || !navEl) return;

    // Initial hidden state
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

    // Observer: Image at 15% like your AboutUs
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

    // observe
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
      ref={containerRef}
      className="w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-12 2xl:py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24"
      style={{ backgroundColor }}
    >
      {/* Section Header */}
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-10 2xl:mb-24">
        <h2
          ref={headerTitleRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-8xl font-bold text-[#2C2C2C] mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-2 2xl:mb-8"
        >
          What We{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
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
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-4xl text-gray-600 max-w-2xl 2xl:max-w-5xl"
        >
          Comprehensive marketing solutions designed for your success
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-[1400px] 2xl:max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-24">
        {/* Right Side - Image */}
        <div
          ref={imageWrapRef}
          className="order-1 lg:order-2 w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] 2xl:h-[700px] rounded-2xl sm:rounded-3xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl 2xl:rounded-[2.5rem] overflow-hidden shadow-xl"
        >
          <img
            src={image}
            alt="Our Services"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Left Side - Carousel */}
        <div className="order-2 lg:order-1 flex flex-col justify-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-6 xl:space-y-8 2xl:space-y-12">
          {/* Service Card */}
          <div
            ref={carouselWrapRef}
            className="relative overflow-hidden rounded-2xl sm:rounded-2xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl 2xl:rounded-[2.5rem] bg-white shadow-lg p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10 2xl:p-16 min-h-[280px] sm:min-h-[300px] md:min-h-[320px] lg:min-h-[340px] xl:min-h-[380px] 2xl:min-h-[550px]"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`absolute inset-0 p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10 2xl:p-16 transition-all duration-700 ease-in-out ${
                    currentIndex === index
                      ? "opacity-100 translate-x-0"
                      : index < currentIndex
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-24 2xl:h-24 rounded-xl sm:rounded-xl md:rounded-2xl lg:rounded-2xl xl:rounded-2xl 2xl:rounded-3xl flex items-center justify-center mb-4 sm:mb-4 md:mb-5 lg:mb-5 xl:mb-6 2xl:mb-10 shadow-md"
                    style={{
                      background:
                        "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                    }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-bold text-[#2C2C2C] mb-2 sm:mb-3 md:mb-3 lg:mb-3 xl:mb-4 2xl:mb-6">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-3xl text-gray-600 leading-relaxed mb-4 sm:mb-5 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-10">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <button
                    className="group inline-flex items-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-3 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-2xl font-semibold transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Explore Service
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div
            ref={navWrapRef}
            className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-5 xl:gap-6 2xl:gap-10"
          >
            <button
              onClick={() => handleManualNavigation('prev')}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-14 2xl:h-14 bg-[#2C2C2C] hover:bg-[#4A4A4A] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md active:scale-95"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-9 2xl:h-9" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-3">
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
                      ? "w-3.5 sm:w-4 md:w-5 lg:w-5 xl:w-6 2xl:w-10 h-1.5 sm:h-1.5 md:h-1.5 lg:h-1.5 xl:h-2 2xl:h-3"
                      : "w-1.5 sm:w-1.5 md:w-1.5 lg:w-1.5 xl:w-2 2xl:w-3 h-1.5 sm:h-1.5 md:h-1.5 lg:h-1.5 xl:h-2 2xl:h-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  style={
                    currentIndex === index
                      ? {
                          background:
                            "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                        }
                      : {}
                  }
                  aria-label={`Go to service ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => handleManualNavigation('next')}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-14 2xl:h-14 bg-[#2C2C2C] hover:bg-[#4A4A4A] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md active:scale-95"
              aria-label="Next service"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-9 2xl:h-9" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesOverview;