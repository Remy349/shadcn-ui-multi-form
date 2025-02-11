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
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Available Input Fields</SheetTitle>
          <SheetDescription>
            Choose from a variety of input fields to build your form. Simply
            select and add them to get started!
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 flex flex-col space-y-2">
          <Button
            variant="outline"
            className="font-medium justify-start"
            size="sm"
            onClick={() => handleAddInput("input")}
          >
            <Component className="size-4 mr-2" />
            Input
          </Button>
          <Button
            variant="outline"
            className="font-medium justify-start"
            size="sm"
            onClick={() => handleAddInput("textarea")}
          >
            <Component className="size-4 mr-2" />
            Textarea
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
