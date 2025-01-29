import "./globals.css";
import { Header } from "./_components/header";
import type { Metadata } from "next";
import { nunitoSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "ShadcnUI Multi Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className} antialiased`}>
        <Header />
        <main className="mt-16">{children}</main>
      </body>
    </html>
  );
}
