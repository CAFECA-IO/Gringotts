"use client";

import Link from "next/link";
import Image from "next/image";
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
              <Link href="https://github.com/CAFECA-IO/Gringotts" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
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
