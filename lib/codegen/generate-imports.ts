import { FormElement, FormElementType } from "@/types/form-builder";

export const generateImports = (elements: FormElement[]) => {
  const importDefaultSet = new Set([
    '"use client"',
    "",
    'import { useForm, Controller } from "react-hook-form"',
    'import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"',
    'import { Button } from "@/components/ui/button"',
    'import { Field, FieldDescription, FieldError, FieldLabel, FieldGroup } from "@/components/ui/field"',
    'import { Spinner } from "@/components/ui/spinner"',
    'import { toast } from "sonner"',
  ]);

  const dynamicImports: Record<FormElementType, string[]> = {
    text: ['import { Input } from "@/components/ui/input"'],
    checkbox: ['import { Checkbox } from "@/components/ui/checkbox"'],
    switch: ['import { Switch } from "@/components/ui/switch"'],
    textarea: ['import { Textarea } from "@/components/ui/textarea"'],
    select: [
      'import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"',
    ],
    password: [
      'import { PasswordInput } from "@/components/ui/password-input"',
    ],
    file: ['import { FileInput } from "@/components/ui/file-input"'],
    email: [
      'import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"',
      'import { MailIcon } from "lucide-react"',
    ],
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
