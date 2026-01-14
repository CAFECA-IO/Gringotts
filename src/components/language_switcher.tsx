"use client";

import { useTranslation, type Language } from "@/i18n/i18n_context";
import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'zh-TW', label: '繁體中文' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
  ];

  const handleSwitch = (newLocale: Language) => {
    setLanguage(newLocale);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white rounded-lg hover:bg-white/5"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{language}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl border border-white/10 bg-zinc-900 shadow-xl backdrop-blur-xl focus:outline-none z-50 overflow-hidden"
          >
            <div className="p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSwitch(lang.code)}
                  className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${language === lang.code
                    ? "bg-amber-500/10 text-amber-500"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {lang.label}
                  {language === lang.code && (
                    <Check className="h-3.5 w-3.5" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
