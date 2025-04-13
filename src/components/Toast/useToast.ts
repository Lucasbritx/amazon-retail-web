import { useState } from "react";
import { ToastProps } from "./ToastProps";
import { TOAST_TYPES } from "@/constants/TOAST_TYPES";

const useToast = () => {
  const [toastProps, setToastProps] = useState<ToastProps>({
    title: "",
    description: "",
    duration: 3000,
    type: TOAST_TYPES.INFO,
    onClose: () => {},
    isOpen: false,
  });

  const showToast = (props: Partial<ToastProps>) => {
    setToastProps((prev) => ({
      ...prev,
      ...props,
      isOpen: true,
    }));
  };

  const clearToast = () => {
    setToastProps({ ...toastProps, isOpen: false });
  };

  return { toastProps, setToastProps, clearToast, showToast };
};
export { useToast };
