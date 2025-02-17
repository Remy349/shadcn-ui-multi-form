import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { TInput } from "@/types/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IProps {
  handleIsOpen: () => void;
  formId: string;
  input: TInput;
}

const FormSchema = z.object({
  label: z.string().min(1, "Label is required"),
});

type TFormSchema = z.infer<typeof FormSchema>;

export const EditInput = ({ handleIsOpen, formId, input }: IProps) => {
  const { updateInput } = useFormBuilderStore();

  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: { label: input.label },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (formData: TFormSchema) => {
    updateInput(formId, input.id, formData);

    handleIsOpen();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-4">
        <FormField
          control={control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} type="text" autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button className="font-medium" size="sm" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
