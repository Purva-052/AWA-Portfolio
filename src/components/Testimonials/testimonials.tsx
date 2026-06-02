"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Star, MessageSquareQuote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GRADIENT = "linear-gradient(135deg,#FF6B35,#FF1493,#9D00FF)";

const gradientText = {
  background: GRADIENT,
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent",
};

const testimonials = [
  {
    quote:
      "AWA Media scaled our founder's LinkedIn impressions by 4x and drove direct organic inquiries from our carousel strategy. They are master hook engineers.",
    author: "Sarah Mitchell",
    role: "CEO, TechVision Inc.",
    rating: 5,
  },
  {
    quote:
      "We saw a 380% direct ROI on our Reels campaign. They manage everything from script auditing to editing and community management. Highly recommended.",
    author: "Marcus Chen",
    role: "Marketing Director, Innovate Labs",
    rating: 5,
  },
  {
    quote:
      "Their short-form pacing is incredible. We went from 0 to 150k followers in under 90 days on TikTok. Our retention curves have never looked better.",
    author: "Emily Rodriguez",
    role: "Founder, Green Future Co.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(
    () => {
      if (isMobile) return;
      if (animated.current) return;

      const title = titleRef.current;
      const cards = cardsRef.current?.children;
      if (!title || !cards) return;

      gsap.set([title, cards], { opacity: 0, y: 20 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => (animated.current = true),
        },
      })
        .to(title, { opacity: 1, y: 0, duration: 0.4 })
        .to(cards, { opacity: 1, y: 0, stagger: 0.12, duration: 0.35 }, "-=0.2");
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  // Mobile Animation
  useEffect(() => {
    if (!isMobile) return;
    if (animated.current) return;

    const title = titleRef.current;
    const cards = cardsRef.current ? Array.from(cardsRef.current.children) : [];

    if (title) gsap.set(title, { opacity: 0, y: 20 });
    if (cards.length) gsap.set(cards, { opacity: 0, y: 20 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true
            });
            observer.unobserve(entry.target);
            animated.current = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (title) observer.observe(title);
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background transition-colors duration-500 border-t border-black/5 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-12">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide text-white mb-3"
            style={{ background: GRADIENT }}
          >
            Reviews
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2 tracking-tight">
            What Creators <span style={gradientText}>& Brands Say</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl font-medium">
            Helping founders and agencies break retention benchmarks.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md rounded-3xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="opacity-20 mb-4 text-[#FF1493] group-hover:scale-110 transition-transform duration-300">
                <MessageSquareQuote size={32} />
              </div>

              <div className="flex gap-1 mb-4 text-amber-500">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 font-semibold">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="border-t border-black/5 dark:border-white/10 pt-4">
                <p className="text-sm font-black text-foreground uppercase tracking-wide">
                  {t.author}
                </p>
                <p className="text-xs text-muted-foreground font-semibold">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
