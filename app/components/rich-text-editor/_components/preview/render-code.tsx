import { Code } from "@/app/components/_components/code";

export const RenderCode = () => {
  const code = `"use client"

import { Editor } from "@/components/ui/editor/editor"
import { useState } from "react"

export const Preview = () => {
  const [value, setValue] = useState("")

  return <Editor content={value} onChange={setValue} />
}`;

  return <Code code={code} />;
};
