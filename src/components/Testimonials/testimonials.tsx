"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquareQuote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "AWA Media orchestrated our entire property launch PR — from influencer walkthroughs to media coverage across Gujarat. The response exceeded every projection we had.",
    author: "Rajesh Patel",
    role: "VP Marketing, CREDAI Ahmedabad",
    rating: 5,
  },
  {
    quote:
      "Their influencer campaigns for our product launches drove massive social engagement and footfall. AWA truly understands brand storytelling at scale.",
    author: "Neha Sharma",
    role: "Brand Manager, Havmor Ice Cream",
    rating: 5,
  },
  {
    quote:
      "From artist announcements to day-of coverage, AWA Media handled our concert PR flawlessly. Ticket sales surged after every influencer post they coordinated.",
    author: "Arjun Mehta",
    role: "Event Director, LiveNow Entertainment",
    rating: 5,
  },
];

const headingText = "VERIFIED FEEDBACK";
const headingWords = headingText.split(" ");

/** Per-card entry directions for visual variety */
const cardEntryDirections = [
  { opacity: 0, x: -30, y: 0 },   // first card from left
  { opacity: 0, x: 0, y: 40 },    // second card from bottom
  { opacity: 0, x: 30, y: 0 },    // third card from right
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const quoteIconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const starRefs = useRef<(HTMLSpanElement | null)[]>([]);

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
            trigger: titleRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // --- Badge & description fade in ---
      const badge = titleRef.current?.querySelector(".inline-flex");
      const desc = titleRef.current?.querySelector("p");
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
              trigger: titleRef.current,
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
              trigger: titleRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // --- Testimonial cards: directionally varied entry ---
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const from = cardEntryDirections[i] || { opacity: 0, y: 40, x: 0 };
        gsap.fromTo(
          card,
          from,
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      // --- Quote icons: spin-scale reveal ---
      const quoteIcons = quoteIconRefs.current.filter(Boolean);
      if (quoteIcons.length) {
        gsap.fromTo(
          quoteIcons,
          { opacity: 0, scale: 0, rotation: -20 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // --- Star ratings: sequential stagger ---
      const stars = starRefs.current.filter(Boolean);
      if (stars.length) {
        gsap.fromTo(
          stars,
          { opacity: 0, scale: 0.5, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  /** Track the running index for individual stars across all cards */
  let starIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 lg:py-32 bg-background"
    >
      {/* Background glow decoration */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-primary/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div ref={titleRef} className="text-left mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-primary text-[10px] font-extrabold uppercase tracking-wider mb-3">
            <span>CLIENT REVIEWS</span>
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
            Trusted by leading brands, real estate developers, and event organizers across India.
          </p>
        </div>

        {/* Spacious Reviews Grid */}
        <div
          ref={cardsRef}
          className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 lg:mx-0 lg:px-0"
        >
          {testimonials.map((t, i) => {
            // Build individual star spans for stagger animation
            const starsMarkup = Array.from({ length: t.rating }, (_, s) => {
              const idx = starIndex++;
              return (
                <span
                  key={s}
                  ref={(el) => { starRefs.current[idx] = el; }}
                  className="inline-block"
                >
                  ★
                </span>
              );
            });

            return (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="p-8 rounded-3xl border border-border bg-card flex flex-col justify-between min-h-[300px] hover:border-primary/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:bg-background transition-all duration-300 group cursor-pointer snap-center shrink-0 w-[85vw] lg:w-auto"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary tracking-widest font-extrabold">
                      {starsMarkup}
                    </span>
                    <div
                      ref={(el) => { quoteIconRefs.current[i] = el; }}
                      className="inline-flex"
                    >
                      <MessageSquareQuote size={16} className="text-muted-foreground opacity-30 group-hover:text-primary group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-semibold">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-border/60 pt-4 mt-8">
                  <h4 className="font-heading text-xs font-black text-foreground uppercase tracking-wide">
                    {t.author}
                  </h4>
                  <span className="font-mono text-[9px] text-muted-foreground uppercase">
                    {t.role}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
