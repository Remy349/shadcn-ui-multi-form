import {
  CalendarIcon,
  CheckboxIcon,
  ChevronDownIcon,
  EnvelopeClosedIcon,
  FrameIcon,
  LockClosedIcon,
  MagicWandIcon,
  RadiobuttonIcon,
  SliderIcon,
  SwitchIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import {
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "input-otp";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import z, { type ZodType } from "zod";
import { generateId, toCamelCase } from "@/lib/utils";
import type { FieldElement, FieldElementType } from "@/types/form-builder";

export type FieldSchemaResult = {
  schema: ZodType;
  defaultValue: unknown;
};

export type FieldRegistryItem = {
  type: FieldElementType;
  label: string;
  icon: FieldIcon;
  createDefault: (id?: string) => FieldElement;
  buildSchema: (element: FieldElement) => FieldSchemaResult;
  preview?: unknown;
  codegen?: unknown;
  isNew?: boolean;
};

export type FieldIcon = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

const buildBaseField = (
  type: FieldElementType,
  label: string,
  overrides: Partial<FieldElement> = {},
): FieldElement => {
  const id = overrides.id ?? `${type}-${generateId()}`;
  const name = overrides.name ?? toCamelCase(`${type} field ${generateId()}`);

  return {
    ...overrides,
    id,
    kind: "field",
    type,
    label,
    name,
    description: "",
    placeholder: "",
    disabled: false,
    required: false,
    minLength: 0,
    maxLength: 255,
  };
};

const buildTextLikeSchema = (element: FieldElement) => {
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

  return { schema: fieldSchema, defaultValue };
};

export const fieldRegistry: Record<FieldElementType, FieldRegistryItem> = {
  text: {
    type: "text",
    label: "Text",
    icon: TextIcon,
    createDefault: (id) =>
      buildBaseField("text", "Text Field", {
        id,
      }),
    buildSchema: buildTextLikeSchema,
  },
  email: {
    type: "email",
    label: "Email",
    icon: EnvelopeClosedIcon,
    createDefault: (id) =>
      buildBaseField("email", "Email Field", {
        id,
      }),
    buildSchema: buildTextLikeSchema,
  },
  textarea: {
    type: "textarea",
    label: "Textarea",
    icon: TextAlignJustifyIcon,
    createDefault: (id) =>
      buildBaseField("textarea", "Textarea Field", {
        id,
      }),
    buildSchema: buildTextLikeSchema,
  },
  checkbox: {
    type: "checkbox",
    label: "Checkbox",
    icon: CheckboxIcon,
    createDefault: (id) =>
      buildBaseField("checkbox", "Checkbox Field", {
        id,
      }),
    buildSchema: (element) => {
      let fieldSchema = z.boolean();
      const defaultValue = false;

      if (element.required) {
        fieldSchema = fieldSchema.refine((val) => val === true, {
          message: `${element.label} must be checked`,
        });
      }

      return { schema: fieldSchema, defaultValue };
    },
  },
  switch: {
    type: "switch",
    label: "Switch",
    icon: SwitchIcon,
    createDefault: (id) =>
      buildBaseField("switch", "Switch Field", {
        id,
      }),
    buildSchema: (element) => {
      let fieldSchema = z.boolean();
      const defaultValue = false;

      if (element.required) {
        fieldSchema = fieldSchema.refine((val) => val === true, {
          message: `${element.label} must be accepted`,
        });
      }

      return { schema: fieldSchema, defaultValue };
    },
  },
  password: {
    type: "password",
    label: "Password",
    icon: LockClosedIcon,
    createDefault: (id) =>
      buildBaseField("password", "Password Field", {
        id,
      }),
    buildSchema: buildTextLikeSchema,
  },
  select: {
    type: "select",
    label: "Select",
    icon: ChevronDownIcon,
    createDefault: (id) =>
      buildBaseField("select", "Select Field", {
        id,
        options: {
          selectLabel: "Select an option",
          selectItems: [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
          ],
        },
      }),
    buildSchema: (element) => {
      let fieldSchema = z.string();
      const defaultValue = "";
      const values =
        element.options?.selectItems.map((item) => item.value) || [];
      const isOptional = !element.required;

      if (element.required) {
        fieldSchema = fieldSchema.min(1, `${element.label} is required`);
      }

      if (values.length > 0) {
        fieldSchema = fieldSchema.refine(
          (val) => (isOptional && val === "") || values.includes(val),
          `${element.label} must be a valid option`,
        );
      }

      return { schema: fieldSchema, defaultValue };
    },
  },
  file: {
    type: "file",
    label: "File",
    icon: UploadIcon,
    createDefault: (id) =>
      buildBaseField("file", "File Field", {
        id,
        fileConfig: {
          accept: "image/*",
          multiple: false,
          maxSize: 5 * 1024 * 1024,
          maxFiles: 1,
          showPreview: true,
          previewSize: "md",
          variant: "default",
        },
      }),
    buildSchema: (element) => {
      let fieldSchema = z.array(z.instanceof(File));

      if (element.required) {
        fieldSchema = fieldSchema.refine(
          (files) => files.length > 0,
          `${element.label} is required`,
        );
      }

      return { schema: fieldSchema, defaultValue: [] };
    },
  },
  "rich-text-editor": {
    type: "rich-text-editor",
    label: "Rich Text Editor",
    icon: TextAlignLeftIcon,
    createDefault: (id) =>
      buildBaseField("rich-text-editor", "Rich Text Editor Field", {
        id,
      }),
    buildSchema: buildTextLikeSchema,
  },
  "date-picker": {
    type: "date-picker",
    label: "Date Picker",
    icon: CalendarIcon,
    createDefault: (id) =>
      buildBaseField("date-picker", "Date Picker Field", {
        id,
      }),
    buildSchema: (element) => {
      let fieldSchema: ZodType = z
        .date({
          error: (issue) =>
            issue.input === undefined
              ? `${element.label} is required`
              : "Invalid date",
        })
        .refine((val) => !Number.isNaN(val.getTime()), "Invalid date");

      if (!element.required) {
        fieldSchema = fieldSchema.optional();
      }

      return { schema: fieldSchema, defaultValue: undefined };
    },
  },
  "input-otp": {
    type: "input-otp",
    label: "Input OTP",
    icon: MagicWandIcon,
    createDefault: (id) =>
      buildBaseField("input-otp", "Input OTP Field", {
        id,
        otpConfig: {
          length: 6,
          pattern: REGEXP_ONLY_DIGITS_AND_CHARS,
        },
      }),
    buildSchema: (element) => {
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

      return { schema: fieldSchema, defaultValue: "" };
    },
  },
  slider: {
    type: "slider",
    label: "Slider",
    icon: SliderIcon,
    createDefault: (id) =>
      buildBaseField("slider", "Slider Field", {
        id,
        sliderConfig: {
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 50,
          orientation: "horizontal",
        },
      }),
    buildSchema: (element) => {
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

      return { schema: fieldSchema, defaultValue };
    },
  },
  "phone-input": {
    type: "phone-input",
    label: "Phone Input",
    icon: FrameIcon,
    createDefault: (id) =>
      buildBaseField("phone-input", "Phone Input Field", {
        id,
      }),
    buildSchema: (element) => {
      let fieldSchema = z.string();
      const defaultValue = "";
      const isOptional = !element.required;

      if (element.required) {
        fieldSchema = fieldSchema.min(1, `${element.label} is required`);
      }

      fieldSchema = fieldSchema.refine(
        (val) => (isOptional && val === "") || isValidPhoneNumber(val),
        "Invalid phone number",
      );

      return { schema: fieldSchema, defaultValue };
    },
  },
  "radio-group": {
    type: "radio-group",
    label: "Radio Group",
    icon: RadiobuttonIcon,
    createDefault: (id) =>
      buildBaseField("radio-group", "Radio Group Field", {
        id,
        radioGroupOptions: {
          items: [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
          ],
        },
      }),
    buildSchema: (element) => {
      let fieldSchema = z.string();
      const defaultValue = "";
      const values =
        element.radioGroupOptions?.items.map((item) => item.value) || [];
      const isOptional = !element.required;

      if (element.required) {
        fieldSchema = fieldSchema.min(1, `${element.label} is required`);
      }

      if (values.length > 0) {
        fieldSchema = fieldSchema.refine(
          (val) => (isOptional && val === "") || values.includes(val),
          `${element.label} must be a valid option`,
        );
      }

      return { schema: fieldSchema, defaultValue };
    },
  },
} as const;

export const getFieldRegistryItem = (type: FieldElementType) => {
  return fieldRegistry[type];
};

export const getAllFieldRegistryItems = () => {
  return Object.values(fieldRegistry);
};
