import { Button } from "@/components/ui/button";
import { Form, UpdateForm } from "@/types/form-builder";
import { CodeIcon, Trash2Icon } from "lucide-react";
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

interface ToolbarProps {
  forms: Form[];
  currentForm: Form;
  updateForm: (updatedForm: UpdateForm) => void;
}

export const Toolbar = ({ forms, currentForm, updateForm }: ToolbarProps) => {
  return (
    <header className="sticky border-b w-full z-10 top-0 left-0 bg-background">
      <div className="flex items-center justify-between h-[70px] px-4">
        <div className="flex items-center gap-2 p-1 border-1 rounded-md">
          <Select value={currentForm.title}>
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
          <div className="flex items-center spaca-x-0.5">
            <EditForm currentForm={currentForm} updateForm={updateForm} />
            {forms.length > 1 && (
              <Button variant="ghost" size="icon-sm">
                <Trash2Icon className="text-red-500" />
              </Button>
            )}
          </div>
        </div>
        <Button size="sm">
          <CodeIcon /> Export
        </Button>
      </div>
    </header>
  );
};
