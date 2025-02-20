import { TInput, TInputType } from "@/types/types";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

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
            placeholder={input.placeholder}
            autoComplete="off"
          />
        </FormControl>
        <FormDescription>{input.description}</FormDescription>
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
            placeholder={input.placeholder}
            autoComplete="off"
          />
        </FormControl>
        <FormDescription>{input.description}</FormDescription>
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
            placeholder={input.placeholder}
            className="resize-none"
            rows={5}
          />
        </FormControl>
        <FormDescription>{input.description}</FormDescription>
      </FormItem>
    );
  },
  checkbox: (input, field) => {
    return (
      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel>{input.label}</FormLabel>
          <FormDescription>{input.description}</FormDescription>
        </div>
      </FormItem>
    );
  },
  switch: (input, field) => {
    return (
      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <FormLabel className="text-base">{input.label}</FormLabel>
          <FormDescription>{input.description}</FormDescription>
        </div>
        <FormControl>
          <Switch checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
      </FormItem>
    );
  },
};

export const RenderFormInput = ({ input, field }: IProps) => {
  return <>{inputComponents[input.type](input, field)}</>;
};
