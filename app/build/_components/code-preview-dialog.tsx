import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CodePreview } from "./code-preview";

export const CodePreviewDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="font-medium">
          Show code preview
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[80vw] w-full max-h-[80vh] h-full flex flex-col">
        <DialogHeader>
          <DialogTitle>Generated React Component</DialogTitle>
          <DialogDescription>
            This is the code for your generated multi-step form component.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-hidden">
          <CodePreview />
        </div>
      </DialogContent>
    </Dialog>
  );
};
