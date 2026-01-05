import { FormElement } from "@/types/form-builder";
import {
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "input-otp";

const getFieldLabel = (name: string, label: string) => {
  return `<FieldLabel htmlFor="${name}">${label}</FieldLabel>`;
};

const getFieldDescription = (description?: string) => {
  return `<FieldDescription>${description}</FieldDescription>`;
};

export const generateFormElements = (element: FormElement) => {
  switch (element.type) {
    case "text": {
      return `
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
/>`;
    }

    case "textarea": {
      return `
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
/>`;
    }

    case "password": {
      return `
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
/>`;
    }

    case "email": {
      return `
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
        disabled="${element.disabled}"
      />
      ${getFieldDescription(element.description)}
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
`;
    }

    case "file": {
      return `
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
`;
    }

    case "switch": {
      return `
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
`;
    }

    case "checkbox": {
      return `
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
`;
    }

    case "select": {
      return `
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
`;
    }

    case "rich-text-editor": {
      return `
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
`;
    }

    case "date-picker": {
      return `
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
/>`;
    }

    case "input-otp": {
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
    }

    default: {
      return null;
    }
  }
};
