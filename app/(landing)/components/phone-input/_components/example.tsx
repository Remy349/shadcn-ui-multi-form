"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { PhoneInput } from "@/components/ui/phone-input";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock, CodeBlockContent } from "@/lib/codegen/code-block";
import { formatCode } from "@/lib/codegen/formatter";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCheckIcon, CodeIcon, CopyIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  phone: z
    .string()
    .min(1, "Field is required")
    .refine(isValidPhoneNumber, "Invalid phone number"),
});

type FormSchema = z.infer<typeof formSchema>;

const rawCode = `
"use client"

import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { PhoneInput } from "@/components/ui/phone-input"
import { Spinner } from "@/components/ui/spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import { isValidPhoneNumber } from "react-phone-number-input"

const formSchema = z.object({
  phone: z
    .string()
    .min(1, "Field is required")
    .refine(isValidPhoneNumber, "Invalid phone number"),
})

type FormSchema = z.infer<typeof formSchema>

export const FormExample = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: "" },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Form successfully submitted");

    form.reset();
  };

  return (
    <form
      id="form-example"
      className="grid space-y-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
              <PhoneInput
                {...field}
                id="phone"
                placeholder="Enter a phone number"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        form="form-example"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <>
            <Spinner />
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  )
}
`;

export const Example = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: "" },
  });

  const [code, setCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    toast.success("Code copied to clipboard");
  };

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Form successfully submitted");

    form.reset();
  };

  useEffect(() => {
    const formatRawCode = async () => {
      const codeFormatted = await formatCode(rawCode);

      setCode(codeFormatted);
    };

    formatRawCode();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="tracking-tighter text-xl font-bold text-foreground">
        Preview
      </h2>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Tabs defaultValue="preview">
          <div className="flex items-center justify-between border-b border-border bg-secondary/50 p-2">
            <TabsList className="h-12 bg-transparent">
              <TabsTrigger
                value="preview"
                className={cn(
                  "gap-2 data-[state=active]:bg-foreground/5 data-[state=active]:text-foreground/70",
                  "data-[state=active]:shadow-none",
                )}
              >
                <EyeIcon className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className={cn(
                  "gap-2 data-[state=active]:bg-foreground/5 data-[state=active]:text-foreground/70",
                  "data-[state=active]:shadow-none",
                )}
              >
                <CodeIcon className="h-4 w-4" />
                Code
              </TabsTrigger>
            </TabsList>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCopyToClipboard}
              className="text-muted-foreground hover:text-foreground"
            >
              {isCopied ? <CheckCheckIcon /> : <CopyIcon />}
            </Button>
          </div>
          <TabsContent value="preview" className="m-0">
            <div className="flex min-h-[400px] items-center justify-center p-8">
              <div className="w-full max-w-sm">
                <form
                  id="form-example"
                  className="grid space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FieldGroup>
                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                          <PhoneInput
                            {...field}
                            id="phone"
                            placeholder="Enter a phone number"
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                  <Button
                    type="submit"
                    form="form-example"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Spinner />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="code" className="m-0">
            <div className="relative">
              <CodeBlock className="min-h-full w-full">
                <CodeBlockContent code={code} lang="tsx" />
              </CodeBlock>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
