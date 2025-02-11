import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EmptyState } from "./empty-state";
import { RenderFormInput } from "./render-form-input";

export const FormPreview = () => {
  const { forms } = useFormBuilderStore();
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm();

  const { handleSubmit, control, reset } = form;

  const onSubmit = async (formData: unknown) => {
    if (currentStep < forms.length - 1) {
      setCurrentStep(currentStep + 1);
      reset();
    } else {
      console.log(formData);
      setCurrentStep(0);
      reset();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-4 border rounded-md p-4">
      <div className="flex items-center justify-center">
        {forms.map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-4 h-4 rounded-full ${index <= currentStep ? "bg-primary" : "bg-primary/30"} ${
                index < currentStep ? "bg-primary" : ""
              } transition-all duration-300 ease-in-out`}
            />
            {index < forms.length - 1 && (
              <div
                className={`w-8 h-0.5 ${index < currentStep ? "bg-primary" : "bg-primary/30"}`}
              />
            )}
          </div>
        ))}
      </div>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Form preview</CardTitle>
          <CardDescription>Current step {currentStep + 1}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
              {forms[currentStep].inputs.length === 0 && <EmptyState />}
              {forms[currentStep].inputs.map((input) => (
                <FormField
                  key={input.id}
                  control={control}
                  name={input.id}
                  render={({ field }) => (
                    <RenderFormInput input={input} field={field} />
                  )}
                />
              ))}
              <div className="flex justify-between">
                <Button
                  type="button"
                  className="font-medium"
                  size="sm"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>
                <Button type="submit" size="sm" className="font-medium">
                  {currentStep === forms.length - 1 ? "Submit" : "Next"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
