"use client";

import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  image: string;
}

const servicesList: ServiceItem[] = [
  {
    num: "01",
    title: "Public Relations",
    desc: "Strategic PR campaigns for brands, concerts, festivals, and government projects with maximum media coverage.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=450&fit=crop"
  },
  {
    num: "02",
    title: "Influencer Marketing",
    desc: "Micro to celebrity-level influencer campaigns across Gujarat & Pan India for maximum brand impact.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=450&fit=crop"
  },
  {
    num: "03",
    title: "Event Promotions & PR",
    desc: "Concert PR, Navratri events, festival marketing, media partnerships, and launch event management.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=450&fit=crop"
  },
  {
    num: "04",
    title: "Brand Awareness",
    desc: "360° brand visibility campaigns with measurable reach, engagement, and impact across all channels.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop"
  },
  {
    num: "05",
    title: "Content Strategy",
    desc: "End-to-end content planning, creation, and execution for PR campaigns and digital promotions.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=450&fit=crop"
  },
  {
    num: "06",
    title: "Political & Government PR",
    desc: "Digital PR for government bodies, positive public image strategy for ministers and MLAs.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=450&fit=crop"
  },
  {
    num: "07",
    title: "Real Estate Marketing",
    desc: "PR campaigns, exhibitions, and digital promotions for leading real estate developers and groups.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&h=450&fit=crop"
  }
];

export default function ServicesOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [portalPos, setPortalPos] = useState({ x: 0, y: 0 });

  // Handle mousemove to position floating portal
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth lerp animation for portal position
  useEffect(() => {
    let animationFrameId: number;
    const updatePortal = () => {
      setPortalPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.12,
          y: prev.y + dy * 0.12,
        };
      });
      animationFrameId = requestAnimationFrame(updatePortal);
    };
    animationFrameId = requestAnimationFrame(updatePortal);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      const rows = listRef.current ? Array.from(listRef.current.children) : [];
      if (rows.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      id="services"
      ref={containerRef}
      className="relative py-10 sm:py-14 lg:py-16 bg-background overflow-hidden cursor-default"
    >
      {/* Background glow decoration */}
      <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-primary/3 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div ref={titleRef} className="text-left mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-primary text-[10px] font-extrabold uppercase tracking-wider mb-3">
            <span>OUR EXPERTISE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-foreground uppercase leading-none tracking-tight mb-4">
            WHAT WE DO
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed font-semibold">
            From PR campaigns to influencer marketing, event promotions to government PR — we deliver measurable impact at every scale.
          </p>
        </div>

        {/* Directory Card Row List */}
        <div ref={listRef} className="flex md:flex-col gap-4 md:gap-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 md:mx-0 md:px-0 w-full">
          {servicesList.map((service, index) => {
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group rounded-2xl border border-border/60 bg-card py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:bg-background hover:border-primary/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] px-6 sm:px-8 relative z-10 cursor-pointer snap-center shrink-0 w-[80vw] md:w-auto"
              >
                {/* Num + Title */}
                <div className="flex items-start sm:items-center gap-6 sm:gap-8 transition-transform duration-300 group-hover:translate-x-2">
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full pt-1 sm:pt-0">
                    {service.num}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-foreground">
                    {service.title}
                  </h3>
                </div>

                {/* Desc + Action */}
                <div className="flex items-center justify-between md:justify-end gap-8 md:w-1/2">
                  <p className="text-xs text-muted-foreground font-semibold leading-relaxed max-w-sm text-left">
                    {service.desc}
                  </p>
                  
                  <Link
                    href="#contact"
                    className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-foreground/80 bg-background group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:-rotate-45 transition-all duration-300 shadow-sm"
                    aria-label={`Inquire about ${service.title}`}
                  >
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Floating Preview Portal Component (Desktop only) */}
      <div
        ref={portalRef}
        className="fixed pointer-events-none z-50 overflow-hidden rounded-3xl border border-border/80 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.1)] hidden lg:block"
        style={{
          width: "280px",
          height: "190px",
          left: 0,
          top: 0,
          transform: `translate3d(${portalPos.x + 25}px, ${portalPos.y - 95}px, 0) scale(${
            hoveredIdx !== null ? 1 : 0
          })`,
          opacity: hoveredIdx !== null ? 1 : 0,
          transition: "transform 0.1s ease-out, opacity 0.2s ease-out, scale 0.2s ease-out",
        }}
      >
        {/* Vertical strip sliding container */}
        <div
          className="w-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col"
          style={{
            transform: `translateY(-${(hoveredIdx || 0) * 190}px)`,
            height: `${servicesList.length * 190}px`,
          }}
        >
          {servicesList.map((service, idx) => (
            <div key={idx} className="w-full h-[190px] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover filter brightness-[0.8]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}