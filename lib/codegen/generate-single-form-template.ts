import { Form } from "@/types/form-builder";
import { generateFormElements } from "./generate-form-elements";

export const generateSingleFormTemplate = (form: Form) => {
  return `
export const SingleForm = () => {
  const form = useForm()

  const onSubmit = async (values: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Form successfully submitted");

    console.log(values);
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
            ${form.elements.map((element) => generateFormElements(element))}
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
