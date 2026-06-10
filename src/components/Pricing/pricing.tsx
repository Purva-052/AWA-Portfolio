"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  popular: boolean;
  spotsLeft?: string;
}

const plans: PricingPlan[] = [
  {
    name: "Growth Plan",
    price: "₹50,000",
    period: "month",
    desc: "Ideal for emerging brands looking to build media presence and influencer partnerships.",
    features: [
      "5 influencer collaborations/mo",
      "Press release drafting & distribution",
      "Social media PR strategy",
      "Media outreach (print & digital)",
      "Monthly performance report",
      "Pause or cancel anytime",
    ],
    cta: "Subscribe to Growth",
    popular: false,
  },
  {
    name: "Full Scale PR",
    price: "₹1,25,000",
    period: "month",
    desc: "For brands aiming to dominate media coverage and maximize influencer reach across platforms.",
    features: [
      "15 influencer collaborations/mo",
      "Dedicated PR strategist & media relations",
      "Omnichannel coverage (TV, print, digital, social)",
      "Event PR & launch coordination",
      "Weekly analytics & campaign pivots",
      "24/7 dedicated communication channel",
      "Pause or cancel anytime",
    ],
    cta: "Scale Full-Throttle",
    popular: true,
    spotsLeft: "2 spots left",
  },
  {
    name: "Custom Campaign",
    price: "Custom",
    period: "project",
    desc: "Tailored multi-city campaign launches, celebrity influencer outreach, or dedicated media teams.",
    features: [
      "End-to-end campaign management",
      "Celebrity & macro-influencer partnerships",
      "Custom media buying & ad placements",
      "Dedicated PR team & content strategists",
      "On-ground event & production coordination",
      "Detailed ROI & attribution reporting",
    ],
    cta: "Book a Strategy Call",
    popular: false,
  },
];

/** Extract numeric value from price string like "₹50,000" → 50000 */
function extractNumericPrice(price: string): number | null {
  const cleaned = price.replace(/[^0-9]/g, "");
  return cleaned.length > 0 ? parseInt(cleaned, 10) : null;
}

/** Format number back to price display with currency & commas */
function formatPrice(value: number, original: string): string {
  const currency = original.match(/^[^0-9]*/)?.[0] || "";
  return `${currency}${value.toLocaleString("en-IN")}`;
}

const headingText = "CHOOSE YOUR PLAN";
const headingWords = headingText.split(" ");

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const priceRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      // --- Heading: staggered word reveal ---
      const wordInners = wordRefs.current.filter(Boolean);
      if (wordInners.length) {
        gsap.to(wordInners, {
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // --- Badge & description fade in ---
      const badge = headerRef.current?.querySelector(".inline-flex");
      const desc = headerRef.current?.querySelector("p");
      if (badge) {
        gsap.fromTo(
          badge,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
      if (desc) {
        gsap.fromTo(
          desc,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // --- Pricing cards: scale stagger entry ---
      const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // --- Price counter animation ---
      priceRefs.current.forEach((priceEl) => {
        if (!priceEl) return;
        const originalText = priceEl.getAttribute("data-price") || "";
        const numericVal = extractNumericPrice(originalText);
        if (numericVal === null) return; // skip "Custom"

        // Set initial display to ₹0
        priceEl.textContent = formatPrice(0, originalText);

        const counter = { val: 0 };
        gsap.to(counter, {
          val: numericVal,
          duration: 1.5,
          ease: "power1.out",
          snap: { val: 1 },
          scrollTrigger: {
            trigger: priceEl,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            if (priceEl) {
              priceEl.textContent = formatPrice(Math.round(counter.val), originalText);
            }
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="relative w-full py-24 lg:py-32 bg-background overflow-hidden"
    >
      {/* Background glow decoration */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-primary/4 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-left mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-primary text-[10px] font-extrabold uppercase tracking-wider mb-3">
            <span>TRANSPARENT VALUE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-foreground uppercase leading-none tracking-tight mb-4">
            {headingWords.map((word, i) => (
              <span key={i} className="word-mask mr-[0.25em] last:mr-0">
                <span
                  className="word-inner"
                  ref={(el) => { wordRefs.current[i] = el; }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
            Transparent PR & influencer marketing packages with clear deliverables. Pause or cancel whenever results dictate.
          </p>
        </div>

        {/* Spacious Pricing Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, idx) => {
            const isOmni = plan.popular;
            return (
              <div
                key={plan.name}
                className={`p-8 sm:p-10 rounded-3xl border border-border/80 bg-card flex flex-col justify-between min-h-[520px] transition-all duration-300 relative group cursor-default hover:border-primary/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:bg-background ${
                  isOmni ? "ring-2 ring-primary bg-primary/[0.01] dark:bg-primary/[0.03] animate-card-glow" : ""
                }`}
              >
                {/* Spot Counter badge */}
                {plan.spotsLeft && (
                  <div className="absolute top-4 right-4 bg-secondary text-white text-[8px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full animate-pulse shadow-sm z-10">
                    {plan.spotsLeft}
                  </div>
                )}

                <div className="flex flex-col gap-6">
                  {/* Tier Title */}
                  <div className="border-b border-border/50 pb-4">
                    <span className="font-mono text-[9px] font-black text-primary uppercase tracking-widest block mb-1">
                      {isOmni ? "RECOMMENDED VELOCITY" : `SERVICE_NODE_0${idx + 1}`}
                    </span>
                    <h3 className="font-heading text-lg font-black uppercase text-foreground">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Pricing Rate */}
                  <div className="flex items-baseline gap-1.5 bg-muted/20 rounded-xl px-4 py-2.5 w-fit">
                    <span
                      className="text-3xl sm:text-4xl font-heading font-black text-foreground uppercase leading-none"
                      ref={(el) => { priceRefs.current[idx] = el; }}
                      data-price={plan.price}
                    >
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                        / {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Plan description */}
                  <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                    {plan.desc}
                  </p>

                  {/* Included features */}
                  <div className="flex flex-col gap-3 pt-2">
                    <span className="font-mono text-[9px] font-black text-foreground/40 uppercase tracking-widest">
                      {"// Core Features"}
                    </span>
                    <ul className="flex flex-col gap-2.5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-xs text-foreground font-semibold leading-tight">
                          <Check size={14} className="text-secondary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pill Button Action */}
                <div className="mt-10">
                  <a
                    href="#contact"
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                      isOmni
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/15 hover:bg-primary/95"
                        : "bg-background border border-border text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Warning Indicator */}
        <div className="mt-12 text-left bg-muted/20 border border-border/50 rounded-2xl p-4 max-w-xl shadow-sm">
          <p className="font-mono text-[9px] text-muted-foreground uppercase leading-relaxed font-bold">
            [NOTICE]: We limit active, ongoing PR & influencer partnerships to 10 clients simultaneously. Currently 3 openings remain for this cycle.
          </p>
        </div>

      </div>
    </section>
  );
}
