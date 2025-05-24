"use client";

import * as React from "react";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { languages } from "@/constants/constants";

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0]);
  const [open, setOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleLanguageSelect = (language: (typeof languages)[0]) => {
    setSelectedLanguage(language);
    setOpen(false);
    setFocusedIndex(-1);
  };

  // Keyboard navigation
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          setOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % languages.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev <= 0 ? languages.length - 1 : prev - 1
          );
          break;
        case "ArrowRight":
          e.preventDefault();
          setFocusedIndex((prev) => {
            const nextIndex = prev + 1;
            return nextIndex >= languages.length ? prev : nextIndex;
          });
          break;
        case "ArrowLeft":
          e.preventDefault();
          setFocusedIndex((prev) => {
            const nextIndex = prev - 1;
            return nextIndex < 0 ? prev : nextIndex;
          });
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0) {
            handleLanguageSelect(languages[focusedIndex]);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, focusedIndex]);

  // Reset focused index when opening
  React.useEffect(() => {
    if (open) {
      setFocusedIndex(-1);
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          className="bg-slate-800 border-slate-800 text-white hover:bg-slate-800 gap-2 px-4 py-2 rounded-lg transition-all duration-200"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <Image
            src={selectedLanguage.flag}
            alt={selectedLanguage.name}
            width={24}
            height={24}
            className="inline-block"
          />
          <span className="font-medium text-white">
            {selectedLanguage.name}
          </span>
          <ChevronDown
            className={`h-4 w-4 opacity-70 text-white transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-slate-800 m-5 border-slate-700 text-white w-80 p-0 rounded-2xl shadow-2xl animate-in slide-in-from-top-2 duration-200"
        align="start"
        sideOffset={8}
        role="listbox"
        aria-label="Language selection"
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold text-center mb-4">
            Select Language
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {languages.map((language, index) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-200 relative group ${
                  focusedIndex === index
                    ? "bg-slate-600 ring-2 ring-blue-400"
                    : "hover:bg-slate-700"
                }`}
                role="option"
                aria-selected={selectedLanguage.code === language.code}
                tabIndex={-1}
              >
                <div className="relative">
                  <Image
                    src={language.flag}
                    alt={language.name}
                    width={24}
                    height={24}
                    className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-2xl border-2 border-slate-600"
                  />
                  {selectedLanguage.code === language.code && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-200">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium text-white">
                  {language.name}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-400 text-center">
            Use arrow keys to navigate • Enter to select • Esc to close
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
