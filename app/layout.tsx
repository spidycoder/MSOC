import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import SessionProvder from "@/lib/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mathematica",
  description: "A Mathematics oriented website for Maths Lovers",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <SessionProvder session={session}>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </SessionProvder>
    </html>
  );
}
