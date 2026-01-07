import z, { type ZodType } from "zod";
import type { FormElement } from "@/types/form-builder";
import {
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "input-otp";
import { isValidPhoneNumber } from "react-phone-number-input";

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
        let fieldSchema: ZodType = z
          .date({
            error: (issue) =>
              issue.input === undefined
                ? `${element.label} is required`
                : "Invalid date",
          })
          .refine((val) => !Number.isNaN(val.getTime()), "Invalid date");

        const defaultValue = undefined;

        if (!element.required) {
          fieldSchema = fieldSchema.optional();
        }

        shape[element.name] = fieldSchema;
        defaultValues[element.name] = defaultValue;

        break;
      }

      case "input-otp": {
        const patternStr =
          element.otpConfig?.pattern === REGEXP_ONLY_CHARS
            ? REGEXP_ONLY_CHARS
            : element.otpConfig?.pattern === REGEXP_ONLY_DIGITS
              ? REGEXP_ONLY_DIGITS
              : (element.otpConfig?.pattern ?? REGEXP_ONLY_DIGITS_AND_CHARS);

        const pattern = new RegExp(patternStr);

        const fieldSchema = z
          .string()
          .min(
            element.otpConfig?.length || 6,
            `${element.label} must be ${element.otpConfig?.length || 6} characters`,
          )
          .regex(pattern, `${element.label} has invalid characters`);

        shape[element.name] = fieldSchema;
        defaultValues[element.name] = "";

        break;
      }

      case "slider": {
        const min = element.sliderConfig?.min ?? 0;
        const max = element.sliderConfig?.max ?? 100;
        const step = element.sliderConfig?.step;
        const defaultValue = element.sliderConfig?.defaultValue ?? min;

        let fieldSchema: ZodType = z
          .number({
            error: (issue) =>
              issue.input === undefined
                ? `${element.label} is required`
                : "Invalid number",
          })
          .min(min, `${element.label} must be at least ${min}`)
          .max(max, `${element.label} must be at most ${max}`);

        if (step && step > 0) {
          fieldSchema = fieldSchema.refine(
            (val) =>
              typeof val === "number" && Math.abs((val - min) % step) < 1e-9,
            `${element.label} must align to step ${step}`,
          );
        }

        if (!element.required) {
          fieldSchema = fieldSchema.optional();
        }

        shape[element.name] = fieldSchema;
        defaultValues[element.name] = defaultValue;

        break;
      }

      case "phone-input": {
        let fieldSchema = z.string();
        const defaultValue = "";

        if (element.required) {
          fieldSchema = fieldSchema.min(1, `${element.label} is required`);
        }

        fieldSchema = fieldSchema.refine(
          isValidPhoneNumber,
          "Invalid phone number",
        );

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
