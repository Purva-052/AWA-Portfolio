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

interface ContactFooterProps {
  backgroundColor?: string;
}

const ContactFooter = ({ backgroundColor = "#0a0a0a" }: ContactFooterProps) => {
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
    { scope: containerRef }
  );

  const contactInfo = [
    {
      icon: <MapPin className="w-4 h-4" />,
      title: "Address",
      content: "CG Road, Navrangpura, Ahmedabad",
      link: "https://maps.google.com/?q=CG+Road+Ahmedabad",
    },
    {
      icon: <Mail className="w-4 h-4" />,
      title: "Email",
      content: "awamedia.co@gmail.com",
      link: "mailto:awamedia.co@gmail.com",
    },
    {
      icon: <Phone className="w-4 h-4" />,
      title: "Phone",
      content: "+91 85113 62120",
      link: "tel:+918511362120",
    },
  ];

  return (
    <footer
      ref={containerRef}
      className="relative w-full py-8 lg:py-10 px-4 lg:px-8 overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* subtle background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2
            ref={titleRef}
            className="text-2xl lg:text-4xl font-black mb-2"
            style={{
              background:
                "linear-gradient(135deg,#FF6B35,#FF1493,#9B59B6,#3498DB,#2ECC71)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Let’s Connect
          </h2>
          <p className="text-gray-400 text-sm lg:text-base">
            Have a project in mind? Let’s talk.
          </p>
        </div>

        {/* Contact cards */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6"
        >
          {contactInfo.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-pink-500">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-snug">
                  {item.content}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition" />
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex gap-3">
            <a
              href="https://instagram.com/awamedia.co"
              target="_blank"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/awamedia"
              target="_blank"
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <div className="text-center lg:text-right">
            <p className="text-sm font-semibold text-white">AWA MEDIA</p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
