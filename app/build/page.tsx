import type { Metadata } from "next";
import { FormBuilder } from "./_components/form-builder";

export const metadata: Metadata = {
  title: "Build",
};

export default function Page() {
  return (
    <section className="pt-[4rem] pb-[2.5rem]">
      <div className="px-6 mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <FormBuilder />
      </div>
    </section>
  );
}
