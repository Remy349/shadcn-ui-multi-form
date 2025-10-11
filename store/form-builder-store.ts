import { generateId } from "@/lib/utils";
import { Form, FormElement } from "@/types/form-builder";
import { create } from "zustand";

interface State {
  forms: Form[];
  currentFormIndex: number;
  selectedElement: FormElement | null;
}

interface Actions {
  addElement: (element: FormElement) => void;
  deleteElement: (elementId: string) => void;
}

export const useFormBuilderStore = create<State & Actions>((set, get) => ({
  forms: [{ id: generateId(), title: "Step 1", elements: [] }],
  currentFormIndex: 0,
  selectedElement: null,
  addElement: (element) => {
    const { forms, currentFormIndex } = get();
    const updatedForms = forms.map((form, index) =>
      index === currentFormIndex
        ? { ...form, elements: [...form.elements, element] }
        : form,
    );

    set({ forms: updatedForms });
  },
  deleteElement: (elementId: string) => {
    const { forms, currentFormIndex } = get();
    const updatedForms = forms.map((form, index) =>
      index === currentFormIndex
        ? {
            ...form,
            elements: form.elements.filter(
              (element) => element.id !== elementId,
            ),
          }
        : form,
    );

    set({ forms: updatedForms });
  },
}));
