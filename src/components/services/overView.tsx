"use client";
import React, { useState, useRef, useEffect } from "react";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Building2, 
  Share2, 
  Palette, 
  Calendar,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface ServicesOverviewProps {
  image?: string;
  services?: Service[];
  backgroundColor?: string;
}

const ServicesOverview = ({
  image = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
  services: customServices,
  backgroundColor = "#f5f5f5",
}: ServicesOverviewProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultServices = [
    {
      icon: Users,
      title: "Influencer Marketing",
      description: "Connect with influential voices to expand your brand's reach and build authentic connections with your target audience",
    },
    {
      icon: FileText,
      title: "Content Creation",
      description: "Craft compelling narratives and visual stories that engage, inspire, and convert your audience across all platforms",
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "Drive measurable growth through data-driven strategies, performance optimization, and innovative digital campaigns",
    },
    {
      icon: Building2,
      title: "Indoor & Outdoor Marketing",
      description: "Capture attention with impactful traditional advertising solutions that complement your digital presence",
    },
    {
      icon: Share2,
      title: "Social Media Management",
      description: "Build and nurture thriving communities across social platforms with strategic content and engagement",
    },
    {
      icon: Palette,
      title: "Branding & Design",
      description: "Create distinctive visual identities that resonate with your audience and set your brand apart from competitors",
    },
    {
      icon: Calendar,
      title: "Event Marketing & PR",
      description: "Design memorable experiences and generate meaningful media coverage that amplifies your brand message",
    },
  ];

  const services = customServices || defaultServices;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= services.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? services.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  return (
    <section 
      className="relative overflow-hidden w-full"
      style={{ backgroundColor }}
    >
      <div ref={containerRef} className="w-full max-w-[1920px] mx-auto relative z-10 py-3 sm:py-4 md:py-6 lg:py-5 xl:py-8 2xl:py-12 px-3 sm:px-4 md:px-5 lg:px-5 xl:px-8 2xl:px-16">
        
        {/* Section Header */}
        <div className="text-center mb-3 sm:mb-4 md:mb-5 lg:mb-4 xl:mb-6 2xl:mb-10">
          <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[28px] xl:text-[34px] 2xl:text-[48px] font-bold leading-[115%] tracking-[-0.02em] mb-1 sm:mb-1.5 md:mb-2 lg:mb-1.5 xl:mb-2.5 text-[#2C2C2C]">
            What We <span 
              style={{
                background: "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >Offer</span>
          </h2>
          <p className="text-[#4A4A4A] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13px] xl:text-[15px] 2xl:text-[18px] font-normal leading-[145%] max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto px-4">
            Comprehensive marketing solutions designed for your success
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-4 xl:gap-6 2xl:gap-10 items-stretch max-w-[1600px] mx-auto">
          
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1 w-full flex items-stretch">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] md:aspect-[3/2] lg:aspect-auto xl:aspect-auto 2xl:aspect-auto rounded-lg sm:rounded-xl lg:rounded-lg overflow-hidden shadow-md sm:shadow-lg flex-1">
              <img
                src={image}
                alt="AWA Media Team"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
            </div>
          </div>

          {/* Right Side - Carousel */}
          <div className="order-1 lg:order-2 w-full flex flex-col">
            {/* Service Card */}
            <div className="relative overflow-hidden flex-1 min-h-[280px] sm:min-h-[320px] md:min-h-[340px] lg:min-h-0">
              <div 
                className="flex transition-transform duration-700 ease-out h-full"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {services.map((service, index) => {
                  const Icon = service.icon;
                  
                  return (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 px-0.5 sm:px-1 h-full"
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-lg p-4 sm:p-5 md:p-6 lg:p-5 xl:p-7 2xl:p-10 shadow-md sm:shadow-lg border border-gray-200/50 h-full flex flex-col justify-between">
                        {/* Number Indicator */}
                        <div 
                          className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[40px] xl:text-[52px] 2xl:text-[80px] font-black mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-2 leading-none"
                          style={{
                            background: "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            opacity: 0.15,
                          }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </div>

                        {/* Icon */}
                        <div className="mb-2.5 sm:mb-3 md:mb-3.5 lg:mb-3 xl:mb-4 2xl:mb-6">
                          <div 
                            className="inline-flex p-2 sm:p-2.5 md:p-3 lg:p-2.5 xl:p-3 2xl:p-5 rounded-lg sm:rounded-xl lg:rounded-lg"
                            style={{
                              background: "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                              opacity: 0.1,
                            }}
                          >
                            <Icon 
                              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-7 lg:h-7 xl:w-9 xl:h-9 2xl:w-12 2xl:h-12 text-[#2C2C2C]" 
                              strokeWidth={2} 
                            />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-[#2C2C2C] text-[16px] sm:text-[17px] md:text-[18px] lg:text-[18px] xl:text-[22px] 2xl:text-[32px] font-bold leading-[115%] tracking-[-0.01em] mb-2 sm:mb-2.5 md:mb-3 lg:mb-2.5 xl:mb-3 2xl:mb-5">
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[#4A4A4A] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13px] xl:text-[15px] 2xl:text-[18px] leading-[150%] mb-3 sm:mb-3.5 md:mb-4 lg:mb-3.5 xl:mb-5 2xl:mb-7 flex-grow">
                          {service.description}
                        </p>

                        {/* Learn More Link */}
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[#2C2C2C] font-bold text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13px] xl:text-[15px] 2xl:text-[18px] group cursor-pointer">
                          <span>Explore Service</span>
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-2.5 sm:mt-3 md:mt-3.5 lg:mt-3 xl:mt-4 2xl:mt-6">
              <button
                onClick={prevSlide}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-14 2xl:h-14 bg-[#2C2C2C] hover:bg-[#4A4A4A] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md active:scale-95"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-7 2xl:h-7" strokeWidth={2.5} />
              </button>

              {/* Dots Indicator */}
              <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1 lg:gap-1 xl:gap-1 2xl:gap-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 5000);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      currentIndex === index
                        ? 'w-3.5 sm:w-4 md:w-5 lg:w-5 xl:w-6 2xl:w-10 h-1.5 sm:h-1.5 md:h-1.5 lg:h-1.5 xl:h-2 2xl:h-3'
                        : 'w-1.5 sm:w-1.5 md:w-1.5 lg:w-1.5 xl:w-2 2xl:w-3 h-1.5 sm:h-1.5 md:h-1.5 lg:h-1.5 xl:h-2 2xl:h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                    style={
                      currentIndex === index
                        ? {
                            background: "linear-gradient(135deg, #FF6B35 0%, #FF1493 25%, #9B59B6 50%, #3498DB 75%, #2ECC71 100%)",
                          }
                        : {}
                    }
                    aria-label={`Go to service ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-14 2xl:h-14 bg-[#2C2C2C] hover:bg-[#4A4A4A] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md active:scale-95"
                aria-label="Next service"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-7 2xl:h-7" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;