import { ChevronLeft, ChevronRight, GripIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldGroup } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { useMultiStepForm } from "@/hooks/use-multi-step-form";
import { buildRenderPlan } from "@/lib/builder/render-plan";
import type { Form } from "@/types/form-builder";
import { renderPreviewElement } from "./render-element";
import { createControllerRenderer, renderPreviewNode } from "./render-node";

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
            {(() => {
              const { roots, fieldById } = buildRenderPlan(
                currentForm.elements,
              );
              const getController = createControllerRenderer(
                form.control,
                renderPreviewElement,
              );

              return (
                <FieldGroup>
                  {roots.map((element) => (
                    <div key={element.id}>
                      {renderPreviewNode(element, {
                        fieldById,
                        getController,
                      })}
                    </div>
                  ))}
                </FieldGroup>
              );
            })()}
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
