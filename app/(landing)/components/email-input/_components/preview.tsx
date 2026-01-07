"use client";

import { Button } from "@/components/ui/button";
import { EmailInput } from "@/components/ui/email-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock, CodeBlockContent } from "@/lib/codegen/code-block";
import { formatCode } from "@/lib/codegen/formatter";
import { cn } from "@/lib/utils";
import { CheckCheckIcon, CodeIcon, CopyIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const rawCode = `
import { EmailInput } from "@/components/ui/email-input"

export const Preview = () => {
  return <EmailInput />
}
`;

export const Preview = () => {
  const [code, setCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    toast.success("Code copied to clipboard");
  };

  useEffect(() => {
    const formatRawCode = async () => {
      const codeFormatted = await formatCode(rawCode);

      setCode(codeFormatted);
    };

    formatRawCode();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="tracking-tighter text-xl font-bold text-foreground">
        Preview
      </h2>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Tabs defaultValue="preview">
          <div className="flex items-center justify-between border-b border-border bg-secondary/50 p-2">
            <TabsList className="h-12 bg-transparent">
              <TabsTrigger
                value="preview"
                className={cn(
                  "gap-2 data-[state=active]:bg-foreground/5 data-[state=active]:text-foreground/70",
                  "data-[state=active]:shadow-none",
                )}
              >
                <EyeIcon className="size-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className={cn(
                  "gap-2 data-[state=active]:bg-foreground/5 data-[state=active]:text-foreground/70",
                  "data-[state=active]:shadow-none",
                )}
              >
                <CodeIcon className="size-4" />
                Code
              </TabsTrigger>
            </TabsList>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleCopyToClipboard}
              className="text-muted-foreground hover:text-foreground"
            >
              {isCopied ? <CheckCheckIcon /> : <CopyIcon />}
            </Button>
          </div>
          <TabsContent value="preview" className="m-0">
            <div className="flex min-h-[200px] items-center justify-center p-8">
              <EmailInput />
            </div>
          </TabsContent>
          <TabsContent value="code" className="m-0">
            <div className="relative">
              <CodeBlock className="min-h-full w-full">
                <CodeBlockContent code={code} lang="tsx" />
              </CodeBlock>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
