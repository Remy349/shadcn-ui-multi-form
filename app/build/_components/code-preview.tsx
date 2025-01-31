import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { useFormBuilderStore } from "@/stores/form-builder-store";

export const CodePreview = () => {
  const { forms } = useFormBuilderStore();
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState("");

  const preRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const generateCode = () => {
      const formCode = forms
        .map((form, formIndex) => {
          const inputsCode = form.inputs
            .map(
              (input) => `<FormField
                key="${input.id}"
                control={control}
                name="${input.id}"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>${input.label}</FormLabel>
                    <FormControl>
                      <Input
                        type="${input.type}"
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />`,
            )
            .join("\n                ");

          return `{step === ${formIndex} && (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
                ${inputsCode}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    className="font-medium"
                    size="sm"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    Back
                  </Button>
                  <Button type="submit" size="sm" className="font-medium">
                    {step === ${forms.length - 1} ? 'Submit' : 'Next'}
                  </Button>
                </div>
              </form>
            </Form>
          )}`;
        })
        .join("\n            ");

      return `import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const GeneratedForm = () => {
  const [step, setStep] = useState(0)
  const totalSteps = ${forms.length}

  const form = useForm()

  const { handleSubmit, control, reset } = form

  const onSubmit = async (formData: unknown) => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
      reset()
    } else {
      console.log(formData)
      setStep(0)
      reset()
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={\`w-4 h-4 rounded-full \${
                index === step ? 'bg-primary' : 'bg-gray-300'
              } \${
                index < step ? 'bg-primary' : ''
              } transition-all duration-300 ease-in-out\`}
            />
            {index < totalSteps - 1 && (
              <div className={\`w-8 h-0.5 \${index < step ? 'bg-primary' : 'bg-gray-300'}\`} />
            )}
          </div>
        ))}
      </div>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Multi form</CardTitle>
          <CardDescription>Current step {step + 1}</CardDescription>
        </CardHeader>
        <CardContent>
          ${formCode}
        </CardContent>
      </Card>
    </div>
  )
}`;
    };

    setCode(generateCode());
  }, [forms]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end mb-2">
        <Button onClick={copyToClipboard}>
          {copied ? "Copied!" : "Copy Code"}
        </Button>
      </div>
      <div className="relative flex-grow overflow-auto">
        <Highlight theme={themes.nightOwl} code={code} language="tsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              ref={preRef}
              className={`${className} p-4 rounded-md`}
              style={{ ...style, backgroundColor: "#2d2d2d" }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  <span className="inline-block w-8 text-right mr-4 text-gray-500 select-none">
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};
