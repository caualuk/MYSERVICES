import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import LoadingSpinner from "./components/Loading/LoadingSpinner";

export const metadata: Metadata = {
  title: "MyServices",
  description: "Procure serviços próximos a você!",
  icons: {
    icon: [
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}