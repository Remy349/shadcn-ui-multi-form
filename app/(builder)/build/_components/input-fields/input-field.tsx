import { TInput, TInputType } from "@/types/types";
import { RemoveInput } from "./remove-input";
import { EditInputDialog } from "./edit-input-dialog";
import { Component } from "lucide-react";

interface IProps {
  formId: string;
  input: TInput;
}

const inputComponents: Record<TInputType, string> = {
  input: "Input",
  password: "Password",
  textarea: "Textarea",
  checkbox: "Checkbox",
  switch: "Switch",
  "file-input": "File Input",
  "rich-text-editor": "Rich Text Editor",
};

export const InputField = ({ formId, input }: IProps) => {
  return (
    <div className="flex items-center border rounded-md p-1 w-full">
      <div className="flex items-center">
        <div className="flex items-center justify-center size-8">
          <Component className="size-4 mr-2" />
        </div>
        <p className="text-sm">{inputComponents[input.type]}</p>
      </div>
      <div className="flex items-center ml-auto">
        <EditInputDialog formId={formId} input={input} />
        <RemoveInput formId={formId} inputId={input.id} />
      </div>
    </div>
  );
};
