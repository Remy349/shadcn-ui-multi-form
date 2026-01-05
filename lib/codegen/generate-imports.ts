import type { FormElement, FormElementType } from "@/types/form-builder";

export const generateImports = (
  elements: FormElement[],
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

  const dynamicImports: Record<FormElementType, string[]> = {
    text: ['import { Input } from "@/components/ui/input"'],
    checkbox: [
      'import { Checkbox } from "@/components/ui/checkbox"',
      'import { FieldContent } from "@/components/ui/field"',
    ],
    switch: [
      'import { Switch } from "@/components/ui/switch"',
      'import { FieldContent } from "@/components/ui/field"',
    ],
    textarea: ['import { Textarea } from "@/components/ui/textarea"'],
    select: [
      'import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"',
    ],
    password: [
      'import { PasswordInput } from "@/components/ui/password-input"',
    ],
    file: ['import { FileInput } from "@/components/ui/file-input"'],
    "date-picker": ['import { DatePicker } from "@/components/ui/date-picker"'],
    "input-otp": [
      'import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"',
    ],
    email: ['import { EmailInput } from "@/components/ui/email-input"'],
    "rich-text-editor": [
      'import { RichTextEditor } from "@/components/ui/editor/rich-text-editor"',
    ],
  };

  const proccessImports = (element: FormElement) => {
    const newImports = dynamicImports[element.type];

    newImports.map((newImp) => importDefaultSet.add(newImp));
  };

  elements.flat().forEach(proccessImports);

  return importDefaultSet;
};
