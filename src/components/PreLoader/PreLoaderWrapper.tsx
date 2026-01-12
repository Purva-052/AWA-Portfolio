"use client";

import React, { useState, useEffect } from "react";
import PreLoader from "./PreLoader";

interface PreLoaderWrapperProps {
  children: React.ReactNode;
}

export default function PreLoaderWrapper({ children }: PreLoaderWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const handlePreloaderComplete = () => {
    setIsComplete(true);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && !isComplete && (
        <PreLoader onComplete={handlePreloaderComplete} />
      )}
      {children}
    </>
  );
}