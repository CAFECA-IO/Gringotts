import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { StatsDashboard } from "@/components/stats_dashboard";
import { Features } from "@/components/features";
import { TransactionFlow } from "@/components/transaction_flow";
import { Compliance } from "@/components/compliance";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-amber-500/30 selection:text-amber-500">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsDashboard />
        <Features />
        <TransactionFlow />
        <Compliance />
      </main>
      <Footer />
    </div>
  );
}
