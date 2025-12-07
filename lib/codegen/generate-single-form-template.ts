import { Form } from "@/types/form-builder";
import { generateFormElements } from "./generate-form-elements";
import { generateZodSchemaCode } from "./generate-zod-schema-code";
import { generateZodSchema } from "../schema-generator";

export const generateSingleFormTemplate = (form: Form) => {
  const { defaultValues } = generateZodSchema(form.elements);

  return `
${generateZodSchemaCode(form.elements)}

export const SingleForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: ${JSON.stringify(defaultValues, null, 2)},
  })

  const onSubmit = async (values: FormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Form successfully submitted")

    console.log(values)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>${form.title}</CardTitle>
        <CardDescription>${form.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="single-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            ${form.elements.map((element) => generateFormElements(element)).join("\n")}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button
            type="submit"
            form="single-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Spinner /> : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
`;
};
