"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileCheck, Scale, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/i18n_context";

export function Compliance() {
  const { t } = useTranslation();

  return (
    <section id="compliance" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.1),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl mb-6">
              {t('Compliance.title')}
            </h2>
            <p className="text-lg text-zinc-400 mb-8">
              {t('Compliance.descriptionStart')}
              <span className="text-white font-medium">{t('Compliance.descriptionSpan')}</span>
              {t('Compliance.descriptionEnd')}
            </p>

            <div className="space-y-4">
              {[
                t('Compliance.check1'),
                t('Compliance.check2'),
                t('Compliance.check3'),
                t('Compliance.check4')
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button variant="outline" className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white">
                {t('Compliance.viewReports')}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2"
          >
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Scale className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{t('Compliance.legalTitle')}</h3>
              <p className="text-sm text-zinc-400">{t('Compliance.legalDesc')}</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Lock className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{t('Compliance.securityTitle')}</h3>
              <p className="text-sm text-zinc-400">{t('Compliance.securityDesc')}</p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 sm:col-span-2">
              <FileCheck className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{t('Compliance.reservesTitle')}</h3>
              <p className="text-sm text-zinc-400">
                {t('Compliance.reservesDesc')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
