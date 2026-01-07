import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";
import {
  BugIcon,
  CalendarIcon,
  type LucideIcon,
  RocketIcon,
  ZapIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog",
};

type ChangeType = "fixed" | "new" | "improved";

interface Change {
  id: number;
  text: string;
  type: ChangeType;
}

interface Release {
  id: number;
  title: string;
  period: string;
  description: string;
  changes: Change[];
}

const changeTypeConfig: Record<
  ChangeType,
  { icon: LucideIcon; label: string; className: string }
> = {
  fixed: {
    icon: BugIcon,
    label: "Fixed",
    className: "bg-red-500/20 text-red-500",
  },
  new: {
    icon: RocketIcon,
    label: "New",
    className: "bg-emerald-500/20 text-emerald-500",
  },
  improved: {
    icon: ZapIcon,
    label: "Improved",
    className: "bg-blue-500/20 text-blue-500",
  },
};

const releases: Release[] = [
  {
    id: 5,
    title:
      "Expanding the Input Ecosystem – New Components & Improved Discovery v1.3.1",
    period: "January 6, 2026",
    description:
      "This update expands the form builder with powerful new input components and improves component discovery through a redesigned Components page. It focuses on flexibility, accessibility, and faster form composition.",
    changes: [
      {
        id: 1,
        type: "new",
        text: "New Date Picker input for selecting dates with a modern calendar UI.",
      },
      {
        id: 2,
        type: "new",
        text: "New Slider input for numeric ranges and controlled value selection.",
      },
      {
        id: 3,
        type: "new",
        text: "New OTP Input for one-time passwords and verification flows.",
      },
      {
        id: 4,
        type: "new",
        text: "New Phone Input powered by react-phone-number-input with country support and formatting.",
      },
      {
        id: 5,
        type: "improved",
        text: "All new inputs are fully integrated into the Form Builder and code generator.",
      },
      {
        id: 6,
        type: "improved",
        text: "Redesigned Components page with individual component previews and searchable discovery.",
      },
      {
        id: 7,
        type: "improved",
        text: "Improved component documentation clarity for faster adoption.",
      },
    ],
  },
  {
    id: 4,
    title: "Shadcn UI Multi Form – The Biggest Upgrade Since Launch v1.3.0",
    period: "December 6, 2025",
    description:
      "This update marks the largest improvement to Shadcn UI Multi Form since its creation, introducing a redesigned builder, real-time code generation, advanced Zod validation, and a more intuitive workflow for creating single and multi-step forms.",
    changes: [
      {
        id: 1,
        text: "Brand-new Multi-Step Form Builder with a cleaner, modular architecture.",
        type: "new",
      },
      {
        id: 2,
        text: "Real-time TypeScript + React code generation as forms are built.",
        type: "new",
      },
      {
        id: 3,
        type: "new",
        text: "New changelog page to keep users informed of updates and improvements.",
      },
      {
        id: 4,
        text: "Auto-detection engine for identifying single vs multi-step forms.",
        type: "new",
      },
      {
        id: 5,
        text: "Full integration with modern Shadcn UI components.",
        type: "new",
      },
      {
        id: 6,
        text: "New Zod schema generator with strongly typed output.",
        type: "new",
      },
      {
        id: 7,
        text: "Redesigned interface with a cleaner, more modern layout.",
        type: "new",
      },
      {
        id: 8,
        text: "Export-ready project structure for direct React + TS integration.",
        type: "new",
      },
      {
        id: 10,
        text: "New helper utilities for validation, default values, and field control.",
        type: "new",
      },

      {
        id: 11,
        text: "Performance enhancements across the entire builder workflow.",
        type: "improved",
      },
      {
        id: 12,
        text: "More stable internal architecture for better maintainability.",
        type: "improved",
      },
      {
        id: 13,
        text: "Smarter state management reducing re-renders and sync issues.",
        type: "improved",
      },
      {
        id: 14,
        text: "More accurate type inference for field-to-Zod schema mapping.",
        type: "improved",
      },
      {
        id: 17,
        text: "Cleaner, more consistent code generation output.",
        type: "improved",
      },
      {
        id: 18,
        text: "Better styling tokens and dark/light mode support.",
        type: "improved",
      },

      {
        id: 19,
        text: "Fixed state-loss issues when switching between steps.",
        type: "fixed",
      },
      {
        id: 20,
        text: "Corrected inconsistencies between single and multi-step exports.",
        type: "fixed",
      },
    ],
  },
  {
    id: 3,
    title:
      "Enhanced Form Builder Experience - New Input Types Arrive in v1.2.0",
    period: "April 10, 2025",
    description:
      "We`re excited to announce the release of Shadcn UI Multi Form v1.2.0! This update brings a host of new features and improvements designed to enhance your form-building experience. With the addition of new input types.",
    changes: [
      {
        id: 1,
        type: "new",
        text: "Added support for new input types: rich text editor, file input, switch and checkbox.",
      },
      {
        id: 2,
        type: "improved",
        text: "Better design and usability enhancements for the form builder interface.",
      },
    ],
  },
  {
    id: 2,
    title: "A Smoother Form Building Workflow - UX Enhancements in v1.1.0",
    period: "February 13, 2025",
    description:
      "The latest update for Shadcn UI Multi Form is here! We`ve enhanced the user experience and introduced new features to make form building even more intuitive and efficient. Now, creating multi-step forms with Shadcn UI and React Hook Form is smoother than ever.",
    changes: [
      {
        id: 1,
        type: "improved",
        text: "Improved user experience and cleaner, more minimalistic UI.",
      },
      {
        id: 2,
        type: "improved",
        text: "Copy code feature now displays a check icon to confirm when code is copied.",
      },
      {
        id: 3,
        type: "new",
        text: "Added support for toast notifications.",
      },
      {
        id: 4,
        type: "improved",
        text: "Redesigned input field component interface.",
      },
      {
        id: 5,
        type: "new",
        text: "Empty state now displays when no inputs have been added.",
      },
      {
        id: 6,
        type: "improved",
        text: "Improved generated form code for better reusability.",
      },
      {
        id: 7,
        type: "new",
        text: "New input types added: textarea.",
      },
    ],
  },
  {
    id: 1,
    title: "Introducing Shadcn UI Multi Form - The Beginning with v1.0.0",
    period: "February 1, 2025",
    description:
      "The inaugural release of Shadcn UI Multi Form marks a significant milestone in our journey to provide developers with a robust and flexible multi-step form solution. This version introduces the core functionalities, setting the foundation for future enhancements and features.",
    changes: [
      {
        id: 1,
        type: "new",
        text: "Supports Shadcn UI components (Simple Input only).",
      },
      {
        id: 2,
        type: "new",
        text: "Built with React Hook Form for easy form handling.",
      },
      {
        id: 3,
        type: "new",
        text: "Live Form Preview to see changes instantly.",
      },
      {
        id: 4,
        type: "new",
        text: "Copy Generated Code and use it in your React projects.",
      },
      {
        id: 5,
        type: "new",
        text: "Fully Responsive Design for seamless use on all devices.",
      },
      {
        id: 6,
        type: "new",
        text: "Editable Label Names for better customization.",
      },
      {
        id: 7,
        type: "new",
        text: "Supports Three Input Types: text, email and password.",
      },
      {
        id: 8,
        type: "new",
        text: "Dark Mode Available.",
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <section className="py-[4rem]">
      <div className="mx-auto px-6 max-w-5xl space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="border-border">
            Changelog
          </Badge>
          <h1 className="mt-6 font-bold tracking-tighter text-3xl md:text-4xl lg:text-5xl text-balance">
            What’s New
          </h1>
          <p className="text-foreground/80 text-base mt-6">
            Track every update, improvement, and fix released for Shadcn UI
            Multi Form. This changelog provides a transparent, chronological
            record of new features, enhancements, and changes across all
            versions.
          </p>
        </div>
        <div className="max-w-(--breakpoint-sm) mx-auto">
          <div className="relative ml-3">
            <div className="absolute left-0 top-4 bottom-0 border-l-2" />
            {releases.map((release) => (
              <div key={release.id} className="relative pl-8 pb-12 last:pb-0">
                <div className="absolute h-2 w-2 -translate-x-1/2 left-px top-3 rounded-full border-2 border-primary bg-primary" />
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tighter">
                      {release.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm">
                      <CalendarIcon className="size-4" />
                      <span>{release.period}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/70 bg-foreground/5 rounded-md py-2 px-4 text-pretty">
                    {release.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {release.changes.map((change) => {
                      const config = changeTypeConfig[change.type];
                      const IconComponent = config.icon;

                      return (
                        <div
                          className="flex items-center space-x-2"
                          key={change.id}
                        >
                          <Badge className={config.className}>
                            <IconComponent />
                            <span>{config.label}</span>
                          </Badge>
                          <p className="text-sm text-foreground/90">
                            {change.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
