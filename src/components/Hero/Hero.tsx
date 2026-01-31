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

  const stripTexts = [
    "Digital Marketing",
    "Brand Strategy",
    "Creative Design",
    "Social Media",
    "Content Creation",
    "SEO Services",
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ delay: 0.3 });

      // Set initial states
      gsap.set([logoRef.current, textRef.current], {
        opacity: 0,
        y: 30,
      });

      // Set strip initial state - start from bottom
      gsap.set(stripRef.current, {
        y: 200,
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
        )
        .to(
          stripRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.3"
        );

      // Continuous horizontal marquee animation for the strip
      const marqueeContents = stripRef.current?.querySelectorAll('.marquee-content');
      if (marqueeContents) {
        marqueeContents.forEach((content) => {
          gsap.fromTo(
            content,
            { x: '0%' },
            {
              x: '-100%',
              duration: 30,
              repeat: -1,
              ease: 'none',
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
      className="relative h-screen overflow-hidden"
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
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-12 sm:py-16 md:py-20 pb-30 sm:pb-28 md:pb-32 lg:pb-10">
        
        {/* Logo - with better proportions */}
        <div 
          ref={logoRef}
          className="relative w-[280px] h-[200px] xs:w-[180px] xs:h-[72px] sm:w-[220px] sm:h-[88px] md:w-[280px] md:h-[110px] lg:w-[360px] lg:h-[140px] xl:w-[300px] xl:h-[150px] flex-shrink-0 overflow-hidden"
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
        <div ref={textRef} className="max-w-5xl text-center space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 xl:-space-y-0.5">
          <h1 className="text-3xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-gray-900 leading-tight px-3 sm:px-1">
            Welcome to the world of AWA
          </h1>
          
          <p className="text-xl xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-gray-900 leading-relaxed max-w-3xl mx-auto px-3 sm:px-4">
            Are you an Amdawadi? Then you&apos;re at the right place. Discover the vibrant culture, heritage, and innovation of Ahmedabad.
          </p>
        </div>
      </div>

      {/* Animated Strip - positioned at bottom */}
      <div 
        ref={stripRef}
        className="absolute bottom-0 sm:bottom-16 md:bottom-10 lg:bottom-0 left-0 right-0 z-20 overflow-hidden bg-black py-2 sm:py-3 md:py-2 lg:py-2 xl:py-2"
      >
        <div className="relative flex whitespace-nowrap">
          {/* First marquee content */}
          <div className="marquee-content flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
            {stripTexts.map((text, index) => (
              <div key={index} className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16">
                <span className="text-white text-sm xs:text-base sm:text-sm md:text-sm lg:text-sm xl:text-sm font-bold uppercase tracking-wider">
                  {text}
                </span>
                <span className="text-white text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm">★</span>
              </div>
            ))}
          </div>
          {/* Second marquee content (duplicate for seamless loop) */}
          <div className="marquee-content flex gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center ml-4 sm:ml-6 md:ml-8 lg:ml-12 xl:ml-16">
            {stripTexts.map((text, index) => (
              <div key={`duplicate-${index}`} className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16">
                <span className="text-white text-sm xs:text-base sm:text-sm md:text-sm lg:text-sm xl:text-sm font-bold uppercase tracking-wider">
                  {text}
                </span>
                <span className="text-white text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm">★</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}