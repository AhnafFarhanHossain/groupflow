"use client";

import { Rethink_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const rethinkSans = Rethink_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={rethinkSans.className}>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
