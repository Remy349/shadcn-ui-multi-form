import "./globals.css";
import { Header } from "./_components/header/header";
import type { Metadata } from "next";
import { nunitoSans } from "@/lib/fonts";
import { Footer } from "./_components/footer";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/providers/theme-provider";

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
          <div>
            <Header />
            <main className="mt-16 min-h-[calc(100vh-4rem)]">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
