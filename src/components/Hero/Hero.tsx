"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ delay: 0.3 });

      // Set initial states
      gsap.set([logoRef.current, textRef.current], {
        opacity: 0,
        y: 30,
      });

      // Animate elements in sequence
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
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.jpeg"
          alt="Ahmedabad Architecture"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay with opacity */}
        <div className="absolute inset-0 bg-white/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center gap-12 md:gap-16 px-6 md:px-12 lg:px-20 py-20">
        
        {/* Logo - with better proportions */}
        <div 
          ref={logoRef}
          className="relative w-[280px] h-[110px] md:w-[360px] md:h-[140px] lg:w-[440px] lg:h-[170px] flex-shrink-0 overflow-hidden"
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
        <div ref={textRef} className="max-w-5xl text-center space-y-6 md:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight px-4">
            Welcome to the world of AWA
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-4">
            Are you an Amdawadi? Then youre at the right place. Discover the vibrant culture, heritage, and innovation of Ahmedabad.
          </p>
        </div>
      </div>

    </section>
  );
}