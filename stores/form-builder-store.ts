import { generateCode } from "@/lib/utils";
import { create } from "zustand";

type InputType = "text" | "email" | "password";

type Input = {
  id: string;
  label: string;
  type: InputType;
};

type Form = {
  id: string;
  inputs: Input[];
};

type State = {
  forms: Form[];
};

type Action = {
  addForm: () => void;
  removeForm: (id: string) => void;
  addInput: (formId: string) => void;
  removeInput: (formId: string, inputId: string) => void;
  updateInputLabel: (formId: string, inputId: string, label: string) => void;
  updateInputType: (formId: string, inputId: string, type: InputType) => void;
};

export const useFormBuilderStore = create<State & Action>((set) => ({
  forms: [
    {
      id: "1",
      inputs: [
        {
          id: "1",
          label: "Input 1",
          type: "text",
        },
      ],
    },
  ],
  addForm: () =>
    set((state) => ({
      forms: [
        ...state.forms,
        {
          id: generateCode(),
          inputs: [
            {
              id: generateCode(),
              label: "Input 1",
              type: "text",
            },
          ],
        },
      ],
    })),
  removeForm: (id) =>
    set((state) => ({
      forms:
        state.forms.length > 1
          ? state.forms.filter((form) => form.id !== id)
          : state.forms,
    })),
  addInput: (formId) =>
    set((state) => ({
      forms: state.forms.map((form) =>
        form.id === formId
          ? {
              ...form,
              inputs: [
                ...form.inputs,
                {
                  id: generateCode(),
                  label: `Input ${form.inputs.length + 1}`,
                  type: "text",
                },
              ],
            }
          : form,
      ),
    })),
  removeInput: (formId, inputId) =>
    set((state) => ({
      forms: state.forms.map((form) =>
        form.id === formId
          ? {
              ...form,
              inputs:
                form.inputs.length > 1
                  ? form.inputs.filter((input) => input.id !== inputId)
                  : form.inputs,
            }
          : form,
      ),
    })),
  updateInputLabel: (formId, inputId, label) =>
    set((state) => ({
      forms: state.forms.map((form) =>
        form.id === formId
          ? {
              ...form,
              inputs: form.inputs.map((input) =>
                input.id === inputId ? { ...input, label } : input,
              ),
            }
          : form,
      ),
    })),
  updateInputType: (formId, inputId, type) =>
    set((state) => ({
      forms: state.forms.map((form) =>
        form.id === formId
          ? {
              ...form,
              inputs: form.inputs.map((input) =>
                input.id === inputId ? { ...input, type } : input,
              ),
            }
          : form,
      ),
    })),
}));
