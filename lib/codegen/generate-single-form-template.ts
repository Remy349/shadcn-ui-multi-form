import { type Form, isFieldElement } from "@/types/form-builder";
import { generateZodSchema } from "../schema-generator";
import { generateFormElements } from "./generate-form-elements";
import { generateZodSchemaCode } from "./generate-schema-code";
import { serializeDefaultValues } from "./serialize";

export const generateSingleFormTemplate = (form: Form) => {
  const fieldElements = form.elements.filter(isFieldElement);
  const { defaultValues } = generateZodSchema(fieldElements);
  const defaultValuesCode = serializeDefaultValues(defaultValues);

  return `
${generateZodSchemaCode(fieldElements)}

export const SingleForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: ${defaultValuesCode},
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
            ${fieldElements.map((element) => generateFormElements(element)).join("\n")}
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
