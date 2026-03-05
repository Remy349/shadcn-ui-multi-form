import { getFieldCodegen } from "@/lib/builder/field-codegen";
import type { BuilderElement } from "@/types/form-builder";
import { isFieldElement, isLayoutElement } from "@/types/form-builder";

export const generateImports = (
  elements: BuilderElement[],
  isMultiForm: boolean,
) => {
  const importDefaultSet = new Set([
    '"use client"',
    "",
    'import z from "zod"',
    'import { zodResolver } from "@hookform/resolvers/zod"',
    'import { useForm, Controller } from "react-hook-form"',
    'import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"',
    'import { Button } from "@/components/ui/button"',
    'import { Field, FieldDescription, FieldError, FieldLabel, FieldGroup } from "@/components/ui/field"',
    'import { Spinner } from "@/components/ui/spinner"',
    'import { toast } from "sonner"',
  ]);

  if (isMultiForm) {
    importDefaultSet.add(
      'import { ChevronLeft, ChevronRight } from "lucide-react"',
    );
    importDefaultSet.add('import { Progress } from "@/components/ui/progress"');
    importDefaultSet.add('import { useState } from "react"');
  }

  const fieldElements = elements.flat().filter(isFieldElement);
  const layoutElements = elements.flat().filter(isLayoutElement);

  for (const element of fieldElements) {
    const { imports } = getFieldCodegen(element.type);

    for (const newImp of imports) {
      importDefaultSet.add(newImp);
    }
  }

  if (layoutElements.some((element) => element.type === "separator")) {
    importDefaultSet.add(
      'import { FieldSeparator } from "@/components/ui/field"',
    );
  }

  return importDefaultSet;
};
