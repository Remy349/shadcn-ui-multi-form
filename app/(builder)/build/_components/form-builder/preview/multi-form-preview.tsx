import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Form, FormElement, FormElementType } from "@/types/form-builder";
import { useEffect, useState } from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ChevronLeft, ChevronRight, GripIcon } from "lucide-react";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { generateZodSchema } from "@/lib/schema-generator";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInputElement } from "./form-elements/text-input-element";
import { EmailInputElement } from "./form-elements/email-input-element";
import { PasswordInputElement } from "./form-elements/password-input-element";
import { TextareaInputElement } from "./form-elements/textarea-input-element";
import { SwitchInputElement } from "./form-elements/switch-input-element";
import { CheckboxInputElement } from "./form-elements/checkbox-input-element";
import { SelectInputElement } from "./form-elements/select-input-element";
import { Spinner } from "@/components/ui/spinner";

interface MultiFormPreviewProps {
  forms: Form[];
}

export const MultiFormPreview = ({ forms }: MultiFormPreviewProps) => {
  const schemas = forms.map((form) => {
    const { schema, defaultValues } = generateZodSchema(form.elements);

    return { schema, defaultValues };
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const currentForm = forms[currentStep];
  const currentSchema = schemas[currentStep];

  const isLastStep = currentStep === forms.length - 1;
  const progress = ((currentStep + 1) / forms.length) * 100;

  const form = useForm({
    resolver: zodResolver(currentSchema.schema),
    defaultValues: { ...currentSchema.defaultValues, ...formData },
    mode: "onChange",
  });

  useEffect(() => {
    const stepDefaults = { ...currentSchema.defaultValues, ...formData };

    form.reset(stepDefaults);
  }, [currentStep]);

  const handleNextButton = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      const currentValues = form.getValues();

      setFormData((prev) => ({ ...prev, ...currentValues }));

      if (!isLastStep) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBackButton = () => {
    const currentValues = form.getValues();

    setFormData((prev) => ({ ...prev, ...currentValues }));

    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (values: any) => {
    const finalData = { ...formData, ...values };

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Form successfully submitted");

    console.log(finalData);
  };

  const renderFormElement = (
    element: FormElement,
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState,
  ) => {
    const elementComponent: Record<FormElementType, React.ReactElement> = {
      text: (
        <TextInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      email: (
        <EmailInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      password: (
        <PasswordInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      textarea: (
        <TextareaInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      switch: (
        <SwitchInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      checkbox: (
        <CheckboxInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      select: (
        <SelectInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
    };

    return elementComponent[element.type];
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle>{currentForm.title}</CardTitle>
            <p className="text-muted-foreground text-xs">
              Step {currentStep + 1} of {forms.length}
            </p>
          </div>
          <CardDescription>{currentForm.description}</CardDescription>
        </div>
        <Progress value={progress} />
      </CardHeader>
      <CardContent>
        {currentForm.elements.length === 0 ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <GripIcon />
              </EmptyMedia>
              <EmptyTitle>No form elements found</EmptyTitle>
              <EmptyDescription>
                Add fields to your form to see how it will look. Your preview
                will appear here as you build.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <form id="form-preview" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {currentForm.elements.map((element) => (
                <Controller
                  key={element.id}
                  name={element.name}
                  control={form.control}
                  render={({ field, fieldState }) =>
                    renderFormElement(element, field, fieldState)
                  }
                />
              ))}
            </FieldGroup>
          </form>
        )}
      </CardContent>
      <CardFooter>
        <Field className="justify-between" orientation="horizontal">
          {currentStep > 0 && (
            <Button type="button" variant="ghost" onClick={handleBackButton}>
              <ChevronLeft /> Back
            </Button>
          )}
          {!isLastStep && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleNextButton}
            >
              Next
              <ChevronRight />
            </Button>
          )}
          {isLastStep && (
            <Button
              type="submit"
              form="form-preview"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Spinner /> : "Submit"}
            </Button>
          )}
        </Field>
      </CardFooter>
    </Card>
  );
};
