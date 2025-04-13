import { ToastType } from "./ToastType";

export type ToastProps = React.ComponentProps<"div"> & {
  title?: string;
  description?: string;
  duration?: number;
  type?: ToastType;
  onClose?: () => void;
  isOpen?: boolean;
};