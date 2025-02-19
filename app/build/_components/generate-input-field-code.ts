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
          <FormDescription>${input.description}</FormDescription>
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
          <FormDescription>${input.description}</FormDescription>
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
          <FormDescription>${input.description}</FormDescription>
        </FormItem>
      )}
    />
  `,
  checkbox: (input) => `
    <FormField
      key="${input.id}"
      control={control}
      name="${input.id}"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>${input.label}</FormLabel>
            <FormDescription>${input.description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  `,
};

export const generateInputFieldCode = (input: TInput) => {
  return inputComponents[input.type](input);
};
