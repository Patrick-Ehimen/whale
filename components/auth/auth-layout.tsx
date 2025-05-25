"use client";

import type { ReactNode } from "react";
import Navbar from "@/components/navigation/navbar";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex m-20 items-center justify-center min-h-[calc(100vh-4rem)] p-8">
        <div className="w-full max-w-6xl bg-[#0b0f14]  rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Left side - Form */}
            <div className="p-8 bg-[#12181f] m-5 rounded-3xl lg:p-12 flex flex-col justify-center">
              {children}
            </div>

            {/* Right side - Background Image */}
            <div
              className="hidden lg:block bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/assets/layout-image.svg')",
              }}
            >
              <div className="w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
