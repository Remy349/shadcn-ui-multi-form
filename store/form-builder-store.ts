import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { generateId, toCamelCase } from "@/lib/utils";
import type {
  BuilderElement,
  FieldElement,
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

type PersistedBuilderState = Pick<State, "forms" | "currentFormIndex">;

interface Actions {
  setSelectedElementId: (elementId: string | null) => void;
  insertNode: (element: BuilderElement) => void;
  duplicateNode: (elementId: string) => void;
  reorderRootNodes: (activeId: string, overId: string) => void;
  updateNode: (elementId: string, updatedElement: UpdateFormElement) => void;
  removeNode: (elementId: string) => void;
  setCurrentFormIndex: (index: number) => void;
  addForm: () => void;
  updateForm: (updatedForm: UpdateForm) => void;
  deleteForm: (formId: string) => void;
  clearAll: () => void;
  togglePreviewMode: () => void;
}

const createEmptyForm = (): Form => ({
  id: generateId(),
  title: "Step 1",
  description: "",
  elements: [],
});

const getInitialForms = (): Form[] => [createEmptyForm()];

const clampFormIndex = (index: number, formsLength: number) => {
  if (formsLength <= 1) {
    return 0;
  }

  return Math.min(Math.max(0, Math.floor(index)), formsLength - 1);
};

const resolvePersistedState = (
  persistedState: Partial<PersistedBuilderState> | undefined,
): PersistedBuilderState => {
  const forms =
    Array.isArray(persistedState?.forms) && persistedState.forms.length > 0
      ? persistedState.forms
      : getInitialForms();

  const currentFormIndex = clampFormIndex(
    persistedState?.currentFormIndex ?? 0,
    forms.length,
  );

  return {
    forms,
    currentFormIndex,
  };
};

const withCopySuffix = (value: string) =>
  value.trim().length > 0 ? `${value} Copy` : value;

const duplicateFieldElement = (element: FieldElement): FieldElement => ({
  ...element,
  id: `${element.type}-${generateId()}`,
  label: withCopySuffix(element.label),
  name: toCamelCase(`${element.name} copy ${generateId()}`),
});

const insertAfterId = (ids: string[], targetId: string, insertedId: string) => {
  const targetIndex = ids.indexOf(targetId);

  if (targetIndex === -1) {
    return ids;
  }

  const next = [...ids];

  next.splice(targetIndex + 1, 0, insertedId);

  return next;
};

export const useFormBuilderStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      forms: getInitialForms(),
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

        set({ forms: updatedForms, selectedElementId: null });
      },
      duplicateNode: (elementId) => {
        const { forms, currentFormIndex, selectedElementId } = get();
        let duplicatedElementId: string | null = null;

        const updatedForms = forms.map((form, index) => {
          if (index !== currentFormIndex) {
            return form;
          }

          const sourceIndex = form.elements.findIndex(
            (element) => element.id === elementId,
          );

          if (sourceIndex === -1) {
            return form;
          }

          const sourceElement = form.elements[sourceIndex];
          const nextElements = [...form.elements];

          if (isFieldElement(sourceElement)) {
            const duplicatedField = duplicateFieldElement(sourceElement);
            duplicatedElementId = duplicatedField.id;

            const elementsWithLayoutUpdates = nextElements.map((element) => {
              if (!isLayoutElement(element) || element.type !== "two-columns") {
                return element;
              }

              const left = insertAfterId(
                element.columns.left,
                sourceElement.id,
                duplicatedField.id,
              );
              const right = insertAfterId(
                element.columns.right,
                sourceElement.id,
                duplicatedField.id,
              );

              if (
                left === element.columns.left &&
                right === element.columns.right
              ) {
                return element;
              }

              return {
                ...element,
                columns: {
                  left,
                  right,
                },
              };
            });

            const insertionIndex = elementsWithLayoutUpdates.findIndex(
              (element) => element.id === sourceElement.id,
            );

            elementsWithLayoutUpdates.splice(
              insertionIndex + 1,
              0,
              duplicatedField,
            );

            return {
              ...form,
              elements: elementsWithLayoutUpdates,
            };
          }

          if (
            isLayoutElement(sourceElement) &&
            sourceElement.type === "separator"
          ) {
            const duplicatedSeparator: BuilderElement = {
              ...sourceElement,
              id: `separator-${generateId()}`,
              label: sourceElement.label
                ? withCopySuffix(sourceElement.label)
                : sourceElement.label,
            };

            duplicatedElementId = duplicatedSeparator.id;
            nextElements.splice(sourceIndex + 1, 0, duplicatedSeparator);

            return {
              ...form,
              elements: nextElements,
            };
          }

          if (
            isLayoutElement(sourceElement) &&
            sourceElement.type === "two-columns"
          ) {
            const sourceFieldIds = Array.from(
              new Set([
                ...sourceElement.columns.left,
                ...sourceElement.columns.right,
              ]),
            );
            const elementById = new Map(
              form.elements.map((element) => [element.id, element] as const),
            );
            const duplicatedFieldsBySourceId = new Map<string, FieldElement>();

            for (const fieldId of sourceFieldIds) {
              const field = elementById.get(fieldId);

              if (!field || !isFieldElement(field)) {
                continue;
              }

              duplicatedFieldsBySourceId.set(
                fieldId,
                duplicateFieldElement(field),
              );
            }

            const duplicatedLeft = sourceElement.columns.left.flatMap(
              (fieldId) => {
                const duplicatedField = duplicatedFieldsBySourceId.get(fieldId);

                return duplicatedField ? [duplicatedField.id] : [];
              },
            );
            const duplicatedRight = sourceElement.columns.right.flatMap(
              (fieldId) => {
                const duplicatedField = duplicatedFieldsBySourceId.get(fieldId);

                return duplicatedField ? [duplicatedField.id] : [];
              },
            );
            const duplicatedLayout: BuilderElement = {
              ...sourceElement,
              id: `two-columns-${generateId()}`,
              columns: {
                left: duplicatedLeft,
                right: duplicatedRight,
              },
            };
            const duplicatedFields = sourceFieldIds.flatMap((fieldId) => {
              const duplicatedField = duplicatedFieldsBySourceId.get(fieldId);

              return duplicatedField ? [duplicatedField] : [];
            });
            let insertionIndex = sourceIndex;

            for (const fieldId of sourceFieldIds) {
              const fieldIndex = nextElements.findIndex(
                (element) => element.id === fieldId,
              );

              if (fieldIndex > insertionIndex) {
                insertionIndex = fieldIndex;
              }
            }

            duplicatedElementId = duplicatedLayout.id;
            nextElements.splice(
              insertionIndex + 1,
              0,
              duplicatedLayout,
              ...duplicatedFields,
            );

            return {
              ...form,
              elements: nextElements,
            };
          }

          return form;
        });

        set({
          forms: updatedForms,
          selectedElementId: duplicatedElementId ?? selectedElementId,
        });
      },
      reorderRootNodes: (activeId, overId) => {
        if (activeId === overId) return;

        const { forms, currentFormIndex } = get();
        const updatedForms = forms.map((form, index) => {
          if (index !== currentFormIndex) return form;

          const referencedFieldIds = new Set<string>();
          const elementById = new Map(
            form.elements.map((element) => [element.id, element] as const),
          );

          for (const element of form.elements) {
            if (isLayoutElement(element) && element.type === "two-columns") {
              for (const id of element.columns.left) {
                referencedFieldIds.add(id);
              }
              for (const id of element.columns.right) {
                referencedFieldIds.add(id);
              }
            }
          }

          const roots = form.elements.filter(
            (element) => !referencedFieldIds.has(element.id),
          );

          const activeIndex = roots.findIndex(
            (element) => element.id === activeId,
          );
          const overIndex = roots.findIndex((element) => element.id === overId);

          if (activeIndex === -1 || overIndex === -1) {
            return form;
          }

          const reorderedRoots = [...roots];
          const [movedRoot] = reorderedRoots.splice(activeIndex, 1);

          if (!movedRoot) {
            return form;
          }

          reorderedRoots.splice(overIndex, 0, movedRoot);

          const attachedFieldIds = new Set<string>();
          const rebuiltElements: BuilderElement[] = [];

          for (const root of reorderedRoots) {
            rebuiltElements.push(root);

            if (!isLayoutElement(root) || root.type !== "two-columns") {
              continue;
            }

            for (const fieldId of [
              ...root.columns.left,
              ...root.columns.right,
            ]) {
              if (attachedFieldIds.has(fieldId)) {
                continue;
              }

              const fieldElement = elementById.get(fieldId);

              if (!fieldElement || !isFieldElement(fieldElement)) {
                continue;
              }

              rebuiltElements.push(fieldElement);
              attachedFieldIds.add(fieldId);
            }
          }

          const rebuiltIds = new Set(
            rebuiltElements.map((element) => element.id),
          );

          for (const element of form.elements) {
            if (rebuiltIds.has(element.id)) {
              continue;
            }

            rebuiltElements.push(element);
            rebuiltIds.add(element.id);
          }

          return {
            ...form,
            elements: rebuiltElements,
          };
        });

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
                    filtered
                      .filter(isFieldElement)
                      .map((element) => element.id),
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
          forms: getInitialForms(),
          currentFormIndex: 0,
          selectedElementId: null,
          isPreviewMode: false,
        });
      },
      togglePreviewMode: () => {
        const { isPreviewMode } = get();

        set({ isPreviewMode: !isPreviewMode });
      },
    }),
    {
      name: "multiform-builder-storage",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state): PersistedBuilderState => ({
        forms: state.forms,
        currentFormIndex: state.currentFormIndex,
      }),
      merge: (persistedState, currentState) => {
        const { forms, currentFormIndex } = resolvePersistedState(
          persistedState as Partial<PersistedBuilderState> | undefined,
        );

        return {
          ...currentState,
          forms,
          currentFormIndex,
        };
      },
    },
  ),
);
