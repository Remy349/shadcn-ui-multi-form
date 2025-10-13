import { generateId } from "@/lib/utils";
import { Form, FormElement, UpdateForm } from "@/types/form-builder";
import { create } from "zustand";

interface State {
  forms: Form[];
  currentFormIndex: number;
  selectedElement: FormElement | null;
}

interface Actions {
  addElement: (element: FormElement) => void;
  deleteElement: (elementId: string) => void;
  updateForm: (updatedForm: UpdateForm) => void;
}

export const useFormBuilderStore = create<State & Actions>((set, get) => ({
  forms: [{ id: generateId(), title: "Step 1", description: "", elements: [] }],
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
  deleteElement: (elementId) => {
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
  updateForm: (updatedForm) => {
    const { forms, currentFormIndex } = get();
    const updatedForms = forms.map((form, index) =>
      index === currentFormIndex ? { ...form, ...updatedForm } : form,
    );

    set({ forms: updatedForms });
  },
}));
