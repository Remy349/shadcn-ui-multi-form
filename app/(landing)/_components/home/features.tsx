import {
  BlocksIcon,
  MonitorSmartphoneIcon,
  MousePointerClickIcon,
  ScanIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react";

export const Features = () => {
  return (
    <section className="py-[4rem]">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl text-center">
          <h2 className="text-balance tracking-tighter text-3xl font-bold lg:text-4xl">
            A Smarter Way to Build Multi-Step Forms
          </h2>
        </div>
        <div className="relative mx-auto grid max-w-5xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MousePointerClickIcon className="size-4" />
              <h3 className="text-sm font-semibold">Easy to Use</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Designed for developers who want a smooth, simple, and
              friction-free workflow.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SparklesIcon className="size-4" />
              <h3 className="text-sm font-semibold">Dynamic Code Generation</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Automatically generates clean, ready-to-use code as you build each
              step.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="size-4" />
              <h3 className="text-sm font-semibold">Form Validation</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Robust, type-safe validation integrated into every form stage.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ScanIcon className="size-4" />
              <h3 className="text-sm font-semibold">Auto Detection</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Intelligently recognizes whether your flow is a single or multi
              step form.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BlocksIcon className="size-4" />
              <h3 className="text-sm font-semibold">Modern Components</h3>
            </div>
            <p className="text-sm text-foreground/70">
              Built with the latest Shadcn UI elements for a sleek and
              consistent design.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MonitorSmartphoneIcon className="size-4" />
              <h3 className="text-sm font-semibold">
                Intuitive, Modern Interface
              </h3>
            </div>
            <p className="text-sm text-foreground/70">
              A clean UX that makes form building fast and enjoyable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
