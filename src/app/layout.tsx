// app/layout.tsx
import { ViewportHeightFix } from "@/components/ViewPortHeightFix.tsx";
import { ReactNode } from "react";
import "./globals.css";
import PreLoaderWrapper from "@/components/PreLoader/PreLoaderWrapper";
import GsapConfig from "@/components/GsapConfig"; // <-- Import the new component
import { ThemeProvider } from "@/lib/ThemeContext";

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
                  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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

          <PreLoaderWrapper>
            <ViewportHeightFix />
            {children}
          </PreLoaderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}