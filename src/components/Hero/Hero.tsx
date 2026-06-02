"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Eye, Flame, Users2, Sparkles } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const stripTexts = [
    "Short-Form Video Production",
    "Hook Engineering",
    "Viral Scriptwriting",
    "Audience Growth Strategy",
    "Retention Optimization",
    "Influencer Campaign Management",
    "Social Analytics & Auditing",
  ];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ delay: 0.3 });

      // Initial states
      gsap.set(leftContentRef.current, {
        opacity: 0,
        x: -40,
      });

      gsap.set(phoneRef.current, {
        opacity: 0,
        x: 40,
        rotateY: -15,
        scale: 0.9,
      });

      gsap.set(stripRef.current, {
        y: 100,
        opacity: 0,
      });

      // Animate text & phone in timeline
      tl.to(leftContentRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          phoneRef.current,
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.2)",
          },
          "-=0.5"
        )
        .to(
          stripRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );

      // Soft float animation for the phone mockup
      gsap.to(phoneRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Marquee continuous loop
      const marqueeContents = stripRef.current?.querySelectorAll(".marquee-content");
      if (marqueeContents) {
        marqueeContents.forEach((content) => {
          gsap.fromTo(
            content,
            { x: "0%" },
            {
              x: "-100%",
              duration: 35,
              repeat: -1,
              ease: "none",
            }
          );
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between pt-24 pb-12 sm:pb-16 lg:pb-0 bg-background transition-colors duration-500"
    >
      {/* Decorative Grid and Glowing Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30">
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-[#FF6B35] rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#9D00FF] rounded-full blur-[120px]" />
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex-grow flex items-center relative z-10 py-8 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Text & Stats Column */}
          <div ref={leftContentRef} className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 w-fit">
              <Sparkles size={14} className="text-[#FF6B35]" />
              <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                Attention-First Agency
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-foreground leading-tight tracking-tight">
              We Help Brands <br />
              <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9D00FF] bg-clip-text text-transparent drop-shadow-sm">
                Dominate the Scroll
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium">
              We engineer scroll-stopping short-form content, viral campaigns, and organic channel strategy that transforms viewer attention into customer revenue.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9B59B6] px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,20,147,0.4)] hover:scale-[1.03] active:scale-95"
              >
                <span className="relative z-10">Get a Free Audit</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-bold text-foreground border border-black/15 dark:border-white/20 hover:border-black/30 hover:border-white/40 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 hover:scale-[1.03]"
              >
                View Viral Showcase
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/5 dark:border-white/10 mt-4 max-w-lg">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-foreground flex items-center gap-1">
                  50M+ <Flame size={16} className="text-amber-500 fill-amber-500 shrink-0" />
                </span>
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  Views Driven
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-foreground flex items-center gap-1">
                  2.4M+ <Users2 size={16} className="text-indigo-500 shrink-0" />
                </span>
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  Followers Added
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-foreground flex items-center gap-1">
                  18.6% <Eye size={16} className="text-emerald-500 shrink-0" />
                </span>
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  Avg Engagement
                </span>
              </div>
            </div>
          </div>

          {/* Right Phone Mockup Column */}
          <div ref={phoneRef} className="lg:col-span-5 flex justify-center items-center relative perspective-1000">
            {/* Phone Body Frame */}
            <div className="relative w-[280px] sm:w-[320px] aspect-[9/18.5] rounded-[48px] border-[10px] border-neutral-900 bg-neutral-950 p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] dark:shadow-[0_25px_60px_-15px_rgba(255,20,147,0.15)] flex flex-col justify-between overflow-hidden">
              {/* Phone Camera Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-5 bg-neutral-900 rounded-full z-30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
              </div>

              {/* Live Reel Preview */}
              <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-zinc-900">
                <Image
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=1200&fit=crop"
                  alt="Reel content mockup"
                  fill
                  className="object-cover object-center pointer-events-none brightness-[0.85]"
                />

                {/* Video Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <Play size={24} fill="white" className="ml-1" />
                  </div>
                </div>

                {/* Reel UI Elements Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-3 text-white pointer-events-none">
                  {/* Creator Info */}
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full border border-white/20 overflow-hidden">
                      <Image
                        src="/logo.png"
                        alt="AWA avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold">@awamedia</h4>
                      <p className="text-[10px] text-white/80 flex items-center gap-1">
                        <span>Original Audio</span> • <span>Trending</span>
                      </p>
                    </div>
                  </div>

                  {/* Caption */}
                  <p className="text-xs leading-relaxed text-white/90 drop-shadow">
                    How we scaled a SaaS founder to 1.5M views in 30 days using the "Curiosity Loop" hook strategy. 📈🚀 #growthmarketing
                  </p>
                </div>

                {/* Sidebar engagement buttons */}
                <div className="absolute bottom-16 right-3 z-20 flex flex-col gap-4 items-center text-white pointer-events-none">
                  <div className="flex flex-col items-center gap-1 drop-shadow">
                    <div className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-pink-550 border border-white/10">
                      ❤️
                    </div>
                    <span className="text-[10px] font-bold">85.4K</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 drop-shadow">
                    <div className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10">
                      💬
                    </div>
                    <span className="text-[10px] font-bold">1,240</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 drop-shadow">
                    <div className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10">
                      ✈️
                    </div>
                    <span className="text-[10px] font-bold">25.3K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Marquee Strip */}
      <div
        ref={stripRef}
        className="w-full overflow-hidden bg-black/90 dark:bg-black border-t border-b border-black/5 dark:border-white/5 py-4.5 mt-8 lg:mt-16"
      >
        <div className="relative flex whitespace-nowrap">
          {/* Marquee Group 1 */}
          <div className="marquee-content flex gap-8 sm:gap-12 items-center">
            {stripTexts.map((text, index) => (
              <div key={index} className="flex items-center gap-8 sm:gap-12">
                <span className="text-white text-sm sm:text-base font-extrabold uppercase tracking-widest">
                  {text}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#9D00FF] font-black text-lg">
                  ✦
                </span>
              </div>
            ))}
          </div>
          {/* Marquee Group 2 */}
          <div className="marquee-content flex gap-8 sm:gap-12 items-center ml-8 sm:ml-12">
            {stripTexts.map((text, index) => (
              <div key={`dup-${index}`} className="flex items-center gap-8 sm:gap-12">
                <span className="text-white text-sm sm:text-base font-extrabold uppercase tracking-widest">
                  {text}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#9D00FF] font-black text-lg">
                  ✦
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}