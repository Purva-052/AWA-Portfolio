// app/layout.tsx
import { ViewportHeightFix } from "@/components/ViewPortHeightFix.tsx";
import { ReactNode } from "react";
import "./globals.css";
import PreLoaderWrapper from "@/components/PreLoader/PreLoaderWrapper";

// ✅ ADD THIS
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
    <html lang="en">
      <body>
        <PreLoaderWrapper>
          <ViewportHeightFix />
          {children}
        </PreLoaderWrapper>
      </body>
    </html>
  );
}
