"use client";
import Header from "@/components/Header";
import { ToastProvider } from "@/components/Toast/ToastContext";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
