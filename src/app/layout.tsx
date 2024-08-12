import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import './fonts.css';
import React from "react";
import NextUiProvider from "@/app/NextUIProvider";
import MainNavbar from "@/components/navbar";
import { UserProvider } from '@/context/UserProvider';
import { ToasterProvider } from '@/context/ToasterContext';
import { QueryProvider } from './QueryClientProvider'
import { FriendsProvider } from "@/context/FriendsContext";
import { SocketProvider } from "./SocketProvider";
import { ChatProvider } from "@/context/ChatContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Media Chat",
  description: "A chat application for media sharing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body className={`${inter.className} relative`  } >
        <NextUiProvider >   {/* NextUiProvider is a custom provider that wraps the NextUI components*/ }
            <ToasterProvider> {/* ToasterProvider is a custom provider, use to display toast messages */}
                <QueryProvider> {/* QueryProvider is a custom provider, use to fetch data from the server */}
                    <UserProvider>  {/* UserProvider is a custom provider, use to manage user data */}
                      <SocketProvider>  {/* SocketProvider is a custom provider, use to manage socket connections */}
                        <FriendsProvider> {/* FriendsProvider is a custom provider, use to manage friends data */}
                          <ChatProvider>  {/* ChatProvider is a custom provider, use to manage chat data */}
                            <MainNavbar/> {/* MainNavbar is a custom component */}
                            {children}
                          </ChatProvider>
                        </FriendsProvider>
                      </SocketProvider>
                    </UserProvider>
                </QueryProvider>
            </ToasterProvider>
        </NextUiProvider>
      </body>
    </html>
  );
}
