"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  MapPin,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GRADIENT = "linear-gradient(135deg,#FF6B35,#FF1493,#9D00FF)";

const ContactFooter = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(
    () => {
      if (isMobile) return;
      if (hasAnimatedRef.current) return;

      const title = titleRef.current;
      const items = contentRef.current?.children;

      if (!title || !items) return;

      gsap.set([title, items], { opacity: 0, y: 20 });

      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => (hasAnimatedRef.current = true),
        },
      })
        .to(title, { opacity: 1, y: 0, duration: 0.4 })
        .to(items, { opacity: 1, y: 0, stagger: 0.08, duration: 0.35 }, "-=0.2");
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  // Mobile Animation
  useEffect(() => {
    if (!isMobile) return;
    if (hasAnimatedRef.current) return;

    const title = titleRef.current;
    const items = contentRef.current ? Array.from(contentRef.current.children) : [];

    if (!title && !items.length) return;

    if (title) gsap.set(title, { opacity: 0, y: 20 });
    if (items.length) gsap.set(items, { opacity: 0, y: 20 });

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
            hasAnimatedRef.current = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (title) observer.observe(title);
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [isMobile]);

  const contactInfo = [
    {
      icon: <MapPin className="w-4 h-4 text-white" />,
      title: "Address",
      content: "CG Road, Navrangpura, Ahmedabad",
      link: "https://maps.google.com/?q=CG+Road+Ahmedabad",
    },
    {
      icon: <Mail className="w-4 h-4 text-white" />,
      title: "Email",
      content: "awamedia.co@gmail.com",
      link: "mailto:awamedia.co@gmail.com",
    },
    {
      icon: <Phone className="w-4 h-4 text-white" />,
      title: "Phone",
      content: "+91 85113 62120",
      link: "tel:+918511362120",
    },
  ];

  return (
    <footer
      id="contact"
      ref={containerRef}
      className="relative w-full py-12 lg:py-16 px-4 lg:px-8 bg-card transition-colors duration-500 overflow-hidden border-t border-black/5 dark:border-white/10"
    >
      {/* Decorative Orbs */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none hidden lg:block">
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2
            ref={titleRef}
            className="text-3xl lg:text-4xl font-black mb-3 uppercase tracking-tight"
            style={{
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Start Your Growth Audit
          </h2>
          <p className="text-muted-foreground text-sm lg:text-base font-semibold">
            Ready to engineering virality? Get in touch with us.
          </p>
        </div>

        {/* Contact cards */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10"
        >
          {contactInfo.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-5 rounded-3xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 shadow-sm"
            >
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#FF6B35] to-[#FF1493] shrink-0 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black text-foreground uppercase tracking-wide mb-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-snug font-semibold truncate">
                  {item.content}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all self-center shrink-0" />
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-black/5 dark:border-white/10">
          <div className="flex gap-3">
            <a
              href="https://instagram.com/awamedia.co"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center hover:bg-white/60 dark:hover:bg-white/15 text-foreground hover:scale-105 transition-all shadow-sm"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/awamedia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center hover:bg-white/60 dark:hover:bg-white/15 text-foreground hover:scale-105 transition-all shadow-sm"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <div className="text-center sm:text-right">
            <p className="text-sm font-black text-foreground uppercase tracking-wider">AWA MEDIA</p>
            <p className="text-xs text-muted-foreground font-semibold">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
