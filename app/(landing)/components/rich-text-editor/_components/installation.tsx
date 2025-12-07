"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock, CodeBlockContent } from "@/lib/codegen/code-block";
import { formatCode } from "@/lib/codegen/formatter";
import { CheckCheckIcon, CopyIcon, PackageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const rawCode = `
// rich-text-editor.tsx
// Put this file in /components/ui/editor/rich-text-editor.tsx

"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./toolbar";

interface EditorProps {
  content: string;
  onChange(text: string): void;
}

export const RichTextEditor = ({ content, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="space-y-2 prose-sm prose-ol:list-decimal prose-ul:list-disc">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

// toolbar.tsx
// Put this file in /components/ui/editor/toolbar.tsx

import type { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
} from "lucide-react";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null;

  return (
    <div className="border border-input rounded-md bg-background p-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </Toggle>
    </div>
  );
};
`;

export const Installation = () => {
  const [code, setCode] = useState("");
  const [isCopiedId, setIsCopiedId] = useState("");

  const handleCopyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopiedId(id);

    setTimeout(() => {
      setIsCopiedId("");
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

  const steps = [
    {
      step: 1,
      title: "Install dependencies",
      description:
        "Install the required packages for the Password Input component.",
      code: "pnpm add @tiptap/react @tiptap/pm @tiptap/starter-kit",
    },
    {
      step: 2,
      title: "Copy the component",
      description: "Copy and paste the component code into your project.",
      code,
    },
    {
      step: 3,
      title: "Update imports",
      description: "Import and use the component in your project.",
      code: 'import { RichTextEditor } from "@/components/ui/editor/rich-text-editor";',
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="tracking-tighter text-xl font-bold text-foreground">
        Installation
      </h2>
      <Tabs defaultValue="manual">
        <TabsList className="bg-secondary">
          <TabsTrigger
            value="manual"
            className="gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            <PackageIcon className="h-4 w-4" />
            Manual
          </TabsTrigger>
        </TabsList>
        <TabsContent value="manual" className="mt-4 space-y-6">
          {steps.map((step, index) => (
            <div key={step.step} className="relative flex gap-4">
              {index < steps.length - 1 && (
                <div className="absolute left-4 top-10 h-[calc(100%-10px)] w-px bg-border" />
              )}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground">
                {step.step}
              </div>
              <div className="flex-1 space-y-3 pb-6">
                <div>
                  <h3 className="font-medium text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between bg-secondary/50 px-3 py-2">
                    <span className="text-xs text-muted-foreground">
                      {step.step === 1
                        ? "Terminal"
                        : step.step === 2
                          ? "Component"
                          : "Usage"}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() =>
                        handleCopyToClipboard(step.code, `step-${step.step}`)
                      }
                    >
                      {isCopiedId === `step-${step.step}` ? (
                        <CheckCheckIcon />
                      ) : (
                        <CopyIcon />
                      )}
                    </Button>
                  </div>
                  <CodeBlock className="min-h-full w-full">
                    <CodeBlockContent code={step.code} lang="tsx" />
                  </CodeBlock>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
