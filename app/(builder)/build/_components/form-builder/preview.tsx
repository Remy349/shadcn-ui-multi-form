import { getFormTemplateType } from "@/lib/builder/utils";
import type { Form } from "@/types/form-builder";
import { MultiFormPreview } from "./preview/multi-form-preview";
import { SingleFormPreview } from "./preview/single-form-preview";

interface PreviewProps {
  forms: Form[];
}

export const Preview = ({ forms }: PreviewProps) => {
  const templateType = getFormTemplateType(forms);

  if (templateType === "single") {
    const currentForm = forms[0];

    return <SingleFormPreview currentForm={currentForm} />;
  }

  return <MultiFormPreview forms={forms} />;
};
