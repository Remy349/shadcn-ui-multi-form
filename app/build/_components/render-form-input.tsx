import { TInput, TInputType } from "@/types/types";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

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
          <Input {...field} autoComplete="off" />
        </FormControl>
      </FormItem>
    );
  },
  textarea: (input, field) => {
    return (
      <FormItem>
        <FormLabel>{input.label}</FormLabel>
        <FormControl>
          <Textarea {...field} className="resize-none" rows={6} />
        </FormControl>
      </FormItem>
    );
  },
};

export const RenderFormInput = ({ input, field }: IProps) => {
  return <>{inputComponents[input.type](input, field)}</>;
};
