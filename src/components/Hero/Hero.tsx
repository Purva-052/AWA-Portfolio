"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Flame, Eye, TrendingUp, Tv, Zap, BarChart3 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Reaction {
  id: number;
  emoji: string;
  left: number;
  scale: number;
  delay: number;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Counters refs
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Live reactions state for phone simulator
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const reactionId = useRef(0);

  // Spawn reactions at random intervals
  useEffect(() => {
    const emojis = ["❤️", "🔥", "🚀", "✨", "💯", "😍", "⚡", "📈"];
    const interval = setInterval(() => {
      const newReaction: Reaction = {
        id: reactionId.current++,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 50 + 25, // center range (25% to 75%)
        scale: Math.random() * 0.4 + 0.8,
        delay: Math.random() * 0.2
      };
      setReactions((prev) => [...prev, newReaction].slice(-15)); // Keep only latest 15
    }, 450);

    return () => clearInterval(interval);
  }, []);

  // HTML5 Interactive Canvas Particle Web
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    const particles: Particle[] = [];
    const particleCount = 40;
    
    // Monochrome SMM color palette variables
    const colors = ["#111111", "#4B5563", "#9CA3AF", "#D1D5DB"]; // carbon, graphite, silver, light gray

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.2,
        color: colors[i % colors.length],
      });
    }

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(17, 17, 17, ${0.08 * (1 - dist / 100)})`; // Carbon connection lines
            ctx.lineWidth = 0.6;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        // Gravity effect
        if (mouse.x > -500) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            // Particles are drawn slightly towards the mouse
            p.vx -= (dx / dist) * force * 0.04;
            p.vy -= (dy / dist) * force * 0.04;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // Friction to steady the system
        p.vx *= 0.98;
        p.vy *= 0.98;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.2) {
          p.vx += (Math.random() - 0.5) * 0.1;
          p.vy += (Math.random() - 0.5) * 0.1;
        }

        // Keep inside bounds
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // GSAP Entrance Animations
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ delay: 0.15 });

      // Initial state config
      gsap.set(leftContentRef.current, { opacity: 1 });
      gsap.set(rightContentRef.current, { opacity: 0, scale: 0.94, y: 30 });

      const wordInners = leftContentRef.current?.querySelectorAll(".word-inner");
      if (wordInners) {
        gsap.set(wordInners, { y: "110%" });
      }

      const buttons = leftContentRef.current?.querySelectorAll(".hero-btn");
      if (buttons) {
        gsap.set(buttons, { opacity: 0, y: 15, scale: 0.95 });
      }

      const badge = leftContentRef.current?.querySelector(".hero-badge");
      if (badge) {
        gsap.set(badge, { opacity: 0, y: -10, scale: 0.9 });
      }

      const paragraph = leftContentRef.current?.querySelector(".hero-paragraph");
      if (paragraph) {
        gsap.set(paragraph, { opacity: 0, y: 15, filter: "blur(6px)" });
      }

      const metrics = leftContentRef.current?.querySelector(".hero-metrics");
      if (metrics) {
        gsap.set(metrics, { opacity: 0, y: 20, scale: 0.97 });
      }

      // Timeline sequence
      if (badge) {
        tl.to(badge, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)" });
      }

      if (wordInners && wordInners.length > 0) {
        tl.to(wordInners, { y: "0%", duration: 0.65, stagger: 0.05, ease: "power4.out" }, "-=0.25");
      }

      if (paragraph) {
        tl.to(paragraph, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, ease: "power3.out" }, "-=0.3");
      }

      if (buttons && buttons.length > 0) {
        tl.to(buttons, { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: "back.out(1.2)" }, "-=0.25");
      }

      if (metrics) {
        tl.to(metrics, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" }, "-=0.2");
      }

      // Trigger counter animation
      counterRefs.current.forEach((ref) => {
        if (ref) {
          const target = parseFloat(ref.dataset.target || "0");
          const suffix = ref.dataset.suffix || "";
          const isDecimal = ref.dataset.decimal === "true";
          gsap.from(ref, {
            textContent: 0,
            duration: 2,
            ease: "power1.out",
            snap: { textContent: isDecimal ? 0.1 : 1 },
            delay: 0.4,
            onUpdate: function () {
              if (ref) {
                const val = parseFloat(ref.textContent || "0");
                ref.textContent = isDecimal ? val.toFixed(1) + suffix : Math.round(val) + suffix;
              }
            },
          });
          ref.textContent = isDecimal ? target.toFixed(1) + suffix : target + suffix;
        }
      });

      // Right-side floating assembly animates in
      tl.to(rightContentRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.8");
    },
    { scope: containerRef }
  );

  const renderSplitWords = (text: string, className?: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="word-mask mr-2 sm:mr-3">
        <span className={`word-inner ${className || ""}`}>{word}</span>
      </span>
    ));
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center pt-28 pb-16 lg:pt-32 lg:pb-24 bg-background overflow-hidden"
    >
      {/* Premium Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-primary/8 blur-[100px] animate-glow-orb-1" />
        <div className="absolute bottom-[5%] left-[5%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-secondary/8 blur-[120px] animate-glow-orb-2" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Panel: SMM Content & Copy */}
          <div ref={leftContentRef} className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-foreground/10 bg-foreground/5 text-foreground text-[10px] font-extrabold uppercase tracking-wider w-fit">
              <Sparkles size={12} className="text-secondary shrink-0 animate-pulse" />
              <span>A Place Where Ideas Grow</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight uppercase">
              {renderSplitWords("AWA MEDIA")}{" "}<br />
              <span className="word-mask"><span className="word-inner bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9D00FF] bg-clip-text text-transparent">PR</span></span>{" "}
              <span className="word-mask"><span className="word-inner bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9D00FF] bg-clip-text text-transparent">&</span></span>{" "}
              <span className="word-mask"><span className="word-inner bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9D00FF] bg-clip-text text-transparent">INFLUENCER</span></span>{" "}
              <span className="word-mask"><span className="word-inner">AGENCY</span></span>
            </h1>

            <p className="hero-paragraph text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-medium">
              Gujarat&apos;s leading PR & Influencer Marketing agency. We deliver impactful brand visibility, digital presence solutions, and high-impact campaigns for top-tier brands, concerts, events, and government projects across Pan India.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="hero-btn inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9B59B6] px-8 py-4 text-sm font-bold text-white uppercase rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[0_0_30px_rgba(255,20,147,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Your Campaign
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#portfolio"
                className="hero-btn inline-flex items-center justify-center px-8 py-4 border border-border/80 bg-card text-foreground font-bold text-sm uppercase rounded-full transition-all duration-300 hover:bg-muted/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                View Portfolio
              </a>
            </div>

            {/* Standard Metrics */}
            <div className="hero-metrics grid grid-cols-3 gap-4 p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm mt-8 max-w-lg shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)]">
              <div className="flex flex-col p-2">
                <span className="text-2xl sm:text-3xl font-heading font-black text-foreground flex items-center gap-1 leading-none mb-1">
                  <span ref={(el) => { counterRefs.current[0] = el; }} data-target="100" data-suffix="+">100+</span>
                  <Flame size={16} className="text-secondary fill-secondary shrink-0" />
                </span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                  Brands Served
                </span>
              </div>
              <div className="flex flex-col p-2">
                <span className="text-2xl sm:text-3xl font-heading font-black text-foreground flex items-center gap-1 leading-none mb-1">
                  <span ref={(el) => { counterRefs.current[1] = el; }} data-target="500" data-suffix="+">500+</span>
                </span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                  Campaigns Delivered
                </span>
              </div>
              <div className="flex flex-col p-2">
                <span className="text-2xl sm:text-3xl font-heading font-black text-secondary flex items-center gap-1 leading-none mb-1">
                  <span ref={(el) => { counterRefs.current[2] = el; }} data-target="5" data-suffix="+ Yrs">5+ Yrs</span>
                  <Eye size={16} className="text-primary shrink-0" />
                </span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                  Of Growth
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive 3D Canvas Scene & Floating Social widgets */}
          <div ref={rightContentRef} className="lg:col-span-6 flex justify-center w-full relative z-20 min-h-[500px]">
            <div className="relative w-full max-w-lg aspect-[1/1] sm:aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center pointer-events-none" style={{ perspective: 1200 }}>
              
              {/* HTML5 Particle Network Canvas */}
              <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full pointer-events-auto z-0 rounded-3xl border border-border/40 bg-card/10 backdrop-blur-[2px]" 
              />

              {/* CARD 1: Floating Vertical Stream Mockup (Center, 3D Tilted) */}
              <div 
                className="absolute z-20 w-[190px] h-[330px] rounded-[32px] border border-white/8 bg-[#090911]/85 backdrop-blur-xl shadow-2xl pointer-events-auto transition-transform duration-300 hover:scale-[1.04] animate-float-1 flex flex-col overflow-hidden"
                style={{
                  transform: "rotateY(-15deg) rotateX(10deg) rotateZ(-3deg)",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Simulated Phone Screen */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[70px] h-4 bg-black rounded-full z-30 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800/80 mr-1" />
                  <span className="w-8 h-1 bg-slate-800/50 rounded-full" />
                </div>

                {/* Shifting Gradient Loop inside Stream Viewport */}
                <div className="w-full h-full relative bg-gradient-to-tr from-purple-800/20 via-pink-700/20 to-cyan-700/20 overflow-hidden flex flex-col justify-between p-3.5">
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.5)_100%)] z-10" />

                  {/* Header bar */}
                  <div className="flex justify-between items-center z-20 pt-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full border border-primary/20 bg-primary/20 flex items-center justify-center text-[8px]">A</div>
                      <div className="flex flex-col leading-none">
                        <span className="text-[7.5px] font-black text-white">@awamedia.co</span>
                        <span className="text-[6px] text-white/50">14.8k watching</span>
                      </div>
                    </div>
                    <span className="text-[7px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-500 text-white flex items-center gap-0.5 animate-pulse shadow-sm">
                      <span className="w-1 h-1 rounded-full bg-white" /> Live
                    </span>
                  </div>

                  {/* Reaction Emitter Area */}
                  <div className="absolute inset-0 overflow-hidden z-15 pointer-events-none">
                    {reactions.map((reaction) => (
                      <span
                        key={reaction.id}
                        className="absolute bottom-10 font-sans text-xl animate-reaction pointer-events-none select-none"
                        style={{
                          left: `${reaction.left}%`,
                          animationDelay: `${reaction.delay}s`,
                          transform: `scale(${reaction.scale})`
                        }}
                      >
                        {reaction.emoji}
                      </span>
                    ))}
                  </div>

                  {/* Bottom info overlays */}
                  <div className="z-20 flex flex-col gap-1.5 pt-16">
                    <div className="p-1.5 rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm">
                      <p className="text-[7.5px] text-white font-bold leading-normal">
                        🔥 Campaign Impact: <span className="text-secondary">Pan India Reach</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-extrabold text-white">PR Campaign Live</span>
                        <span className="text-[7px] text-secondary">#pr #influencer #awa</span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-secondary/20 border border-secondary flex items-center justify-center text-secondary">
                        <Tv size={10} className="animate-spin" style={{ animationDuration: "6s" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: Performance Growth Widget (Bottom-Left, Foreground) */}
              <div 
                className="absolute z-30 left-[5px] sm:left-[-15px] bottom-[25px] w-[170px] h-[150px] rounded-2xl border border-black/5 bg-white/95 backdrop-blur-md shadow-2xl pointer-events-auto transition-transform duration-300 hover:scale-[1.05] animate-float-2 p-4 flex flex-col justify-between"
                style={{
                  transform: "rotateY(-5deg) rotateX(8deg) rotateZ(3deg)",
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="flex items-center justify-between border-b border-black/5 pb-2">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={11} className="text-secondary" />
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-foreground">BRAND IMPACT</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
                </div>

                <div className="my-2.5">
                  <span className="text-2xl font-heading font-black text-secondary tracking-tight block leading-none">
                    +342.8%
                  </span>
                  <span className="text-[7.5px] text-muted-foreground uppercase tracking-widest font-extrabold mt-1 block">
                    Campaign ROI Growth
                  </span>
                </div>

                {/* Simulated Sparkline Graph */}
                <div className="w-full h-11 relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 150 50">
                    <defs>
                      <linearGradient id="bronzeGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Area Fill */}
                    <path
                      d="M 0,45 Q 25,35 50,40 T 100,20 T 150,5 L 150,50 L 0,50 Z"
                      fill="url(#bronzeGlow)"
                    />

                    {/* Path line with drawing animations */}
                    <path
                      d="M 0,45 Q 25,35 50,40 T 100,20 T 150,5"
                      fill="none"
                      stroke="var(--secondary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="250"
                      strokeDashoffset="0"
                      className="transition-all duration-300"
                    />
                    
                    {/* Circle marker */}
                    <circle cx="150" cy="5" r="3" fill="var(--secondary)" className="animate-pulse" />
                  </svg>
                </div>
              </div>

              {/* CARD 3: Hashtag Cloud widget (Top-Right, Background) */}
              <div 
                className="absolute z-10 right-[5px] sm:right-[-15px] top-[25px] w-[165px] h-[155px] rounded-2xl border border-black/5 bg-white/90 backdrop-blur-md shadow-xl pointer-events-auto transition-transform duration-300 hover:scale-[1.05] animate-float-3 p-4 flex flex-col justify-between"
                style={{
                  transform: "rotateY(-20deg) rotateX(12deg) rotateZ(-4deg)",
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="flex items-center gap-1.5 border-b border-black/5 pb-2 mb-2">
                  <Zap size={11} className="text-primary" />
                  <span className="text-[8.5px] font-black uppercase tracking-wider text-foreground">Top Clients</span>
                </div>

                <div className="flex flex-col gap-1.5 flex-grow justify-center">
                  <div className="flex items-center justify-between px-2 py-1 rounded bg-black/[0.03] border border-black/5 hover:border-primary/30 transition-colors">
                    <span className="text-[7.5px] font-bold text-foreground">#1 SAMSUNG</span>
                    <span className="text-[6.5px] text-primary font-black uppercase">ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-1 rounded bg-black/[0.03] border border-black/5 hover:border-secondary/30 transition-colors">
                    <span className="text-[7.5px] font-bold text-foreground">#2 OPENAI</span>
                    <span className="text-[6.5px] text-secondary font-black uppercase">ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between px-2 py-1 rounded bg-black/[0.03] border border-black/5 hover:border-accent/30 transition-colors">
                    <span className="text-[7.5px] font-bold text-foreground">#3 GUJARAT GOV</span>
                    <span className="text-[6.5px] text-accent font-black uppercase">ACTIVE</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[7px] text-muted-foreground pt-1.5 font-bold uppercase mt-1">
                  <span>Last synced 2m ago</span>
                  <BarChart3 size={9} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .word-mask {
          overflow: hidden;
          display: inline-block;
          vertical-align: bottom;
        }
        .word-inner {
          display: inline-block;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}