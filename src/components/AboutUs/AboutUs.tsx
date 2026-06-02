"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Instagram, Youtube, Linkedin, Flame } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface AboutUsMetric {
  value: string;
  label: string;
}

interface AboutUsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  highlightPhrases?: string[];
  metrics?: AboutUsMetric[];
  backgroundColor?: string;
}

const AboutUs = ({
  title = "Platforms We Dominate",
  subtitle = "Tailored Blueprints to Stop the Scroll",
  description = "Different social channels operate on different algorithms and viewer psychologies. We don't just crop video files—we build native channel blueprints to ensure your message fits the environment and gains maximum algorithmic velocity.",
  highlightPhrases = [
    "Instagram: Aesthetic Branding & Reel Hooks",
    "TikTok: High-Retention Visual Storytelling",
    "YouTube: Multi-Angle Editing & Dynamic Titles",
    "LinkedIn: Thought Leadership & Value Carousels",
    "Shorts/Reels: Auto-Paced Captions & Sound FX",
  ],
  metrics = [
    { value: "35M+", label: "TikTok Views" },
    { value: "15M+", label: "Reels Reach" },
    { value: "8.5%", label: "Avg YouTube CTR" },
  ],
}: AboutUsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const typingTextRef = useRef<HTMLSpanElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const metricRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metricValueRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const metricLabelRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!typingTextRef.current) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentPhrase = highlightPhrases[phraseIndex];

      if (!isDeleting) {
        typingTextRef.current!.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, 800);
          return;
        }

        timeoutId = setTimeout(type, 35);
      } else {
        typingTextRef.current!.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % highlightPhrases.length;
          timeoutId = setTimeout(type, 100);
          return;
        }

        timeoutId = setTimeout(type, 15);
      }
    };

    type();
    return () => clearTimeout(timeoutId);
  }, [highlightPhrases]);

  // MOBILE: repeat animations on scroll (enter = animate in, leave = animate out)
  useEffect(() => {
    if (!isMobile) return;

    const cardsEl = cardsContainerRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const descEl = descriptionRef.current;
    const highlightEl = highlightRef.current;

    if (!cardsEl || !titleEl || !descEl || !highlightEl) return;

    // Initial hidden state (mobile only)
    gsap.set(cardsEl.children, { opacity: 0, y: 35, scale: 0.95 });
    gsap.set([titleEl, subtitleEl, descEl, highlightEl], { opacity: 0, y: 28 });
    gsap.set(metricRefs.current, { opacity: 0, y: 25, scale: 0.95 });
    gsap.set(metricLabelRefs.current, { opacity: 0 });

    const resetMetricValues = () => {
      metrics.forEach((_, index) => {
        const el = metricValueRefs.current[index];
        if (el) el.textContent = "0";
      });
    };
    resetMetricValues();

    const countUpMetric = (index: number) => {
      const el = metricValueRefs.current[index];
      if (!el) return;

      const fullValue = metrics[index]?.value || "";
      const numericMatch = fullValue.match(/[\d,.]+/);
      const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
      const unit = fullValue.replace(/[\d,.]+/, "").trim();

      if (numericValue <= 0) {
        el.textContent = fullValue;
        return;
      }

      const numberObj = { number: 0 };
      gsap.to(numberObj, {
        number: numericValue,
        duration: 1.1,
        ease: "power2.out",
        onUpdate: () => {
          const val = numberObj.number % 1 === 0 ? Math.floor(numberObj.number) : numberObj.number.toFixed(1);
          el.textContent = val + (unit ? unit : "");
        },
      });
    };

    const animateIn = (el: Element, type: "cards" | "text" | "metric") => {
      if (type === "cards") {
        gsap.to(Array.from(el.children), {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        });
      }
      if (type === "text") {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
      }
      if (type === "metric") {
        gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.6)" });
      }
    };

    const animateOut = (el: Element, type: "cards" | "text" | "metric") => {
      if (type === "cards") {
        gsap.to(Array.from(el.children), {
          opacity: 0,
          y: 35,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.out",
        });
      }
      if (type === "text") {
        gsap.to(el, { opacity: 0, y: 28, duration: 0.35, ease: "power2.out" });
      }
      if (type === "metric") {
        gsap.to(el, { opacity: 0, y: 25, scale: 0.95, duration: 0.35, ease: "power2.out" });
      }
    };

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animateIn(entry.target, "cards");
          else animateOut(entry.target, "cards");
        });
      },
      { threshold: 0.1 }
    );
    cardsObserver.observe(cardsEl);

    const blockObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animateIn(entry.target, "text");
          else animateOut(entry.target, "text");
        });
      },
      { threshold: 0.25 }
    );

    blockObserver.observe(titleEl);
    if (subtitleEl) blockObserver.observe(subtitleEl);
    blockObserver.observe(descEl);
    blockObserver.observe(highlightEl);

    const metricObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = metricRefs.current.findIndex((m) => m === entry.target);

          if (entry.isIntersecting) {
            animateIn(entry.target, "metric");
            if (idx !== -1) {
              const labelEl = metricLabelRefs.current[idx];
              if (labelEl) gsap.to(labelEl, { opacity: 1, duration: 0.3 });
              countUpMetric(idx);
            }
          } else {
            animateOut(entry.target, "metric");
            if (idx !== -1) {
              const labelEl = metricLabelRefs.current[idx];
              if (labelEl) gsap.to(labelEl, { opacity: 0, duration: 0.2 });
              const valueEl = metricValueRefs.current[idx];
              if (valueEl) valueEl.textContent = "0";
            }
          }
        });
      },
      { threshold: 0.55 }
    );

    metricRefs.current.forEach((m) => {
      if (m) metricObserver.observe(m);
    });

    return () => {
      cardsObserver.disconnect();
      blockObserver.disconnect();
      metricObserver.disconnect();
    };
  }, [isMobile, metrics]);

  // Desktop GSAP
  useGSAP(
    () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
      ScrollTrigger.refresh();

      if (isMobile) return;

      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, x: -50 });
      gsap.set([descriptionRef.current, highlightRef.current], { opacity: 0, x: -30 });
      gsap.set(cardsContainerRef.current?.children || [], { opacity: 0, x: 50, scale: 0.95 });
      gsap.set(metricRefs.current, { opacity: 0, y: 40, scale: 0.9 });
      gsap.set(metricLabelRefs.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(titleRef.current, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 0);
      if (subtitleRef.current) {
        tl.to(subtitleRef.current, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 0.1);
      }

      tl.to(descriptionRef.current, { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" }, 0.3)
        .to(highlightRef.current, { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" }, 0.5);

      tl.to(
        Array.from(cardsContainerRef.current?.children || []),
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
        },
        0.2
      );

      metricRefs.current.forEach((metricRef, index) => {
        if (metricRef && metricValueRefs.current[index]) {
          const fullValue = metrics[index]?.value || "";
          const numericMatch = fullValue.match(/[\d,.]+/);
          const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
          const unit = fullValue.replace(/[\d,.]+/, "").trim();

          const startTime = 0.8 + index * 0.15;

          tl.to(
            metricRef,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            startTime
          );

          if (numericValue > 0) {
            const numberObj = { number: 0 };
            tl.to(
              numberObj,
              {
                number: numericValue,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => {
                  if (metricValueRefs.current[index]) {
                    const val = numberObj.number % 1 === 0 ? Math.floor(numberObj.number).toLocaleString() : numberObj.number.toFixed(1);
                    metricValueRefs.current[index]!.textContent = val + (unit ? unit : "");
                  }
                },
              },
              startTime
            );
          }

          if (metricLabelRefs.current[index]) {
            tl.to(
              metricLabelRefs.current[index],
              { opacity: 1, duration: 0.5, ease: "power2.out" },
              startTime + 0.3
            );
          }
        }
      });
    },
    {
      scope: containerRef,
      dependencies: [metrics, subtitle, isMobile],
      revertOnUpdate: true,
    }
  );

  return (
    <div
      id="about"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-card transition-colors duration-500 border-t border-black/5 dark:border-white/5"
      ref={containerRef}
    >
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .cursor-blink {
          animation: blink 1s infinite;
        }
      `}</style>

      <div className="container mx-auto relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2
                ref={titleRef}
                className="text-foreground text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight uppercase"
              >
                {title}
              </h2>

              <h3
                ref={subtitleRef}
                className="text-lg sm:text-xl font-bold leading-relaxed"
                style={{
                  background: "linear-gradient(135deg, #FF6B35 0%, #FF1493 50%, #9D00FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {subtitle}
              </h3>
            </div>

            <p
              ref={descriptionRef}
              className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium"
            >
              {description}
            </p>

            <div
              ref={highlightRef}
              className="border-l-4 border-[#FF1493] bg-black/5 dark:bg-white/5 pl-5 py-4.5 rounded-r-2xl backdrop-blur-sm shadow-sm"
              style={{ minHeight: "75px" }}
            >
              <p className="text-foreground text-sm sm:text-base font-bold leading-relaxed italic flex items-center gap-2">
                <span ref={typingTextRef}></span>
                <span className="cursor-blink inline-block w-[2px] h-[16px] bg-[#FF1493]"></span>
              </p>
            </div>

            {/* Platform Metrics */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  ref={(el) => { metricRefs.current[index] = el; }}
                  className="flex flex-col gap-1 items-center justify-center p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm shadow-md hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300"
                >
                  <h4
                    ref={(el) => { metricValueRefs.current[index] = el; }}
                    className="text-xl sm:text-2xl font-black leading-none bg-gradient-to-r from-[#FF6B35] to-[#9D00FF] bg-clip-text text-transparent"
                  >
                    {metric.value}
                  </h4>
                  <p
                    ref={(el) => { metricLabelRefs.current[index] = el; }}
                    className="text-muted-foreground text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider"
                  >
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Platforms Grid Column */}
          <div className="lg:col-span-6">
            <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Instagram Card */}
              <div className="p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-[#FF1493] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF6B35] to-[#FF1493] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Instagram size={20} />
                </div>
                <h4 className="text-base font-black text-foreground mb-1.5 uppercase">Instagram Blueprints</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                  Aesthetic visual framing, high-retention reel structure, audio hook curation, and carousels designed to convert views into website visits.
                </p>
              </div>

              {/* TikTok Card */}
              <div className="p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-[#9D00FF] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg group">
                <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Flame size={20} className="text-[#00f2fe]" />
                </div>
                <h4 className="text-base font-black text-foreground mb-1.5 uppercase">TikTok Velocity</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                  Extreme hook testing, fast-paced editing cuts, automated text styling, trend newsjacking, and leveraging platform-specific viral formats.
                </p>
              </div>

              {/* YouTube Shorts / Video Card */}
              <div className="p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-red-650 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg group">
                <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Youtube size={20} />
                </div>
                <h4 className="text-base font-black text-foreground mb-1.5 uppercase">YouTube Optimization</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                  Clickable high-contrast thumbnail engineering, deep retention pacing analysis, title optimization, and community integration.
                </p>
              </div>

              {/* LinkedIn Card */}
              <div className="p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-blue-650 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg group">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Linkedin size={20} />
                </div>
                <h4 className="text-base font-black text-foreground mb-1.5 uppercase">LinkedIn Authority</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                  Thought leadership scripting, high-value visual document carousels, text copywriting hooks, and direct lead generation templates.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
