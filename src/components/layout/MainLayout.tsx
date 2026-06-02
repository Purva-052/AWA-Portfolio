"use client";

import { ReactNode } from "react";
import PageTransition from "./PageTransition";
import Navbar from "./Navbar";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="relative min-h-screen">
            <Navbar />
            <main>
                <PageTransition>{children}</PageTransition>
            </main>
        </div>
    );
}