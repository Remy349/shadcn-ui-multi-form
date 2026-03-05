import { getFieldCodegen } from "@/lib/builder/field-codegen";
import type { FieldElement } from "@/types/form-builder";

export const generateZodSchemaCode = (elements: FieldElement[]) => {
  const schemaEntries = elements
    .map((element) => {
      const { schema } = getFieldCodegen(element.type);

      return `${element.name}: ${schema(element)}`;
    })
    .join(",\n");

  return `
const formSchema = z.object({\n${schemaEntries}\n})

type FormSchema = z.infer<typeof formSchema>
`;
};
