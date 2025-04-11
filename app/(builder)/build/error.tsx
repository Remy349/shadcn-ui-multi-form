"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="pt-[4rem] pb-[2.5rem]">
      <div className="px-6 mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <h1 className="text-2xl font-bold text-center mb-2 md:text-3xl">
          Oops! Something Went Wrong
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          Refresh the page or try again!
        </p>
        <div className="flex justify-center mt-12">
          <Button onClick={() => reset()} className="font-medium" size="sm">
            Try again
          </Button>
        </div>
      </div>
    </section>
  );
}
