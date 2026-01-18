"use client";

import { useEffect } from "react";
import AboutUs from "@/components/AboutUs/AboutUs";
import { Hero } from "@/components/Hero/Hero";
// import MainLayout from "@/components/layout/MainLayout";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhyChooseAWA from "@/components/WhyChooseUs/whyChooseUs";

export default function HomePage() {
  useEffect(() => {
    // ✅ Fix: allow arrow keys to scroll without clicking
    document.body.tabIndex = -1;
    document.body.focus();

    // ✅ Fix: force GSAP ScrollTrigger to update on keyboard scroll
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "PageDown" ||
        e.key === "PageUp" ||
        e.key === "Home" ||
        e.key === "End" ||
        e.key === " "
      ) {
        requestAnimationFrame(() => {
          ScrollTrigger.update();
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <Hero />
      <AboutUs />
      <WhyChooseAWA/>
    </>
  );
}
