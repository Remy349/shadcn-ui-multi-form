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
} from "react-hook-form";
import { toast } from "sonner";
import { TextInputElement } from "./form-elements/text-input-element";
import { EmailInputElement } from "./form-elements/email-input-element";
import { PasswordInputElement } from "./form-elements/password-input-element";
import { TextareaInputElement } from "./form-elements/textarea-input-element";
import { SwitchInputElement } from "./form-elements/switch-input-element";
import { CheckboxInputElement } from "./form-elements/checkbox-input-element";
import { SelectInputElement } from "./form-elements/select-input-element";
import { Spinner } from "@/components/ui/spinner";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import { FileInputElement } from "./form-elements/file-input-element";
import { RichTextEditorInputElement } from "./form-elements/rich-text-editor-input-element";
import { DatePickerInputElement } from "./form-elements/date-picker-input-element";

interface MultiFormPreviewProps {
  forms: Form[];
}

export const MultiFormPreview = ({ forms }: MultiFormPreviewProps) => {
  const {
    isLastStep,
    handleBackButton,
    handleNextButton,
    progress,
    form,
    currentStep,
    currentForm,
  } = useMultiStepForm(forms);

  const onSubmit = async (values: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Form successfully submitted");

    console.log(values);
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
      file: (
        <FileInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      "rich-text-editor": (
        <RichTextEditorInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      "date-picker": (
        <DatePickerInputElement
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
