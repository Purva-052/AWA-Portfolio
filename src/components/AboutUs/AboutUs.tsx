"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { Target, Users, Lightbulb, TrendingUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const heroRef = useRef<HTMLDivElement>(null);
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const stat3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.from(heroRef.current.querySelectorAll(".hero-content"), {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // Who We Are section animation
    if (whoWeAreRef.current) {
      gsap.from(whoWeAreRef.current.querySelectorAll(".animate-in"), {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: whoWeAreRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Counter animations
    if (stat1Ref.current) {
      gsap.fromTo(
        stat1Ref.current,
        { innerText: 0 },
        {
          innerText: 500,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat1Ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: function() {
            if (stat1Ref.current) {
              stat1Ref.current.innerText = Math.floor(parseFloat(stat1Ref.current.innerText as any)) + "+";
            }
          }
        }
      );
    }

    if (stat2Ref.current) {
      gsap.fromTo(
        stat2Ref.current,
        { innerText: 0 },
        {
          innerText: 150,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat2Ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: function() {
            if (stat2Ref.current) {
              stat2Ref.current.innerText = Math.floor(parseFloat(stat2Ref.current.innerText as any)) + "+";
            }
          }
        }
      );
    }

    if (stat3Ref.current) {
      gsap.fromTo(
        stat3Ref.current,
        { innerText: 0 },
        {
          innerText: 50,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat3Ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          onUpdate: function() {
            if (stat3Ref.current) {
              stat3Ref.current.innerText = Math.floor(parseFloat(stat3Ref.current.innerText as any)) + "M+";
            }
          }
        }
      );
    }

    // Values section animation
    if (valuesRef.current) {
      gsap.from(valuesRef.current.querySelectorAll(".value-card"), {
        opacity: 0,
        scale: 0.9,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Creativity",
      description: "Innovative ideas that break through the noise and capture attention.",
      gradient: "from-purple-400 to-pink-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Innovation",
      description: "Cutting-edge strategies that keep you ahead of the competition.",
      gradient: "from-cyan-400 to-blue-600",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Market Expertise",
      description: "Deep understanding of local and global market dynamics.",
      gradient: "from-orange-400 to-red-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Client Focus",
      description: "Your success is our mission. We're partners in your growth journey.",
      gradient: "from-green-400 to-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 opacity-50" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="hero-content text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AWA Media</span>
          </h1>
          <p className="hero-content text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Crafting stories that matter, building brands that last
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section ref={whoWeAreRef} className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="animate-in text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              
              <div className="animate-in space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  AWA Media is more than just a marketing agency—were your creative partners in success. 
                  Based in the vibrant city of Ahmedabad, we bring together a passionate team of strategists, 
                  designers, and storytellers who live and breathe creativity.
                </p>
                
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-l-4 border-purple-600 p-6 rounded-r-lg">
                  <p className="text-xl font-semibold text-gray-900 italic">
                    Based in Ahmedabad, we craft impactful strategies that resonate.
                  </p>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our approach is simple: understand your vision, analyze your market, and deliver 
                  campaigns that dont just meet expectations—they exceed them. With a focus on 
                  creativity, innovation, and deep market expertise, we transform brands into 
                  powerful stories that connect with audiences.
                </p>
              </div>

              <div className="animate-in grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div 
                    ref={stat1Ref}
                    className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  >
                    0+
                  </div>
                  <p className="text-sm text-gray-600 font-semibold mt-2">Projects</p>
                </div>
                <div className="text-center">
                  <div 
                    ref={stat2Ref}
                    className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"
                  >
                    0+
                  </div>
                  <p className="text-sm text-gray-600 font-semibold mt-2">Clients</p>
                </div>
                <div className="text-center">
                  <div 
                    ref={stat3Ref}
                    className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                  >
                    0M+
                  </div>
                  <p className="text-sm text-gray-600 font-semibold mt-2">Reach</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="animate-in relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/team-brainstorm.jpg"
                alt="AWA Media team brainstorming and working on projects"
                fill
                className="object-cover"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-lg font-semibold drop-shadow-lg">
                  Our team collaborating on innovative solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section ref={valuesRef} className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our core values shape everything we do, from strategy to execution
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${value.gradient} text-white mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Lets create something extraordinary together
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}