import { generateCode } from "@/lib/utils";
import { TForm, TInputType } from "@/types/types";
import { create } from "zustand";

type State = {
  forms: TForm[];
};

type Action = {
  addForm: () => void;
  removeForm: (id: string) => void;
  addInput: (formId: string, type: TInputType) => void;
  removeInput: (formId: string, inputId: string) => void;
  updateInputLabel: (formId: string, inputId: string, label: string) => void;
};

export const useFormBuilderStore = create<State & Action>((set) => ({
  forms: [
    {
      id: generateCode(),
      inputs: [],
    },
  ],
  addForm: () =>
    set((state) => ({
      forms: [
        ...state.forms,
        {
          id: generateCode(),
          inputs: [],
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
  addInput: (formId, type) =>
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
                  type,
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
              inputs: form.inputs.filter((input) => input.id !== inputId),
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
}));
