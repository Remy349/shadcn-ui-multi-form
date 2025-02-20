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
};

export const InputField = ({ formId, input }: IProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center border rounded-md p-2 w-full">
        <Component className="size-4 mr-2" />
        <p className="text-sm">{inputComponents[input.type]}</p>
      </div>
      <div className="flex items-center">
        <EditInputDialog formId={formId} input={input} />
        <RemoveInput formId={formId} inputId={input.id} />
      </div>
    </div>
  );
};
