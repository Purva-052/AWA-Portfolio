"use client";

import React, { useRef, useState } from "react";
import styles from "./PreLoader.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

interface PreLoaderProps {
  onComplete: () => void;
}

interface Particle {
  id: number;
  initialX: number;
  initialY: number;
  targetX: number;
  targetY: number;
  color: string;
}

// Generate particles function
function generateParticles(): Particle[] {
  if (typeof window === 'undefined') return [];
  
  const isMobile = window.innerWidth < 768;
  const spread = isMobile ? 800 : 1400;
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

  return Array.from({ length: 60 }, (_, i) => {
    const target = particleTargets[i % particleTargets.length];
    return {
      id: i,
      initialX: (Math.random() - 0.5) * spread,
      initialY: (Math.random() - 0.5) * spread,
      targetX: target.x,
      targetY: target.y,
      color: target.color,
    };
  });
}

export default function PreLoader({ onComplete }: PreLoaderProps) {
  const container = useRef<HTMLElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  
  // Lazy initialization - function only runs ONCE on mount
  const [particles] = useState<Particle[]>(() => generateParticles());

  useGSAP(
    () => {
      if (!container.current || particles.length === 0) return;

      const tl = gsap.timeline();

      // Set initial states using refs
      particleRefs.current.forEach((particle, i) => {
        if (particle && particles[i]) {
          gsap.set(particle, {
            x: particles[i].initialX,
            y: particles[i].initialY,
            opacity: 1,
          });
        }
      });

      // Set logo to hidden
      if (logoRef.current) {
        gsap.set(logoRef.current, { 
          scale: 0, 
          opacity: 0,
          visibility: "hidden"
        });
      }

      // STAGE 1: Particles gather to center (0-2s)
      particleRefs.current.forEach((particle, i) => {
        if (particle && particles[i]) {
          tl.to(
            particle,
            {
              x: particles[i].targetX,
              y: particles[i].targetY,
              duration: 2,
              ease: "power2.inOut",
            },
            0
          );
        }
      });

      // STAGE 2: Particles fade out (2-2.3s)
      tl.to(
        particleRefs.current.filter(Boolean),
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
        },
        2
      );

      // STAGE 3: Logo appears (2.1-2.7s)
      if (logoRef.current) {
        tl.to(
          logoRef.current,
          {
            scale: 1,
            opacity: 1,
            visibility: "visible",
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          2.1
        );
      }

      // STAGE 4: Hold logo (2.7-3.5s)
      tl.to({}, { duration: 0.8 }, 2.7);

      // STAGE 5: Slide UP transition (3.5-4.5s)
      tl.to(
        container.current,
        {
          y: "-100%",
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => {
            setTimeout(() => {
              onComplete();
            }, 100);
          },
        },
        3.5
      );
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
            ref={(el) => {
              particleRefs.current[i] = el;
            }}
            className={styles.particle}
            style={{
              backgroundColor: particle.color,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Logo Container */}
      <div className={styles.logoContainer}>
        <div 
          ref={logoRef}
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