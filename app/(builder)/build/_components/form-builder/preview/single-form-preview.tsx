import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Form, FormElement, FormElementType } from "@/types/form-builder";
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { TextInputElement } from "./form-elements/text-input-element";
import { EmailInputElement } from "./form-elements/email-input-element";
import { generateZodSchema } from "@/lib/schema-generator";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInputElement } from "./form-elements/password-input-element";
import { TextareaInputElement } from "./form-elements/textarea-input-element";
import { SwitchInputElement } from "./form-elements/switch-input-element";
import z from "zod";
import { CheckboxInputElement } from "./form-elements/checkbox-input-element";
import { SelectInputElement } from "./form-elements/select-input-element";

interface SingleFormPreviewProps {
  currentForm: Form;
}

export const SingleFormPreview = ({ currentForm }: SingleFormPreviewProps) => {
  const { schema, defaultValues } = generateZodSchema(currentForm.elements);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (_values: z.infer<typeof schema>) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Form successfully submitted!");
  };

  const renderFormElement = (
    element: FormElement,
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState,
  ) => {
    const elementComponent: Record<FormElementType, React.ReactElement> = {
      text: (
        <TextInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      email: (
        <EmailInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      password: (
        <PasswordInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      textarea: (
        <TextareaInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      switch: (
        <SwitchInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      checkbox: (
        <CheckboxInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
      select: (
        <SelectInputElement
          element={element}
          field={field}
          fieldState={fieldState}
        />
      ),
    };

    return elementComponent[element.type];
  };

  return (
    <>
      <CardContent>
        <form id="form-preview" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {currentForm.elements.map((element) => (
              <Controller
                key={element.id}
                name={element.name}
                control={form.control}
                render={({ field, fieldState }) =>
                  renderFormElement(element, field, fieldState)
                }
              />
            ))}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field className="grid" orientation="horizontal">
          <Button
            type="submit"
            form="form-preview"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && <Spinner />}
            Submit
          </Button>
        </Field>
      </CardFooter>
    </>
  );
};
