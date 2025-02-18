import { TInput, TInputType } from "@/types/types";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";

interface IProps {
  input: TInput;
  field: ControllerRenderProps<FieldValues, string>;
}

const inputComponents: Record<
  TInputType,
  (
    input: TInput,
    field: ControllerRenderProps<FieldValues, string>,
  ) => React.ReactElement
> = {
  input: (input, field) => {
    return (
      <FormItem>
        <FormLabel>{input.label}</FormLabel>
        <FormControl>
          <Input
            {...field}
            placeholder={input.placeholder || ""}
            autoComplete="off"
          />
        </FormControl>
      </FormItem>
    );
  },
  password: (input, field) => {
    return (
      <FormItem>
        <FormLabel>{input.label}</FormLabel>
        <FormControl>
          <PasswordInput
            {...field}
            placeholder={input.placeholder || ""}
            autoComplete="off"
          />
        </FormControl>
      </FormItem>
    );
  },
  textarea: (input, field) => {
    return (
      <FormItem>
        <FormLabel>{input.label}</FormLabel>
        <FormControl>
          <Textarea
            {...field}
            placeholder={input.placeholder || ""}
            className="resize-none"
            rows={5}
          />
        </FormControl>
      </FormItem>
    );
  },
};

export const RenderFormInput = ({ input, field }: IProps) => {
  return <>{inputComponents[input.type](input, field)}</>;
};
