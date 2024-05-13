import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './fonts.css';
import React from "react";
import NextUiProvider from "@/app/NextUIProvider";
import { NavProvider } from "@/context/NavContext";
import MainNavbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className} >
        <NextUiProvider >
          <NavProvider>
            <MainNavbar/>
            {children}
          </NavProvider>
        </NextUiProvider>
      </body>
    </html>
  );
}
