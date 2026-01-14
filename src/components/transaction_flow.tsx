"use client";

import { motion } from "framer-motion";
import { Wallet, Coins, Server, ShieldCheck, Repeat } from "lucide-react";
import { useTranslation } from "@/i18n/i18n_context";

export function TransactionFlow() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Wallet,
      title: t('TransactionFlow.step1Title'),
      description: t('TransactionFlow.step1Desc'),
    },
    {
      icon: Coins,
      title: t('TransactionFlow.step2Title'),
      description: t('TransactionFlow.step2Desc'),
    },
    {
      icon: Server,
      title: t('TransactionFlow.step3Title'),
      description: t('TransactionFlow.step3Desc'),
    },
    {
      icon: ShieldCheck,
      title: t('TransactionFlow.step4Title'),
      description: t('TransactionFlow.step4Desc'),
    },
    {
      icon: Repeat,
      title: t('TransactionFlow.step5Title'),
      description: t('TransactionFlow.step5Desc'),
    },
  ];

  return (
    <section id="logic" className="py-24 bg-black relative overflow-hidden">
      {/* Info: (20260114 - Luphia) { Background line */}
      <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent md:hidden" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{t('TransactionFlow.title')}</h2>
          <p className="mt-4 text-zinc-400">{t('TransactionFlow.description')}</p>
        </div>

        <div className="relative">
          {/* Info: (20260114 - Luphia) { Desktop connecting line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-zinc-800" />

          <div className="grid gap-12 md:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl border border-zinc-700 bg-zinc-900 shadow-xl transition-transform hover:scale-105 hover:border-amber-500/50">
                  <step.icon className="h-10 w-10 text-amber-500" />
                  <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
