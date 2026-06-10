"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sparkles, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useTheme } from "@/lib/ThemeContext";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Journey", href: "/#journey" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleMagnetMove = (e: React.MouseEvent<HTMLElement>) => {
        const item = e.currentTarget;
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(item, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.2,
            ease: "power2.out"
        });
    };

    const handleMagnetLeave = (e: React.MouseEvent<HTMLElement>) => {
        gsap.to(e.currentTarget, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1.1, 0.6)"
        });
    };


    useEffect(() => {
        gsap.registerPlugin(ScrollToPlugin);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        const isHash = href.includes("#");
        const [targetPath, targetHash] = isHash ? href.split("#") : [href, null];
        const normalizedTargetPath = targetPath === "" || targetPath === "/" ? "/" : targetPath;

        setIsMobileMenuOpen(false);

        if (isHash && pathname === normalizedTargetPath) {
            e.preventDefault();
            const element = document.getElementById(targetHash!);
            if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: { y: elementPosition - offset, autoKill: true },
                    ease: "power4.inOut",
                });
            }
        } else if (href === "/" && pathname === "/") {
            e.preventDefault();
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: 0, autoKill: true },
                ease: "power4.inOut",
            });
        } else {
            e.preventDefault();
            router.push(href);
        }
    };

    return (
        <header
            style={{ zIndex: 1000 }}
            className="fixed top-0 left-0 right-0 h-24 flex items-center justify-center pointer-events-none z-[1000]"
        >
            <div 
                className={`w-full max-w-7xl mx-4 sm:mx-6 lg:mx-8 px-4 sm:px-6 py-2.5 flex items-center justify-between pointer-events-auto rounded-2xl md:rounded-3xl border border-border/60 bg-background/70 backdrop-blur-md transition-all duration-300 ${
                    isScrolled 
                        ? "shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] translate-y-2 bg-background/80" 
                        : "translate-y-4"
                }`}
            >
                {/* Left - Logo */}
                <Link
                    href="/"
                    onClick={(e) => handleLinkClick(e, "/")}
                    onMouseMove={handleMagnetMove}
                    onMouseLeave={handleMagnetLeave}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-muted/40 transition-colors"
                >
                    <div className="relative w-6 h-6 overflow-hidden">
                        <Image
                            src="/logo.png"
                            alt="AWA"
                            fill
                            className="object-contain dark:brightness-110"
                        />
                    </div>
                    <span className="font-heading text-base font-black tracking-tight uppercase text-foreground">
                        AWA
                    </span>
                </Link>

                {/* Center - Links (Desktop) */}
                <div className="hidden md:flex items-center gap-1.5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="px-4 py-2 rounded-xl font-bold tracking-wider text-[11px] uppercase text-foreground/70 hover:text-primary hover:bg-muted/40 transition-all duration-200 relative group overflow-hidden"
                        >
                            <span className="relative z-10">{link.name}</span>
                        </Link>
                    ))}
                </div>

                {/* Right - Actions & Mobile Toggle */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        onMouseMove={handleMagnetMove}
                        onMouseLeave={handleMagnetLeave}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 text-foreground hover:bg-muted/50 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sparkles size={15} className="text-foreground fill-foreground/20 animate-pulse" />
                        ) : (
                            <Moon size={15} className="text-foreground fill-foreground/20" />
                        )}
                    </button>

                    {/* CTA */}
                    <Link
                        href="/#contact"
                        onClick={(e) => handleLinkClick(e, "/#contact")}
                        onMouseMove={handleMagnetMove}
                        onMouseLeave={handleMagnetLeave}
                        className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9B59B6] text-white font-black text-xs uppercase rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[0_0_20px_rgba(255,20,147,0.4)] hover:scale-[1.03] active:scale-95"
                    >
                        Get Started
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-border/80 text-foreground hover:bg-muted/50"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-background/80 backdrop-blur-md z-[9999998] md:hidden pointer-events-auto"
                        />
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-0 right-0 bottom-0 w-80 bg-background border-l border-border z-[9999999] md:hidden pointer-events-auto p-8 flex flex-col justify-between"
                        >
                            <div className="flex flex-col gap-6 pt-16">
                                <div className="border-b border-border pb-4 mb-2 flex items-center justify-between">
                                    <span className="font-heading text-lg font-black uppercase text-foreground">Menu</span>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="h-8 w-8 flex items-center justify-center rounded-full border border-border text-foreground"
                                    >
                                        <X size={15} />
                                    </button>
                                </div>
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            className="text-2xl font-heading font-black uppercase tracking-tighter text-foreground/50 hover:text-foreground transition-colors py-2 block"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="border-t border-border pt-6">
                                <Link
                                    href="/#contact"
                                    onClick={(e) => handleLinkClick(e, "/#contact")}
                                    className="flex w-full items-center justify-center bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9B59B6] py-4 text-sm font-black uppercase tracking-widest text-white rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[0_0_20px_rgba(255,20,147,0.3)] active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}

