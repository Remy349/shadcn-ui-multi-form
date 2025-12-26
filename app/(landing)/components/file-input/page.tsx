import type { Metadata } from "next";
import { Preview } from "./_components/preview";
import { Installation } from "./_components/installation";
import { Example } from "./_components/example";
import { NavigationControls } from "../_components/navigation-controls";

export const metadata: Metadata = {
  title: "File Input",
};

export default function FileInput() {
  return (
    <section className="py-[4rem]">
      <div className="mx-auto px-6 max-w-3xl space-y-12">
        <div className="space-y-6">
          <NavigationControls />
          <p className="text-foreground/80 text-base">
            It supports drag-and-drop functionality, displays a preview of
            selected files, and ensures a smooth experience with clear feedback.
            Designed for seamless integration into multi-step forms.
          </p>
        </div>
        <Preview />
        <Installation />
        <Example />
      </div>
    </section>
  );
}
