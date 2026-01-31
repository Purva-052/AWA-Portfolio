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
  backgroundColor?: string;
  teamImage?: string;
}

const AboutUs = ({
  title = "Who We Are",
  subtitle,
  description = "AWA Media is more than just a marketing agency—we're your creative partners in success. Based in the vibrant city of Ahmedabad, we bring together a passionate team of strategists, designers, and storytellers who live and breathe creativity.",
  highlightPhrases = [
    "Impactful Strategies That Resonate",
    "Transforming Brands Into Stories",
    "Experiences That Connect & Convert",
    "Data-Driven Measurable Results",
    "Innovative Digital Campaigns",
    "Building Meaningful Brand Connections",
  ],
  metrics = [
    { value: "500+", label: "Projects" },
    { value: "150+", label: "Clients" },
    { value: "50M+", label: "Reach" },
  ],
  backgroundColor = "#f5f5f5",
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

  // ✅ Detect Mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Typing animation (same as your code)
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
          }, 700);
          return;
        }

        timeoutId = setTimeout(type, 40);
      } else {
        typingTextRef.current!.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % highlightPhrases.length;
          timeoutId = setTimeout(type, 50);
          return;
        }

        timeoutId = setTimeout(type, 15);
      }
    };

    type();
    return () => clearTimeout(timeoutId);
  }, [highlightPhrases]);

  // ✅ MOBILE: repeat animations on scroll (enter = animate in, leave = animate out)
  useEffect(() => {
    if (!isMobile) return;

    const imageEl = imageRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const descEl = descriptionRef.current;
    const highlightEl = highlightRef.current;

    if (!imageEl || !titleEl || !descEl || !highlightEl) return;

    // ✅ Initial hidden state (mobile only)
    gsap.set([imageEl], { opacity: 0, y: 40, scale: 0.95 });
    gsap.set([titleEl, subtitleEl, descEl, highlightEl], { opacity: 0, y: 28 });

    gsap.set(metricRefs.current, { opacity: 0, y: 25, scale: 0.95 });
    gsap.set(metricLabelRefs.current, { opacity: 0 });

    // ✅ Reset metric values to 0 initially
    const resetMetricValues = () => {
      metrics.forEach((_, index) => {
        const el = metricValueRefs.current[index];
        if (el) el.textContent = "0";
      });
    };
    resetMetricValues();

    // ✅ Count-up on enter (repeats)
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
          el.textContent =
            Math.floor(numberObj.number).toLocaleString() + (unit ? unit : "");
        },
      });
    };

    // ✅ Helper: animate IN
    const animateIn = (el: Element, type: "image" | "text" | "metric") => {
      if (type === "image") {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      if (type === "text") {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        });
      }

      if (type === "metric") {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.6)",
        });
      }
    };

    // ✅ Helper: animate OUT
    const animateOut = (el: Element, type: "image" | "text" | "metric") => {
      if (type === "image") {
        gsap.to(el, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.45,
          ease: "power2.out",
        });
      }

      if (type === "text") {
        gsap.to(el, {
          opacity: 0,
          y: 28,
          duration: 0.35,
          ease: "power2.out",
        });
      }

      if (type === "metric") {
        gsap.to(el, {
          opacity: 0,
          y: 25,
          scale: 0.95,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    };

    // ✅ Observer: image first at 15%, repeatable
    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateIn(entry.target, "image");
          } else {
            animateOut(entry.target, "image");
          }
        });
      },
      { threshold: 0.15 }
    );

    imgObserver.observe(imageEl);

    // ✅ Observer: text blocks repeatable
    const blockObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateIn(entry.target, "text");
          } else {
            animateOut(entry.target, "text");
          }
        });
      },
      { threshold: 0.25 }
    );

    blockObserver.observe(titleEl);
    if (subtitleEl) blockObserver.observe(subtitleEl);
    blockObserver.observe(descEl);
    blockObserver.observe(highlightEl);

    // ✅ Observer: metrics repeatable
    const metricObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = metricRefs.current.findIndex((m) => m === entry.target);

          if (entry.isIntersecting) {
            animateIn(entry.target, "metric");

            if (idx !== -1) {
              const labelEl = metricLabelRefs.current[idx];
              if (labelEl) {
                gsap.to(labelEl, { opacity: 1, duration: 0.3, ease: "power2.out" });
              }
              countUpMetric(idx);
            }
          } else {
            animateOut(entry.target, "metric");

            if (idx !== -1) {
              const labelEl = metricLabelRefs.current[idx];
              if (labelEl) {
                gsap.to(labelEl, { opacity: 0, duration: 0.2, ease: "power2.out" });
              }
              // ✅ reset number when leaving (so it animates again next enter)
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

  // ✅ Desktop GSAP (UNCHANGED)
  useGSAP(
    () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });

      ScrollTrigger.refresh();

      if (isMobile) return;

      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        x: -50,
      });

      gsap.set([descriptionRef.current, highlightRef.current], {
        opacity: 0,
        x: -30,
      });

      gsap.set(imageRef.current, {
        opacity: 0,
        x: 50,
      });

      gsap.set(metricRefs.current, {
        opacity: 0,
        y: 40,
        scale: 0.9,
      });

      gsap.set(metricLabelRefs.current, {
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(
        titleRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0
      );

      if (subtitleRef.current && subtitle) {
        tl.to(
          subtitleRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0.1
        );
      }

      tl.to(
        descriptionRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        0.3
      ).to(
        highlightRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        0.5
      );

      tl.to(
        imageRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
        },
        0.2
      );

      metricRefs.current.forEach((metricRef, index) => {
        if (metricRef && metricValueRefs.current[index]) {
          const fullValue = metrics[index]?.value || "";
          const numericMatch = fullValue.match(/[\d,]+/);
          const numericValue = numericMatch
            ? parseInt(numericMatch[0].replace(/,/g, ""))
            : 0;
          const unit = fullValue.replace(/[\d,]+/, "").trim();

          const startTime = 0.9 + index * 0.15;

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
                    const formatted = Math.floor(numberObj.number).toLocaleString();
                    metricValueRefs.current[index]!.textContent =
                      formatted + (unit ? unit : "");
                  }
                },
              },
              startTime
            );
          }

          if (metricLabelRefs.current[index]) {
            tl.to(
              metricLabelRefs.current[index],
              {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
              },
              startTime + 0.3
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
      className="relative overflow-hidden"
      ref={containerRef}
      style={{ backgroundColor }}
    >
      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
        .cursor-blink {
          animation: blink 1s infinite;
        }
      `}</style>

      <div className="container mx-auto relative z-10 pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24 pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* Left Content Section */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
            {/* Header Section */}
            <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
              <h2
                ref={titleRef}
                className="text-[#2C2C2C] text-[24px] sm:text-[28px] md:text-[36px] lg:text-[40px] xl:text-[48px] font-bold leading-[120%] tracking-[-0.02em]"
              >
                {title}
              </h2>

              {subtitle && (
                <h3
                  ref={subtitleRef}
                  className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[28px] font-semibold leading-[120%]"
                  style={{
                    background:
                      "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {subtitle}
                </h3>
              )}
            </div>

            {/* Description Section */}
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
              <p
                ref={descriptionRef}
                className="text-[#4A4A4A] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16px] xl:text-[17px] font-normal leading-[160%]"
              >
                {description}
              </p>

              <div
                ref={highlightRef}
                className="border-l-4 border-purple-500 bg-purple-50 pl-4 sm:pl-6 py-4 rounded-r-lg"
                style={{ minHeight: "70px" }}
              >
                <p className="text-[#2C2C2C] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] font-bold leading-[150%] italic">
                  <span ref={typingTextRef}></span>
                  <span className="cursor-blink inline-block w-[2px] h-[18px] bg-purple-600 ml-1"></span>
                </p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-2 sm:mt-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    metricRefs.current[index] = el;
                  }}
                  className="flex flex-col gap-1 sm:gap-2 items-center justify-center"
                >
                  <h3
                    ref={(el) => {
                      metricValueRefs.current[index] = el;
                    }}
                    className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[36px] xl:text-[42px] font-bold leading-[100%] tracking-[-0.02em]"
                    style={{
                      background:
                        "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {metric.value}
                  </h3>

                  <p
                    ref={(el) => {
                      metricLabelRefs.current[index] = el;
                    }}
                    className="text-[#4A4A4A] text-center text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-medium leading-[120%]"
                  >
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Section */}
          <div
            ref={imageRef}
            className="relative w-full aspect-[4/3] lg:aspect-[5/4] xl:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl order-first lg:order-last"
          >
            <Image
              src={teamImage}
              alt="AWA Media team brainstorming and working on projects"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 lg:p-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
