"use client";

import { FileInput } from "@/components/ui/file-input";
import { useState } from "react";

export const Preview = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <FileInput
      value={file}
      onChange={setFile}
      accept="image/*, application/pdf"
    />
  );
};
