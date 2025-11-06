import { Button } from "@/components/ui/button";
import { Form, UpdateForm } from "@/types/form-builder";
import {
  CodeIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  Settings2Icon,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
          <div className="flex items-center space-x-4">
            <Button variant="secondary" size="icon-sm" onClick={addForm}>
              <PlusIcon />
            </Button>
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-4"
            />
            <div className="flex items-center space-x-2">
              <Select
                value={currentForm.title}
                onValueChange={handleSelectForm}
              >
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
                    onClick={() => deleteForm(currentForm.id)}
                  >
                    <Trash2Icon className="text-red-500" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Badge variant="secondary">Preview Mode</Badge>
        )}
        <div className="flex items-center space-x-2">
          {!isPreviewMode && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  <Settings2Icon /> Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <CodeIcon /> Export Code
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={clearAll}>
                  <Trash2Icon /> Clear All
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button size="icon-sm" variant="outline" onClick={togglePreviewMode}>
            {isPreviewMode ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        </div>
      </div>
    </header>
  );
};
