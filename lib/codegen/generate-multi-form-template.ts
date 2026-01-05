import { Form } from "@/types/form-builder";
import { generateZodSchema } from "../schema-generator";
import { generateZodSchemaCode } from "./generate-schema-code";
import { generateFormElements } from "./generate-form-elements";

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

export const generateMultiFormTemplate = (forms: Form[]) => {
  const allElements = forms.flatMap((form) => form.elements);
  const { defaultValues } = generateZodSchema(allElements);
  const defaultValuesCode = serializeDefaultValues(defaultValues);

  const stepsMetadata = forms.map((form) => ({
    title: form.title,
    description: form.description,
    fields: form.elements.map((element) => element.name),
  }));

  const stepsFormElements = forms
    .map((form, index) => {
      const elementsCode = form.elements
        .map((element) => generateFormElements(element))
        .join("\n");

      return `
        case ${index}: {
          return (
            <FieldGroup>
              ${elementsCode}
            </FieldGroup>
          )
        }
      `;
    })
    .join("\n");

  return `
${generateZodSchemaCode(allElements)}

export const MultiForm = () => {
  const steps = ${JSON.stringify(stepsMetadata, null, 2)}

  const [currentStep, setCurrentStep] = useState(0)

  const currentForm = steps[currentStep]

  const isLastStep = currentStep === steps.length - 1
  const progress = ((currentStep + 1) / steps.length) * 100

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: ${defaultValuesCode},
    mode: "onChange",
  })

  const handleNextButton = async () => {
    const currentFields = steps[currentStep].fields

    const isValid = await form.trigger(currentFields)

    if (isValid && !isLastStep) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBackButton = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const onSubmit = async (values: FormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Form successfully submitted")

    console.log(values)
  };

  const renderCurrentStepContent = () => {
    switch (currentStep) {
      ${stepsFormElements}
      default: {
        return null
      }
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle>{currentForm.title}</CardTitle>
            <p className="text-muted-foreground text-xs">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
          <CardDescription>{currentForm.description}</CardDescription>
        </div>
        <Progress value={progress} />
      </CardHeader>
      <CardContent>
        <form id="multi-form" onSubmit={form.handleSubmit(onSubmit)}>
          {renderCurrentStepContent()}
        </form>
      </CardContent>
      <CardFooter>
        <Field className="justify-between" orientation="horizontal">
          {currentStep > 0 && (
            <Button type="button" variant="ghost" onClick={handleBackButton}>
              <ChevronLeft /> Back
            </Button>
          )}
          {!isLastStep && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleNextButton}
            >
              Next
              <ChevronRight />
            </Button>
          )}
          {isLastStep && (
            <Button
              type="submit"
              form="multi-form"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Spinner /> : "Submit"}
            </Button>
          )}
        </Field>
      </CardFooter>
    </Card>
  )
}
`;
};
