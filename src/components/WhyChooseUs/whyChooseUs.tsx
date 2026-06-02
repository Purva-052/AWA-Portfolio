"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BarChart3, Layers, Zap, Eye, Globe, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GRADIENT = "linear-gradient(135deg,#FF6B35,#FF1493,#9D00FF)";

const gradientText = {
  background: GRADIENT,
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent",
};

const features = [
  {
    title: "Hook Engineering",
    desc: "We analyze the first 3 seconds of every video to design visual and verbal hooks that stop the user's scroll instantly.",
    icon: Zap,
  },
  {
    title: "Retention-Focused Editing",
    desc: "Cuts, zooms, graphical overlays, sound effects, and text animations engineered specifically to maximize viewer retention.",
    icon: Layers,
  },
  {
    title: "Algorithmic Vetting",
    desc: "Aligning video structures, trending audio options, and meta descriptions to match platform algorithms for organic push.",
    icon: BarChart3,
  },
  {
    title: "Analytics-First Auditing",
    desc: "Deep analysis of audience drop-off points, CTRs, and click rates to double-down on the highest performing assets.",
    icon: Eye,
  },
  {
    title: "Omnichannel Syndication",
    desc: "Optimizing content to publish natively across Instagram Reels, TikTok, YouTube Shorts, and LinkedIn simultaneously.",
    icon: Globe,
  },
  {
    title: "A-List Creative Team",
    desc: "Dedicated scriptwriters, visual editors, and channel managers aligned directly with your brand's growth goals.",
    icon: Users,
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile Animation (Intersection Observer)
  useEffect(() => {
    if (!isMobile) return;

    const header = headerRef.current;
    const cards = cardsRef.current ? Array.from(cardsRef.current.children) : [];
    if (!header || !cards.length) return;

    gsap.set(header, { opacity: 0, y: 30 });
    gsap.set(cards, { opacity: 0, y: 30 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              overwrite: true
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(header);
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [isMobile]);

  // Desktop Animation (ScrollTrigger)
  useGSAP(
    () => {
      if (isMobile) return;

      const header = headerRef.current;
      const cards = cardsRef.current ? Array.from(cardsRef.current.children) : [];
      if (!header || !cards.length) return;

      // header slides up
      gsap.set(header, { opacity: 0, y: 30 });
      gsap.to(header, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
      });

      // cards: scale + fade stagger
      gsap.set(cards, { opacity: 0, y: 36, scale: 0.95 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.3)",
        scrollTrigger: { trigger: cardsRef.current, start: "top 85%", once: true },
      });

      // icon badges: bounce in
      const icons = cardsRef.current?.querySelectorAll("[data-icon]");
      if (icons) {
        gsap.set(icons, { scale: 0, rotation: -12 });
        gsap.to(icons, {
          scale: 1,
          rotation: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "back.out(2)",
          delay: 0.3,
          scrollTrigger: { trigger: cardsRef.current, start: "top 85%", once: true },
        });
      }

      // blobs: pulse
      const blobs = cardsRef.current?.querySelectorAll("[data-blob]");
      if (blobs) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          blobs.forEach((blob, i) => {
            gsap.to(blob, {
              scale: 1.15,
              opacity: 0.22,
              duration: 2.2 + i * 0.3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: i * 0.4,
            });
          });
        });
      }
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-background transition-colors duration-500 border-t border-black/5 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span
            className="inline-block px-4 py-1.5 text-xs font-bold uppercase rounded-full text-white mb-3"
            style={{ background: GRADIENT }}
          >
            Our Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            Built for <span style={gradientText}>Virality</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto font-medium">
            We don&apos;t post and hope. We execute a meticulous, data-driven workflow designed to turn viewers into active community members.
          </p>
        </div>

        {/* 3-column grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const IconComponent = f.icon;
            return (
              <div
                key={i}
                className="group bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-black/5 dark:border-white/10 p-6 hover:shadow-xl hover:border-black/10 dark:hover:border-white/20 hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden cursor-default"
              >
                {/* Corner gradient blob */}
                <div
                  data-blob
                  className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-10 pointer-events-none"
                  style={{ background: GRADIENT }}
                />

                <div className="relative z-10">
                  {/* Icon badge */}
                  <div
                    data-icon
                    className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-[#FF6B35] to-[#FF1493] shadow-[0_4px_12px_rgba(255,107,53,0.3)]"
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-black text-foreground mb-2 uppercase">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;