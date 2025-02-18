import { TInput, TInputType } from "@/types/types";

const inputComponents: Record<TInputType, (input: TInput) => string> = {
  input: (input) => `
    <FormField
      key="${input.id}"
      control={control}
      name="${input.id}"
      render={({ field }) => (
        <FormItem>
          <FormLabel>${input.label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="${input.placeholder}"
              autoComplete="off"
            />
          </FormControl>
        </FormItem>
      )}
    />
  `,
  password: (input) => `
    <FormField
      key="${input.id}"
      control={control}
      name="${input.id}"
      render={({ field }) => (
        <FormItem>
          <FormLabel>${input.label}</FormLabel>
          <FormControl>
            <PasswordInput
              {...field}
              placeholder="${input.placeholder}"
              autoComplete="off"
            />
          </FormControl>
        </FormItem>
      )}
    />
  `,
  textarea: (input) => `
    <FormField
      key="${input.id}"
      control={control}
      name="${input.id}"
      render={({ field }) => (
        <FormItem>
          <FormLabel>${input.label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder="${input.placeholder}"
              className="resize-none"
              rows={5}
            />
          </FormControl>
        </FormItem>
      )}
    />
  `,
};

export const generateInputFieldCode = (input: TInput) => {
  return inputComponents[input.type](input);
};
