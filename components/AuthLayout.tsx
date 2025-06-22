"use client";

import { useEffect } from "react";
import Script from "next/script";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  // Initialize finisher animation
  useEffect(() => {
    const initFinisher = () => {
      if (typeof window !== "undefined" && (window as any).FinisherHeader) {
        new (window as any).FinisherHeader({
          header: document.querySelector(".finisher-header"),
          count: 250,
          size: {
            min: 2,
            max: 8,
            pulse: 0,
          },
          speed: {
            x: {
              min: 0,
              max: 0.4,
            },
            y: {
              min: 0,
              max: 0.6,
            },
          },
          colors: {
            background: "#0a0a0a",
            particles: ["#fbf33c", "#ff9574", "#7be5e5", "#f97a7a", "#726cf8"],
          },
          blending: "overlay",
          opacity: {
            center: 1,
            edge: 0,
          },
          skew: 0,
          shapes: ["c"],
        });
      }
    };

    // Try to initialize immediately
    initFinisher();

    // Also try after a short delay to ensure script is loaded
    const timer = setTimeout(initFinisher, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="finisher-header absolute inset-0 z-0"></div>

      <Script
        src="/finisher-header.es5.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).FinisherHeader) {
            new (window as any).FinisherHeader({
              header: document.querySelector(".finisher-header"),
              count: 250,
              size: {
                min: 2,
                max: 8,
                pulse: 0,
              },
              speed: {
                x: {
                  min: 0,
                  max: 0.4,
                },
                y: {
                  min: 0,
                  max: 0.6,
                },
              },
              colors: {
                background: "#0a0a0a",
                particles: [
                  "#fbf33c",
                  "#ff9574",
                  "#7be5e5",
                  "#f97a7a",
                  "#726cf8",
                ],
              },
              blending: "overlay",
              opacity: {
                center: 1,
                edge: 0,
              },
              skew: 0,
              shapes: ["c"],
            });
          }
        }}
      />

      {children}
    </div>
  );
}
