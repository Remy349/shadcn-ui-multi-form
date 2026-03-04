import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { getFieldRegistryItem } from "@/lib/builder/registry";
import type { FieldElement } from "@/types/form-builder";
import { CheckboxInputElement } from "./form-elements/checkbox-input-element";
import { DatePickerInputElement } from "./form-elements/date-picker-input-element";
import { EmailInputElement } from "./form-elements/email-input-element";
import { FileInputElement } from "./form-elements/file-input-element";
import { InputOTPInputElement } from "./form-elements/input-otp-input-element";
import { PasswordInputElement } from "./form-elements/password-input-element";
import { PhoneInputElement } from "./form-elements/phone-input-element";
import { RadioGroupInputElement } from "./form-elements/radio-group-input-element";
import { RichTextEditorInputElement } from "./form-elements/rich-text-editor-input-element";
import { SelectInputElement } from "./form-elements/select-input-element";
import { SliderInputElement } from "./form-elements/slider-input-element";
import { SwitchInputElement } from "./form-elements/switch-input-element";
import { TextInputElement } from "./form-elements/text-input-element";
import { TextareaInputElement } from "./form-elements/textarea-input-element";

type FieldPreviewRenderer = (
  element: FieldElement,
  field: ControllerRenderProps<FieldValues, string>,
  fieldState: ControllerFieldState,
) => React.ReactElement;

const fieldPreviewRenderers = {
  text: (element, field, fieldState) => (
    <TextInputElement element={element} field={field} fieldState={fieldState} />
  ),
  email: (element, field, fieldState) => (
    <EmailInputElement
      element={element}
      field={field}
      fieldState={fieldState}
    />
  ),
  password: (element, field, fieldState) => (
    <PasswordInputElement
      element={element}
      field={field}
      fieldState={fieldState}
    />
  ),
  textarea: (element, field, fieldState) => (
    <TextareaInputElement
      element={element}
      field={field}
      fieldState={fieldState}
    />
  ),
  switch: (element, field, fieldState) => (
    <SwitchInputElement
      element={element}
      field={field}
      fieldState={fieldState}
    />
  ),
  checkbox: (element, field, fieldState) => (
    <CheckboxInputElement
      element={element}
      field={field}
      fieldState={fieldState}
    />
  ),
  select: (element, field, fieldState) => (
    <SelectInputElement
      element={element}
      field={field}
      fieldState={fieldState}
    />
  ),
  file: (element, field, fieldState) => (
    <FileInputElement element={element} field={field} fieldState={fieldState} />
  ),
  "rich-text-editor": (element, field, fieldState) => (
    <RichTextEditorInputElement
      element={element}
      field={field}
      fieldState={fieldState}
    />
  ),
  "date-picker": (element, field, fieldState) => (
    <DatePickerInputElement
      element={element}
      field={field}
      fieldState={fieldState}
    />
  ),
  "input-otp": (element, field, fieldState) => (
    <InputOTPInputElement
      element={element}
      field={field}
      fieldState={fieldState}
    />
  ),
  slider: (element, field, fieldState) => (
    <SliderInputElement
      element={element}
      field={field}
      fieldState={fieldState}
    />
  ),
  "phone-input": (element, field, fieldState) => (
    <PhoneInputElement
      element={element}
      field={field}
      fieldState={fieldState}
    />
  ),
  "radio-group": (element, field, fieldState) => (
    <RadioGroupInputElement
      element={element}
      field={field}
      fieldState={fieldState}
    />
  ),
} satisfies Record<FieldElement["type"], FieldPreviewRenderer>;

export const renderPreviewElement = (
  element: FieldElement,
  field: ControllerRenderProps<FieldValues, string>,
  fieldState: ControllerFieldState,
): React.ReactElement => {
  const registryItem = getFieldRegistryItem(element.type);
  const renderer = fieldPreviewRenderers[registryItem.type];

  return renderer(element, field, fieldState);
};
