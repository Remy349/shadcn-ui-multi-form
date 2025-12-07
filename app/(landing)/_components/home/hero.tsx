import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatedGridPattern } from "./animated-grid-pattern";
import { cn } from "@/lib/utils";
import { SparklesIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaGithub } from "react-icons/fa";

export const Hero = () => {
  return (
    <section className="relative flex py-[4rem] items-center justify-center px-6 overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 h-full skew-y-12",
        )}
      />
      <div className="relative z-10 text-center max-w-3xl">
        <Badge variant="secondary" className="border-border px-2 py-1">
          New form builder design
          <SparklesIcon />
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-bold tracking-tighter">
          The Fastest Way to Build Multi Step Forms
        </h1>
        <p className="mt-6 text-base text-foreground/80">
          Design multi step and single forms with an intuitive experience and
          stylish components, obtaining clean React + TypeScript code, typed
          with Zod and structured with Shadcn UI; an open-source, free tool
          designed to scale your projects effortlessly.
        </p>
        <div className="mt-12 flex items-center justify-center gap-2">
          <Button size="sm" asChild>
            <Link
              href="https://github.com/Remy349/shadcn-ui-multi-form"
              target="_blank"
            >
              <FaGithub /> Star on GitHub
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/build">
              <SparklesIcon /> Build a Form
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
