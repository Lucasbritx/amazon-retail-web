import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amazon Retail",
  description: "POC for Amazon Retail",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
