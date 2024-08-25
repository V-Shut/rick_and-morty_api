import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wubba-lubba-dub-dub!",
  description: "Sorry Jerry, you're real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html lang="en">
        <body className={`${inter.className} flex w-[100%]`}>
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </html>

  );
}
