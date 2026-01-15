"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useTranslation } from "@/i18n/i18n_context";

interface IConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "success" | "error" | "info";
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  type = "info",
}: IConfirmModalProps) {
  const { t } = useTranslation();
  const defaultConfirm = confirmText || t("Setup.confirm");
  const defaultCancel = cancelText || t("Setup.cancel");
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl"
            >
              <div className="relative p-6">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                  <div className={`mb-4 rounded-full p-3 ${type === 'error' ? 'bg-red-500/10 text-red-500' :
                    type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                      'bg-amber-500/10 text-amber-500'
                    }`}>
                    <AlertCircle className="h-8 w-8" />
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-white">
                    {title}
                  </h3>

                  <p className="mb-6 text-sm text-zinc-400">
                    {message}
                  </p>

                  <div className="flex w-full gap-3">
                    {onConfirm && (
                      <Button
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                      >
                        {defaultCancel}
                      </Button>
                    )}
                    <Button
                      variant="gold"
                      onClick={() => {
                        if (onConfirm) onConfirm();
                        onClose();
                      }}
                      className="flex-1"
                    >
                      {defaultConfirm}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
