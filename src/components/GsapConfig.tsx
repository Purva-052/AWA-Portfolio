"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function GsapConfig() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        ScrollTrigger.config({
            // Prevents the "jump" and refresh when mobile address bar hides/shows
            ignoreMobileResize: true,
        });

        // Optional: Global refresh to ensure positions are correct
        ScrollTrigger.refresh();
    }, []);

    return null; // This component doesn't render anything
}