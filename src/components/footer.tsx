"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Github } from "lucide-react";
import { useTranslation } from "@/i18n/i18n_context";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
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
            <p className="text-sm text-zinc-400">
              {t('Footer.description')}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">{t('Footer.platform')}</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-amber-500 transition-colors">{t('Footer.mintRedeem')}</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">{t('Footer.portfolio')}</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">{t('Footer.supportedChains')}</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">{t('Footer.proofOfReserves')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">{t('Footer.developers')}</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-amber-500 transition-colors">{t('Footer.documentation')}</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">{t('Footer.apiReference')}</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">{t('Footer.smartContracts')}</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">{t('Footer.status')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">{t('Footer.complianceTitle')}</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-amber-500 transition-colors">{t('Footer.termsOfService')}</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">{t('Footer.privacyPolicy')}</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">{t('Footer.amlKycPolicy')}</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">{t('Footer.licenses')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 text-center text-sm text-zinc-500">
          <p>&copy; 2017 - {new Date().getFullYear()} Gringotts Protocol. {t('Footer.rightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
