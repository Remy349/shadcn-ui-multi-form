import {
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "input-otp";
import type { FieldElement, FieldElementType } from "@/types/form-builder";

const getFieldLabel = (name: string, label: string) => {
  return `<FieldLabel htmlFor="${name}">${label}</FieldLabel>`;
};

const getFieldDescription = (description?: string) => {
  return `<FieldDescription>${description}</FieldDescription>`;
};

const elementRenderers: Record<
  FieldElementType,
  (element: FieldElement) => string
> = {
  text: (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      ${getFieldLabel(element.name, element.label)}
      <Input
        {...field}
        id="${element.name}"
        aria-invalid={fieldState.invalid}
        placeholder="${element.placeholder}"
        autoComplete="off"
        disabled={${element.disabled}}
      />
      ${getFieldDescription(element.description)}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
 />`,
  textarea: (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      ${getFieldLabel(element.name, element.label)}
      <Textarea
        {...field}
        id="${element.name}"
        aria-invalid={fieldState.invalid}
        autoComplete="off"
        placeholder="${element.placeholder}"
        disabled={${element.disabled}}
      />
      ${getFieldDescription(element.description)}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
 />`,
  password: (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      ${getFieldLabel(element.name, element.label)}
      <PasswordInput
        {...field}
        id="${element.name}"
        aria-invalid={fieldState.invalid}
        placeholder="${element.placeholder}"
        autoComplete="off"
        disabled={${element.disabled}}
      />
      ${getFieldDescription(element.description)}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
 />`,
  email: (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      ${getFieldLabel(element.name, element.label)}
      <EmailInput
        {...field}
        id="${element.name}"
        aria-invalid={fieldState.invalid}
        placeholder="${element.placeholder}"
        autoComplete="off"
        disabled={${element.disabled}}
      />
      ${getFieldDescription(element.description)}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
 />
 `,
  file: (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      ${getFieldLabel(element.name, element.label)}
      ${getFieldDescription(element.description)}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      <FileInput
        {...field}
        id="${element.name}"
        aria-invalid={fieldState.invalid}
        maxFiles={${element.fileConfig?.maxFiles}}
        maxSize={${element.fileConfig?.maxSize}}
        variant="${element.fileConfig?.variant}"
        previewSize="${element.fileConfig?.previewSize}"
        multiple={${element.fileConfig?.multiple}}
        showPreview={${element.fileConfig?.showPreview}}
        accept="${element.fileConfig?.accept}"
        disabled={${element.disabled}}
      />
    </Field>
  )}
 />
 `,
  switch: (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid} orientation="horizontal">
      <FieldContent>
        ${getFieldLabel(element.name, element.label)}  
        ${getFieldDescription(element.description)}
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>
      <Switch
        id="${element.name}"
        name={field.name}
        disabled={${element.disabled}}
        checked={field.value}
        onCheckedChange={field.onChange}
      />
    </Field>
  )}
 />
 `,
  checkbox: (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid} orientation="horizontal">
      <Checkbox
        id="${element.name}"
        name={field.name}
        disabled={${element.disabled}}
        checked={field.value}
        onCheckedChange={field.onChange}
      />
      <FieldContent>
        ${getFieldLabel(element.name, element.label)}  
        ${getFieldDescription(element.description)}
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>
    </Field>
  )}
 />
 `,
  "radio-group": (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => {
    const options = ${JSON.stringify(element.radioGroupOptions?.items)};

    return (
      <FieldSet data-invalid={fieldState.invalid}>
        <FieldLegend>${element.label}</FieldLegend>
        ${getFieldDescription(element.description)}
        <RadioGroup
          name={field.name}
          value={field.value}
          onValueChange={field.onChange}
          aria-invalid={fieldState.invalid}
          disabled={${element.disabled}}
        >
          {options.map((item) => (
            <FieldLabel
              key={item.value}
              htmlFor={item.value}
            >
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldTitle>{item.label}</FieldTitle>
                </FieldContent>
                <RadioGroupItem
                  value={item.value}
                  id={item.value}
                  aria-invalid={fieldState.invalid}
                />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldSet>
    )
  }}
 />
 `,
  select: (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => {
    const options = ${JSON.stringify(element.options?.selectItems)};

    return (
      <Field data-invalid={fieldState.invalid}>
        ${getFieldLabel(element.name, element.label)}  
        <Select
          name={field.name}
          value={field.value}
          onValueChange={field.onChange}
          disabled={${element.disabled}}
        >
          <SelectTrigger id="${element.name}" aria-invalid={fieldState.invalid}>
            <SelectValue placeholder="${element.placeholder}" />
            <SelectContent>
              <SelectGroup>
                <SelectLabel>${element.options?.selectLabel}</SelectLabel>
                {options.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </SelectTrigger>
        </Select>
        ${getFieldDescription(element.description)}
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    )
  }}
 />
  `,
  combobox: (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => {
    const options = ${JSON.stringify(element.comboboxOptions?.items)};
    const itemsValues = options.map((item) => item.value);
    const labelByValue = new Map(options.map((item) => [item.value, item.label]));

    return (
      <Field data-invalid={fieldState.invalid}>
        ${getFieldLabel(element.name, element.label)}
        <Combobox
          items={itemsValues}
          value={field.value}
          onValueChange={field.onChange}
          disabled={${element.disabled}}
        >
          <ComboboxInput
            id="${element.name}"
            placeholder="${element.placeholder}"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            showClear
          />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {labelByValue.get(item) ?? item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        ${getFieldDescription(element.description)}
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    )
  }}
 />
  `,
  "multi-select": (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => {
    const options = ${JSON.stringify(element.multiSelectOptions?.items)};
    const itemsValues = options.map((item) => item.value);
    const labelByValue = new Map(options.map((item) => [item.value, item.label]));
    const anchor = useComboboxAnchor();

    return (
      <Field data-invalid={fieldState.invalid}>
        ${getFieldLabel(element.name, element.label)}
        <Combobox
          multiple
          autoHighlight
          items={itemsValues}
          value={field.value}
          onValueChange={field.onChange}
          disabled={${element.disabled}}
        >
          <ComboboxChips ref={anchor} className="w-full">
            <ComboboxValue>
              {(values) => (
                <>
                  {values.map((value: string) => (
                    <ComboboxChip key={value}>
                      {labelByValue.get(value) ?? value}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    placeholder="${element.placeholder}"
                    aria-invalid={fieldState.invalid}
                  />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {labelByValue.get(item) ?? item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        ${getFieldDescription(element.description)}
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    )
  }}
 />
  `,
  "rich-text-editor": (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      ${getFieldLabel(element.name, element.label)}  
      <RichTextEditor content={field.value} onChange={field.onChange} />
      ${getFieldDescription(element.description)}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
 />
 `,
  "date-picker": (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      ${getFieldLabel(element.name, element.label)}
      <DatePicker
        id="${element.name}"
        value={field.value}
        onChange={field.onChange}
        aria-invalid={fieldState.invalid}
        placeholder="${element.placeholder}"
        disabled={${element.disabled}}
      />
      ${getFieldDescription(element.description)}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
 />`,
  "input-otp": (element) => {
    const otpLength = element.otpConfig?.length ?? 6;
    const patternStr =
      element.otpConfig?.pattern === REGEXP_ONLY_CHARS
        ? REGEXP_ONLY_CHARS
        : element.otpConfig?.pattern === REGEXP_ONLY_DIGITS
          ? REGEXP_ONLY_DIGITS
          : (element.otpConfig?.pattern ?? REGEXP_ONLY_DIGITS_AND_CHARS);

    return `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      ${getFieldLabel(element.name, element.label)}
      <InputOTP
        id="${element.name}"
        maxLength={${otpLength}}
        pattern="${patternStr}"
        value={field.value}
        onChange={field.onChange}
        aria-invalid={fieldState.invalid}
        onBlur={field.onBlur}
        disabled={${element.disabled}}
      >
        <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
          {Array.from({ length: ${otpLength} }, (_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      ${getFieldDescription(element.description)}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
 />`;
  },
  slider: (element) => {
    const min = element.sliderConfig?.min;
    const max = element.sliderConfig?.max;
    const step = element.sliderConfig?.step;
    const orientation = element.sliderConfig?.orientation;
    const defaultValue = element.sliderConfig?.defaultValue;

    return `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => {
    const currentValue =
      typeof field.value === "number" ? field.value : ${defaultValue};

    return (
      <Field data-invalid={fieldState.invalid}>
        <div className="flex items-center space-x-2">
          <FieldLabel htmlFor="${element.name}">${element.label}</FieldLabel>
          <span className="text-xs text-muted-foreground">({currentValue})</span>
        </div>
        ${getFieldDescription(element.description)}
        <Slider
          id="${element.name}"
          value={[currentValue]}
          onValueChange={(val) => field.onChange(val[0])}
          onBlur={field.onBlur}
          aria-invalid={fieldState.invalid}
          min={${min}}
          max={${max}}
          step={${step}}
          orientation="${orientation}"
          defaultValue={[${defaultValue}]}
          disabled={${element.disabled}}
        />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    );
  }}
 />`;
  },
  "phone-input": (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      ${getFieldLabel(element.name, element.label)}
      <PhoneInput
        {...field}
        id="${element.name}"
        placeholder="${element.placeholder}"
        aria-invalid={fieldState.invalid}
        autoComplete="off"
        disabled={${element.disabled}}
      />
      ${getFieldDescription(element.description)}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
 />`,
  signature: (element) => `
<Controller
  name="${element.name}"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      ${getFieldLabel(element.name, element.label)}
      <SignatureInput
        value={field.value}
        onChange={field.onChange}
        disabled={${element.disabled}}
        height={${element.signatureConfig?.height}}
        penColor="${element.signatureConfig?.penColor}"
        backgroundColor="${element.signatureConfig?.backgroundColor}"
        strokeWidth={${element.signatureConfig?.strokeWidth}}
      />
      ${getFieldDescription(element.description)}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
 />`,
};

const schemaRenderers: Record<
  FieldElementType,
  (element: FieldElement) => string
> = {
  text: (element) => {
    let fieldSchema = "z.string()";

    if (element.required) {
      fieldSchema += `.min(1, "${element.label} is required")`;
    }

    if (element.minLength && element.minLength > 0) {
      fieldSchema += `.min(${element.minLength}, "${element.label} must be at least ${element.minLength} characters")`;
    }

    if (element.maxLength && element.maxLength > 0) {
      fieldSchema += `.max(${element.maxLength}, "${element.label} must be at most ${element.maxLength} characters")`;
    }

    return fieldSchema;
  },
  textarea: (element) => {
    let fieldSchema = "z.string()";

    if (element.required) {
      fieldSchema += `.min(1, "${element.label} is required")`;
    }

    if (element.minLength && element.minLength > 0) {
      fieldSchema += `.min(${element.minLength}, "${element.label} must be at least ${element.minLength} characters")`;
    }

    if (element.maxLength && element.maxLength > 0) {
      fieldSchema += `.max(${element.maxLength}, "${element.label} must be at most ${element.maxLength} characters")`;
    }

    return fieldSchema;
  },
  email: (element) => {
    let fieldSchema = "z.string()";

    if (element.required) {
      fieldSchema += `.min(1, "${element.label} is required")`;
    }

    fieldSchema += `.email("Invalid email address")`;

    if (element.minLength && element.minLength > 0) {
      fieldSchema += `.min(${element.minLength}, "${element.label} must be at least ${element.minLength} characters")`;
    }

    if (element.maxLength && element.maxLength > 0) {
      fieldSchema += `.max(${element.maxLength}, "${element.label} must be at most ${element.maxLength} characters")`;
    }

    return fieldSchema;
  },
  "rich-text-editor": (element) => {
    let fieldSchema = "z.string()";

    if (element.required) {
      fieldSchema += `.min(1, "${element.label} is required")`;
    }

    if (element.minLength && element.minLength > 0) {
      fieldSchema += `.min(${element.minLength}, "${element.label} must be at least ${element.minLength} characters")`;
    }

    if (element.maxLength && element.maxLength > 0) {
      fieldSchema += `.max(${element.maxLength}, "${element.label} must be at most ${element.maxLength} characters")`;
    }

    return fieldSchema;
  },
  password: (element) => {
    let fieldSchema = "z.string()";

    if (element.required) {
      fieldSchema += `.min(1, "${element.label} is required")`;
    }

    if (element.minLength && element.minLength > 0) {
      fieldSchema += `.min(${element.minLength}, "${element.label} must be at least ${element.minLength} characters")`;
    }

    if (element.maxLength && element.maxLength > 0) {
      fieldSchema += `.max(${element.maxLength}, "${element.label} must be at most ${element.maxLength} characters")`;
    }

    return fieldSchema;
  },
  "radio-group": (element) => {
    let fieldSchema = "z.string()";

    const values =
      element.radioGroupOptions?.items.map((item) => item.value) || [];

    if (element.required) {
      fieldSchema += `.min(1, "${element.label} is required")`;
    }

    if (values.length > 0) {
      const valuesArray = JSON.stringify(values);
      fieldSchema += `.refine((val) => ${valuesArray}.includes(val), "${element.label} must be a valid option")`;
    }

    return fieldSchema;
  },
  select: (element) => {
    let fieldSchema = "z.string()";

    const values = element.options?.selectItems.map((item) => item.value) || [];

    if (element.required) {
      fieldSchema += `.min(1, "${element.label} is required")`;
    }

    if (values.length > 0) {
      const valuesArray = JSON.stringify(values);
      fieldSchema += `.refine((val) => ${valuesArray}.includes(val), "${element.label} must be a valid option")`;
    }

    return fieldSchema;
  },
  combobox: (element) => {
    let fieldSchema = "z.string()";

    const values =
      element.comboboxOptions?.items.map((item) => item.value) || [];

    if (element.required) {
      fieldSchema += `.min(1, "${element.label} is required")`;
    }

    if (values.length > 0) {
      const valuesArray = JSON.stringify(values);
      fieldSchema += `.refine((val) => ${valuesArray}.includes(val), "${element.label} must be a valid option")`;
    }

    return fieldSchema;
  },
  "multi-select": (element) => {
    let fieldSchema = "z.array(z.string())";

    const values =
      element.multiSelectOptions?.items.map((item) => item.value) || [];

    if (element.required) {
      fieldSchema += `.refine((val) => val.length > 0, "${element.label} is required")`;
    }

    if (values.length > 0) {
      const valuesArray = JSON.stringify(values);
      fieldSchema += `.refine((val) => val.every((entry) => ${valuesArray}.includes(entry)), "${element.label} must be valid options")`;
    }

    return fieldSchema;
  },
  checkbox: (element) => {
    let fieldSchema = "z.boolean()";

    if (element.required) {
      fieldSchema += `.refine((val) => val === true, "${element.label} must be checked")`;
    }

    return fieldSchema;
  },
  switch: (element) => {
    let fieldSchema = "z.boolean()";

    if (element.required) {
      fieldSchema += `.refine((val) => val === true, "${element.label} must be accepted")`;
    }

    return fieldSchema;
  },
  file: (element) => {
    let fieldSchema = "z.array(z.instanceof(File))";

    if (element.required) {
      fieldSchema += `.refine((files) => files.length > 0, "${element.label} is required")`;
    }

    return fieldSchema;
  },
  "date-picker": (element) => {
    let fieldSchema = `z
          .date({
            error: (issue) =>
              issue.input === undefined
                ? "${element.label} is required"
                : "Invalid date",
          })
          .refine((val) => !Number.isNaN(val.getTime()), "Invalid date")`;

    if (!element.required) {
      fieldSchema += ".optional()";
    }

    return fieldSchema;
  },
  "input-otp": (element) => {
    const patternStr =
      element.otpConfig?.pattern === REGEXP_ONLY_CHARS
        ? REGEXP_ONLY_CHARS
        : element.otpConfig?.pattern === REGEXP_ONLY_DIGITS
          ? REGEXP_ONLY_DIGITS
          : (element.otpConfig?.pattern ?? REGEXP_ONLY_DIGITS_AND_CHARS);

    const pattern = new RegExp(patternStr);

    return `z
        .string()
        .min(
          ${element.otpConfig?.length || 6},
          "${element.label} must be ${element.otpConfig?.length || 6} characters",
        )
        .regex(${pattern}, "${element.label} has invalid characters")`;
  },
  slider: (element) => {
    const min = element.sliderConfig?.min ?? 0;
    const max = element.sliderConfig?.max ?? 100;
    const step = element.sliderConfig?.step;

    let fieldSchema = `z
        .number({ error: (issue) => issue.input === undefined ? "${element.label} is required" : "Invalid number" })
        .min(${min}, "${element.label} must be at least ${min}")
        .max(${max}, "${element.label} must be at most ${max}")`;

    if (step && step > 0) {
      fieldSchema += `.refine(
          (val) => typeof val === "number" && Math.abs((val - ${min}) % ${step}) < 1e-9,
          "${element.label} must align to step ${step}",
        )`;
    }

    if (!element.required) {
      fieldSchema += `.optional()`;
    }

    return fieldSchema;
  },
  "phone-input": (element) => {
    let fieldSchema = `z.string()`;

    if (element.required) {
      fieldSchema += `.min(1, "${element.label} is required")`;
    }

    fieldSchema += `.refine(isValidPhoneNumber, "Invalid phone number")`;

    return fieldSchema;
  },
  signature: (element) => {
    let fieldSchema = "z.string()";

    if (element.required) {
      fieldSchema += `.min(1, "${element.label} is required")`;
    }

    return fieldSchema;
  },
};

const importRegistry: Record<FieldElementType, string[]> = {
  text: ['import { Input } from "@/components/ui/input"'],
  checkbox: [
    'import { Checkbox } from "@/components/ui/checkbox"',
    'import { FieldContent } from "@/components/ui/field"',
  ],
  switch: [
    'import { Switch } from "@/components/ui/switch"',
    'import { FieldContent } from "@/components/ui/field"',
  ],
  textarea: ['import { Textarea } from "@/components/ui/textarea"'],
  select: [
    'import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"',
  ],
  combobox: [
    'import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"',
  ],
  "multi-select": [
    'import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from "@/components/ui/combobox"',
  ],
  password: ['import { PasswordInput } from "@/components/ui/password-input"'],
  file: ['import { FileInput } from "@/components/ui/file-input"'],
  "date-picker": ['import { DatePicker } from "@/components/ui/date-picker"'],
  "input-otp": [
    'import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"',
  ],
  email: ['import { EmailInput } from "@/components/ui/email-input"'],
  "rich-text-editor": [
    'import { RichTextEditor } from "@/components/ui/editor/rich-text-editor"',
  ],
  slider: ['import { Slider } from "@/components/ui/slider"'],
  "phone-input": [
    'import { PhoneInput } from "@/components/ui/phone-input"',
    'import { isValidPhoneNumber } from "react-phone-number-input"',
  ],
  signature: [
    'import { SignatureInput } from "@/components/ui/signature-input"',
  ],
  "radio-group": [
    'import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"',
    'import { FieldContent, FieldSet, FieldLegend, FieldTitle } from "@/components/ui/field"',
  ],
};

export const getFieldCodegen = (type: FieldElementType) => {
  return {
    imports: importRegistry[type],
    element: elementRenderers[type],
    schema: schemaRenderers[type],
  };
};
