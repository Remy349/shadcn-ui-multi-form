import "./globals.css";
import type { Metadata } from "next";
import { nunitoSans } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Shadcn UI Multi Form",
    template: "%s | Shadcn UI Multi Form",
  },
  description:
    "Build modern multi step and single forms effortlessly with Shadcn UI Multi Form.",
  keywords: [
    "shadcn",
    "react",
    "multi form",
    "build",
    "shadcn ui form builder",
    "multi step form builder",
    "dynamic form builder",
  ],
  authors: [{ name: "Santiago Moraga - Remy349" }],
  creator: "Santiago Moraga - Remy349",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunitoSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
        <Analytics mode="production" />
      </body>
    </html>
  );
}
