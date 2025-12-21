import { Button } from "@/components/ui/button";
import { Form, UpdateForm } from "@/types/form-builder";
import {
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  RotateCcwIcon,
  Trash2Icon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditForm } from "./edit-form";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CodePreview } from "../code/code-preview";

interface ToolbarProps {
  forms: Form[];
  currentForm: Form;
  setCurrentFormIndex: (index: number) => void;
  addForm: () => void;
  updateForm: (updatedForm: UpdateForm) => void;
  deleteForm: (formId: string) => void;
  clearAll: () => void;
  isPreviewMode: boolean;
  togglePreviewMode: () => void;
}

export const Toolbar = ({
  forms,
  currentForm,
  setCurrentFormIndex,
  addForm,
  updateForm,
  deleteForm,
  clearAll,
  isPreviewMode,
  togglePreviewMode,
}: ToolbarProps) => {
  const handleSelectForm = (value: string) => {
    const index = forms.findIndex((form) => form.title === value);

    if (index !== -1) {
      setCurrentFormIndex(index);
    }
  };

  return (
    <header className="sticky border-b w-full z-50 top-0 left-0 bg-background">
      <div
        className={cn(
          "flex items-center justify-between h-[70px] px-4",
          isPreviewMode && "max-w-3xl mx-auto",
        )}
      >
        {!isPreviewMode ? (
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="icon-sm" onClick={addForm}>
              <PlusIcon />
            </Button>
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-4"
            />
            <Select value={currentForm.title} onValueChange={handleSelectForm}>
              <SelectTrigger>
                <SelectValue placeholder="Select a form" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Forms</SelectLabel>
                  {forms.map((form) => (
                    <SelectItem key={form.id} value={form.title}>
                      {form.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-1.5">
              <EditForm currentForm={currentForm} updateForm={updateForm} />
              {forms.length > 1 && (
                <Button
                  variant="secondary"
                  size="icon-sm"
                  className="text-destructive hover:text-destructive bg-destructive/10 hover:bg-destructive/10"
                  onClick={() => deleteForm(currentForm.id)}
                >
                  <Trash2Icon />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <Badge variant="secondary">Preview Mode</Badge>
        )}
        <div className="flex items-center space-x-2">
          <CodePreview />
          <Button
            size="icon-sm"
            variant="secondary"
            onClick={togglePreviewMode}
          >
            {isPreviewMode ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
          <Button
            variant="secondary"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 bg-destructive/10"
            onClick={clearAll}
          >
            <RotateCcwIcon />
            Clear
          </Button>
        </div>
      </div>
    </header>
  );
};
