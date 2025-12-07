"use client";

import { generateZodSchema } from "@/lib/schema-generator";
import { Form } from "@/types/form-builder";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const useMultiStepForm = (forms: Form[]) => {
  const schemas = useMemo(() => {
    return forms.map((form) => {
      const { schema, defaultValues } = generateZodSchema(form.elements);

      return { schema, defaultValues };
    });
  }, [forms]);

  const globalSchema = useMemo(() => {
    const mergedShape = schemas.reduce(
      (acc, s) => ({
        ...acc,
        ...s.schema.shape,
      }),
      {},
    );

    return z.object(mergedShape);
  }, [schemas]);

  const defaultValues = useMemo(() => {
    return Object.assign({}, ...schemas.map((s) => s.defaultValues));
  }, [schemas]);

  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm({
    resolver: zodResolver(globalSchema),
    defaultValues,
    mode: "onChange",
  });

  const currentForm = forms[currentStep];

  const isLastStep = currentStep === forms.length - 1;
  const progress = ((currentStep + 1) / forms.length) * 100;

  const handleNextButton = async () => {
    const currentFields = forms[currentStep].elements.map(
      (element) => element.name,
    );

    const isValid = await form.trigger(currentFields);

    if (isValid && !isLastStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBackButton = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return {
    currentStep,
    currentForm,
    form,
    progress,
    handleNextButton,
    handleBackButton,
    isLastStep,
  };
};
