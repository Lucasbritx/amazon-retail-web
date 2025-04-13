import React from "react";

export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
} as const;
export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];

type ToastProps = React.ComponentProps<"div"> & {
  title?: string;
  description?: string;
  duration?: number;
  type?: ToastType;
  onClose?: () => void;
  isOpen?: boolean;
};

const defaultProps = {
  title: "",
  description: "",
  duration: 3000,
  type: TOAST_TYPES.INFO,
  onClose: () => {},
  isOpen: false,
};

const Toast = (props: ToastProps) => {
  const { title, description, duration, type, onClose, isOpen } = {
    ...defaultProps,
    ...props,
  };
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);
  React.useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);
  React.useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.closest(".toast") === null) {
          onClose();
        }
      };
      window.addEventListener("click", handleClickOutside);
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);
  return (
    <div
      className={`fixed top-24 right-4 p-4 rounded-md shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "translate-y-full"
      } ${
        type === TOAST_TYPES.SUCCESS
          ? "bg-green-500 text-white"
          : type === TOAST_TYPES.ERROR
          ? "bg-red-500 text-white"
          : "bg-blue-500 text-white"
      }
      ${isOpen ? "opacity-100" : "opacity-0"}
      `}
      onClick={onClose}
      onAnimationEnd={onClose}
      style={{
        animation: isOpen ? "fadeIn 0.5s" : "fadeOut 0.5s",
        animationFillMode: "forwards",
      }}
    >
      {title && <h4 className="font-bold">{title}</h4>}
      {description && <p>{description}</p>}
      {props.children}
    </div>
  );
};

export default Toast;
