"use client";

import AboutUs from "@/components/AboutUs/AboutUs";
import { Hero } from "@/components/Hero/Hero";
import MainLayout from "@/components/layout/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
      <Hero />
      {/* Add more content here */}
      <AboutUs/>
    </MainLayout>
  );
}