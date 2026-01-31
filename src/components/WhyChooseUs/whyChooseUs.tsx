"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface WhyChooseAWAProps {
  image?: string;
  sectionHeading?: string;
  heading?: string;
  highlightedText?: string;
  points?: string[];
}

const WhyChooseAWA = ({
  image = "/whyChooseUs.jpg",
  sectionHeading = "Why Choose AWA Media?",
  heading = "Your Growth is Our",
  highlightedText = "Priority",
  points = [
    "Local expertise in Ahmedabad with a global outlook.",
    "Tailored strategies for every business need.",
    "Creative and data-driven approach.",
    "Proven track record of delivering ROI-driven campaigns.",
  ],
}: WhyChooseAWAProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionHeadingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const sectionHeadingEl = sectionHeadingRef.current;
    const imageEl = imageRef.current;
    const titleEl = titleRef.current;
    const underlineEl = underlineRef.current;
    const pointsList = pointsRef.current;

    if (!container || !imageEl || !titleEl || !underlineEl || !pointsList) return;

    const pointItems = Array.from(pointsList.querySelectorAll("li"));

    // ✅ Initial state
    if (sectionHeadingEl) {
      gsap.set(sectionHeadingEl, { opacity: 0, y: 20 });
    }
    gsap.set(imageEl, { opacity: 0, y: 40, scale: 0.95 });
    gsap.set(titleEl, { opacity: 0, y: 25 });
    gsap.set(underlineEl, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(pointItems, { opacity: 0, y: 18 });

    // ✅ Timeline
    const tl = gsap.timeline({ paused: true });

    // ✅ Heading first - FASTER
    if (sectionHeadingEl) {
      tl.to(sectionHeadingEl, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      });
    }

    // ✅ Image - FASTER
    tl.to(
      imageEl,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
      },
      sectionHeadingEl ? "-=0.2" : 0
    );

    // ✅ Title + underline - FASTER
    tl.to(
      titleEl,
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      },
      "-=0.3"
    ).to(
      underlineEl,
      {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.25"
    );

    // ✅ Points - FASTER
    tl.to(
      pointItems,
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "back.out(1.2)",
        stagger: 0.08,
      },
      "-=0.15"
    );

    // ✅ Trigger - LOWER THRESHOLD for earlier trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) tl.play();
          else tl.reverse();
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="container mx-auto relative py-12 sm:py-16 md:py-8 px-4 sm:px-6 overflow-hidden"
    >
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2
          ref={sectionHeadingRef}
          className="text-black font-bold text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[28px] sm:leading-[34px] md:leading-[38px]"
        >
          Why Choose{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AWA Media?
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center justify-center place-items-center">
        {/*  Image */}
        <div
          ref={imageRef}
          className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[460px] aspect-square rounded-full overflow-hidden shadow-xl lg:shadow-2xl"
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        >
          <Image
            src={image}
            alt="AWA Media - Your Growth Partner"
            fill
            quality={80}
            loading="lazy"
            sizes="(max-width: 640px) 300px, (max-width: 768px) 380px, 460px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center gap-6 sm:gap-8 lg:gap-10 p-2 sm:p-4 text-center lg:text-left">
          <div className="flex flex-col gap-3 sm:gap-4 items-center lg:items-start">
            <h3
              ref={titleRef}
              className="text-black font-bold text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px]"
              style={{
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
            >
              {heading}{" "}
              <span
                className="font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {highlightedText}
              </span>
            </h3>

            <div
              ref={underlineRef}
              className="w-[60px] sm:w-[70px] md:w-[80px] h-[3px] sm:h-[4px] bg-[#021639]"
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
            />
          </div>

          <ul
            ref={pointsRef}
            className="space-y-3 sm:space-y-4 text-left max-w-[520px] mx-auto lg:mx-0"
          >
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-3 sm:gap-4">
                <span
                  className="flex-shrink-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full mt-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                  }}
                />
                <span className="text-black text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseAWA;