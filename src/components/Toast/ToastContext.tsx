import React, { createContext, useContext, useState } from "react";
import Toast from "@/components/Toast/Toast";
import { useToast } from "./useToast";

const ToastContext = createContext<ReturnType<typeof useToast> | undefined>(
  undefined
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Toast {...toast.toastProps} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToastContext must be used within a ToastProvider");
  return context;
};
