import { Code } from "@/app/components/_components/code";

export const EditorRenderCode = () => {
  const code = `"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Toolbar } from "./toolbar"

interface EditorProps {
  content: string
  onChange(text: string): void
}

export const Editor = ({ content, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="space-y-2 prose-sm prose-ol:list-decimal prose-ul:list-disc">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}`;

  return <Code code={code} />;
};
