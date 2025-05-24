"use client";

import Link from "next/link";
import Image from "next/image";
import LanguageSelector from "@/components/others/language-selector";
import { ThemeToggle } from "@/components/others/theme-toggle";
import HoverMenu from "@/components/others/hover-menu";
import { navigationItems } from "@/constants/constants";
import { Logo } from "@/public";

export default function Navbar() {
  return (
    <nav className="bg-[#020817] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Image
                  src={Logo}
                  alt="Whale Logo"
                  width={32}
                  height={32}
                  className="w-6 h-6"
                />
              </div>
              <span className="text-white text-[16px] mt-1 font-semibold">
                Whale.
              </span>
            </div>

            {/* Grid Menu Icon */}
            <div className="hidden md:flex">
              <HoverMenu />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white hover:text-gray-300 transition-colors relative flex items-center gap-2"
              >
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-slate-700">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white hover:text-gray-300  px-3 py-2 text-base font-medium transition-colors flex items-center gap-2"
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
