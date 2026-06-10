"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Phone,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const footerMetaRef = useRef<HTMLDivElement>(null);

  const headingText = "LET'S COLLABORATE";
  const headingWords = headingText.split(" ");

  useGSAP(
    () => {
      // Animate the badge
      const badge = titleRef.current?.querySelector(".engage-badge");
      if (badge) {
        gsap.fromTo(
          badge,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Word-split reveal animation for the heading
      const wordInners = titleRef.current?.querySelectorAll(".word-inner");
      if (wordInners && wordInners.length) {
        gsap.set(wordInners, { yPercent: 100 });
        gsap.to(wordInners, {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      // Animate description paragraph
      const paragraph = titleRef.current?.querySelector(".engage-desc");
      if (paragraph) {
        gsap.fromTo(
          paragraph,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Contact cards: stagger from bottom with scale
      const cards = contentRef.current ? Array.from(contentRef.current.children) : [];
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Social icons: bounce-in with scale
      const socialIcons = socialsRef.current ? Array.from(socialsRef.current.children) : [];
      if (socialIcons.length) {
        gsap.fromTo(
          socialIcons,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: footerMetaRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      // Footer text/credits: fade in after main content
      const creditsBlock = footerMetaRef.current?.querySelector(".credits-block");
      if (creditsBlock) {
        gsap.fromTo(
          creditsBlock,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerMetaRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const contactInfo = [
    {
      icon: <MapPin size={16} />,
      title: "HQ Address",
      content: "129, Sameer Complex, CG Rd, Ahmedabad",
      link: "https://maps.google.com/?q=129+Sameer+Complex+CG+Road+Ahmedabad",
    },
    {
      icon: <Phone size={16} />,
      title: "Phone",
      content: "+91 97141 53334",
      link: "tel:+919714153334",
    },
    {
      icon: <Phone size={16} />,
      title: "Phone 2",
      content: "+91 97146 07159",
      link: "tel:+919714607159",
    },
  ];

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative w-full py-24 lg:py-32 bg-card overflow-hidden border-t border-border/60"
    >
      {/* Background glow decoration */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-primary/4 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div ref={titleRef} className="text-left mb-16 max-w-xl">
          <div className="engage-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-primary text-[10px] font-extrabold uppercase tracking-wider mb-3">
            <span>ENGAGE PROJECT</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-foreground uppercase leading-none tracking-tight mb-4">
            {headingWords.map((word, i) => (
              <span
                key={i}
                className="word-mask"
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
              >
                <span
                  className="word-inner"
                  style={{ display: "inline-block" }}
                >
                  {word}
                </span>
                {i < headingWords.length - 1 && "\u00A0"}
              </span>
            ))}
          </h2>
          <p className="engage-desc text-sm text-muted-foreground leading-relaxed font-semibold">
            Ready to elevate your brand&apos;s visibility? Connect with AWA MEDIA for impactful PR & influencer campaigns.
          </p>
        </div>

        {/* Spacious Contact Cards Grid */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {contactInfo.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-3xl border border-border bg-background flex items-center justify-between gap-4 hover:border-primary/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl border border-border bg-card text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 shadow-sm shrink-0">
                  {item.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[9px] font-extrabold text-primary uppercase tracking-wider block mb-1">
                    {item.title}
                  </span>
                  <span className="text-xs text-foreground font-semibold truncate leading-none">
                    {item.content}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-foreground opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
            </a>
          ))}
        </div>

        {/* Footer Bottom Meta */}
        <div ref={footerMetaRef} className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 mt-16 border-t border-border/60">
          {/* Social Links */}
          <div ref={socialsRef} className="flex gap-2">
            <a
              href="https://instagram.com/awamedia.co"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
              aria-label="Instagram"
            >
              <Instagram size={14} />
            </a>
            <a
              href="https://linkedin.com/company/awamedia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
          </div>

          {/* Credits */}
          <div className="credits-block text-center sm:text-right">
            <p className="font-heading text-xs font-black uppercase text-foreground leading-none mb-1">
              AWA MEDIA // ATTENTION_LABS
            </p>
            <span className="font-mono text-[9px] text-muted-foreground uppercase">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
