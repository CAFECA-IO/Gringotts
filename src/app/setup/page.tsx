"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/i18n/i18n_context";
import { Footer } from "@/components/footer";
import { LanguageSwitcher } from "@/components/language_switcher";
import { ethers } from "ethers";
import { Copy, RefreshCw, Check, ArrowRight, Loader2 } from "lucide-react";
import { ConfirmModal } from "@/components/ui/confirm_modal";
import QRCode from "react-qr-code";

type DeploymentStatus = "pending" | "deploying" | "deployed";

interface IContractStatus {
  name: string;
  key: string; // Info: (20260115 - Luphia) Environment variable key
  address: string;
  status: DeploymentStatus;
}

export default function SetupPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [step, setStep] = useState<"config" | "deploy">("config");
  const [isLoading, setIsLoading] = useState(false);

  // Info: (20260115 - Luphia) Config State
  const [walletAddress, setWalletAddress] = useState("");
  const [formData, setFormData] = useState({
    rpcUrl: "https://mainnet.isuncoin.com",
    privateKey: "",
    domain: "",
    alchemySigningKey: "",
    alchemyAuthToken: "",
  });

  // Info: (20260115 - Luphia) Deployment State
  const [balance, setBalance] = useState<string>("0.0");
  const [contracts, setContracts] = useState<IContractStatus[]>([
    { name: "CLAIM_TOPICS_REGISTRY", key: "CLAIM_TOPICS_REGISTRY", address: "", status: "pending" },
    { name: "ENTRY_POINT_ADDRESS", key: "ENTRY_POINT_ADDRESS", address: "", status: "pending" },
    { name: "IDENTITY_REGISTRY_STORAGE", key: "IDENTITY_REGISTRY_STORAGE", address: "", status: "pending" },
    { name: "TOKEN_IMPLEMENTATION", key: "TOKEN_IMPLEMENTATION", address: "", status: "pending" },
    { name: "TRUSTED_ISSUERS_REGISTRY", key: "TRUSTED_ISSUERS_REGISTRY", address: "", status: "pending" },
    { name: "COMPANY_ASSETS_FACTORY", key: "COMPANY_ASSETS_FACTORY", address: "", status: "pending" },
    { name: "SCW_FACTORY_ADDRESS", key: "SCW_FACTORY_ADDRESS", address: "", status: "pending" },
  ]);

  // Info: (20260115 - Luphia) Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    message: string;
    type: "success" | "error" | "info";
    onConfirm?: () => void;
    confirmText?: string;
  }>({
    title: "",
    message: "",
    type: "info",
  });

  // Info: (20260115 - Luphia) Fetch Balance Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "deploy" && formData.rpcUrl && walletAddress) {
      const fetchBalance = async () => {
        try {
          // Info: (20260115 - Luphia) Using a simple JsonRpcProvider. In a real app, handle errors gracefully if RPC is unreachable.
          // Info: (20260115 - Luphia) Explicitly defining network to avoid auto-detect overhead/errors in some envs
          const provider = new ethers.JsonRpcProvider(formData.rpcUrl, undefined, { staticNetwork: true });

          const balanceWei = await provider.getBalance(walletAddress);
          const balanceEth = ethers.formatEther(balanceWei);
          setBalance(balanceEth);
        } catch (error) {
          console.warn("Retrying... Failed to fetch balance:", error);
          // Info: (20260115 - Luphia) Optional: You could set a 'connectionError' state here to show a UI warning
        }
      };

      fetchBalance();
      interval = setInterval(fetchBalance, 5000); // Info: (20260115 - Luphia) Poll every 5 seconds
    }
    return () => clearInterval(interval);
  }, [step, formData.rpcUrl, walletAddress]);


  const showModal = (
    title: string,
    message: string,
    type: "success" | "error" | "info" = "info",
    onConfirm?: () => void
  ) => {
    setModalConfig({
      title,
      message,
      type,
      onConfirm,
      confirmText: onConfirm ? t("Setup.ok") : t("Setup.close"),
    });
    setModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    setFormData({ ...formData, privateKey: wallet.privateKey });
    setWalletAddress(wallet.address);
  };

  const handleConfigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    /**
     * Info: (20260115 - Luphia) Simulate API Check or partial save logic if needed. 
     * We proceed to deployment step in memory. 
     * We will save everything at the end.
     */

    // Info: (20260115 - Luphia) Simple simulated validation delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Info: (20260115 - Luphia) Transition to next step
    setStep("deploy");
    setIsLoading(false);
  };

  const deployContract = async (index: number) => {
    const updatedContracts = [...contracts];
    updatedContracts[index].status = "deploying";
    setContracts(updatedContracts);

    // Info: (20260115 - Luphia) Simulate Deployment - In real scenario, use ethers to deploy bytecode
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const randomAddress = ethers.Wallet.createRandom().address;

    updatedContracts[index].status = "deployed";
    updatedContracts[index].address = randomAddress;
    setContracts(updatedContracts);
  };

  const handleFinalize = async () => {
    setIsLoading(true);
    // Info: (20260115 - Luphia) Prepare final payload with config AND contract addresses
    const finalData = {
      ...formData,
      ...contracts.reduce((acc, contract) => {
        acc[contract.key] = contract.address;
        return acc;
      }, {} as Record<string, string>)
    };

    try {
      const response = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        showModal(
          t("Setup.successTitle") || "Success",
          t("Setup.finalSuccessMessage"),
          "success",
          () => router.push("/")
        );
      } else {
        const error = await response.json();
        showModal(t("Setup.errorTitle") || "Error", `Error: ${error.message}`, "error");
      }
    } catch (err) {
      console.error(err);
      showModal(t("Setup.errorTitle") || "Error", t("Setup.errorMessage"), "error");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-amber-500/30 selection:text-amber-500">
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
        confirmText={modalConfig.confirmText}
      />

      {/* Info: (20260115 - Luphia) Simplified Header */}
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
            <div className="flex items-center gap-4">
              {step === 'deploy' && (
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-full border border-white/10 text-xs text-zinc-400">
                  <div className={`w-2 h-2 rounded-full ${Number(balance) > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
              )}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 pt-24 pb-24">
        <div className="w-full max-w-2xl bg-zinc-900 border border-white/10 p-8 rounded-xl shadow-2xl backdrop-blur-sm">

          {step === "config" && (
            <>
              <h1 className="text-3xl font-bold mb-2 text-center text-amber-500">{t("Setup.title")}</h1>
              <p className="text-zinc-400 mb-8 text-center text-sm">
                {t("Setup.description")}
              </p>

              <form onSubmit={handleConfigSubmit} className="space-y-4">
                <div>
                  <label htmlFor="rpcUrl" className="block text-sm font-medium mb-1.5 text-zinc-300">{t("Setup.rpcUrl")}</label>
                  <input
                    aria-label={t("Setup.rpcUrl")}
                    id="rpcUrl"
                    type="text"
                    name="rpcUrl"
                    required
                    value={formData.rpcUrl}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="privateKey" className="block text-sm font-medium mb-1.5 text-zinc-300">{t("Setup.privateKey")}</label>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={generateWallet}
                      className="flex items-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-lg text-sm text-zinc-300 hover:text-white transition-colors w-full justify-center"
                    >
                      <RefreshCw className="h-4 w-4" />
                      {t("Setup.generateWallet")}
                    </button>
                  </div>

                  <input
                    type="hidden"
                    name="privateKey"
                    value={formData.privateKey}
                  />

                  <input
                    aria-label={t("Setup.privateKey")}
                    id="privateKey"
                    type="text"
                    readOnly
                    placeholder={t("Setup.privateKeyHidden")}
                    value={formData.privateKey ? "•".repeat(64) : ""}
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-zinc-500 cursor-not-allowed outline-none"
                  />

                  {walletAddress && (
                    <div className="mt-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <span className="block text-xs text-amber-500 mb-1">{t("Setup.walletAddress")}</span>
                      <div className="flex items-center justify-between gap-2">
                        <code className="text-xs text-zinc-300 break-all">{walletAddress}</code>
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(walletAddress)}
                          className="p-1 hover:bg-amber-500/20 rounded text-amber-500 transition-colors"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="domain" className="block text-sm font-medium mb-1.5 text-zinc-300">{t("Setup.domain")}</label>
                  <input
                    aria-label={t("Setup.domain")}
                    id="domain"
                    type="text"
                    name="domain"
                    required
                    placeholder="example.com"
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600"
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="alchemySigningKey" className="block text-sm font-medium mb-1.5 text-zinc-300">{t("Setup.alchemySigningKey")}</label>
                    <input
                      aria-label={t("Setup.alchemySigningKey")}
                      id="alchemySigningKey"
                      type="password"
                      name="alchemySigningKey"
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600"
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="alchemyAuthToken" className="block text-sm font-medium mb-1.5 text-zinc-300">{t("Setup.alchemyAuthToken")}</label>
                    <input
                      aria-label={t("Setup.alchemyAuthToken")}
                      id="alchemyAuthToken"
                      type="password"
                      name="alchemyAuthToken"
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all placeholder:text-zinc-600"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !formData.privateKey}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold py-3.5 rounded-lg transition-all transform disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>{t("Setup.saveButton")} <ArrowRight className="h-5 w-5" /></>}
                </button>
              </form>
            </>
          )}

          {step === "deploy" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2 text-amber-500">{t("Setup.deployTitle")}</h1>
                <p className="text-zinc-400 text-sm">{t("Setup.deployDescription")}</p>
              </div>

              {/* Info: (20260115 - Luphia) Fund Wallet Section */}
              <div className="bg-zinc-800/50 p-6 rounded-xl border border-white/5 space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="bg-white p-2 rounded-lg">
                    <QRCode value={walletAddress} size={120} />
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div>
                      <h3 className="text-sm font-medium text-zinc-400 mb-1">{t("Setup.currentBalance")}</h3>
                      <div className="text-3xl font-bold text-white flex items-baseline gap-1">
                        {Number(balance).toFixed(4)} <span className="text-amber-500 text-lg">ISC</span>
                      </div>
                    </div>
                    <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                      <div className="flex items-center justify-between gap-2">
                        <code className="text-xs text-zinc-300 break-all">{walletAddress}</code>
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(walletAddress)}
                          className="p-1 hover:bg-amber-500/20 rounded text-amber-500 transition-colors"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500">{t("Setup.scanQrCode")}</p>
                  </div>
                </div>
              </div>

              {/* Info: (20260115 - Luphia) Contracts List */}
              <div className="space-y-3">
                {contracts.map((contract, index) => (
                  <div key={contract.key} className="flex items-center justify-between p-4 bg-zinc-800/30 border border-white/5 rounded-lg">
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-200">{contract.name}</span>
                      <span className="text-xs text-zinc-500 font-mono">
                        {contract.status === 'deployed' ? contract.address : 'Not Deployed'}
                      </span>
                    </div>
                    {contract.status === 'deployed' ? (
                      <div className="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                        <Check className="h-4 w-4" />
                      </div>
                    ) : (
                      <button
                        onClick={() => deployContract(index)}
                        disabled={contract.status === 'deploying'}
                        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
                      >
                        {contract.status === 'deploying' ? <Loader2 className="h-4 w-4 animate-spin" /> : t("Setup.deploy")}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleFinalize}
                disabled={isLoading || contracts.some(c => c.status !== 'deployed')}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold py-3.5 rounded-lg transition-all transform disabled:opacity-50 disabled:cursor-not-allowed mt-6 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>{t("Setup.finishSetup")} <Check className="h-5 w-5" /></>}
              </button>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
