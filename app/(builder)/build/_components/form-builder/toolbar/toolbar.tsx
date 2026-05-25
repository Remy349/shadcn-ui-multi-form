import {
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  RotateCcwIcon,
  Trash2Icon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Form, UpdateForm } from "@/types/form-builder";
import { CodePreview } from "../code/code-preview";
import { EditForm } from "./edit-form";

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
    const index = forms.findIndex((form) => form.id === value);

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
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="icon-sm" onClick={addForm}>
              <PlusIcon />
            </Button>
            <Select value={currentForm.id} onValueChange={handleSelectForm}>
              <SelectTrigger>
                <SelectValue placeholder="Select a form" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Forms</SelectLabel>
                  {forms.map((form) => (
                    <SelectItem key={form.id} value={form.id}>
                      {form.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1.5">
              <EditForm currentForm={currentForm} updateForm={updateForm} />
              {forms.length > 1 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon-sm"
                      className="bg-destructive/10 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2Icon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                      <AlertDialogMedia>
                        <Trash2Icon />
                      </AlertDialogMedia>
                      <AlertDialogTitle>
                        Delete step "{currentForm.title}"?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove this step and all of its
                        fields.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        onClick={() => deleteForm(currentForm.id)}
                      >
                        Delete step
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        ) : (
          <Badge variant="secondary">Preview Mode</Badge>
        )}
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="gap-1 text-muted-foreground hidden sm:inline-flex"
          >
            <CheckIcon data-icon="inline-start" />
            Auto-saved
          </Badge>
          <CodePreview />
          <Button
            size="icon-sm"
            variant="secondary"
            onClick={togglePreviewMode}
          >
            {isPreviewMode ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="bg-destructive/10 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <RotateCcwIcon />
                Clear
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <RotateCcwIcon />
                </AlertDialogMedia>
                <AlertDialogTitle>Reset the builder?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove every step and field from the current form
                  builder session.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={clearAll}>
                  Clear everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  );
};
