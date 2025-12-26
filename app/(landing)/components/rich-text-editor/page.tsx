import type { Metadata } from "next";
import { Preview } from "./_components/preview";
import { Installation } from "./_components/installation";
import { Example } from "./_components/example";
import { NavigationControls } from "../_components/navigation-controls";

export const metadata: Metadata = {
  title: "Rich Text Editor",
};

export default function RichTextEditor() {
  return (
    <section className="py-[4rem]">
      <div className="mx-auto px-6 max-w-3xl space-y-12">
        <div className="space-y-6">
          <NavigationControls />
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
