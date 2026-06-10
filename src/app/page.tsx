"use client";

import { useEffect } from "react";
import AboutUs from "@/components/AboutUs/AboutUs";
import { Hero } from "@/components/Hero/Hero";
import MainLayout from "@/components/layout/MainLayout";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhyChooseAWA from "@/components/WhyChooseUs/whyChooseUs";
import ServicesOverview from "@/components/services/overView";
import Portfolio from "@/components/Portfolio/portfolio";
import Timeline from "@/components/Timeline/timeline";
import ContactFooter from "@/components/Contact/contact";
import HowWeWork from "@/components/Our_Process/ourProcess";
import Testimonials from "@/components/Testimonials/testimonials";

export default function HomePage() {
  useEffect(() => {
    document.body.tabIndex = -1;
    document.body.focus();

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
    <MainLayout>
      <Hero />
      <AboutUs />
      <WhyChooseAWA />
      <ServicesOverview />
      <Portfolio />
      <Timeline />
      <HowWeWork />
      <Testimonials />
      <ContactFooter />
    </MainLayout>
  );
}

