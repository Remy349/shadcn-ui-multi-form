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
  setCurrentFormIndex: (index: number) => void;
  addForm: () => void;
  updateForm: (updatedForm: UpdateForm) => void;
  deleteForm: (formId: string) => void;
  clearAll: () => void;
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
  setCurrentFormIndex: (index) => {
    set({ currentFormIndex: index });
  },
  addForm: () => {
    const { forms } = get();
    const newForm: Form = {
      id: generateId(),
      title: `Step ${forms.length + 1}`,
      description: "",
      elements: [],
    };

    set({ forms: [...forms, newForm], currentFormIndex: forms.length });
  },
  updateForm: (updatedForm) => {
    const { forms, currentFormIndex } = get();
    const updatedForms = forms.map((form, index) =>
      index === currentFormIndex ? { ...form, ...updatedForm } : form,
    );

    set({ forms: updatedForms });
  },
  deleteForm: (formId) => {
    const { forms, currentFormIndex } = get();

    if (forms.length === 1) return;

    const updatedForms = forms.filter((form) => form.id !== formId);

    const newCurrentFormIndex =
      currentFormIndex >= updatedForms.length
        ? currentFormIndex - 1
        : currentFormIndex;

    set({ forms: updatedForms, currentFormIndex: newCurrentFormIndex });
  },
  clearAll: () => {
    set({
      forms: [
        { id: generateId(), title: "Step 1", description: "", elements: [] },
      ],
      currentFormIndex: 0,
    });
  },
}));
