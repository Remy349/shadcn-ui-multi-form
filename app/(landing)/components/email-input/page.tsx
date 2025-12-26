import type { Metadata } from "next";
import { Preview } from "./_components/preview";
import { Installation } from "./_components/installation";
import { Example } from "./_components/example";
import { NavigationControls } from "../_components/navigation-controls";

export const metadata: Metadata = {
  title: "Email Input",
};

export default function EmailInputPage() {
  return (
    <section className="py-[4rem]">
      <div className="mx-auto px-6 max-w-3xl space-y-12">
        <div className="space-y-6">
          <NavigationControls />
          <p className="text-foreground/80 text-base">
            The Email Input component provides a user friendly way to enter and
            validate email addresses, ensuring proper formatting and enhancing
            user experience.
          </p>
        </div>
        <Preview />
        <Installation />
        <Example />
      </div>
    </section>
  );
}
