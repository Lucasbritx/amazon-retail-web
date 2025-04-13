import { useState } from "react";
import { TOAST_TYPES } from "./Toast";
import { ToastProps } from "./ToastProps";

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
