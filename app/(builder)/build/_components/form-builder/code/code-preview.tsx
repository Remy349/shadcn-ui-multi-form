import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CodeBlock, CodeBlockContent } from "@/lib/codegen/code-block";
import { generateFormCode } from "@/lib/codegen/generate-form-code";
import { useFormBuilderStore } from "@/store/form-builder-store";
import { CheckCheckIcon, CodeIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const CodePreview = () => {
  const { forms } = useFormBuilderStore();

  const [isCopied, setIsCopied] = useState(false);
  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("");

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    toast.success("Code copied to clipboard");
  };

  useEffect(() => {
    const generateCode = async () => {
      const { code, filename } = await generateFormCode(forms);

      setCode(code);
      setFilename(filename);
    };

    generateCode();
  }, [forms]);

  return (
    <Sheet>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button size="icon-sm" variant="secondary">
              <CodeIcon />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>View Generated Code</TooltipContent>
      </Tooltip>
      <SheetContent side="right" className="min-w-[650px]">
        <div className="flex h-full flex-col">
          <SheetHeader className="p-6 pb-4">
            <SheetTitle>Generated Code</SheetTitle>
            <SheetDescription>
              Copy and paste this code into your project.
            </SheetDescription>
          </SheetHeader>
          <div className="flex items-center justify-between border-t border-b px-6 py-3 bg-muted">
            <span className="font-mono text-xs">{filename}</span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCopyToClipboard}
            >
              {isCopied ? <CheckCheckIcon /> : <CopyIcon />}
            </Button>
          </div>
          <ScrollArea className="min-h-0">
            <CodeBlock className="min-h-full w-full">
              <CodeBlockContent code={code} lang="tsx" />
            </CodeBlock>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
