"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { services } from "@/lib/services";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const GRADIENT = "linear-gradient(135deg,#FF6B35,#FF1493,#9D00FF)";

export default function ServiceDetailPage() {
    const { slug } = useParams();
    const router = useRouter();
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        return (
            <MainLayout>
                <div className="flex min-h-screen items-center justify-center bg-background transition-colors duration-500">
                    <div className="text-center px-4">
                        <h1 className="text-4xl font-black text-foreground mb-4 uppercase">Service Not Found</h1>
                        <button
                            onClick={() => router.push("/")}
                            className="mt-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto font-bold uppercase tracking-wider text-sm"
                        >
                            <ArrowLeft size={16} /> Back to Home
                        </button>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const Icon = service.icon;

    return (
        <MainLayout>
            <div className="min-h-screen bg-background transition-colors duration-500 pt-32 pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.push("/#services")}
                        className="group mb-8 flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all"
                    >
                        <div className="rounded-full bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 p-2 shadow-sm group-hover:shadow-md transition-all text-foreground">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="font-bold text-sm uppercase tracking-wider">Back to Services</span>
                    </motion.button>

                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-7"
                        >
                            <div
                                className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
                                style={{
                                    background: GRADIENT,
                                }}
                            >
                                <Icon className="h-6 w-6 text-white" />
                            </div>
                            <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight uppercase tracking-tight">
                                {service.title}
                            </h1>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-semibold">
                                {service.details}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-5 relative aspect-video sm:aspect-square lg:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl border border-black/5 dark:border-white/10 bg-neutral-900"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                                alt={service.title}
                                className="h-full w-full object-cover select-none"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                        </motion.div>
                    </div>

                    {/* Features Section */}
                    <div className="mt-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl sm:text-3xl font-black text-foreground mb-12 text-center uppercase tracking-tight"
                        >
                            Why Choose Our {service.title}?
                        </motion.h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {service.features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="bg-white/40 dark:bg-white/5 p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5 dark:border-white/10 flex items-start gap-4 group"
                                >
                                    <div className="mt-1 text-[#FF1493] group-hover:scale-110 transition-transform">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black text-foreground mb-2 uppercase tracking-wide">
                                            {feature}
                                        </h3>
                                        <p className="text-muted-foreground text-xs leading-relaxed font-semibold">
                                            We ensure top-tier quality and professional execution for every aspect of our {feature.toLowerCase()}.
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 rounded-[2.5rem] p-10 sm:p-16 text-center relative overflow-hidden bg-white/40 dark:bg-black/40 border border-black/5 dark:border-white/10 backdrop-blur-md"
                    >
                        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground leading-tight mb-4 tracking-tight">
                                Ready to scale your brand?
                            </h2>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 font-medium">
                                Let&apos;s discuss how our {service.title} strategy can help your channel reach new viral heights.
                            </p>
                            <button
                                onClick={() => router.push("/#contact")}
                                className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider text-xs rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
                            >
                                Schedule a Call
                            </button>
                        </div>
                        {/* Decorative background orbs */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-pink-500/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3" />
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}
