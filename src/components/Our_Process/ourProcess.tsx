"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Search, PenTool, Layers, Globe, BarChart3, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GRADIENT = "linear-gradient(135deg,#FF6B35,#FF1493,#9D00FF)";

const gradientText = {
  background: GRADIENT,
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent",
};

const steps = [
  { title: "Brand Audit", desc: "Analysis of niche & competition", Icon: Search },
  { title: "Script & Hook Design", desc: "Visual storytelling hooks", Icon: PenTool },
  { title: "Dynamic Editing", desc: "Retention pacing & sound fx", Icon: Layers },
  { title: "Omnichannel Post", desc: "Native platform syndication", Icon: Globe },
  { title: "Analytics Pivot", desc: "Demographic drop-off review", Icon: BarChart3 },
];

const HowWeWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const desktopStepsRef = useRef<HTMLDivElement>(null);
  const mobileStepsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile Animation
  useEffect(() => {
    if (!isMobile) return;

    const title = titleRef.current;
    const items = mobileStepsRef.current ? Array.from(mobileStepsRef.current.children) : [];
    const banner = bannerRef.current;

    if (title) gsap.set(title, { opacity: 0, y: 30 });
    if (items.length) gsap.set(items, { opacity: 0, y: 30 });
    if (banner) gsap.set(banner, { opacity: 0, y: 30 });

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

    if (title) observer.observe(title);
    items.forEach(item => observer.observe(item));
    if (banner) observer.observe(banner);

    return () => observer.disconnect();
  }, [isMobile]);

  // Desktop GSAP
  useGSAP(
    () => {
      if (isMobile) return;

      const title = titleRef.current;
      const desktopStepItems = desktopStepsRef.current ? Array.from(desktopStepsRef.current.children) : [];
      const mobileStepItems = mobileStepsRef.current ? Array.from(mobileStepsRef.current.children) : [];
      const stepItems = [...desktopStepItems, ...mobileStepItems];
      const banner = bannerRef.current;

      const allTargets = [title, ...stepItems, banner].filter(Boolean);
      gsap.set(allTargets, { opacity: 0, y: 24 });

      gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      })
        .to(title, { opacity: 1, y: 0, duration: 0.4 })
        .to(stepItems, { opacity: 1, y: 0, stagger: 0.1, duration: 0.35 }, "-=0.15");

      gsap.to(banner, {
        opacity: 1, y: 0, duration: 0.55, ease: "power2.out",
        scrollTrigger: { trigger: bannerRef.current, start: "top 88%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-card transition-colors duration-500 border-t border-black/5 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto">

        {/* Stepper Header */}
        <div ref={titleRef} className="text-center mb-12">
          <span
            className="inline-block px-4 py-1.5 text-xs font-bold uppercase rounded-full text-white mb-3"
            style={{ background: GRADIENT }}
          >
            How We Scale
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2 tracking-tight">
            Our <span style={gradientText}>Process</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto font-medium">
            A structured content development pipeline built for viral velocity.
          </p>
        </div>

        {/* Desktop Stepper */}
        <div ref={desktopStepsRef} className="hidden lg:block relative pb-16">
          <div className="absolute top-[21px] left-0 right-0 h-0.5 bg-black/5 dark:bg-white/10" />
          <div className="absolute top-[21px] left-0 right-0 h-0.5" style={{ background: GRADIENT, opacity: 0.3 }} />
          <div className="grid grid-cols-5 gap-6 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.Icon;
              return (
                <div key={i} className="text-center group">
                  <div className="w-11 h-11 mx-auto mb-3 flex items-center justify-center rounded-full bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/15 text-foreground backdrop-blur shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-black/10 dark:group-hover:border-white/20">
                    <span className="text-[#FF1493] group-hover:scale-110 transition-transform duration-300">
                      <Icon size={18} />
                    </span>
                  </div>
                  <h3 className="text-xs font-black uppercase mb-1 text-foreground tracking-wide leading-tight">{step.title}</h3>
                  <p className="text-xs text-muted-foreground font-semibold leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Stepper */}
        <div ref={mobileStepsRef} className="lg:hidden space-y-6 pb-12">
          {steps.map((step, i) => {
            const Icon = step.Icon;
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/15 shadow-md flex items-center justify-center">
                    <span className="text-[#FF1493]">
                      <Icon size={18} />
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-black/5 dark:bg-white/10" style={{ background: GRADIENT, opacity: 0.3 }} />
                  )}
                </div>
                <div className="pt-1.5">
                  <h3 className="text-sm font-black uppercase mb-1 text-foreground leading-none">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-tight font-semibold">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Panel */}
        <div ref={bannerRef} className="pt-4 pb-12">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-md">
            <div className="relative w-full p-8 sm:p-10 lg:p-16 flex flex-col items-center justify-center text-center">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-2 border-black/5 dark:border-white/5 opacity-5 pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-black/5 dark:border-white/5 opacity-5 pointer-events-none" />

              <div className="relative z-10 max-w-2xl">
                <span
                  className="inline-block px-4 py-1.5 text-xs font-bold uppercase rounded-full text-white mb-5 animate-pulse"
                  style={{ background: GRADIENT }}
                >
                  Scale Today
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight mb-4 tracking-tight">
                  Let&apos;s engineer your brand&apos;s <span style={gradientText}>viral roadmap</span>
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 font-medium">
                  We couple hook structures with retention design to drive meaningful, organic metrics. Let&apos;s map out your channel today.
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-foreground border border-black/15 dark:border-white/20 hover:border-black/30 dark:hover:border-white/40 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 hover:scale-[1.03]"
                >
                  Book a Growth Call
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowWeWork;