import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Preview } from "./_components/preview";
import { Installation } from "./_components/installation";
import { Example } from "./_components/example";

export const metadata: Metadata = {
  title: "Rich Text Editor",
};

export default function RichTextEditor() {
  return (
    <section className="py-[4rem]">
      <div className="mx-auto px-6 max-w-3xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Button size="icon-sm" variant="ghost" asChild>
              <Link href="/components">
                <ArrowLeftIcon />
              </Link>
            </Button>
            <h1 className="text-3xl tracking-tighter text-balance font-bold">
              Rich Text Editor
            </h1>
          </div>
          <p className="text-foreground/80 text-base">
            The Rich Text Editor is a fully customizable and lightweight WYSIWYG
            editor built on top of Tiptap. It provides a smooth and intuitive
            editing experience, making it easy to format text with bold,
            italics, headings, lists, links, and more.
          </p>
        </div>
        <Preview />
        <Installation />
        <Example />
      </div>
    </section>
  );
}
