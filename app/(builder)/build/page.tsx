import type { Metadata } from "next";
import { FormBuilder } from "./_components/form-builder";

export const metadata: Metadata = {
  title: "Build",
};

export default function Page() {
  return <FormBuilder />;
}
