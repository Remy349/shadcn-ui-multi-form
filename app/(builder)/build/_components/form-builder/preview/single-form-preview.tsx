import { zodResolver } from "@hookform/resolvers/zod";
import { GripIcon } from "lucide-react";
import { useForm } from "react-hook-form";
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
import { Spinner } from "@/components/ui/spinner";
import { buildRenderPlan } from "@/lib/builder/render-plan";
import { generateZodSchema } from "@/lib/schema-generator";
import type { Form } from "@/types/form-builder";
import { renderPreviewElement } from "./render-element";
import { createControllerRenderer, renderPreviewNode } from "./render-node";

interface SingleFormPreviewProps {
  currentForm: Form;
}

export const SingleFormPreview = ({ currentForm }: SingleFormPreviewProps) => {
  const { schema, defaultValues } = generateZodSchema(currentForm.elements);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (values: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Form successfully submitted");

    console.log(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{currentForm.title}</CardTitle>
        <CardDescription>{currentForm.description}</CardDescription>
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
        <Field>
          <Button
            type="submit"
            form="form-preview"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Spinner /> : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
