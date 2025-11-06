import { FormElement } from "@/types/form-builder";
import z from "zod";

export const generateZodSchema = (elements: FormElement[]) => {
  const shape: Record<string, any> = {};
  const defaultValues: Record<string, any> = {};

  elements.forEach((element) => {
    if (!element.name) return;

    let fieldSchema: any;
    let defaultValue: any;

    switch (element.type) {
      case "text":
      case "textarea":
      case "email":
      case "password": {
        fieldSchema = z.string();
        defaultValue = "";

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

        break;
      }

      case "select": {
        fieldSchema = z.string();
        defaultValue = "";

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

        break;
      }

      case "checkbox": {
        fieldSchema = z.boolean();
        defaultValue = false;

        if (element.required) {
          fieldSchema = fieldSchema.refine((val) => val === true, {
            message: `${element.label} must be checked`,
          });
        }

        break;
      }

      case "switch": {
        fieldSchema = z.boolean();
        defaultValue = false;

        if (element.required) {
          fieldSchema = fieldSchema.refine((val) => val === true, {
            message: `${element.label} must be accepted`,
          });
        }

        break;
      }

      default: {
        fieldSchema = z.string();
        defaultValue = "";
      }
    }

    shape[element.name] = fieldSchema;
    defaultValues[element.name] = defaultValue;
  });

  const schema = z.object(shape);

  return { schema, defaultValues };
};
