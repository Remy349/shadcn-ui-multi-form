import { Form } from "@/types/form-builder";
import { generateImports } from "./generate-imports";
import { getFormTemplateType } from "../utils";
import { generateSingleFormTemplate } from "./generate-single-form-template";
import { generateMultiFormTemplate } from "./generate-multi-form-template";
import { formatCode } from "./formatter";

export const generateFormCode = async (forms: Form[]) => {
  let templateFormCode = "";
  let filename = "";

  const allElements = forms.flatMap((form) => form.elements);
  const templateType = getFormTemplateType(forms);

  if (templateType === "single") {
    templateFormCode = generateSingleFormTemplate(forms[0]);
    filename = "single-form.tsx";
  } else {
    templateFormCode = generateMultiFormTemplate(forms);
    filename = "multi-form.tsx";
  }

  const imports = generateImports(allElements);
  const importsCode = Array.from(imports).join("\n");

  const rawCode = `${importsCode}
    ${templateFormCode}
  `;

  const code = await formatCode(rawCode);

  return { filename, code };
};
