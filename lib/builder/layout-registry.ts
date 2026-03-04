import { DividerHorizontalIcon, ViewVerticalIcon } from "@radix-ui/react-icons";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { generateId } from "@/lib/utils";
import type {
  LayoutElement,
  LayoutElementType,
  SeparatorLayoutElement,
  TwoColumnsLayoutElement,
} from "@/types/form-builder";

export type LayoutRegistryItem = {
  type: LayoutElementType;
  label: string;
  icon: LayoutIcon;
  createDefault: (id?: string) => LayoutElement;
};

export type LayoutIcon = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

const createTwoColumnsLayout = (id?: string): TwoColumnsLayoutElement => ({
  id: id ?? `two-columns-${generateId()}`,
  kind: "layout",
  type: "two-columns",
  columns: {
    left: [],
    right: [],
  },
});

const createSeparatorLayout = (id?: string): SeparatorLayoutElement => ({
  id: id ?? `separator-${generateId()}`,
  kind: "layout",
  type: "separator",
  label: "",
});

export const layoutRegistry: Record<LayoutElementType, LayoutRegistryItem> = {
  "two-columns": {
    type: "two-columns",
    label: "Two Columns",
    icon: ViewVerticalIcon,
    createDefault: createTwoColumnsLayout,
  },
  separator: {
    type: "separator",
    label: "Separator",
    icon: DividerHorizontalIcon,
    createDefault: createSeparatorLayout,
  },
} as const;

export const getLayoutRegistryItem = (type: LayoutElementType) => {
  return layoutRegistry[type];
};

export const getAllLayoutRegistryItems = () => {
  return Object.values(layoutRegistry);
};
