import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import PreLoaderWrapper from "@/components/PreLoader/PreLoaderWrapper";

/* ---------------- Fonts ---------------- */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

/* ---------------- Metadata ---------------- */

export const metadata: Metadata = {
  title: "AWA - Welcome to the world of AWA",
  description: "Are you an Amdawadi? Then you're at the right place.",
  keywords: ["AWA", "Ahmedabad", "Amdavad"],
};

/* ---------------- Layout ---------------- */

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${inter.variable} font-roboto antialiased`}
      >
        <PreLoaderWrapper>
          {children}
        </PreLoaderWrapper>
      </body>
    </html>
  );
}