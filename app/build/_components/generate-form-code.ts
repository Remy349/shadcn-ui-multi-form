import { TInputType } from "@/types/types";

const generateImports = (inputsType: TInputType[]) => {
  const importsSet = new Set([
    "use client \n",
    "import { useState } from 'react'",
    "import { useForm } from 'react-hook-form'",
    "import { Button } from '@/components/ui/button'",
    "import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'",
    "import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'",
    "import { toast } from 'sonner'",
  ]);

  const inputComponents: Record<TInputType, string[]> = {
    input: ["import { Input } from '@/components/ui/input'"],
    textarea: ["import { Textarea } from '@/components/ui/textarea'"],
  };

  const proccessInput = (input: TInputType) => {
    const newImports = inputComponents[input];

    newImports.map((newImp) => importsSet.add(newImp));
  };

  inputsType.map(proccessInput);

  return importsSet;
};

export const generateFormCode = (inputsType: TInputType[]) => {
  const imports = Array.from(generateImports(inputsType)).join("\n");

  return imports;
};
