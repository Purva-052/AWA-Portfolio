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
  if (typeof window === "undefined") return [];

  const isMobile = window.innerWidth < 768;
  const spread = isMobile ? 800 : 1400;
  const radius = isMobile ? 60 : 80;

  // Colors matching the AWA logo palette
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
      targetX: target.x + (Math.random() - 0.5) * 15,
      targetY: target.y + (Math.random() - 0.5) * 15,
      color: target.color,
    };
  });
}

export default function PreLoader({ onComplete }: PreLoaderProps) {
  const container = useRef<HTMLElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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
            scale: 0.5,
          });
        }
      });

      // Set logo to hidden
      if (logoRef.current) {
        gsap.set(logoRef.current, {
          scale: 0,
          opacity: 0,
          visibility: "hidden",
        });
      }

      // Set glow to hidden
      if (glowRef.current) {
        gsap.set(glowRef.current, {
          scale: 0.3,
          opacity: 0,
        });
      }

      // STAGE 1: Particles scatter and become visible with glow trails (0-0.3s)
      particleRefs.current.forEach((particle, i) => {
        if (particle && particles[i]) {
          tl.to(
            particle,
            {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            0
          );
        }
      });

      // STAGE 2: Background glow builds up (0.2-1.5s)
      if (glowRef.current) {
        tl.to(
          glowRef.current,
          {
            scale: 1,
            opacity: 0.6,
            duration: 1.3,
            ease: "power2.inOut",
          },
          0.2
        );
      }

      // STAGE 3: Particles gather to center with trails (0.3-2.2s)
      particleRefs.current.forEach((particle, i) => {
        if (particle && particles[i]) {
          tl.to(
            particle,
            {
              x: particles[i].targetX,
              y: particles[i].targetY,
              duration: 1.9,
              ease: "power2.inOut",
            },
            0.3
          );
        }
      });

      // STAGE 4: Particles orbit briefly then fade out (2.2-2.6s)
      tl.to(
        particleRefs.current.filter(Boolean),
        {
          opacity: 0,
          scale: 0.3,
          duration: 0.4,
          ease: "power2.in",
        },
        2.2
      );

      // Glow intensifies then fades
      if (glowRef.current) {
        tl.to(
          glowRef.current,
          {
            scale: 1.5,
            opacity: 0.8,
            duration: 0.3,
            ease: "power2.in",
          },
          2.1
        );
        tl.to(
          glowRef.current,
          {
            opacity: 0.15,
            scale: 0.8,
            duration: 0.5,
            ease: "power2.out",
          },
          2.4
        );
      }

      // STAGE 5: Logo appears with bounce (2.3-3.0s)
      if (logoRef.current) {
        tl.to(
          logoRef.current,
          {
            scale: 1,
            opacity: 1,
            visibility: "visible",
            duration: 0.7,
            ease: "back.out(1.7)",
          },
          2.3
        );
      }

      // STAGE 6: Hold logo (3.0-3.8s)
      tl.to({}, { duration: 0.8 }, 3.0);

      // STAGE 7: Slide UP transition (3.8-4.8s)
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
        3.8
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
              boxShadow: `0 0 12px 3px ${particle.color}60`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Convergence Glow */}
      <div ref={glowRef} className={styles.convergenceGlow} />

      {/* Logo Container */}
      <div className={styles.logoContainer}>
        <div
          ref={logoRef}
          className={styles.logoSymbol}
          style={{ opacity: 0, transform: "scale(0)", visibility: "hidden" }}
        >
          <Image
            src="/logo.png"
            alt="AWA Media Logo"
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