"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { AlertCircleIcon, UploadIcon, XIcon, FileIcon } from "lucide-react";

export interface FileInputProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  value?: File[];
  onChange?: (files: File[]) => void;
  onError?: (error: string) => void;
  placeholder?: string;
  description?: string;
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

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      id,
      className,
      disabled = false,
      accept,
      multiple = true,
      maxSize,
      maxFiles,
      value = [],
      onChange,
      onError,
      placeholder = "Drag and drop your files here",
      description = "or click to browse",
      showPreview = true,
      previewSize = "md",
      variant = "default",
      dragActiveClassName,
      ...props
    },
    ref,
  ) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isDragActive, setIsDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>(value);
    const [errors, setErrors] = useState<string[]>([]);

    const validateFiles = useCallback(
      (filesToValidate: File[]): { valid: File[]; errors: string[] } => {
        const validFiles: File[] = [];
        const newErrors: string[] = [];

        filesToValidate.forEach((file) => {
          if (maxSize && file.size > maxSize) {
            newErrors.push(
              `${file.name} exceeds maximum size of ${formatFileSize(maxSize)}`,
            );

            return;
          }

          if (accept) {
            const acceptedTypes = accept.split(",").map((type) => type.trim());
            const isAccepted = acceptedTypes.some((type) => {
              if (type.endsWith("/*")) {
                return file.type.startsWith(type.replace("/*", ""));
              }

              return file.type === type || file.name.endsWith(type);
            });

            if (!isAccepted) {
              newErrors.push(
                `${file.name} is not an accepted file type. Accepted: ${accept}`,
              );

              return;
            }
          }

          validFiles.push(file);
        });

        const totalFiles = files.length + validFiles.length;

        if (maxFiles && totalFiles > maxFiles) {
          newErrors.push(
            `Maximum ${maxFiles} files allowed. You have ${files.length} and trying to add ${validFiles.length}.`,
          );

          return { valid: [], errors: newErrors };
        }

        return { valid: validFiles, errors: newErrors };
      },
      [files.length, maxSize, accept, maxFiles],
    );

    const handleFiles = useCallback(
      (filesToProcess: File[]) => {
        const { valid, errors } = validateFiles(filesToProcess);

        if (errors.length > 0) {
          setErrors(errors);
          onError?.(errors.join("; "));
        } else {
          setErrors([]);
        }

        if (valid.length > 0) {
          const newFiles = multiple ? [...files, ...valid] : valid;

          setFiles(newFiles);
          onChange?.(newFiles);
        }
      },
      [validateFiles, multiple, files, onChange, onError],
    );

    const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragActive(true);
      }
    }, []);

    const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragActive(false);
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragActive(false);

        if (disabled) return;

        const droppedFiles = Array.from(e.dataTransfer.files);

        handleFiles(droppedFiles);
      },
      [disabled, handleFiles],
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.currentTarget.files
        ? Array.from(e.currentTarget.files)
        : [];

      handleFiles(selectedFiles);

      e.currentTarget.value = "";
    };

    const removeFile = (indexToRemove: number) => {
      const newFiles = files.filter((_, index) => index !== indexToRemove);

      setFiles(newFiles);
      onChange?.(newFiles);
    };

    const triggerFileInput = () => {
      fileInputRef.current?.click();
    };

    const getPreviewImageSize = () => {
      const sizes = {
        sm: "w-12 h-12",
        md: "w-16 h-16",
        lg: "w-20 h-20",
      };
      return sizes[previewSize];
    };

    const variantStyles = {
      default: "border-2 border-dashed border-border",
      compact: "border border-border rounded-lg",
      minimal: "border-0 bg-secondary/50",
    };

    const variantPadding = {
      default: "p-8",
      compact: "p-4",
      minimal: "p-4",
    };

    return (
      <div className={cn("w-full", className)}>
        <div
          ref={ref}
          onDrag={handleDrag}
          onDragIn={handleDragIn}
          onDragOut={handleDragOut}
          onDrop={handleDrop}
          onClick={!disabled ? triggerFileInput : undefined}
          className={cn(
            "relative rounded-lg transition-all duration-200 cursor-pointer",
            variantStyles[variant],
            variantPadding[variant],
            isDragActive &&
              (dragActiveClassName ||
                "border-primary bg-primary/5 scale-[1.02]"),
            disabled && "cursor-not-allowed opacity-50",
            !isDragActive &&
              !disabled &&
              "hover:border-primary/50 hover:bg-secondary/30",
          )}
        >
          <input
            ref={fileInputRef}
            id={id}
            type="file"
            multiple={multiple}
            accept={accept}
            disabled={disabled}
            onChange={handleChange}
            className="hidden"
            {...props}
          />

          <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
            <UploadIcon
              className={cn(
                "transition-colors duration-200",
                isDragActive
                  ? "text-primary w-8 h-8"
                  : "text-muted-foreground w-6 h-6",
              )}
            />
            <div className="text-center">
              <p
                className={cn(
                  "font-semibold text-sm text-foreground",
                  isDragActive && "text-primary",
                )}
              >
                {placeholder}
              </p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            {maxSize && (
              <p className="text-xs text-muted-foreground mt-2">
                Max file size: {formatFileSize(maxSize)}
              </p>
            )}
            {maxFiles && (
              <p className="text-xs text-muted-foreground">
                Max files: {maxFiles}
              </p>
            )}
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mt-4 space-y-2">
            {errors.map((error, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
              >
                <AlertCircleIcon className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            ))}
          </div>
        )}

        {showPreview && files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3 text-foreground">
              {files.length} file{files.length !== 1 ? "s" : ""} selected
            </h3>
            <div
              className={cn(
                "space-y-2",
                previewSize === "lg" &&
                  "grid grid-cols-2 gap-4 space-y-0 md:grid-cols-3 lg:grid-cols-4",
              )}
            >
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className={cn(
                    "flex items-center justify-between p-3 bg-secondary/50 border border-border rounded-lg",
                    previewSize === "lg" &&
                      "flex-col items-start justify-start",
                  )}
                >
                  {previewSize !== "lg" && file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={file.name}
                      className={cn(
                        "rounded object-cover",
                        getPreviewImageSize(),
                      )}
                    />
                  ) : (
                    <div
                      className={cn(
                        "bg-primary/10 rounded flex items-center justify-center",
                        getPreviewImageSize(),
                      )}
                    >
                      <FileIcon className="w-6 h-6 text-primary" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "flex-1 min-w-0",
                      previewSize !== "lg" && "ml-3",
                    )}
                  >
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  {previewSize === "lg" && (
                    <p className="text-xs text-muted-foreground mt-2 w-full">
                      {formatFileSize(file.size)}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    disabled={disabled}
                    className="ml-2 p-1 hover:bg-destructive/10 rounded transition-colors disabled:opacity-50"
                    aria-label={`Remove ${file.name}`}
                  >
                    <XIcon className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

FileInput.displayName = "FileInput";
