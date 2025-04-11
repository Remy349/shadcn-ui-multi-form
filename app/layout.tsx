import "@/app/globals.css";
import type { Metadata } from "next";
import { nunitoSans } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "ShadcnUI Multi Form",
    template: "%s | ShadcnUI Multi Form",
  },
  keywords: ["shadcn", "react", "multi form", "build"],
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
        </ThemeProvider>
        <Analytics />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
