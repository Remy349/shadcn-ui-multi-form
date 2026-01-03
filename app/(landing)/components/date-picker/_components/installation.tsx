"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock, CodeBlockContent } from "@/lib/codegen/code-block";
import { formatCode } from "@/lib/codegen/formatter";
import { CheckCheckIcon, CopyIcon, PackageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const rawCode = `
// date-picker.tsx
// Put this file in your /components/ui/date-picker.tsx

"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
}

const DatePicker = ({
  value,
  onChange,
  id,
  placeholder,
  disabled,
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id={id}
          className="w-full justify-between font-normal"
          disabled={disabled}
        >
          {value ? value.toLocaleDateString() : placeholder || "Select date"}
          <CalendarIcon className="size-3.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="end">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
`;

export const Installation = () => {
  const [code, setCode] = useState("");
  const [isCopiedId, setIsCopiedId] = useState("");

  const handleCopyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopiedId(id);

    setTimeout(() => {
      setIsCopiedId("");
    }, 1500);

    toast.success("Code copied to clipboard");
  };

  useEffect(() => {
    const formatRawCode = async () => {
      const codeFormatted = await formatCode(rawCode);

      setCode(codeFormatted);
    };

    formatRawCode();
  }, []);

  const steps = [
    {
      step: 1,
      title: "Install dependencies",
      description:
        "Install the required packages for the component.",
      code: "pnpm dlx shadcn@latest add calendar popover",
    },
    {
      step: 2,
      title: "Copy the component",
      description: "Copy and paste the component code into your project.",
      code,
    },
    {
      step: 3,
      title: "Update imports",
      description: "Import and use the component in your project.",
      code: 'import { DatePicker } from "@/components/ui/date-picker";',
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="tracking-tighter text-xl font-bold text-foreground">
        Installation
      </h2>
      <Tabs defaultValue="manual">
        <TabsList className="bg-secondary">
          <TabsTrigger
            value="manual"
            className="gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            <PackageIcon className="h-4 w-4" />
            Manual
          </TabsTrigger>
        </TabsList>
        <TabsContent value="manual" className="mt-4 space-y-6">
          {steps.map((step, index) => (
            <div key={step.step} className="relative flex gap-4">
              {index < steps.length - 1 && (
                <div className="absolute left-4 top-10 h-[calc(100%-10px)] w-px bg-border" />
              )}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground">
                {step.step}
              </div>
              <div className="flex-1 space-y-3 pb-6">
                <div>
                  <h3 className="font-medium text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between bg-secondary/50 px-3 py-2">
                    <span className="text-xs text-muted-foreground">
                      {step.step === 1
                        ? "Terminal"
                        : step.step === 2
                          ? "Component"
                          : "Usage"}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() =>
                        handleCopyToClipboard(step.code, `step-${step.step}`)
                      }
                    >
                      {isCopiedId === `step-${step.step}` ? (
                        <CheckCheckIcon />
                      ) : (
                        <CopyIcon />
                      )}
                    </Button>
                  </div>
                  <CodeBlock className="min-h-full w-full">
                    <CodeBlockContent code={step.code} lang="tsx" />
                  </CodeBlock>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
