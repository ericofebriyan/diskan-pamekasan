import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dinas Perikanan Kabupaten Pamekasan",
  description: "Website Resmi Dinas Perikanan Kabupaten Pamekasan. Transparan, Akuntabel, dan Melayani.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html >
  );
}

