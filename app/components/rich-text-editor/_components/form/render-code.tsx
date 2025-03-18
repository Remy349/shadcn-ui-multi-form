import { Code } from "@/app/components/_components/code";

export const RenderFormCode = () => {
  const code = `"use client"

import { Button } from "@/components/ui/button"
import { Editor } from "@/components/ui/editor/editor"
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
  content: z.string().min(1, "Content is required"),
})

type TFormSchema = z.infer<typeof FormSchema>

export const FormPreview = () => {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: { content: "" },
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Article content</FormLabel>
              <FormDescription>
                Write and format your article with headings and more.
              </FormDescription>
              <FormControl>
                <Editor content={field.value} onChange={field.onChange} />
              </FormControl>
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
