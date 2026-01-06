"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock, CodeBlockContent } from "@/lib/codegen/code-block";
import { formatCode } from "@/lib/codegen/formatter";
import { CheckCheckIcon, CopyIcon, PackageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const rawCode = `
// phone-input.tsx
// Put this file in your /components/ui/phone-input.tsx

import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={cn("flex", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          smartCaret={false}
          value={value || undefined}
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
          {...props}
        />
      );
    },
  );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input
    className={cn("rounded-e-lg rounded-s-none", className)}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        open && setSearchValue("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 focus:z-10"
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50",
              disabled ? "hidden" : "opacity-100",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    "[data-radix-scroll-area-viewport]",
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null,
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{\`+\${RPNInput.getCountryCallingCode(country)}\`}</span>
      <CheckIcon
        className={\`ml-auto size-4 \${country === selectedCountry ? "opacity-100" : "opacity-0"}\`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
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
      description: "Install the required packages for the component.",
      code: "pnpm dlx shadcn@latest add input button command popover scroll-area \npnpm add react-phone-number-input",
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
      code: 'import { PhoneInput } from "@/components/ui/phone-input";',
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
