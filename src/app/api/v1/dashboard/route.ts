import { jsonOk } from '@/lib/utils/response';

export const dynamic = 'force-dynamic';

function getMockValue(
  base: number,
  variance: number,
  period: number = 60000,
  decimals: number = 0
) {
  const now = Date.now();
  // Info: (20260114 - Luphia) { Create a primary trend using sine wave }
  const trend = Math.sin(now / period) * variance;
  // Info: (20260114 - Luphia) { Add some random noise }
  const noise = (Math.random() - 0.5) * (variance * 0.2);

  const val = base + trend + noise;
  return Number(val.toFixed(decimals));
}

export async function GET() {
  // Info: (20260114 - Luphia) { Simulate realistic "live" market data }
  // Info: (20260114 - Luphia) { TVL: Oscillates around $124.5M with +/- $50k variance over 5 minutes }
  const tvl = getMockValue(124500000, 50000, 300000);

  // Info: (20260114 - Luphia) { TVL Change: Slow moving percentage }
  const tvlChange = getMockValue(2.4, 0.2, 600000, 1);

  // Info: (20260114 - Luphia) { Split TVL roughly between USDT (48%) and USDC (52%) }
  // Info: (20260114 - Luphia) { Add slight opposite oscillation to simulate pairs trading }
  const usdtShare = getMockValue(0.48, 0.01, 120000, 4);
  const usdtCollateral = Math.floor(tvl * usdtShare);
  const usdcCollateral = tvl - usdtCollateral;

  // Info: (20260114 - Luphia) { Transactions: Volume around $45M }
  const txVolume = getMockValue(45230000, 200000, 240000);
  const txChange = getMockValue(12.5, 1.5, 300000, 1);
  const txCount = Math.floor(getMockValue(12450, 100, 180000));
  const avgSize = Math.floor(txVolume / txCount);

  // Info: (20260114 - Luphia) { Exchange Rates: TWD around 32.45 }
  const twdRate = getMockValue(32.45, 0.08, 600000, 2);
  const twdChange = getMockValue(0.1, 0.05, 300000, 1);

  // Info: (20260114 - Luphia) { Stablecoin spreads vs TWD }
  // Info: (20260114 - Luphia) { USDT usually trades at slight premium or discount, USDC tightly coupled }
  const usdtTwd = getMockValue(twdRate + 0.03, 0.02, 60000, 2);
  const usdcTwd = getMockValue(twdRate - 0.03, 0.02, 55000, 2);

  return jsonOk({
    tvl: {
      value: tvl,
      change: tvlChange,
      usdt: usdtCollateral,
      usdc: usdcCollateral
    },
    transactions: {
      volume: txVolume,
      change: txChange,
      count: txCount,
      avgSize: avgSize
    },
    rates: {
      twd: twdRate,
      change: twdChange,
      usdtTwd: usdtTwd,
      usdcTwd: usdcTwd
    }
  });
}
