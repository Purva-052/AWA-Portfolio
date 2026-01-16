"use client";

import React, { useRef, useMemo } from "react";
import styles from "./PreLoader.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

interface PreLoaderProps {
  onComplete: () => void;
}

export default function PreLoader({ onComplete }: PreLoaderProps) {
  const container = useRef<HTMLElement>(null);

  // Generate particles on component mount for responsive sizing
  const particles = useMemo(() => {
    // Use smaller spread for mobile devices
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const spread = isMobile ? 600 : 1400;
    
    const particlePositions = Array.from({ length: 60 }, () => ({
      initialX: (Math.random() - 0.5) * spread,
      initialY: (Math.random() - 0.5) * spread,
    }));

    // Particle target positions (circle around logo)
    const radius = isMobile ? 60 : 80;
    const particleTargets = [
      { x: 0, y: -radius, color: "#FF8A00" },
      { x: -radius * 0.7, y: -radius * 0.4, color: "#FF8A00" },
      { x: radius * 0.7, y: -radius * 0.4, color: "#FF4D4D" },
      { x: radius, y: 0, color: "#FF00E5" },
      { x: radius * 0.7, y: radius * 0.4, color: "#9D00FF" },
      { x: 0, y: radius, color: "#0094FF" },
      { x: -radius * 0.7, y: radius * 0.4, color: "#00E0FF" },
      { x: -radius, y: 0, color: "#70FF00" },
    ];

    return particlePositions.map((pos, i) => {
      const target = particleTargets[i % particleTargets.length];
      return {
        id: i,
        initialX: pos.initialX,
        initialY: pos.initialY,
        targetX: target.x,
        targetY: target.y,
        color: target.color,
      };
    });
  }, []);

  useGSAP(
    () => {
      if (container.current) {
        const tl = gsap.timeline();

        // Set initial states IMMEDIATELY for all particles
        particles.forEach((particle, i) => {
          gsap.set(`[data-particle="${i}"]`, {
            x: particle.initialX,
            y: particle.initialY,
            opacity: 1,
          });
        });

        // Set logo to hidden IMMEDIATELY
        gsap.set(`.${styles.logoSymbol}`, { 
          scale: 0, 
          opacity: 0,
          visibility: "hidden"
        });

        // STAGE 1: Particles gather to center (0-2s)
        particles.forEach((particle, i) => {
          tl.to(
            `[data-particle="${i}"]`,
            {
              x: particle.targetX,
              y: particle.targetY,
              duration: 2,
              ease: "power2.inOut",
            },
            0
          );
        });

        // STAGE 2: Particles fade out, First logo (symbol) appears (2-2.5s)
        tl.to(
          `.${styles.particle}`,
          {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
          },
          2
        );

        tl.to(
          `.${styles.logoSymbol}`,
          {
            scale: 1,
            opacity: 1,
            visibility: "visible",
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          2.1
        );

        // STAGE 3: Hold first logo (2.7-3.5s)
        tl.to({}, { duration: 0.8 }, 2.7);

        // STAGE 4: Slide UP transition - reveals homepage underneath (3.5-4.5s)
        tl.to(
          container.current,
          {
            y: "-100%",
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
              // Small delay before calling onComplete to ensure smooth transition
              setTimeout(() => {
                onComplete();
              }, 100);
            },
          },
          3.5
        );
      }
    },
    { scope: container, dependencies: [particles] }
  );

  return (
    <section className={styles.container} ref={container}>
      {/* Particles */}
      <div className={styles.particleContainer}>
        {particles.map((particle, i) => (
          <div
            key={particle.id}
            data-particle={i}
            className={styles.particle}
            style={{
              backgroundColor: particle.color,
              opacity: 0,
              transform: `translate(${particle.initialX}px, ${particle.initialY}px)`,
            }}
          />
        ))}
      </div>

      {/* Logo Container */}
      <div className={styles.logoContainer}>
        {/* First Logo - Symbol - Hidden by default via inline style */}
        <div 
          className={styles.logoSymbol}
          style={{ opacity: 0, transform: "scale(0)", visibility: "hidden" }}
        >
          <Image
            src="/logo.png"
            alt="Symbol Logo"
            width={1000}
            height={1000}
            priority
            className={styles.logoImage}
          />
        </div>
      </div>

      {/* Background */}
      <div className={styles.bgGlow}></div>
    </section>
  );
}