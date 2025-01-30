import type { Metadata } from "next";
import { FormBuilder } from "./_components/form-builder";

export const metadata: Metadata = {
  title: "Build",
};

export default function Page() {
  return (
    <section className="pt-[4rem] pb-[2.5rem]">
      <div className="px-6 mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <h1 className="text-center font-bold text-2xl mb-2 md:text-3xl">
          Craft Your Perfect Multi-Step Form Effortlessly
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-12">
          The necessary components required from ShadcnUI are the Card, Button,
          Form, Label and Input components, you will also need to have React
          Hook Form installed.
        </p>
        <FormBuilder />
      </div>
    </section>
  );
}
