import type { Metadata } from "next";
import { Preview } from "./_components/preview";
import { Installation } from "./_components/installation";
import { Example } from "./_components/example";
import { NavigationControls } from "../_components/navigation-controls";

export const metadata: Metadata = {
  title: "Phone Input",
};

export default function PhoneInputPage() {
  return (
    <section className="py-[4rem]">
      <div className="mx-auto px-6 max-w-3xl space-y-12">
        <div className="space-y-6">
          <NavigationControls />
          <p className="text-foreground/80 text-base">
            The Phone Input component is built on top of
            react-phone-number-input to handle international phone numbers
            correctly.
          </p>
        </div>
        <Preview />
        <Installation />
        <Example />
      </div>
    </section>
  );
}
