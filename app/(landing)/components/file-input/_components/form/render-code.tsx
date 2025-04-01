import { Code } from "@/app/components/_components/code";

export const RenderFormCode = () => {
  const code = `"use client"

import { Button } from "@/components/ui/button"
import { FileInput } from "@/components/ui/file-input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const FormSchema = z.object({
  file: z.instanceof(File).nullable(),
})

type TFormSchema = z.infer<typeof FormSchema>

export const FormPreview = () => {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: { file: null },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (formData: TFormSchema) => {
    console.log(formData)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast.success("Form successfully submitted")
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <FileInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Upload your file here (Images or PDF).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="font-medium" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircle className="size-5 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  )
}`;

  return <Code code={code} />;
};
