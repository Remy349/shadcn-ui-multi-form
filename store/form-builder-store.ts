import { create } from "zustand";
import { generateId } from "@/lib/utils";
import type {
  BuilderElement,
  Form,
  UpdateForm,
  UpdateFormElement,
} from "@/types/form-builder";
import { isFieldElement, isLayoutElement } from "@/types/form-builder";

const sanitizeLayoutColumns = (
  element: BuilderElement,
  fieldIds: Set<string>,
): BuilderElement => {
  if (!isLayoutElement(element) || element.type !== "two-columns") {
    return element;
  }

  const unique = (ids: string[]) => Array.from(new Set(ids));
  const filterKnownFields = (ids: string[]) =>
    ids.filter((id) => fieldIds.has(id));

  const left = filterKnownFields(unique(element.columns.left));
  const right = filterKnownFields(unique(element.columns.right));

  return {
    ...element,
    columns: {
      left,
      right,
    },
  };
};

interface State {
  forms: Form[];
  currentFormIndex: number;
  selectedElementId: string | null;
  isPreviewMode: boolean;
}

interface Actions {
  setSelectedElementId: (elementId: string | null) => void;
  insertNode: (element: BuilderElement) => void;
  updateNode: (elementId: string, updatedElement: UpdateFormElement) => void;
  removeNode: (elementId: string) => void;
  setCurrentFormIndex: (index: number) => void;
  addForm: () => void;
  updateForm: (updatedForm: UpdateForm) => void;
  deleteForm: (formId: string) => void;
  clearAll: () => void;
  togglePreviewMode: () => void;
}

export const useFormBuilderStore = create<State & Actions>((set, get) => ({
  forms: [
    {
      id: generateId(),
      title: "Step 1",
      description: "",
      elements: [],
    },
  ],
  currentFormIndex: 0,
  selectedElementId: null,
  isPreviewMode: false,
  setSelectedElementId: (elementId) => {
    set({ selectedElementId: elementId });
  },
  insertNode: (element) => {
    const { forms, currentFormIndex } = get();
    const updatedForms = forms.map((form, index) =>
      index === currentFormIndex
        ? { ...form, elements: [...form.elements, element] }
        : form,
    );

    set({ forms: updatedForms });
  },
  updateNode: (elementId, updatedElement) => {
    const { forms, currentFormIndex, selectedElementId } = get();
    const updatedForms = forms.map((form, index) =>
      index === currentFormIndex
        ? {
            ...form,
            elements: (() => {
              const nextElements = form.elements.map((element) =>
                element.id === elementId
                  ? ({
                      ...element,
                      ...updatedElement,
                      kind: element.kind,
                      type: element.type,
                    } as BuilderElement)
                  : element,
              );

              const fieldIds = new Set(
                nextElements
                  .filter(isFieldElement)
                  .map((element) => element.id),
              );

              return nextElements.map((element) =>
                sanitizeLayoutColumns(element, fieldIds),
              );
            })(),
          }
        : form,
    );

    set({
      forms: updatedForms,
      selectedElementId:
        selectedElementId === elementId ? elementId : selectedElementId,
    });
  },
  removeNode: (elementId) => {
    const { forms, currentFormIndex, selectedElementId } = get();
    const updatedForms = forms.map((form, index) =>
      index === currentFormIndex
        ? {
            ...form,
            elements: (() => {
              const filtered = form.elements.filter(
                (element) => element.id !== elementId,
              );

              const fieldIds = new Set(
                filtered.filter(isFieldElement).map((element) => element.id),
              );

              return filtered.map((element) =>
                sanitizeLayoutColumns(element, fieldIds),
              );
            })(),
          }
        : form,
    );

    set({
      forms: updatedForms,
      selectedElementId:
        selectedElementId === elementId ? null : selectedElementId,
    });
  },
  setCurrentFormIndex: (index) => {
    set({ currentFormIndex: index, selectedElementId: null });
  },
  addForm: () => {
    const { forms } = get();
    const newForm: Form = {
      id: generateId(),
      title: `Step ${forms.length + 1}`,
      description: "",
      elements: [],
    };

    set({
      forms: [...forms, newForm],
      currentFormIndex: forms.length,
      selectedElementId: null,
    });
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

    set({
      forms: updatedForms,
      currentFormIndex: newCurrentFormIndex,
      selectedElementId: null,
    });
  },
  clearAll: () => {
    set({
      forms: [
        { id: generateId(), title: "Step 1", description: "", elements: [] },
      ],
      currentFormIndex: 0,
      selectedElementId: null,
    });
  },
  togglePreviewMode: () => {
    const { isPreviewMode } = get();

    set({ isPreviewMode: !isPreviewMode });
  },
}));
