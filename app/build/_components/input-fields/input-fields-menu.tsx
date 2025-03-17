import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { TInputType } from "@/types/types";
import { Component } from "lucide-react";
import { useState } from "react";

interface IProps {
  formId: string;
}

const inputComponents: { name: string; type: TInputType }[] = [
  { name: "Input", type: "input" },
  { name: "Password", type: "password" },
  { name: "Textarea", type: "textarea" },
  { name: "Checkbox", type: "checkbox" },
  { name: "Switch", type: "switch" },
  { name: "File Input", type: "file-input" },
  { name: "Rich Text Editor", type: "rich-text-editor" },
];

export const InputFieldsMenu = ({ formId }: IProps) => {
  const { addInput } = useFormBuilderStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddInput = (type: TInputType) => {
    addInput(formId, type);

    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="font-medium" size="sm">
          Add input
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px]">
        <SheetHeader>
          <SheetTitle>Available Input Fields</SheetTitle>
          <SheetDescription>
            Choose from a variety of input fields to build your form. Simply
            select and add them to get started!
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 flex flex-col space-y-2">
          {inputComponents
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((input) => (
              <Button
                key={input.name}
                variant="outline"
                className="font-medium justify-start"
                size="sm"
                onClick={() => handleAddInput(input.type)}
              >
                <Component className="size-4 mr-2" />
                {input.name}
              </Button>
            ))}
          <div className="border border-dashed rounded-md">
            <div className="flex flex-col items-center justify-center h-[8rem]">
              <h3 className="text-xs text-center font-semibold text-muted-foreground">
                More Input Fields Coming Soon!
              </h3>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
