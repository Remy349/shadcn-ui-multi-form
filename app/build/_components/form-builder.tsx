"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { FormPreview } from "./form-preview";
import { FormContent } from "./form-content";
import { CodePreviewDialog } from "./code-preview/code-preview-dialog";

export const FormBuilder = () => {
  const { forms, addForm } = useFormBuilderStore();

  return (
    <div>
      <div className="mb-4">
        <CodePreviewDialog />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-y-4">
          {forms.map((form, index) => (
            <Card key={form.id} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Form step {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <FormContent formId={form.id} />
              </CardContent>
            </Card>
          ))}
          <Button size="sm" className="font-medium" onClick={addForm}>
            Add form step
          </Button>
        </div>
        <div>
          <FormPreview />
        </div>
      </div>
    </div>
  );
};
