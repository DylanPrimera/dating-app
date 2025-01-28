import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dating App",
  description: "Dating app to match with someone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  const userId = session?.user?.id || null
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers userId={userId}>{children}</Providers>
      </body>
    </html>
  );
}
