"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, PenTool, Layers, Globe, BarChart3, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  title: string;
  desc: string;
  icon: React.ElementType;
  metric: string;
}

const steps: ProcessStep[] = [
  { title: "Brief & Research", desc: "Analyzing brand positioning, target demographics, and campaign objectives.", icon: Search, metric: "GOAL_ALIGN" },
  { title: "Strategy & Curation", desc: "Selecting relevant media channels and vetting the perfect creators for outreach.", icon: PenTool, metric: "STRAT_PLAN" },
  { title: "PR & Media Execution", desc: "Drafting campaign materials, securing media slots, and coordinating influencers.", icon: Layers, metric: "MEDIA_EXEC" },
  { title: "Campaign Launch", desc: "Distributing press releases, launching creator content, and event coverage.", icon: Globe, metric: "PR_LAUNCH" },
  { title: "ROI & Impact Audit", desc: "Analyzing brand reach, engagement metrics, and media pickup reports.", icon: BarChart3, metric: "ROI_REPORT" },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const headingWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Heading word-split text
  const headingText = "OUR CAMPAIGN PROCESS";
  const headingWords = headingText.split(" ");

  useGSAP(
    () => {
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
              trigger: titleRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Step cards: sequential scale + y animation
      const items = stepsRef.current ? Array.from(stepsRef.current.children) : [];
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Step icons: elastic bounce animation (delayed after cards)
      const icons = iconRefs.current.filter(Boolean);
      if (icons.length) {
        gsap.fromTo(
          icons,
          { scale: 0 },
          {
            scale: 1,
            duration: 1,
            stagger: 0.15,
            ease: "elastic.out(1, 0.5)",
            delay: 0.3,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Bottom CTA banner: separate ScrollTrigger fade-up
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 lg:py-32 bg-card"
    >
      {/* Background glow decoration */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-secondary/3 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div ref={titleRef} className="text-left mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-primary text-[10px] font-extrabold uppercase tracking-wider mb-3">
            <span>HOW WE WORK</span>
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
            How we design, execute, and scale PR and influencer marketing campaigns for maximum brand impact.
          </p>
        </div>

        {/* Assembly Line Step Nodes Grid (Spacious Grid) */}
        <div
          ref={stepsRef}
          className="flex md:grid md:grid-cols-5 gap-6 sm:gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 md:mx-0 md:px-0"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-border/60 bg-background flex flex-col justify-between min-h-[240px] hover:border-primary/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 group cursor-pointer snap-center shrink-0 w-[80vw] md:w-auto"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase w-fit">
                      STEP_0{idx + 1}
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground uppercase opacity-55">
                      {"// "}{step.metric}
                    </span>
                  </div>

                  <div className="h-[1px] bg-border/50 w-full" />

                  <div className="flex flex-col gap-2">
                    <h3 className="font-heading text-xs font-black uppercase text-foreground leading-none">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-semibold">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div
                  className="w-10 h-10 rounded-xl border border-border bg-card text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 shadow-sm mt-6"
                  ref={(el) => { iconRefs.current[idx] = el; }}
                >
                  <Icon size={14} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Assembly Line Bottom Action Callout */}
        <div ref={bannerRef} className="mt-20 rounded-3xl border border-border/80 bg-card shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden">
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-6 relative bg-gradient-to-br from-primary/[0.02] to-secondary/[0.02]">
            <span className="inline-flex items-center gap-1.5 border border-secondary/15 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider text-secondary bg-secondary/5">
              ⚡ STRATEGIC CAMPAIGNS ACTIVE
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-foreground leading-none tracking-tight">
              Ready to elevate your brand&apos;s presence?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl font-semibold">
              We combine strategic PR with high-impact influencer marketing to build authority and reach. Let&apos;s design your next campaign.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-primary hover:text-white hover:scale-[1.02] shadow-md shadow-foreground/5"
            >
              Start Your Campaign
              <ArrowRight size={12} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}