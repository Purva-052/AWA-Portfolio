"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ delay: 0.3 });

      // Set initial states
      gsap.set([logoRef.current, textRef.current], {
        opacity: 0,
        y: 30,
      });

      // Set strip initial state - hidden below
      gsap.set(stripRef.current, {
        y: 100,
        opacity: 0,
      });

      // Animate logo and text in sequence
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );

      // ScrollTrigger animation for the strip
      gsap.to(stripRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });

      // Continuous marquee animation for the strip
      const marqueeElements = containerRef.current?.querySelectorAll('.marquee-content');
      if (marqueeElements && marqueeElements.length > 0) {
        marqueeElements.forEach((element) => {
          gsap.fromTo(
            element,
            { x: 0 },
            {
              x: '-100%',
              duration: 30,
              repeat: -1,
              ease: 'linear',
            }
          );
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.jpeg"
          alt="Ahmedabad Architecture"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Overlay with opacity */}
        <div className="absolute inset-0 bg-white/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16 px-6 md:px-12 lg:px-20 py-16 md:py-50 pb-24 md:pb-28">
        
        {/* Logo - with better proportions */}
        <div 
          ref={logoRef}
          className="relative w-[200px] h-[80px] sm:w-[280px] sm:h-[110px] md:w-[360px] md:h-[140px] lg:w-[440px] lg:h-[170px] flex-shrink-0 overflow-hidden"
        >
          <Image
            src="/fullLogo.png"
            alt="AWA Full Logo"
            fill
            className="object-cover object-center scale-[1.4] drop-shadow-lg"
            priority
          />
        </div>

        {/* Text Content */}
        <div ref={textRef} className="max-w-5xl text-center space-y-4 md:space-y-6 lg:space-y-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight px-4">
            Welcome to the world of AWA
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-4">
            Are you an Amdawadi? Then youre at the right place. Discover the vibrant culture, heritage, and innovation of Ahmedabad.
          </p>
        </div>
      </div>

      {/* Animated Strip Design - Single Continuous Strip with Stats */}
      <div 
        ref={stripRef}
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden"
      >
        <div className="bg-black/90 backdrop-blur-sm py-4 md:py-4 shadow-2xl border-y border-white/10">
          <div className="flex whitespace-nowrap">
            <div className="marquee-content flex gap-8 md:gap-12 items-center px-4 md:px-6">
              <div className="flex items-center gap-2 md:gap-3">
                {/* <span className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">500+</span> */}
                <span className="text-xs md:text-sm lg:text-base text-white uppercase tracking-wider font-semibold">Influencer Marketing</span>
              </div>
              <span className="text-white/30 text-xl md:text-2xl">|</span>
              <div className="flex items-center gap-2 md:gap-3">
                {/* <span className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-pink-400 to-orange-600 bg-clip-text text-transparent">150+</span> */}
                <span className="text-xs md:text-sm lg:text-base text-white uppercase tracking-wider font-semibold">Content Creation</span>
              </div>
              <span className="text-white/30 text-xl md:text-2xl">|</span>
              <div className="flex items-center gap-2 md:gap-3">
                {/* <span className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">50M+</span> */}
                <span className="text-xs md:text-sm lg:text-base text-white uppercase tracking-wider font-semibold">Digital Marketing</span>
              </div>
              <span className="text-white/30 text-xl md:text-2xl">|</span>
              <div className="flex items-center gap-2 md:gap-3">
                {/* <span className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">95%</span> */}
                <span className="text-xs md:text-sm lg:text-base text-white uppercase tracking-wider font-semibold">Indoor & Outdoor Marketing</span>
              </div>
              <span className="text-white/30 text-xl md:text-2xl">|</span>
            </div>
            <div className="marquee-content flex gap-8 md:gap-12 items-center px-4 md:px-6">
              <div className="flex items-center gap-2 md:gap-3">
                {/* <span className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">500+</span> */}
                <span className="text-xs md:text-sm lg:text-base text-white uppercase tracking-wider font-semibold">Social Media Management</span>
              </div>
              <span className="text-white/30 text-xl md:text-2xl">|</span>
              <div className="flex items-center gap-2 md:gap-3">
                {/* <span className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-pink-400 to-orange-600 bg-clip-text text-transparent">150+</span> */}
                <span className="text-xs md:text-sm lg:text-base text-white uppercase tracking-wider font-semibold">Branding & Design</span>
              </div>
              <span className="text-white/30 text-xl md:text-2xl">|</span>
              <div className="flex items-center gap-2 md:gap-3">
                {/* <span className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">50M+</span> */}
                <span className="text-xs md:text-sm lg:text-base text-white uppercase tracking-wider font-semibold">Event Marketing & PR</span>
              </div>
              <span className="text-white/30 text-xl md:text-2xl">|</span>
              <div className="flex items-center gap-2 md:gap-3">
                {/* <span className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">95%</span> */}
                <span className="text-xs md:text-sm lg:text-base text-white uppercase tracking-wider font-semibold">Client Retention</span>
              </div>
              <span className="text-white/30 text-xl md:text-2xl">|</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}