import { useState, useEffect } from "react";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Code } from "./code";

export const CodePreview = () => {
  const { forms } = useFormBuilderStore();
  const [code, setCode] = useState("");

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
                index <= step ? 'bg-primary' : 'bg-primary/30'
              } \${
                index < step ? 'bg-primary' : ''
              } transition-all duration-300 ease-in-out\`}
            />
            {index < totalSteps - 1 && (
              <div className={\`w-8 h-0.5 \${index < step ? 'bg-primary' : 'bg-primary/30'}\`} />
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

  return <Code code={code} />;
};
