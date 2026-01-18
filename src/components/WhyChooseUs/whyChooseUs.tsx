"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface WhyChooseAWAProps {
  image?: string;
  heading?: string;
  highlightedText?: string;
  points?: string[];
}

const WhyChooseAWA = ({
  image = "/whyChooseUs.jpg",
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
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const imageEl = imageRef.current;
    const titleEl = titleRef.current;
    const underlineEl = underlineRef.current;
    const pointsList = pointsRef.current;

    if (!container || !imageEl || !titleEl || !underlineEl || !pointsList) return;

    const pointItems = Array.from(pointsList.querySelectorAll("li"));

    // ✅ Initial state (hidden)
    gsap.set(imageEl, { opacity: 0, y: 40, scale: 0.95 });
    gsap.set(titleEl, { opacity: 0, y: 25 });
    gsap.set(underlineEl, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(pointItems, { opacity: 0, y: 18 });

    // ✅ Timeline (paused until 15% section visible)
    const tl = gsap.timeline({ paused: true });

    // ✅ Image first
    tl.to(imageEl, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
    });

    // ✅ Title + underline next
    tl.to(
      titleEl,
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
      },
      "-=0.25"
    ).to(
      underlineEl,
      {
        scaleX: 1,
        duration: 0.45,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // ✅ Points one by one
    tl.to(
      pointItems,
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "back.out(1.2)",
        stagger: 0.12,
      },
      "-=0.1"
    );

    // ✅ Trigger when 15% of section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.play();
          } else {
            tl.reverse();
          }
        });
      },
      {
        threshold: 0.50, // ✅ 15% visible
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, []);

  return (
    <section className="w-full bg-white py-10 sm:py-14 md:py-16 lg:py-12 overflow-x-hidden">
      <div
        ref={containerRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
      >
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Why Choose{" "}
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
              AWA Media?
            </span>
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
            <div
              ref={imageRef}
              className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[380px] xl:max-w-[420px] aspect-square"
              style={{
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden shadow-xl lg:shadow-2xl">
                <Image
                  src={image}
                  alt="AWA Media - Your Growth Partner"
                  width={500}
                  height={500}
                  quality={70}
                  loading="lazy"
                  sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, 380px"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center order-2 lg:order-2">
            <div className="mb-5 sm:mb-6 md:mb-8">
              <h3
                ref={titleRef}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-900 mb-3 leading-tight"
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

              <div ref={underlineRef} className="w-16 sm:w-20 md:w-24 lg:w-28 h-1 bg-gray-900" />
            </div>

            <ul ref={pointsRef} className="space-y-3 sm:space-y-4 md:space-y-5">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-3 sm:gap-4">
                  <span
                    className="flex-shrink-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full mt-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                    }}
                  />
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAWA;
