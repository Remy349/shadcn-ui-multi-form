import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-[4rem] pb-[2.5rem]">
      <div className="px-6 mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <h1 className="text-center font-bold text-2xl mb-2 md:text-3xl">
          Oops! Page Not Found
        </h1>
        <p className="text-center text-muted-foreground text-sm">
          The page you’re looking for doesn’t exist. Let’s get you back where
          you belong!
        </p>
        <div className="flex justify-center mt-12">
          <Button className="font-medium" size="sm" asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
