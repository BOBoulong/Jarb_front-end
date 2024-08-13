"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/api";
import { ThemeProvider } from "@/components/theme-provider";
import { Menu } from "./menu";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {!["login"].includes(pathName) && <Menu />}
            <Toaster />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
