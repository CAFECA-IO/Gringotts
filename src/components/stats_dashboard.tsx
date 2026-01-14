"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, ArrowLeftRight, Activity, Banknote } from "lucide-react";
import { useTranslation } from '@/i18n/i18n_context';

interface IDashboardData {
  tvl: {
    value: number;
    change: number;
    usdt: number;
    usdc: number;
  };
  transactions: {
    volume: number;
    change: number;
    count: number;
    avgSize: number;
  };
  rates: {
    twd: number;
    change: number;
    usdtTwd: number;
    usdcTwd: number;
  };
}

function CountUp({ value, prefix = "", suffix = "", decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) =>
    `${prefix}${current.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix} `
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function StatsDashboard() {
  const { t } = useTranslation();
  const [data, setData] = useState<IDashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/v1/dashboard');
        const json = await res.json();
        if (json.success) {
          setData(json.payload);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchData();
    // Info: (20260114 - Luphia) { Refresh every 3 seconds }
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null; // Info: (20260114 - Luphia) { Or a loading skeleton }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Info: (20260114 - Luphia) { Tech background elements } */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#18181b,transparent)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono mb-4"
          >
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            {t('Stats.liveMainnetData')}
          </motion.div>

          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              {t('Stats.realTimeTransparency')}
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-zinc-400 text-lg">
            {t('Stats.description')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Info: (20260114 - Luphia) { Total Value Locked Card } */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 transition-all hover:border-amber-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl group-hover:bg-amber-500/10 transition-colors duration-500"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 rounded-2xl bg-black border border-white/10 text-amber-500 shadow-lg shadow-amber-900/10 group-hover:shadow-amber-500/20 transition-all">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <Activity className="h-5 w-5 text-zinc-600 animate-pulse" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">{t('Stats.tvl')}</h3>
                  <div className="flex items-baseline gap-3">
                    <div className="text-4xl font-bold text-white font-mono tracking-tight tabular-nums">
                      <CountUp value={data.tvl.value} prefix="$" />
                    </div>
                    <span className="text-sm font-medium text-green-400 font-mono">+{data.tvl.change}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex justify-between items-center text-sm p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-zinc-400">{t('Stats.usdtCollateral')}</span>
                  <span className="text-white font-mono tabular-nums">
                    <CountUp value={data.tvl.usdt} />
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-zinc-400">{t('Stats.usdcCollateral')}</span>
                  <span className="text-white font-mono tabular-nums">
                    <CountUp value={data.tvl.usdc} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info: (20260114 - Luphia) { Transactions Card (Formerly Custody) } */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 transition-all hover:border-emerald-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />

            <div className="relative flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 rounded-2xl bg-black border border-white/10 text-emerald-500 shadow-lg shadow-emerald-900/10 group-hover:shadow-emerald-500/20 transition-all">
                    <ArrowLeftRight className="h-6 w-6" />
                  </div>
                  <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">{t('Stats.transactions')}</h3>
                  <div className="flex items-baseline gap-3">
                    <div className="text-4xl font-bold text-white font-mono tracking-tight tabular-nums">
                      <CountUp value={data.transactions.volume} prefix="$" />
                    </div>
                    <span className="text-sm font-medium text-green-400 font-mono">+{data.transactions.change}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex justify-between items-center text-sm p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-zinc-400">{t('Stats.totalCount')}</span>
                  <span className="text-white font-mono tabular-nums">
                    <CountUp value={data.transactions.count} />
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-zinc-400">{t('Stats.avgSize')}</span>
                  <span className="text-white font-mono tabular-nums">
                    <CountUp value={data.transactions.avgSize} prefix="$" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info: (20260114 - Luphia) { Reference Rates Card (TWD) } */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-8 transition-all hover:border-blue-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            />

            <div className="relative flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 rounded-2xl bg-black border border-white/10 text-blue-500 shadow-lg shadow-blue-900/10 group-hover:shadow-blue-500/20 transition-all">
                    <Banknote className="h-6 w-6" />
                  </div>
                  <div className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 font-mono">
                    ORACLE LIVE
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">{t('Stats.exchangeRates')}</h3>
                  <div className="flex items-baseline gap-3">
                    <div className="text-4xl font-bold text-white font-mono tracking-tight tabular-nums">
                      <CountUp value={data.rates.twd} decimals={2} />
                    </div>
                    <span className="text-sm font-medium text-green-400 font-mono">+{data.rates.change}%</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-black/40 border border-white/5 group-hover:border-green-500/30 transition-colors">
                  <span className="text-zinc-400">{t('Stats.usdtTwd')}</span>
                  <span className="text-green-400 font-mono tabular-nums">
                    <CountUp value={data.rates.usdtTwd} decimals={2} />
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm p-2 rounded-lg bg-black/40 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                  <span className="text-zinc-400">{t('Stats.usdcTwd')}</span>
                  <span className="text-blue-400 font-mono tabular-nums">
                    <CountUp value={data.rates.usdcTwd} decimals={2} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
