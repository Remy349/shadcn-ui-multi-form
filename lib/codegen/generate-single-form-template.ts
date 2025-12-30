import { Form } from "@/types/form-builder";
import { generateFormElements } from "./generate-form-elements";
import { generateZodSchemaCode } from "./generate-zod-schema-code";
import { generateZodSchema } from "../schema-generator";

const serializeValue = (value: unknown): string => {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);
  if (Array.isArray(value)) return `[${value.map(serializeValue).join(", ")}]`;
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => `${JSON.stringify(k)}: ${serializeValue(v)}`)
      .join(", ");
    return `{ ${entries} }`;
  }
  return "undefined";
};

const serializeDefaultValues = (defaults: Record<string, unknown>): string => {
  const entries = Object.entries(defaults)
    .map(([k, v]) => `  ${k}: ${serializeValue(v)}`)
    .join(",\n");
  return `{\n${entries}\n}`;
};

export const generateSingleFormTemplate = (form: Form) => {
  const { defaultValues } = generateZodSchema(form.elements);
  const defaultValuesCode = serializeDefaultValues(defaultValues);

  return `
${generateZodSchemaCode(form.elements)}

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
