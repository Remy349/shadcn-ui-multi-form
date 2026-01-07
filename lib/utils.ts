import type { Form } from "@/types/form-builder";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = () => {
  return crypto.randomUUID().split("-")[0];
};

export const getFormTemplateType = (forms: Form[]): "single" | "multi" => {
  return forms.length > 1 ? "multi" : "single";
};

export const toCamelCase = (label: string) => {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, "");
};

export const formatDate = (date: Date | undefined) => {
  if (!date) return "";

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
