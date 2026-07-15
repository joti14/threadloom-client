"use client";

import { Check } from "lucide-react";
import { useToast } from "@/store/toast";

export function Toaster() {
  const toasts = useToast((s) => s.toasts);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="pointer-events-auto flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium shadow-lg animate-in fade-in slide-in-from-bottom-2"
        >
          <Check className="size-4 text-brand" />
          {toast.message}
        </div>
      ))}
    </div>
  );
}
