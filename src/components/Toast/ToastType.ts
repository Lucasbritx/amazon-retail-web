import { TOAST_TYPES } from "./Toast";

export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];
