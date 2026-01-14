"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Link2, Globe2 } from "lucide-react";
import { useTranslation } from "@/i18n/i18n_context";

export function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Shield,
      title: t('Features.erc3643Title'),
      description: t('Features.erc3643Desc'),
    },
    {
      icon: Link2,
      title: t('Features.dualAssetTitle'),
      description: t('Features.dualAssetDesc'),
    },
    {
      icon: Zap,
      title: t('Features.instantSettlementTitle'),
      description: t('Features.instantSettlementDesc'),
    },
    {
      icon: Globe2,
      title: t('Features.globalComplianceTitle'),
      description: t('Features.globalComplianceDesc'),
    },
  ];

  return (
    <section id="features" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t('Features.title')}
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            {t('Features.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 transition-colors"
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-zinc-800 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
