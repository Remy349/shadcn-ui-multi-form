import z, { type ZodType } from "zod";
import type { FormElement } from "@/types/form-builder";

export const generateZodSchema = (elements: FormElement[]) => {
  const shape: Record<string, ZodType> = {};
  const defaultValues: Record<string, unknown> = {};

  elements.forEach((element) => {
    if (!element.name) return;

    switch (element.type) {
      case "text":
      case "textarea":
      case "email":
      case "rich-text-editor":
      case "password": {
        let fieldSchema = z.string();
        const defaultValue = "";

        if (element.required) {
          fieldSchema = fieldSchema.min(1, `${element.label} is required`);
        }

        if (element.type === "email") {
          fieldSchema = fieldSchema.email("Invalid email address");
        }

        if (element.minLength && element.minLength > 0) {
          fieldSchema = fieldSchema.min(
            element.minLength,
            `${element.label} must be at least ${element.minLength} characters`,
          );
        }

        if (element.maxLength) {
          fieldSchema = fieldSchema.max(
            element.maxLength,
            `${element.label} must be at most ${element.maxLength} characters`,
          );
        }

        shape[element.name] = fieldSchema;
        defaultValues[element.name] = defaultValue;

        break;
      }

      case "select": {
        let fieldSchema = z.string();
        const defaultValue = "";

        const values =
          element.options?.selectItems.map((item) => item.value) || [];

        if (element.required) {
          fieldSchema = fieldSchema.min(1, `${element.label} is required`);
        }

        if (values.length > 0) {
          fieldSchema = fieldSchema.refine(
            (val) => values.includes(val),
            `${element.label} must be a valid option`,
          );
        }

        shape[element.name] = fieldSchema;
        defaultValues[element.name] = defaultValue;

        break;
      }

      case "checkbox": {
        let fieldSchema = z.boolean();
        const defaultValue = false;

        if (element.required) {
          fieldSchema = fieldSchema.refine((val) => val === true, {
            message: `${element.label} must be checked`,
          });
        }

        shape[element.name] = fieldSchema;
        defaultValues[element.name] = defaultValue;

        break;
      }

      case "switch": {
        let fieldSchema = z.boolean();
        const defaultValue = false;

        if (element.required) {
          fieldSchema = fieldSchema.refine((val) => val === true, {
            message: `${element.label} must be accepted`,
          });
        }

        shape[element.name] = fieldSchema;
        defaultValues[element.name] = defaultValue;

        break;
      }

      case "file": {
        let fieldSchema = z.array(z.instanceof(File));

        if (element.required) {
          fieldSchema = fieldSchema.refine(
            (files) => files.length > 0,
            `${element.label} is required`,
          );
        }

        shape[element.name] = fieldSchema;
        defaultValues[element.name] = [];

        break;
      }

      case "date-picker": {
        let fieldSchema: ZodType = z.preprocess(
          (val) => (val === "" || val === null ? undefined : val),
          z.date({
            error: (issue) =>
              issue.input === undefined
                ? `${element.label} is required`
                : "Invalid date",
          }),
        );

        const defaultValue = undefined;

        if (element.required) {
          fieldSchema = fieldSchema.refine(
            (val) => val instanceof Date && !isNaN(val.getTime()),
            `${element.label} is required`,
          );
        } else {
          fieldSchema = fieldSchema.optional();
        }

        shape[element.name] = fieldSchema;
        defaultValues[element.name] = defaultValue;

        break;
      }

      default: {
        shape[element.name] = z.string();
        defaultValues[element.name] = "";
      }
    }
  });

  const schema = z.object(shape);

  return { schema, defaultValues };
};
