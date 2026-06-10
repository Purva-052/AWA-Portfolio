"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
  teamImage?: string;
}

const AboutUs = ({
  title = "Who We Are",
  subtitle = "A Leading PR & Influencer Marketing Agency — Founded 2021",
  description = "AWA MEDIA is a leading PR and Influencer Marketing Agency, delivering impactful brand visibility and digital presence solutions. Founded in 2021, we have rapidly grown into a trusted partner for top-tier brands, events, and government projects across Gujarat and Pan India. With a strong network of influencers and media channels, we specialize in PR campaigns, influencer marketing, brand awareness, and content strategy.",
  highlightPhrases = [
    "Public Relations (PR Campaigns)",
    "Influencer Marketing (Micro to Celebrity)",
    "Event Promotions & Media Partnerships",
    "Brand Awareness Campaigns",
    "Content Strategy & Execution",
    "Political & Government PR",
    "Real Estate & Exhibition Marketing"
  ],
  metrics = [
    { value: "500+", label: "Campaigns" },
    { value: "100+", label: "Brands" },
    { value: "5+", label: "Years" }
  ],
  teamImage = "/aboutUs.png",
}: AboutUsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const typingTextRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const metricRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metricValueRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const metricLabelRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);

  // Detect Mobile Viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Text Typing Animation loop
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

  // MOBILE: Trigger elements based on IntersectionObserver scroll entry/exit
  useEffect(() => {
    if (!isMobile) return;

    const imageEl = imageRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const descEl = descriptionRef.current;
    const highlightEl = highlightRef.current;

    if (!imageEl || !titleEl || !descEl || !highlightEl) return;

    // Initial mobile-specific setup
    gsap.set([imageEl], { opacity: 0, y: 35, scale: 0.95 });
    gsap.set([descEl, highlightEl], { opacity: 0, y: 25 });
    if (subtitleEl) gsap.set(subtitleEl, { opacity: 0, y: 20 });
    
    const titleWords = titleEl.querySelectorAll(".word-inner");
    if (titleWords.length > 0) {
      gsap.set(titleWords, { y: "100%" });
    } else {
      gsap.set(titleEl, { opacity: 0, y: 25 });
    }

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
      const numericMatch = fullValue.match(/[\d,]+/);
      const numericValue = numericMatch ? parseInt(numericMatch[0].replace(/,/g, "")) : 0;
      const unit = fullValue.replace(/[\d,]+/, "").trim();

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
          el.textContent = Math.floor(numberObj.number).toLocaleString() + (unit ? unit : "");
        },
      });
    };

    const animateIn = (el: Element, type: "image" | "text" | "metric") => {
      if (type === "image") {
        gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" });
      }
      if (type === "text") {
        if (el === titleEl) {
          const words = el.querySelectorAll(".word-inner");
          if (words.length > 0) {
            gsap.to(words, { y: "0%", duration: 0.65, stagger: 0.05, ease: "power3.out" });
          } else {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
          }
        } else {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" });
        }
      }
      if (type === "metric") {
        gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.6)" });
      }
    };

    const animateOut = (el: Element, type: "image" | "text" | "metric") => {
      if (type === "image") {
        gsap.to(el, { opacity: 0, y: 35, scale: 0.95, duration: 0.4, ease: "power2.out" });
      }
      if (type === "text") {
        if (el === titleEl) {
          const words = el.querySelectorAll(".word-inner");
          if (words.length > 0) {
            gsap.to(words, { y: "100%", duration: 0.4, ease: "power2.in" });
          } else {
            gsap.to(el, { opacity: 0, y: 25, duration: 0.35, ease: "power2.out" });
          }
        } else {
          gsap.to(el, { opacity: 0, y: 25, duration: 0.35, ease: "power2.out" });
        }
      }
      if (type === "metric") {
        gsap.to(el, { opacity: 0, y: 25, scale: 0.95, duration: 0.35, ease: "power2.out" });
      }
    };

    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animateIn(entry.target, "image");
          else animateOut(entry.target, "image");
        });
      },
      { threshold: 0.15 }
    );
    imgObserver.observe(imageEl);

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
      imgObserver.disconnect();
      blockObserver.disconnect();
      metricObserver.disconnect();
    };
  }, [isMobile, metrics]);

  // Desktop GSAP scroll trigger timeline configuration
  useGSAP(
    () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
      ScrollTrigger.refresh();

      if (isMobile) return;

      const titleWords = titleRef.current?.querySelectorAll(".word-inner");
      if (titleWords && titleWords.length > 0) {
        gsap.set(titleWords, { y: "100%" });
      } else {
        gsap.set(titleRef.current, { opacity: 0, y: 30 });
      }

      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      gsap.set([descriptionRef.current, highlightRef.current], { opacity: 0, y: 30 });
      gsap.set(imageRef.current, { opacity: 0, scale: 0.95, y: 30 });
      gsap.set(metricRefs.current, { opacity: 0, y: 30, scale: 0.92 });
      gsap.set(metricLabelRefs.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
      });

      if (titleWords && titleWords.length > 0) {
        tl.to(titleWords, { y: "0%", duration: 0.8, stagger: 0.08, ease: "power4.out" }, 0);
      } else {
        tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0);
      }

      if (subtitleRef.current) {
        tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.15);
      }

      tl.to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.3)
        .to(highlightRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.45);

      tl.to(imageRef.current, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" }, 0.25);

      metricRefs.current.forEach((metricRef, index) => {
        if (metricRef && metricValueRefs.current[index]) {
          const fullValue = metrics[index]?.value || "";
          const numericMatch = fullValue.match(/[\d,]+/);
          const numericValue = numericMatch ? parseInt(numericMatch[0].replace(/,/g, "")) : 0;
          const unit = fullValue.replace(/[\d,]+/, "").trim();

          const startTime = 0.6 + index * 0.12;

          tl.to(
            metricRef,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.5)",
            },
            startTime
          );

          if (numericValue > 0) {
            const numberObj = { number: 0 };
            tl.to(
              numberObj,
              {
                number: numericValue,
                duration: 1.2,
                ease: "power2.out",
                onUpdate: () => {
                  if (metricValueRefs.current[index]) {
                    const formatted = Math.floor(numberObj.number).toLocaleString();
                    metricValueRefs.current[index]!.textContent = formatted + (unit ? unit : "");
                  }
                },
              },
              startTime
            );
          }

          if (metricLabelRefs.current[index]) {
            tl.to(
              metricLabelRefs.current[index],
              { opacity: 1, duration: 0.4, ease: "power2.out" },
              startTime + 0.2
            );
          }
        }
      });
    },
    {
      scope: containerRef,
      dependencies: [metrics, subtitle, teamImage, isMobile],
      revertOnUpdate: true,
    }
  );

  return (
    <div
      id="about"
      className="relative overflow-hidden py-10 sm:py-14 lg:py-16 bg-card transition-colors duration-500 border-t border-black/5 dark:border-white/5"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2
                ref={titleRef}
                className="text-foreground text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight uppercase"
              >
                {title.split(" ").map((word, idx) => (
                  <span
                    key={idx}
                    className="word-mask mr-[0.25em]"
                    style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
                  >
                    <span className="word-inner inline-block">{word}</span>
                  </span>
                ))}
              </h2>

              {subtitle && (
                <h3
                  ref={subtitleRef}
                  className="text-lg sm:text-xl font-bold leading-relaxed"
                  style={{
                    background: "linear-gradient(135deg, #FF6B35 0%, #FF1493 50%, #9B59B6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {subtitle}
                </h3>
              )}
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

          {/* Right Image Column */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div
              ref={imageRef}
              className="relative w-full aspect-[4/3] lg:aspect-[4/5] xl:aspect-[1.1] rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 group"
            >
              <Image
                src={teamImage}
                alt="AWA Media team brainstorming and working on projects"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <p className="text-white/95 text-sm sm:text-base font-bold drop-shadow-md">
                  129, Sameer Complex, CG Rd, Ahmedabad
                </p>
                <p className="text-white/70 text-xs mt-1 font-semibold">
                  Delivering impactful PR & Influencer campaigns since 2021.
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
