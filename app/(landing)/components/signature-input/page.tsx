import type { Metadata } from "next";
import { NavigationControls } from "../_components/navigation-controls";
import { Example } from "./_components/example";
import { Installation } from "./_components/installation";
import { Preview } from "./_components/preview";
import { PropsTable } from "./_components/props-table";

export const metadata: Metadata = {
  title: "Signature Input",
};

export default function SignatureInputPage() {
  return (
    <section className="py-[4rem]">
      <div className="mx-auto px-6 max-w-3xl space-y-12">
        <div className="space-y-6">
          <NavigationControls />
          <p className="text-foreground/80 text-base">
            Signature Input captures a handwritten signature using a responsive
            canvas and stores the result as a data URL string.
          </p>
        </div>
        <Preview />
        <PropsTable />
        <Installation />
        <Example />
      </div>
    </section>
  );
}
