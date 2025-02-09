"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { FormPreview } from "./form-preview";
import { FormContent } from "./form-content";
import { CodePreviewDialog } from "./code-preview/code-preview-dialog";
import { RemoveForm } from "./remove-form";
import { AddForm } from "./add-form";

export const FormBuilder = () => {
  const { forms } = useFormBuilderStore();

  return (
    <div>
      <div className="mb-4">
        <CodePreviewDialog />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="grid gap-y-4">
          {forms.map((form, index) => (
            <Card key={form.id} className="shadow-sm">
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg">Form step {index + 1}</CardTitle>
                {forms.length > 1 && <RemoveForm formId={form.id} />}
              </CardHeader>
              <CardContent>
                <FormContent formId={form.id} />
              </CardContent>
            </Card>
          ))}
          <AddForm />
        </div>
        <div>
          <FormPreview />
        </div>
      </div>
    </div>
  );
};
