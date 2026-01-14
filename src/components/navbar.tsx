"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language_switcher";
import { useState } from "react";
import { useTranslation } from "@/i18n/i18n_context";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image
                src="/favicon.svg"
                alt="Gringotts Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              Gringotts
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-zinc-400 transition-colors hover:text-amber-400">
              {t('Navbar.features')}
            </Link>
            <Link href="#logic" className="text-sm font-medium text-zinc-400 transition-colors hover:text-amber-400">
              {t('Navbar.howItWorks')}
            </Link>
            <Link href="#compliance" className="text-sm font-medium text-zinc-400 transition-colors hover:text-amber-400">
              {t('Navbar.compliance')}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/10">
              {t('Navbar.logIn')}
            </Button>
            <Button variant="gold">
              {t('Navbar.launchApp')}
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Info: (20260114 - Luphia) { Mobile Menu } */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black px-4 py-6">
          <div className="flex flex-col gap-4">
            <Link href="#features" className="text-sm font-medium text-zinc-400 hover:text-amber-400" onClick={() => setIsMenuOpen(false)}>
              {t('Navbar.features')}
            </Link>
            <Link href="#logic" className="text-sm font-medium text-zinc-400 hover:text-amber-400" onClick={() => setIsMenuOpen(false)}>
              {t('Navbar.howItWorks')}
            </Link>
            <Link href="#compliance" className="text-sm font-medium text-zinc-400 hover:text-amber-400" onClick={() => setIsMenuOpen(false)}>
              {t('Navbar.compliance')}
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10">
                {t('Navbar.logIn')}
              </Button>
              <Button variant="gold" className="w-full">
                {t('Navbar.launchApp')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
