import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "File Input",
};

export default function FileInput() {
  return (
    <section className="py-[4rem]">
      <div className="mx-auto px-6 max-w-3xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button size="icon-sm" variant="outline" asChild>
              <Link href="/components">
                <ArrowLeftIcon />
              </Link>
            </Button>
            <h1 className="text-3xl tracking-tighter text-balance font-bold">
              File Input
            </h1>
          </div>
          <p className="text-foreground/80 text-base">
            It supports drag-and-drop functionality, displays a preview of
            selected files, and ensures a smooth experience with clear feedback.
            Designed for seamless integration into multi-step forms.
          </p>
        </div>
      </div>
    </section>
  );
}
