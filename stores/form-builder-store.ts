import { generateCode } from "@/lib/utils";
import { TForm, TInputType, TUpdateInput } from "@/types/types";
import { create } from "zustand";

type State = {
  forms: TForm[];
  selectedForm: string;
};

type Action = {
  addForm: () => void;
  removeForm: (id: string) => void;
  setSelectedForm: (id: string) => void;
  addInput: (formId: string, type: TInputType) => void;
  removeInput: (formId: string, inputId: string) => void;
  updateInput: (formId: string, inputId: string, data: TUpdateInput) => void;
};

export const useFormBuilderStore = create<State & Action>((set) => ({
  selectedForm: "",
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
  setSelectedForm: (id) => set(() => ({ selectedForm: id })),
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
                  placeholder: "",
                  description: "",
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
  updateInput: (formId, inputId, data) =>
    set((state) => ({
      forms: state.forms.map((form) =>
        form.id === formId
          ? {
              ...form,
              inputs: form.inputs.map((input) =>
                input.id === inputId ? { ...input, ...data } : input,
              ),
            }
          : form,
      ),
    })),
}));
