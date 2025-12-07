"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CodeBlock, CodeBlockContent } from "@/lib/codegen/code-block";
import { formatCode } from "@/lib/codegen/formatter";
import { CheckCheckIcon, CopyIcon, PackageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const rawCode = `
// file-input.tsx
// Put this file in your /components/ui/file-input.tsx

"use client"

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { AlertCircleIcon, UploadIcon, XIcon, FileIcon } from "lucide-react";

export interface FileInputProps {
  id?: string;
  className?: string;
  name?: string;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  value?: File[];
  onChange?: (files: File[]) => void;
  onError?: (error: string) => void;
  showPreview?: boolean;
  previewSize?: "sm" | "md" | "lg";
  variant?: "default" | "compact" | "minimal";
  dragActiveClassName?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

const validateFileType = (file: File, accept?: string): boolean => {
  if (!accept) return true;

  const accepted = accept.split(",").map((t) => t.trim());

  return accepted.some((type) => {
    if (type.endsWith("/*")) {
      return file.type.startsWith(type.replace("/*", ""));
    }
    return file.type === type || file.name.endsWith(type);
  });
};

const validateFiles = ({
  files,
  newFiles,
  accept,
  maxFiles,
  maxSize,
}: {
  files: File[];
  newFiles: File[];
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
}) => {
  const valid: File[] = [];
  const errors: string[] = [];

  for (const file of newFiles) {
    if (maxSize && file.size > maxSize) {
      errors.push(
        \`\${file.name} exceeds \${formatFileSize(maxSize)} maximum size\`,
      );
      continue;
    }

    if (!validateFileType(file, accept)) {
      errors.push(\`\${file.name} is not an accepted file type (\${accept})\`);
      continue;
    }

    valid.push(file);
  }

  if (maxFiles && files.length + valid.length > maxFiles) {
    errors.push(\`Maximum \${maxFiles} files allowed\`);
    return { valid: [], errors };
  }

  return { valid, errors };
};

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      id,
      className,
      name,
      disabled = false,
      accept,
      multiple = true,
      maxSize,
      maxFiles,
      value = [],
      onChange,
      onError,
      showPreview = true,
      previewSize = "md",
      variant = "default",
      dragActiveClassName,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [files, setFiles] = useState<File[]>(value);
    const [isDragActive, setDragActive] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const triggerInput = () => !disabled && inputRef.current?.click();

    const handleFiles = useCallback(
      (incoming: File[]) => {
        const { valid, errors } = validateFiles({
          files,
          newFiles: incoming,
          accept,
          maxSize,
          maxFiles,
        });

        setErrors(errors);
        if (errors.length) onError?.(errors.join("; "));

        if (valid.length) {
          const updated = multiple ? [...files, ...valid] : valid;
          setFiles(updated);
          onChange?.(updated);
        }
      },
      [files, accept, maxFiles, maxSize, multiple, onChange, onError],
    );

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (!disabled) handleFiles(Array.from(e.dataTransfer.files));
    };

    const removeFile = (index: number) => {
      const updated = files.filter((_, i) => i !== index);
      setFiles(updated);
      onChange?.(updated);
    };

    const previewSizeClass = {
      sm: "w-12 h-12",
      md: "w-16 h-16",
      lg: "w-20 h-20",
    }[previewSize];

    const containerStyles = {
      default: "border-2 border-dashed border-border p-8",
      compact: "border border-border rounded-lg p-4",
      minimal: "border-0 bg-secondary/50 p-4",
    }[variant];

    return (
      <div className={cn("w-full", className)}>
        <div
          ref={ref}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={triggerInput}
          className={cn(
            "relative rounded-lg transition-all cursor-pointer",
            containerStyles,
            disabled && "opacity-50 cursor-not-allowed",
            isDragActive &&
              (dragActiveClassName ||
                "scale-[1.02] border-primary bg-primary/5"),
            !disabled &&
              !isDragActive &&
              "hover:border-primary/50 hover:bg-secondary/30",
          )}
        >
          <input
            ref={inputRef}
            id={id}
            name={name}
            type="file"
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            onChange={(e) => {
              handleFiles(Array.from(e.target.files || []));
              e.target.value = "";
            }}
            className="hidden"
            {...props}
          />
          <div className="flex flex-col items-center gap-2 pointer-events-none">
            <UploadIcon
              className={cn(
                "w-6 h-6 text-muted-foreground transition",
                isDragActive && "text-primary w-8 h-8",
              )}
            />
            <p
              className={cn(
                "font-semibold text-sm",
                isDragActive && "text-primary",
              )}
            >
              Drag and drop your files here
            </p>
            <p className="text-xs text-muted-foreground">or click to browse</p>

            <div className="flex items-center space-x-2">
              {maxSize && (
                <p className="text-xs text-muted-foreground">
                  Max size: {formatFileSize(maxSize)}
                </p>
              )}
              {maxFiles && (
                <p className="text-xs text-muted-foreground">
                  Max files: {maxFiles}
                </p>
              )}
            </div>
          </div>
        </div>
        {errors.length > 0 && (
          <div className="mt-4 space-y-2">
            {errors.map((err, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
              >
                <AlertCircleIcon className="w-4 h-4 text-destructive mt-0.5" />
                <p className="text-sm text-destructive">{err}</p>
              </div>
            ))}
          </div>
        )}
        {showPreview && files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">
              {files.length} file{files.length > 1 ? "s" : ""} selected
            </h3>

            <div
              className={cn(
                "space-y-2",
                previewSize === "lg" &&
                  "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 space-y-0",
              )}
            >
              {files.map((file, index) => {
                const isImage = file.type.startsWith("image/");

                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center space-x-4 justify-between p-3 bg-secondary/50 border border-border rounded-lg",
                      previewSize === "lg" && "flex-col items-start gap-2",
                    )}
                  >
                    {isImage ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className={cn("rounded object-cover", previewSizeClass)}
                      />
                    ) : (
                      <div
                        className={cn(
                          "rounded bg-primary/10 flex items-center justify-center",
                          previewSizeClass,
                        )}
                      >
                        <FileIcon className="w-6 h-6 text-primary" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      disabled={disabled}
                      className="ml-2 p-1 hover:bg-destructive/10 rounded transition disabled:opacity-50"
                    >
                      <XIcon className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
);

FileInput.displayName = "FileInput";
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
      title: "Copy the component",
      description: "Copy and paste the component code into your project.",
      code,
    },
    {
      step: 2,
      title: "Update imports",
      description: "Import and use the component in your project.",
      code: 'import { FileInput } from "@/components/ui/file-input";',
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
