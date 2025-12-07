import { getFormTemplateType } from "@/lib/utils";
import { Form } from "@/types/form-builder";
import { SingleFormPreview } from "./preview/single-form-preview";
import { MultiFormPreview } from "./preview/multi-form-preview";

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
