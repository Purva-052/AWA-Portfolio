"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on touch devices or smaller viewports
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;

    if (!cursor || !ring || !glow) return;

    // Set initial position off-screen
    gsap.set([cursor, ring, glow], { xPercent: -50, yPercent: -50, x: -200, y: -200 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const glowPos = { x: pos.x, y: pos.y };
    const mouse = { x: pos.x, y: pos.y };

    // GSAP quickSetter for hardware-accelerated transforms
    const setCursorX = gsap.quickSetter(cursor, "x", "px");
    const setCursorY = gsap.quickSetter(cursor, "y", "px");

    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");

    const setGlowX = gsap.quickSetter(glow, "x", "px");
    const setGlowY = gsap.quickSetter(glow, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Frame update callback using GSAP ticker
    const tick = () => {
      // Ring inertia (medium speed)
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
      // Glow light inertia (very slow, smooth lag)
      const dtGlow = 1.0 - Math.pow(1.0 - 0.05, gsap.ticker.deltaRatio());

      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;

      glowPos.x += (mouse.x - glowPos.x) * dtGlow;
      glowPos.y += (mouse.y - glowPos.y) * dtGlow;

      setCursorX(mouse.x);
      setCursorY(mouse.y);

      setRingX(pos.x);
      setRingY(pos.y);

      setGlowX(glowPos.x);
      setGlowY(glowPos.y);
    };

    gsap.ticker.add(tick);

    // Hover states
    const onMouseEnterLink = () => {
      gsap.to(ring, {
        scale: 2.2,
        backgroundColor: "rgba(255, 20, 147, 0.15)",
        borderColor: "rgba(255, 20, 147, 0.5)",
        borderWidth: "1px",
        duration: 0.25,
      });
      gsap.to(cursor, {
        scale: 0.5,
        backgroundColor: "#FF1493",
        duration: 0.25,
      });
      gsap.to(glow, {
        scale: 1.3,
        opacity: 0.6,
        duration: 0.35,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 107, 53, 0.4)",
        borderWidth: "1.5px",
        duration: 0.25,
      });
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "#FF6B35",
        duration: 0.25,
      });
      gsap.to(glow, {
        scale: 1,
        opacity: 0.4,
        duration: 0.35,
      });
    };

    const hoverSelectors = "a, button, [role='button'], .cursor-pointer, .group";

    const updateHoverElements = () => {
      const elements = document.querySelectorAll(hoverSelectors);
      elements.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    updateHoverElements();

    // Observe changes to the DOM to bind hover events to dynamic elements
    const observer = new MutationObserver(() => {
      updateHoverElements();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(tick);
      observer.disconnect();

      const elements = document.querySelectorAll(hoverSelectors);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Background spotlight flashlight (Z-index 0 to stay behind headers/buttons but highlight cells) */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[450px] h-[450px] rounded-full pointer-events-none z-0 opacity-40 bg-[radial-gradient(circle,rgba(255,20,147,0.1)_0%,rgba(157,0,255,0.05)_40%,transparent_70%)] blur-[50px] -translate-x-1/2 -translate-y-1/2 hidden dark:lg:block"
      />
      {/* Outer tracking ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99999999] border-1.5 border-[#FF6B35]/40 mix-blend-difference hidden lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Inner precise dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[99999999] bg-[#FF6B35] mix-blend-difference hidden lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
