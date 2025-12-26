import type { Metadata } from "next";
import { Preview } from "./_components/preview";
import { Installation } from "./_components/installation";
import { Example } from "./_components/example";
import { NavigationControls } from "../_components/navigation-controls";

export const metadata: Metadata = {
  title: "Password Input",
};

export default function PasswordInput() {
  return (
    <section className="py-[4rem]">
      <div className="mx-auto px-6 max-w-3xl space-y-12">
        <div className="space-y-6">
          <NavigationControls />
          <p className="text-foreground/80 text-base">
            The Password Input allows users to toggle password visibility,
            making it easier to enter and verify their passwords securely.
          </p>
        </div>
        <Preview />
        <Installation />
        <Example />
      </div>
    </section>
  );
}
