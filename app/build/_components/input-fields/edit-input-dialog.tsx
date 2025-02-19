import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { EditInput } from "./edit-input";
import { useState } from "react";
import { TInput } from "@/types/types";

interface IProps {
  formId: string;
  input: TInput;
}

export const EditInputDialog = ({ formId, input }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => setIsOpen((prev) => !prev);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="size-8" size="icon" variant="ghost">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Input Field</DialogTitle>
          <DialogDescription>
            Customize labels, placeholders and more to fit your form needs.
          </DialogDescription>
        </DialogHeader>
        <EditInput handleIsOpen={handleIsOpen} formId={formId} input={input} />
      </DialogContent>
    </Dialog>
  );
};
