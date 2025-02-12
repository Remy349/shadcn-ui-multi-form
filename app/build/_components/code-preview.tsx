import { useState, useEffect } from "react";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Code } from "./code";
import { formatJSXCode } from "@/lib/utils";
import { generateFormCode } from "./generate-form-code";

export const CodePreview = () => {
  const { forms } = useFormBuilderStore();
  const [code, setCode] = useState("");

  useEffect(() => {
    const generateCode = () => {
      const inputsType = forms.flatMap((form) =>
        form.inputs.map((input) => input.type),
      );

      return generateFormCode(inputsType);
    };

    setCode(generateCode());
  }, [forms]);

  const formattedCode = formatJSXCode(code);

  return <Code code={formattedCode} />;
};
