import { generateId } from "@/lib/utils";
import {
  Form,
  FormElement,
  UpdateForm,
  UpdateFormElement,
} from "@/types/form-builder";
import { create } from "zustand";

interface State {
  forms: Form[];
  currentFormIndex: number;
  selectedElement: FormElement | null;
}

interface Actions {
  setSelectedElement: (element: FormElement | null) => void;
  addElement: (element: FormElement) => void;
  updateElement: (elementId: string, updatedElement: UpdateFormElement) => void;
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
  setSelectedElement: (element) => {
    set({ selectedElement: element });
  },
  addElement: (element) => {
    const { forms, currentFormIndex } = get();
    const updatedForms = forms.map((form, index) =>
      index === currentFormIndex
        ? { ...form, elements: [...form.elements, element] }
        : form,
    );

    set({ forms: updatedForms });
  },
  updateElement: (elementId, updatedElement) => {
    const { forms, currentFormIndex, selectedElement } = get();
    const updatedForms = forms.map((form, index) =>
      index === currentFormIndex
        ? {
            ...form,
            elements: form.elements.map((element) =>
              element.id === elementId
                ? { ...element, ...updatedElement }
                : element,
            ),
          }
        : form,
    );

    set({
      forms: updatedForms,
      selectedElement:
        selectedElement?.id === elementId
          ? { ...selectedElement, ...updatedElement }
          : selectedElement,
    });
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
