import { FormElement } from "@/types/form-builder";
import { generateZodSchema } from "../schema-generator";

const generateFieldZodSchemaCode = (element: FormElement) => {
  switch (element.type) {
    case "text":
    case "textarea":
    case "email":
    case "rich-text-editor":
    case "password": {
      let fieldSchema = "z.string()";

      if (element.required) {
        fieldSchema += `.min(1, "${element.label} is required")`;
      }

      if (element.type === "email") {
        fieldSchema += `.email("Invalid email address")`;
      }

      if (element.minLength && element.minLength > 0) {
        fieldSchema += `.min(${element.minLength}, "${element.label} must be at least ${element.minLength} characters")`;
      }

      if (element.maxLength && element.maxLength > 0) {
        fieldSchema += `.max(${element.maxLength}, "${element.label} must be at most ${element.maxLength} characters")`;
      }

      return fieldSchema;
    }

    case "select": {
      let fieldSchema = "z.string()";

      const values =
        element.options?.selectItems.map((item) => item.value) || [];

      if (element.required) {
        fieldSchema += `.min(1, "${element.label} is required")`;
      }

      if (values.length > 0) {
        const valuesArray = JSON.stringify(values);
        fieldSchema += `.refine((val) => ${valuesArray}.includes(val), "${element.label} must be a valid option")`;
      }

      return fieldSchema;
    }

    case "checkbox": {
      let fieldSchema = "z.boolean()";

      if (element.required) {
        fieldSchema += `.refine((val) => val === true, "${element.label} must be checked")`;
      }

      return fieldSchema;
    }

    case "switch": {
      let fieldSchema = "z.boolean()";

      if (element.required) {
        fieldSchema += `.refine((val) => val === true, "${element.label} must be accepted")`;
      }

      return fieldSchema;
    }

    case "file": {
      let fieldSchema = "z.array(z.instanceof(File))";

      if (element.required) {
        fieldSchema += `.refine((files) => files.length > 0, "${element.label} is required")`;
      }

      return fieldSchema;
    }

    case "date-picker": {
      let fieldSchema = `z.preprocess(
        (val) => (val === "" || val === null ? undefined : val),
        z.date({
          error: (issue) =>
            issue.input === undefined
              ? "${element.label} is required"
              : "Invalid date",
        }),
      )`;

      if (element.required) {
        fieldSchema += `.refine(
          (val) => val instanceof Date && !isNaN(val.getTime()),
          "${element.label} is required"
        )`;
      } else {
        fieldSchema += `.optional()`;
      }

      return fieldSchema;
    }
  }
};

export const generateZodSchemaCode = (elements: FormElement[]) => {
  const { schema } = generateZodSchema(elements);
  const schemaEntries = Object.entries(schema.shape)
    .map(([key, _value]) => {
      const element = elements.find((el) => el.name === key) as FormElement;

      return `${key}: ${generateFieldZodSchemaCode(element)}`;
    })
    .join(",\n");

  return `
const formSchema = z.object({\n${schemaEntries}\n})

type FormSchema = z.infer<typeof formSchema>
`;
};
