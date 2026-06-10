"use client";
import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Calendar, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface MilestoneEvent {
  year: string;
  badge: string;
  items: string[];
}

const milestonesData: MilestoneEvent[] = [
  {
    year: "2022",
    badge: "The Beginning",
    items: [
      "Successfully executed PR & Influencer Marketing for Oasis Concert featuring Salim–Sulaiman",
      "Managed awareness and digital promotions for the event",
      "Worked on Sunburn Festival (Ahmedabad & Gujarat) PR campaign (Dec 2022)"
    ]
  },
  {
    year: "2023",
    badge: "Expansion & Major Collaborations",
    items: [
      "PR Campaign for Mirchi Plus Concert Events",
      "First-ever PR campaign for Havmor Ice Cream sponsorship with Gujarat Titans (IPL 2023)",
      "Influencer Campaigns: Bakeri Group (Real Estate), Junoon Tracking & Holidays (Travel)",
      "Event PR & Media Partnerships: Reel to Real Events – Navami Raasleela (Navratri)",
      "PR & Influencer Campaign: Hanuram Foods (Vadodara)",
      "Started Pan India campaign with PhonePe",
      "Concert PR: Reel to Real Fest featuring Aditya Gadhvi",
      "Event PR & Media Partner: Slackers Group – Holi Festival",
      "Ongoing PR: Swarnim Group (All Projects)",
      "Navratri Campaigns: Four Season Events (All 4 events PR & Influencer Marketing)",
      "Mobile Brands PR (Gujarat): realme, OnePlus, OPPO, Vivo",
      "Real Estate: Samarth Group, Hilltown Group, Adani Realty, Swati Buildcon, Ganesh Housing & more"
    ]
  },
  {
    year: "2024",
    badge: "Institutional & Corporate Growth",
    items: [
      "PR Campaigns for CREDAI Gujarat & Ahmedabad",
      "Entertainment PR: PVR Cinemas campaigns",
      "Food Brand Campaign: Chhaswale (Pan Gujarat PR & Influencer Marketing)",
      "Academic Institutions PR: IIM Ahmedabad, IIT Gandhinagar, DAIICT",
      "Influencer Marketing: Lenovo (Ahmedabad)",
      "Food & Hospitality: Palm & Pine Café, Simran Restaurant",
      "Managed multiple exhibitions & PR campaigns"
    ]
  },
  {
    year: "2025",
    badge: "National Scale & Premium Campaigns",
    items: [
      "Influencer Marketing: Samsung, OpenAI (ChatGPT campaigns)",
      "Government Projects: Gujarat Government & Government of India (Digital PR – Pan India)",
      "PR for Ministers & MLA campaigns (Positive Public Image Strategy)",
      "Major Concert PR: Sonu Nigam, AP Dhillon, Arijit Singh, Prateek Kuhad, Mohit Chauhan, Yo Yo Honey Singh, Aditya Gadhvi",
      "Navratri Events: Elite Ratri, Raas Leela, Naurat"
    ]
  },
  {
    year: "2026",
    badge: "Current Engagements",
    items: [
      "Campaigns for Women's Premier League (WPL)",
      "Ongoing: Samsung & OpenAI campaigns",
      "Brand Collaborations: Hyundai, Mahindra, Kia",
      "Real Estate & Media Projects: Multiple ongoing PR campaigns",
      "Aqualand Water Park, Gujarat Titans, 8.5 Research & Custom Concept India"
    ]
  }
];

export default function Timeline() {
  const [activeYearIndex, setActiveYearIndex] = useState(milestonesData.length - 1);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const headingWordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const headingText = "OUR JOURNEY & MILESTONES";
  const headingWords = headingText.split(" ");

  // Trigger GSAP content transitions on year selection
  const transitionContent = (index: number) => {
    setActiveYearIndex(index);
    if (detailsRef.current) {
      gsap.fromTo(
        detailsRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" }
      );
    }
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Heading split reveal
      const wordInners = headingWordsRef.current.filter(Boolean);
      if (wordInners.length) {
        gsap.fromTo(
          wordInners,
          { y: "100%" },
          {
            y: "0%",
            duration: 0.8,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Timeline selector scrollTrigger reveal
      if (timelineTrackRef.current) {
        gsap.fromTo(
          timelineTrackRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: timelineTrackRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Initial details list stagger
      if (detailsRef.current) {
        gsap.fromTo(
          detailsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: detailsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative w-full py-10 sm:py-14 lg:py-16 bg-background overflow-hidden border-t border-black/5 dark:border-white/5"
    >
      {/* Decorative gradient background glows */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#FF1493]/3 dark:bg-[#FF1493]/2 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#FF6B35]/3 dark:bg-[#FF6B35]/2 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Title Section */}
        <div ref={headerRef} className="text-left mb-16 max-w-2xl">
          <div className="credentials-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#FF1493]/20 bg-[#FF1493]/5 text-[#FF1493] text-[10px] font-extrabold uppercase tracking-wider mb-4 shadow-sm">
            <Calendar size={10} />
            <span>OUR MILESTONES</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-foreground uppercase leading-none tracking-tight mb-4">
            {headingWords.map((word, i) => (
              <span
                key={i}
                className="word-mask mr-2"
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
              >
                <span className="word-inner inline-block" ref={(el) => { headingWordsRef.current[i] = el; }}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p className="credentials-desc text-sm text-muted-foreground leading-relaxed font-semibold">
            From regional starts to national campaigns, trace AWA Media’s high-impact trajectory.
          </p>
        </div>

        {/* Interactive Progress Track Selector */}
        <div ref={timelineTrackRef} className="relative max-w-4xl mx-auto mb-12">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black/5 dark:bg-white/10 -translate-y-1/2 z-0" />
          
          {/* Animated Highlight Line */}
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9B59B6] -translate-y-1/2 z-10 transition-all duration-500 ease-out"
            style={{ 
              width: `${(activeYearIndex / (milestonesData.length - 1)) * 100}%` 
            }}
          />

          {/* Selector Nodes */}
          <div className="relative flex justify-between items-center z-20">
            {milestonesData.map((data, idx) => {
              const isActive = activeYearIndex === idx;
              const isPassed = activeYearIndex >= idx;

              return (
                <button
                  key={idx}
                  onClick={() => transitionContent(idx)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-heading text-xs font-black transition-all duration-300 border backdrop-blur-md cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background border-foreground scale-110 shadow-lg"
                      : isPassed
                      ? "bg-white dark:bg-white/10 text-foreground border-[#FF1493]"
                      : "bg-white dark:bg-white/5 text-muted-foreground/60 border-black/5 dark:border-white/10"
                  }`}
                >
                  {data.year}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Info Card */}
        <div 
          className="max-w-4xl mx-auto rounded-3xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-xl relative min-h-[300px]"
        >
          {/* Glow backdrop inside details */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,20,147,0.04),transparent_70%)] pointer-events-none rounded-3xl" />
          
          <div ref={detailsRef} className="relative z-10 flex flex-col gap-6">
            {/* Header / Sub-badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 dark:border-white/10 pb-4">
              <h3 className="text-2xl font-heading font-black text-foreground tracking-tight">
                {milestonesData[activeYearIndex].year} ARCHIVES
              </h3>
              <span className="inline-flex items-center gap-1 border border-[#FF1493]/20 bg-[#FF1493]/5 text-[#FF1493] px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider">
                <Sparkles size={8} />
                {milestonesData[activeYearIndex].badge}
              </span>
            </div>

            {/* List of achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {milestonesData[activeYearIndex].items.map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start group">
                  <ChevronRight size={14} className="text-[#FF1493] shrink-0 mt-1 transition-transform duration-300 group-hover:translate-x-0.5" />
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .word-mask {
          overflow: hidden;
          vertical-align: bottom;
        }
        .word-inner {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
