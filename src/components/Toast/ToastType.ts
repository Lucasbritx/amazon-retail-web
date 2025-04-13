import { TOAST_TYPES } from "@/constants/TOAST_TYPES";

export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];
