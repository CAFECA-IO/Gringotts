"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/i18n_context";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Banknote, Globe } from "lucide-react";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Info: (20260114 - Luphia) { Background gradients */}
      <div className="absolute top-0 left-1/2 -ml-[50%] w-[200%] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.15),transparent_70%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 flex max-w-fit items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-500 backdrop-blur-sm"
        >
          <ShieldCheck className="h-4 w-4" />
          <span>{t('Hero.compliantBadge')}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-6 max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          {t('Hero.titlePrefix')} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">
            {t('Hero.titleSuffix')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400 md:text-xl"
        >
          {t('Hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button variant="gold" size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
            {t('Hero.startMinting')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white">
            {t('Hero.viewDocumentation')}
          </Button>
        </motion.div>

        {/* Info: (20260114 - Luphia) { Feature Grid } */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid gap-8 sm:grid-cols-3 mx-auto max-w-5xl"
        >
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-amber-500/30 transition-colors">
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">{t('Hero.erc3643Title')}</h3>
            <p className="text-sm text-zinc-400">{t('Hero.erc3643Desc')}</p>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-amber-500/30 transition-colors">
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Banknote className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">{t('Hero.backedTitle')}</h3>
            <p className="text-sm text-zinc-400">{t('Hero.backedDesc')}</p>
          </div>
          <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-amber-500/30 transition-colors">
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">{t('Hero.crossChainTitle')}</h3>
            <p className="text-sm text-zinc-400">{t('Hero.crossChainDesc')}</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
