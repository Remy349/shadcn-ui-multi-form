import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CodePreviewDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="font-medium">
          Show code preview
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>In progress...</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
