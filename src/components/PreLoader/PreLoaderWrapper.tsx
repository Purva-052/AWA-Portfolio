"use client";

import React, { useState } from "react";
import PreLoader from "./PreLoader";

interface PreLoaderWrapperProps {
  children: React.ReactNode;
}

export default function PreLoaderWrapper({ children }: PreLoaderWrapperProps) {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = () => {
    // Wait for slide-up animation to complete before unmounting
    setTimeout(() => {
      setShowPreloader(false);
    }, 1200); // Animation is 1s, so 1.2s to be safe
  };

  return (
    <>
      {/* PreLoader with fixed position overlays everything */}
      {showPreloader && (
        <PreLoader onComplete={handlePreloaderComplete} />
      )}
      
      {/* Children are always rendered underneath */}
      {children}
    </>
  );
}