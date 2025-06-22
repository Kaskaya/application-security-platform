"use client";

import { Toaster as Sonner } from "sonner";

const Toaster = () => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        style: {
          background: "#1E1F28",
          color: "#E5E7EB",
          border: "1px solid #374151",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        },
        classNames: {
          toast: "bg-[#1E1F28] border border-neutral-700 text-slate-50",
          title: "text-slate-50 font-semibold",
          description: "text-slate-300",
          actionButton: "bg-blue-600 hover:bg-blue-700 text-white",
          cancelButton: "bg-neutral-700 hover:bg-neutral-600 text-slate-50",
          closeButton: "text-gray-400 hover:text-gray-200 transition-colors",
          success: "bg-green-900/20 border-green-500/50 text-green-300",
          error: "bg-red-900/20 border-red-500/50 text-red-300",
          warning: "bg-yellow-900/20 border-yellow-500/50 text-yellow-300",
          info: "bg-blue-900/20 border-blue-500/50 text-blue-300",
          loading: "bg-neutral-900/20 border-neutral-500/50 text-neutral-300",
        },
      }}
      position="top-right"
      closeButton
      duration={4000}
    />
  );
};

export { Toaster };
