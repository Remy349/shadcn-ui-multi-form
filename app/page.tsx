import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <section className="pt-[4rem] pb-[2.5rem]">
      <div className="px-6 mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <h1 className="text-center font-bold text-2xl mb-2 md:text-3xl md:mx-auto md:max-w-2xl lg:text-4xl">
          Shadcn UI Multi Form – Build Stunning Multi-Step Forms with Ease
        </h1>
        <p className="text-center text-muted-foreground text-sm md:mx-auto md:max-w-lg">
          Create elegant multi-step forms effortlessly with Shadcn UI, React
          Hook Form, and Zod. Fast, dynamic, and user-friendly—start building
          today!
        </p>
        <div className="mt-12 flex justify-center">
          <Button className="font-medium" asChild>
            <Link href="">Get started now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
