import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { outfit } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://shadcn-ui-multi-form.vercel.app"),
  title: {
    default: "Shadcn UI Multi Form",
    template: "%s | Shadcn UI Multi Form",
  },
  description:
    "Build single and multi-step forms with a visual shadcn/ui builder. Preview instantly and export clean React Hook Form + TypeScript + Zod code.",
  keywords: [
    "shadcn ui",
    "shadcn ui form builder",
    "react form builder",
    "multi step form builder",
    "react hook form builder",
    "react hook form generator",
    "zod schema generator",
    "typescript form generator",
    "form code generator",
    "dynamic forms",
    "form builder nextjs",
    "combobox input",
    "multi select input",
    "signature input",
    "layout form builder",
  ],
  authors: [{ name: "Santiago Moraga - Remy349" }],
  creator: "Santiago Moraga - Remy349",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Shadcn UI Multi Form",
    description:
      "Build single and multi-step forms with a visual shadcn/ui builder. Preview instantly and export clean React Hook Form + TypeScript + Zod code.",
    siteName: "Shadcn UI Multi Form",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Shadcn UI Multi Form",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadcn UI Multi Form",
    description:
      "Build single and multi-step forms with a visual shadcn/ui builder. Preview instantly and export clean React Hook Form + TypeScript + Zod code.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans antialiased", outfit.className)}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
        <Analytics mode="production" />
      </body>
    </html>
  );
}
