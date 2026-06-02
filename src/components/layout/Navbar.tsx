"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useTheme } from "@/lib/ThemeContext";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
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
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: { y: element.offsetTop - offset, autoKill: true },
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
            className={`fixed top-0 left-0 right-0 transition-all duration-500 pointer-events-none ${isScrolled ? "py-4 md:py-3" : "py-8 md:py-6"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 pointer-events-auto">
                <nav className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border px-5 py-2 backdrop-blur-md transition-all duration-500 shadow-2xl ${
                    isScrolled 
                        ? "bg-white/80 dark:bg-black/80 border-black/5 dark:border-white/5 scale-[0.98]" 
                        : "bg-white/40 dark:bg-black/40 border-black/10 dark:border-white/10 scale-100"
                    }`}>
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={(e) => handleLinkClick(e, "/")}
                        className="flex items-center gap-3 group relative z-10"
                    >
                        <div className="relative w-8 h-8 md:w-9 md:h-9 overflow-hidden rounded-lg">
                            <Image
                                src="/logo.png"
                                alt="AWA"
                                fill
                                className="object-contain transition-transform duration-500 group-hover:scale-110 dark:brightness-110"
                            />
                        </div>
                        <span className="text-lg md:text-xl font-black tracking-tighter text-black dark:text-white uppercase italic">
                            AWA
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className="text-sm font-semibold text-black/60 dark:text-white/60 transition-all hover:text-black dark:hover:text-white relative group py-2 h-9 flex items-center overflow-hidden block"
                            >
                                <div className="relative h-5 overflow-hidden">
                                    <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-5">
                                        <span className="h-5 leading-5 flex items-center justify-center text-black/70 dark:text-white/70">{link.name}</span>
                                        <span className="h-5 leading-5 flex items-center justify-center text-black dark:text-white">{link.name}</span>
                                    </div>
                                </div>
                                <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#2ECC71] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* CTA & Theme Toggle */}
                    <div className="flex items-center gap-3 relative z-10">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10 hover:scale-105 active:scale-95"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Sun size={18} className="text-amber-400 animate-spin-slow" />
                            ) : (
                                <Moon size={18} className="text-indigo-600" />
                            )}
                        </button>

                        <Link
                            href="/#contact"
                            onClick={(e) => handleLinkClick(e, "/#contact")}
                            className="hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9B59B6] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,20,147,0.4)] hover:scale-[1.03] active:scale-95"
                        >
                            Get Started
                            <ArrowRight size={14} strokeWidth={3} />
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white backdrop-blur-sm transition-all hover:bg-black/10 dark:hover:bg-white/10"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </nav>
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
                            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md z-[9999998] md:hidden pointer-events-auto"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="fixed inset-x-6 top-[110px] z-[9999999] md:hidden pointer-events-auto"
                        >
                            <div className="overflow-hidden rounded-[3rem] border border-black/10 dark:border-white/10 bg-white/95 dark:bg-black/95 p-10 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                <div className="flex flex-col gap-8">
                                    {navLinks.map((link, idx) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.08, ease: "easeOut" }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={(e) => handleLinkClick(e, link.href)}
                                                className="text-5xl font-black uppercase tracking-tighter text-black/20 dark:text-white/30 transition-all hover:text-black dark:hover:text-white hover:translate-x-3 inline-block active:scale-95"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}

                                    <motion.div
                                        className="mt-6 pt-10 border-t border-black/5 dark:border-white/5"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <Link
                                            href="/#contact"
                                            onClick={(e) => handleLinkClick(e, "/#contact")}
                                            className="flex w-full items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FF1493] to-[#9B59B6] py-5 text-xl font-bold uppercase tracking-widest text-white shadow-[0_15px_40px_rgba(255,20,147,0.2)] transition-all duration-300 active:scale-95"
                                        >
                                            Get Started
                                            <ArrowRight size={20} strokeWidth={3} />
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}

