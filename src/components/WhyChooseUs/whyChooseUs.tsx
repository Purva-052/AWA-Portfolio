"use client";
import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Globe, Users, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface CredentialItem {
  metric: string;
  unit: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  status: string;
}

const credentialsList: CredentialItem[] = [
  {
    metric: "500",
    unit: "+ Campaigns",
    title: "Proven Track Record",
    desc: "From Salim-Sulaiman and Arijit Singh concert PR to AP Dhillon and Sonu Nigam — proven execution across large-scale events and top-tier brands.",
    icon: Zap,
    status: "[SYS_LOCK: SECURED_TRACK_RECORD]",
  },
  {
    metric: "10",
    unit: "K+ Influencers",
    title: "Pan India Network",
    desc: "Micro to celebrity-level influencer network across Gujarat & India, driving campaigns for Samsung, OpenAI, Hyundai, Mahindra, Kia, and more.",
    icon: Globe,
    status: "[SYS_LOCK: INFLUENCER_NETWORK]",
  },
  {
    metric: "360",
    unit: "° Visibility",
    title: "Trusted by Leaders",
    desc: "Trusted by CREDAI, IIM Ahmedabad, IIT Gandhinagar, Gujarat Government, Women's Premier League, PVR Cinemas, and Gujarat Titans.",
    icon: Users,
    status: "[SYS_LOCK: GOVERNMENT_TRUSTED]",
  },
];

// Scrambled characters on card hover
function ScrambledText({ text, active }: { text: string; active: boolean }) {
  const [displayVal, setDisplayVal] = useState(text);

  useEffect(() => {
    if (!active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayVal(text);
      return;
    }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*";
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayVal(() =>
        text
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iterations += 0.5;
      if (iterations >= text.length) {
        setDisplayVal(text);
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [active, text]);

  return <span>{displayVal}</span>;
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const headingText = "WHY CHOOSE AWA MEDIA?";
  const headingWords = headingText.split(" ");

  const metricRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle MouseMove for 3D Tilt and Cursor Light following
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (isMobile) return;
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    // Calculate rotation angles
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIdx(null);
    if (isMobile) return;
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const badge = headerRef.current?.querySelector(".credentials-badge");
      const desc = headerRef.current?.querySelector(".credentials-desc");
      const wordInners = headerRef.current?.querySelectorAll(".word-inner");

      // Badge entrance
      if (badge) {
        gsap.fromTo(
          badge,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          }
        );
      }

      // Title staggered reveal
      if (wordInners && wordInners.length > 0) {
        gsap.set(wordInners, { yPercent: 100 });
        gsap.to(wordInners, {
          yPercent: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        });
      }

      // Description reveal
      if (desc) {
        gsap.fromTo(
          desc,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.35,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          }
        );
      }

      // Cards staggered entrance
      if (cardRefs.current.length > 0) {
        gsap.fromTo(
          cardRefs.current,
          { opacity: 0, y: 45, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Count-up animation for metric numbers
      credentialsList.forEach((item, index) => {
        const valEl = metricRefs.current[index];
        if (valEl) {
          const targetNum = parseFloat(item.metric);
          const numObj = { number: 0 };
          const decimalPlaces = item.metric.includes(".") ? 1 : 0;

          gsap.to(numObj, {
            number: targetNum,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              once: true,
            },
            onUpdate: () => {
              if (metricRefs.current[index]) {
                const formatted = numObj.number.toFixed(decimalPlaces);
                metricRefs.current[index]!.textContent = formatted + item.unit;
              }
            },
          });
        }
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 bg-background relative overflow-hidden border-t border-black/5 dark:border-white/5 animate-fade-in"
    >
      {/* Decorative gradient background glows */}
      <div className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#FF1493]/3 dark:bg-[#FF1493]/2 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#FF6B35]/3 dark:bg-[#FF6B35]/2 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header Title Section */}
        <div ref={headerRef} className="text-center mb-16 max-w-3xl mx-auto">
          <div className="credentials-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#FF1493]/20 bg-[#FF1493]/5 text-[#FF1493] text-[10px] font-extrabold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles size={10} />
            <span>OUR CREDENTIALS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-foreground uppercase leading-none tracking-tight mb-4">
            {headingWords.map((word, i) => (
              <span
                key={i}
                className="word-mask mr-2"
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
              >
                <span className="word-inner inline-block">{word}</span>
              </span>
            ))}
          </h2>
          <p className="credentials-desc text-sm sm:text-base text-muted-foreground leading-relaxed font-semibold max-w-2xl mx-auto">
            At AWA MEDIA, we don&apos;t just promote brands — we build visibility, credibility, and influence. From local campaigns to national-level executions.
          </p>
        </div>

        {/* 3 Columns Cards Layout */}
        <div
          ref={cardsContainerRef}
          className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 max-w-7xl mx-auto"
        >
          {credentialsList.map((item, i) => {
            const Icon = item.icon;
            const isHovered = hoveredIdx === i;

            return (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                className="credential-card p-8 sm:p-9 rounded-3xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between min-h-[400px] relative overflow-hidden group hover:shadow-2xl hover:border-transparent dark:hover:border-transparent cursor-default snap-center shrink-0 w-[85vw] lg:w-auto"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                {/* Flowing Laser Border (SVG Rect Chase) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                  <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="24"
                    fill="none"
                    stroke="url(#chase-gradient)"
                    strokeWidth="2"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 dash-offset-anim"
                  />
                </svg>

                {/* Floating ID Tag */}
                <div className="absolute top-2 right-6 opacity-3 pointer-events-none font-mono text-[80px] font-black select-none text-foreground transition-all duration-500 group-hover:opacity-8 group-hover:scale-105"
                  style={{ transform: "translateZ(30px)" }}>
                  0{i + 1}
                </div>

                {/* Mouse-Following Radial Light Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,20,147,0.09), transparent 80%)",
                  }}
                />

                <div className="relative z-10 flex flex-col gap-5" style={{ transform: "translateZ(40px)" }}>
                  
                  {/* Top Bar: Icon & Graphic Widget */}
                  <div className="flex items-start justify-between">
                    {/* Top Icon Badge */}
                    <div className="w-12 h-12 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 text-primary flex items-center justify-center group-hover:bg-[#FF1493] group-hover:text-white group-hover:border-[#FF1493] transition-all duration-500 shadow-sm shrink-0">
                      <Icon size={20} className="transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    {/* UNIQUE MOTION GRAPHICS PER CARD */}
                    <div className="w-24 h-16 flex items-center justify-center shrink-0">
                      {i === 0 && (
                        /* ROI line chart drawing */
                        <svg viewBox="0 0 100 50" className="w-full h-full text-[#FF1493] overflow-visible">
                          <line x1="0" y1="45" x2="100" y2="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-30" />
                          <line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-30" />
                          <path
                            d="M 5 45 C 30 40, 45 20, 95 5"
                            fill="none"
                            stroke="url(#metric-glow-gradient)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            className="graph-path-anim"
                          />
                          <circle cx="95" cy="5" r="3.5" fill="#FF1493" className="animate-pulse" />
                          <circle cx="95" cy="5" r="7" fill="none" stroke="#FF1493" strokeWidth="0.5" className="animate-ping origin-center" />
                        </svg>
                      )}

                      {i === 1 && (
                        /* Omnichannel connecting constellation */
                        <svg viewBox="0 0 60 60" className="w-12 h-12 text-[#FF1493] overflow-visible">
                          <circle cx="30" cy="30" r="22" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: "12s" }} />
                          <circle cx="30" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-spin" style={{ animationDuration: "8s", animationDirection: "reverse" }} />
                          
                          {/* Radial spoke lines */}
                          <line x1="30" y1="30" x2="30" y2="8" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" className="origin-center animate-spin" style={{ animationDuration: "6s" }} />
                          <line x1="30" y1="30" x2="52" y2="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" className="origin-center animate-spin" style={{ animationDuration: "9s" }} />
                          
                          {/* Central node */}
                          <circle cx="30" cy="30" r="4" fill="url(#metric-glow-gradient)" className="animate-pulse" />
                          
                          {/* Orbit nodes */}
                          <circle cx="30" cy="8" r="2.5" fill="#FF1493" />
                          <circle cx="52" cy="30" r="2.5" fill="#FF6B35" />
                          <circle cx="30" cy="52" r="2.5" fill="#9B59B6" />
                          <circle cx="8" cy="30" r="2.5" fill="#FF1493" />
                        </svg>
                      )}

                      {i === 2 && (
                        /* Rotating wireframe globe arc sweep */
                        <svg viewBox="0 0 60 60" className="w-12 h-12 text-[#FF1493] overflow-visible">
                          <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth="0.75" />
                          <ellipse cx="30" cy="30" rx="24" ry="8" fill="none" stroke="currentColor" strokeWidth="0.4" />
                          <ellipse cx="30" cy="30" rx="24" ry="16" fill="none" stroke="currentColor" strokeWidth="0.4" />
                          <line x1="6" y1="30" x2="54" y2="30" stroke="currentColor" strokeWidth="0.5" />
                          <line x1="30" y1="6" x2="30" y2="54" stroke="currentColor" strokeWidth="0.5" />
                          {/* Sweep arc */}
                          <path
                            d="M 22 26 Q 40 12, 48 38"
                            fill="none"
                            stroke="#FF6B35"
                            strokeWidth="1"
                            strokeDasharray="40"
                            className="globe-arc-anim"
                          />
                          <circle cx="22" cy="26" r="1.5" fill="#FF6B35" />
                          <circle cx="48" cy="38" r="1.5" fill="#FF1493" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Metric Display */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <h3
                      ref={(el) => { metricRefs.current[i] = el; }}
                      className="text-4xl sm:text-5xl font-black font-heading tracking-tight leading-none bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9B59B6] bg-clip-text text-transparent"
                    >
                      0{item.unit}
                    </h3>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-2">
                    <h4 className="font-heading text-lg font-black uppercase text-foreground tracking-tight leading-snug">
                      <ScrambledText text={item.title} active={isHovered} />
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Status metadata */}
                <div className="relative z-10 mt-8 flex items-center justify-between text-[8.5px] font-mono font-bold tracking-wider text-muted-foreground/60 transition-colors duration-300 group-hover:text-[#FF1493]/70"
                  style={{ transform: "translateZ(20px)" }}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 group-hover:bg-[#FF1493] animate-pulse" />
                    <span>{item.status}</span>
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#FF1493]">SYS_READY_</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global SVG gradients definition */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="chase-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#FF1493" />
            <stop offset="100%" stopColor="#9B59B6" />
          </linearGradient>
          <linearGradient id="metric-glow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="100%" stopColor="#FF1493" />
          </linearGradient>
          <radialGradient id="radial-node-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF1493" />
            <stop offset="100%" stopColor="#9B59B6" />
          </radialGradient>
        </defs>
      </svg>

      <style jsx>{`
        .word-mask {
          overflow: hidden;
          vertical-align: bottom;
        }
        .word-inner {
          will-change: transform;
        }
        
        /* Chasing laser border keyframes */
        @keyframes borderChase {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -1000; }
        }
        .dash-offset-anim {
          stroke-dasharray: 120, 600;
          animation: borderChase 4s linear infinite;
        }

        /* SVG Line Graph draw keyframes */
        @keyframes drawGraph {
          0% { stroke-dashoffset: 120; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -120; }
        }
        .graph-path-anim {
          stroke-dasharray: 120;
          animation: drawGraph 3.5s infinite ease-in-out;
        }

        /* SVG Globe sweep arc keyframes */
        @keyframes traceArc {
          0% { stroke-dashoffset: 50; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -50; }
        }
        .globe-arc-anim {
          stroke-dasharray: 50;
          animation: traceArc 2.5s infinite linear;
        }
      `}</style>
    </section>
  );
}