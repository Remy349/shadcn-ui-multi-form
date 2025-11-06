import {
  Card,
  CardContent,
  CardDescription,
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
import { getFormTemplateType } from "@/lib/utils";
import { Form } from "@/types/form-builder";
import { GripIcon } from "lucide-react";
import { SingleFormPreview } from "./preview/single-form-preview";

interface PreviewProps {
  forms: Form[];
}

export const Preview = ({ forms }: PreviewProps) => {
  const templateType = getFormTemplateType(forms);

  if (templateType === "single") {
    const currentForm = forms[0];

    return (
      <Card>
        <CardHeader>
          <CardTitle>{currentForm.title}</CardTitle>
          {currentForm.description && (
            <CardDescription>{currentForm.description}</CardDescription>
          )}
        </CardHeader>
        {currentForm.elements.length === 0 ? (
          <CardContent>
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
          </CardContent>
        ) : (
          <SingleFormPreview currentForm={currentForm} />
        )}
      </Card>
    );
  }

  return (
    <div>
      <h2>Form Preview - Multi</h2>
    </div>
  );
};
