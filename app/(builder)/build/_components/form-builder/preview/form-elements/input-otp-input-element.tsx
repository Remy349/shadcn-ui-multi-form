import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import type { FormElement } from "@/types/form-builder";
import {
  REGEXP_ONLY_DIGITS_AND_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_CHARS,
} from "input-otp";
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

interface InputOTPInputElementProps {
  element: FormElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const InputOTPInputElement = ({
  element,
  field,
  fieldState,
}: InputOTPInputElementProps) => {
  const otpLength = element.otpConfig?.length ?? 6;
  const patternStr =
    element.otpConfig?.pattern === REGEXP_ONLY_CHARS
      ? REGEXP_ONLY_CHARS
      : element.otpConfig?.pattern === REGEXP_ONLY_DIGITS
        ? REGEXP_ONLY_DIGITS
        : (element.otpConfig?.pattern ?? REGEXP_ONLY_DIGITS_AND_CHARS);

  const slots = Array.from({ length: otpLength }, (_, i) => i);

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
      <InputOTP
        id={element.name}
        maxLength={otpLength}
        pattern={patternStr}
        value={field.value}
        onChange={field.onChange}
        aria-invalid={fieldState.invalid}
        onBlur={field.onBlur}
        disabled={element.disabled}
      >
        <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
          {slots.map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <FieldDescription>{element.description}</FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
