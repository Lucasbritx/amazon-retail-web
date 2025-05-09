"use client";
import React from "react";
import { ToastProps } from "./ToastProps";
import { TOAST_TYPES } from "@/constants/TOAST_TYPES";

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
    isOpen && (
      <div
        role="toast"
        className={`fixed top-24 right-4 p-4 rounded-md shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } ${
          type === TOAST_TYPES.SUCCESS
            ? "bg-green-500 text-white"
            : type === TOAST_TYPES.ERROR
            ? "bg-red-500 text-white"
            : "bg-blue-500 text-white"
        }
      `}
        onClick={onClose}
        onAnimationEnd={onClose}
        style={{
          animationName: isOpen ? "fadeIn" : "fadeOut",
          animationDuration: "0.5s",
          animationFillMode: "forwards",
        }}
      >
        {title && <h4 className="font-bold">{title}</h4>}
        {description && <p>{description}</p>}
        {props.children}
      </div>
    )
  );
};

export default Toast;
