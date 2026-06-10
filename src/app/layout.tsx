// app/layout.tsx
import { ViewportHeightFix } from "@/components/ViewPortHeightFix.tsx";
import { ReactNode } from "react";
import "./globals.css";
import PreLoaderWrapper from "@/components/PreLoader/PreLoaderWrapper";
import GsapConfig from "@/components/GsapConfig"; // <-- Import the new component
import { ThemeProvider } from "@/lib/ThemeContext";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata = {
  title: "AWA MEDIA | Leading PR & Influencer Marketing Agency",
  description: "AWA MEDIA is Gujarat's premier PR and Influencer Marketing Agency, delivering impactful brand visibility, digital presence solutions, and campaign execution across India.",
  keywords: ["AWA Media", "PR Agency Gujarat", "Influencer Marketing Ahmedabad", "Concert PR India", "Brand Awareness", "Government PR"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {/* Global GSAP initialization */}
          <GsapConfig />
          <CustomCursor />

          <PreLoaderWrapper>
            <ViewportHeightFix />
            {children}
          </PreLoaderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}