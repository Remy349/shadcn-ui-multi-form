import {
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "input-otp";
import { PlusIcon, Settings2Icon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { getLayoutRegistryItem } from "@/lib/builder/layout-registry";
import { getFieldRegistryItem } from "@/lib/builder/registry";
import { toCamelCase } from "@/lib/utils";
import type {
  BuilderElement,
  FieldElementType,
  LayoutElement,
  LayoutElementType,
  UpdateFormElement,
} from "@/types/form-builder";
import { isFieldElement, isLayoutElement } from "@/types/form-builder";

interface PropertiesSidebarProps {
  selectedElement: BuilderElement | null;
  elements: BuilderElement[];
  updateNode: (elementId: string, updatedElement: UpdateFormElement) => void;
}

export const PropertiesSidebar = ({
  selectedElement,
  elements,
  updateNode,
}: PropertiesSidebarProps) => {
  const fieldElement =
    selectedElement && isFieldElement(selectedElement) ? selectedElement : null;
  const layoutElement =
    selectedElement && isLayoutElement(selectedElement)
      ? selectedElement
      : null;

  const elementTypeLabel = (type: FieldElementType) => {
    return getFieldRegistryItem(type).label;
  };

  const layoutTypeLabel = (type: LayoutElementType) => {
    return getLayoutRegistryItem(type).label;
  };

  const fieldElements = elements.filter(isFieldElement);
  const layoutElements = elements.filter(isLayoutElement);
  const fieldById = new Map(
    fieldElements.map((element) => [element.id, element]),
  );
  const referencedFieldIds = new Set(
    layoutElements.flatMap((element) =>
      element.type === "two-columns"
        ? [...element.columns.left, ...element.columns.right]
        : [],
    ),
  );
  const availableFieldElements = fieldElements
    .filter((element) => !referencedFieldIds.has(element.id))
    .sort((a, b) => a.label.localeCompare(b.label));

  const handleAddColumnItem = (
    layout: LayoutElement,
    column: "left" | "right",
    fieldId: string,
  ) => {
    if (layout.type !== "two-columns") return;

    const current = layout.columns[column];
    const nextValue = current[0] === fieldId ? current : [fieldId];

    updateNode(layout.id, {
      columns: {
        ...layout.columns,
        [column]: nextValue,
      },
    });
  };

  const handleRemoveColumnItem = (
    layout: LayoutElement,
    column: "left" | "right",
    fieldId: string,
  ) => {
    if (layout.type !== "two-columns") return;

    updateNode(layout.id, {
      columns: {
        ...layout.columns,
        [column]: layout.columns[column].filter((id) => id !== fieldId),
      },
    });
  };

  return (
    <Sidebar collapsible="none" className="border-l sticky top-0 h-svh">
      <SidebarHeader>
        <div className="p-2 space-y-0.5">
          <div className="flex items-center gap-2">
            <Settings2Icon className="size-4 text-sidebar-foreground" />
            <h2 className="text-sm font-semibold text-sidebar-foreground">
              Properties
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Customize the selected element
          </p>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <ScrollArea className="h-[calc(100svh-5rem)]">
        <SidebarContent>
          {fieldElement ? (
            <>
              <SidebarGroup>
                <SidebarGroupLabel>Element Type</SidebarGroupLabel>
                <SidebarGroupContent className="px-2">
                  <Input
                    className="bg-background"
                    value={elementTypeLabel(fieldElement.type)}
                    disabled
                  />
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator className="mx-0" />
              <SidebarGroup>
                <SidebarGroupLabel>Basic Properties</SidebarGroupLabel>
                <SidebarGroupContent className="px-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs" htmlFor="label">
                        Label
                      </Label>
                      <Input
                        id="label"
                        value={fieldElement.label}
                        className="bg-background"
                        onChange={(e) =>
                          updateNode(fieldElement.id, {
                            label: e.target.value,
                            name: toCamelCase(e.target.value),
                          })
                        }
                        autoComplete="off"
                        placeholder="Enter field label"
                      />
                    </div>
                    {![
                      "switch",
                      "checkbox",
                      "file",
                      "rich-text-editor",
                      "input-otp",
                      "slider",
                      "radio-group",
                    ].includes(fieldElement.type) && (
                      <div className="space-y-2">
                        <Label className="text-xs" htmlFor="placeholder">
                          Placeholder (Optional)
                        </Label>
                        <Input
                          id="placeholder"
                          value={fieldElement.placeholder}
                          className="bg-background"
                          onChange={(e) =>
                            updateNode(fieldElement.id, {
                              placeholder: e.target.value,
                            })
                          }
                          autoComplete="off"
                          placeholder="Enter placeholder text"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label className="text-xs" htmlFor="description">
                        Description (Optional)
                      </Label>
                      <Input
                        id="description"
                        value={fieldElement.description}
                        className="bg-background"
                        onChange={(e) =>
                          updateNode(fieldElement.id, {
                            description: e.target.value,
                          })
                        }
                        autoComplete="off"
                        placeholder="Add a helpful description"
                      />
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator className="mx-0" />
              <SidebarGroup>
                <SidebarGroupLabel>Validation</SidebarGroupLabel>
                <SidebarGroupContent className="px-2">
                  <div className="space-y-4">
                    {!["input-otp"].includes(fieldElement.type) && (
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-xs" htmlFor="required">
                            Required Field
                          </Label>
                          <p className="text-muted-foreground text-xs">
                            User must fill this field
                          </p>
                        </div>
                        <Switch
                          id="required"
                          checked={fieldElement.required}
                          onCheckedChange={(checked) =>
                            updateNode(fieldElement.id, {
                              required: checked,
                            })
                          }
                        />
                      </div>
                    )}
                    {![
                      "select",
                      "checkbox",
                      "switch",
                      "file",
                      "date-picker",
                      "input-otp",
                      "slider",
                      "phone-input",
                      "radio-group",
                    ].includes(fieldElement.type) && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="min-length">
                            Minimum Length
                          </Label>
                          <Input
                            id="min-length"
                            type="number"
                            min={0}
                            value={fieldElement.minLength}
                            className="bg-background"
                            onChange={(e) =>
                              updateNode(fieldElement.id, {
                                minLength: Number(e.target.value),
                              })
                            }
                            autoComplete="off"
                            placeholder="Enter minimum length"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="max-length">
                            Maximum Length
                          </Label>
                          <Input
                            id="max-length"
                            type="number"
                            min={0}
                            value={fieldElement.maxLength}
                            className="bg-background"
                            onChange={(e) =>
                              updateNode(fieldElement.id, {
                                maxLength: Number(e.target.value),
                              })
                            }
                            autoComplete="off"
                            placeholder="Enter maximum length"
                          />
                        </div>
                      </>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-xs" htmlFor="disabled">
                          Disabled Field
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          Prevent user interaction with this field
                        </p>
                      </div>
                      <Switch
                        id="disabled"
                        checked={fieldElement.disabled}
                        onCheckedChange={(checked) =>
                          updateNode(fieldElement.id, {
                            disabled: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
              {fieldElement.type === "input-otp" && (
                <>
                  <SidebarSeparator className="mx-0" />
                  <SidebarGroup>
                    <SidebarGroupLabel>OTP Settings</SidebarGroupLabel>
                    <SidebarGroupContent className="px-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="otp-length">
                            Length
                          </Label>
                          <Input
                            id="otp-length"
                            type="number"
                            min={1}
                            max={8}
                            className="bg-background"
                            value={fieldElement.otpConfig?.length ?? 6}
                            onChange={(e) =>
                              updateNode(fieldElement.id, {
                                otpConfig: {
                                  ...fieldElement.otpConfig,
                                  length: Number(e.target.value) || 6,
                                },
                              })
                            }
                            autoComplete="off"
                            placeholder="Enter OTP length"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="otp-pattern">
                            Allowed Characters
                          </Label>
                          <Select
                            value={(() => {
                              const source = fieldElement.otpConfig?.pattern;
                              if (source === REGEXP_ONLY_CHARS)
                                return "letters";
                              if (source === REGEXP_ONLY_DIGITS)
                                return "digits";
                              return "alphanumeric";
                            })()}
                            onValueChange={(value) => {
                              const nextPattern =
                                value === "letters"
                                  ? REGEXP_ONLY_CHARS
                                  : value === "digits"
                                    ? REGEXP_ONLY_DIGITS
                                    : REGEXP_ONLY_DIGITS_AND_CHARS;
                              updateNode(fieldElement.id, {
                                otpConfig: {
                                  ...fieldElement.otpConfig,
                                  pattern: nextPattern,
                                },
                              });
                            }}
                          >
                            <SelectTrigger
                              id="otp-pattern"
                              className="bg-background w-full"
                            >
                              <SelectValue placeholder="Choose pattern" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="alphanumeric">
                                Alphanumeric (A–Z, 0–9)
                              </SelectItem>
                              <SelectItem value="letters">
                                Letters only (A–Z)
                              </SelectItem>
                              <SelectItem value="digits">
                                Digits only (0–9)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">
                            Controls which characters are allowed in the OTP.
                          </p>
                        </div>
                      </div>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </>
              )}
              {fieldElement.type === "slider" && (
                <>
                  <SidebarSeparator className="mx-0" />
                  <SidebarGroup>
                    <SidebarGroupLabel>Slider Settings</SidebarGroupLabel>
                    <SidebarGroupContent className="px-2">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 space-x-2">
                          <div className="space-y-2">
                            <Label className="text-xs" htmlFor="slider-min">
                              Min
                            </Label>
                            <Input
                              id="slider-min"
                              type="number"
                              className="bg-background"
                              value={fieldElement.sliderConfig?.min ?? 0}
                              onChange={(e) =>
                                updateNode(fieldElement.id, {
                                  sliderConfig: {
                                    ...fieldElement.sliderConfig,
                                    min: Number(e.target.value),
                                  },
                                })
                              }
                              autoComplete="off"
                              placeholder="Min value"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs" htmlFor="slider-max">
                              Max
                            </Label>
                            <Input
                              id="slider-max"
                              type="number"
                              className="bg-background"
                              value={fieldElement.sliderConfig?.max ?? 100}
                              onChange={(e) =>
                                updateNode(fieldElement.id, {
                                  sliderConfig: {
                                    ...fieldElement.sliderConfig,
                                    max: Number(e.target.value),
                                  },
                                })
                              }
                              autoComplete="off"
                              placeholder="Max value"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="slider-step">
                            Step
                          </Label>
                          <Input
                            id="slider-step"
                            type="number"
                            min={0.0001}
                            className="bg-background"
                            value={fieldElement.sliderConfig?.step ?? 1}
                            onChange={(e) =>
                              updateNode(fieldElement.id, {
                                sliderConfig: {
                                  ...fieldElement.sliderConfig,
                                  step: Number(e.target.value) || 1,
                                },
                              })
                            }
                            autoComplete="off"
                            placeholder="Step"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="slider-default">
                            Default Value
                          </Label>
                          <Input
                            id="slider-default"
                            type="number"
                            className="bg-background"
                            max={fieldElement.sliderConfig?.max}
                            min={fieldElement.sliderConfig?.min}
                            value={
                              fieldElement.sliderConfig?.defaultValue ?? 50
                            }
                            onChange={(e) =>
                              updateNode(fieldElement.id, {
                                sliderConfig: {
                                  ...fieldElement.sliderConfig,
                                  defaultValue: Number(e.target.value),
                                },
                              })
                            }
                            autoComplete="off"
                            placeholder="Default value"
                          />
                          <p className="text-xs text-muted-foreground">
                            Must be within min/max; defaults to 50 if empty.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label
                            className="text-xs"
                            htmlFor="slider-orientation"
                          >
                            Orientation
                          </Label>
                          <Select
                            value={
                              fieldElement.sliderConfig?.orientation ??
                              "horizontal"
                            }
                            onValueChange={(value) =>
                              updateNode(fieldElement.id, {
                                sliderConfig: {
                                  ...fieldElement.sliderConfig,
                                  orientation: value as
                                    | "horizontal"
                                    | "vertical",
                                },
                              })
                            }
                          >
                            <SelectTrigger
                              id="slider-orientation"
                              className="bg-background w-full"
                            >
                              <SelectValue placeholder="Orientation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="horizontal">
                                Horizontal
                              </SelectItem>
                              <SelectItem value="vertical">Vertical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </>
              )}
              {fieldElement.type === "file" && (
                <>
                  <SidebarSeparator className="mx-0" />
                  <SidebarGroup>
                    <SidebarGroupLabel>File Config</SidebarGroupLabel>
                    <SidebarGroupContent className="px-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="accept">
                            Accepted file types
                          </Label>
                          <Select
                            value={fieldElement.fileConfig?.accept}
                            onValueChange={(value) =>
                              updateNode(fieldElement.id, {
                                fileConfig: {
                                  ...fieldElement.fileConfig,
                                  accept: value,
                                },
                              })
                            }
                          >
                            <SelectTrigger
                              id="accept"
                              className="bg-background w-full"
                            >
                              <SelectValue placeholder="Select types" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="image/*">Images</SelectItem>
                              <SelectItem value="video/*">Videos</SelectItem>
                              <SelectItem value="application/pdf">
                                PDF
                              </SelectItem>
                              <SelectItem value=".zip,.rar">
                                ZIP / RAR
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="max-size">
                            Max file size (MB)
                          </Label>
                          <Input
                            id="max-size"
                            type="number"
                            className="bg-background"
                            min={1}
                            max={1024}
                            value={
                              fieldElement.fileConfig?.maxSize
                                ? fieldElement.fileConfig.maxSize /
                                  (1024 * 1024)
                                : 5
                            }
                            onChange={(e) =>
                              updateNode(fieldElement.id, {
                                fileConfig: {
                                  ...fieldElement.fileConfig,
                                  maxSize: Number(e.target.value) * 1024 * 1024,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="max-files" className="text-xs">
                            Max number of files
                          </Label>
                          <Input
                            id="max-files"
                            type="number"
                            className="bg-background"
                            disabled={!fieldElement.fileConfig?.multiple}
                            min={1}
                            max={10}
                            value={fieldElement.fileConfig?.maxFiles}
                            onChange={(e) =>
                              updateNode(fieldElement.id, {
                                fileConfig: {
                                  ...fieldElement.fileConfig,
                                  maxFiles: Number(e.target.value),
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="preview-size" className="text-xs">
                            Preview size
                          </Label>
                          <Select
                            value={fieldElement.fileConfig?.previewSize}
                            onValueChange={(value) =>
                              updateNode(fieldElement.id, {
                                fileConfig: {
                                  ...fieldElement.fileConfig,
                                  previewSize: value as "sm" | "md" | "lg",
                                },
                              })
                            }
                          >
                            <SelectTrigger
                              id="preview-size"
                              className="bg-background w-full"
                            >
                              <SelectValue placeholder="Size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sm">Small</SelectItem>
                              <SelectItem value="md">Medium</SelectItem>
                              <SelectItem value="lg">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="variant">
                            Variant
                          </Label>
                          <Select
                            value={fieldElement.fileConfig?.variant}
                            onValueChange={(value) =>
                              updateNode(fieldElement.id, {
                                fileConfig: {
                                  ...fieldElement.fileConfig,
                                  variant: value as
                                    | "default"
                                    | "compact"
                                    | "minimal",
                                },
                              })
                            }
                          >
                            <SelectTrigger
                              id="variant"
                              className="bg-background w-full"
                            >
                              <SelectValue placeholder="Select variant" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">Default</SelectItem>
                              <SelectItem value="compact">Compact</SelectItem>
                              <SelectItem value="minimal">Minimal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-xs" htmlFor="multiple">
                              Allow Multiple Files
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Upload more than one file
                            </p>
                          </div>
                          <Switch
                            id="multiple"
                            checked={fieldElement.fileConfig?.multiple}
                            onCheckedChange={(checked) =>
                              updateNode(fieldElement.id, {
                                fileConfig: {
                                  ...fieldElement.fileConfig,
                                  multiple: checked,
                                  maxFiles: 1,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-xs" htmlFor="show-preview">
                              Show Preview
                            </Label>
                            <p className="text-muted-foreground text-xs">
                              Displays a small preview of the selected files
                            </p>
                          </div>
                          <Switch
                            id="show-preview"
                            checked={fieldElement.fileConfig?.showPreview}
                            onCheckedChange={(checked) =>
                              updateNode(fieldElement.id, {
                                fileConfig: {
                                  ...fieldElement.fileConfig,
                                  showPreview: checked,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </>
              )}
              {fieldElement.type === "radio-group" && (
                <>
                  <SidebarSeparator className="mx-0" />
                  <SidebarGroup>
                    <SidebarGroupLabel>Radio Group Options</SidebarGroupLabel>
                    <SidebarGroupContent className="px-2">
                      <div className="grid space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs">Radio Items</Label>
                          <p className="text-xs text-muted-foreground">
                            {fieldElement.radioGroupOptions?.items.length} Items
                          </p>
                        </div>
                        <div className="space-y-2">
                          {fieldElement.radioGroupOptions?.items.map((item) => (
                            <div key={item.value}>
                              <InputGroup>
                                <InputGroupInput
                                  value={item.label}
                                  className="bg-background"
                                  autoComplete="off"
                                  placeholder={`Option ${item.label}`}
                                  onChange={(e) => {
                                    const updatedItems = [
                                      ...(fieldElement.radioGroupOptions
                                        ?.items || []),
                                    ];

                                    const nextIndex = updatedItems.findIndex(
                                      (entry) => entry.value === item.value,
                                    );

                                    if (nextIndex === -1) return;

                                    updatedItems[nextIndex] = {
                                      label: e.target.value,
                                      value: toCamelCase(e.target.value),
                                    };

                                    updateNode(fieldElement.id, {
                                      radioGroupOptions: {
                                        items: updatedItems,
                                      },
                                    });
                                  }}
                                />
                                <InputGroupAddon align="inline-end">
                                  <InputGroupButton
                                    size="icon-xs"
                                    onClick={() => {
                                      const updatedItems =
                                        fieldElement.radioGroupOptions?.items.filter(
                                          (entry) => entry.value !== item.value,
                                        ) || [];

                                      updateNode(fieldElement.id, {
                                        radioGroupOptions: {
                                          items: updatedItems,
                                        },
                                      });
                                    }}
                                  >
                                    <Trash2Icon />
                                  </InputGroupButton>
                                </InputGroupAddon>
                              </InputGroup>
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          className="border-dashed"
                          size="sm"
                          onClick={() => {
                            const currentItems =
                              fieldElement.radioGroupOptions?.items || [];

                            updateNode(fieldElement.id, {
                              radioGroupOptions: {
                                items: [
                                  ...currentItems,
                                  {
                                    label: `Option ${currentItems.length + 1}`,
                                    value: `option${currentItems.length + 1}`,
                                  },
                                ],
                              },
                            });
                          }}
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </>
              )}
              {fieldElement.type === "select" && (
                <>
                  <SidebarSeparator className="mx-0" />
                  <SidebarGroup>
                    <SidebarGroupLabel>Options</SidebarGroupLabel>
                    <SidebarGroupContent className="px-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="select-label">
                            Select Label
                          </Label>
                          <Input
                            id="select-label"
                            value={fieldElement.options?.selectLabel}
                            className="bg-background"
                            onChange={(e) =>
                              updateNode(fieldElement.id, {
                                options: {
                                  selectLabel: e.target.value,
                                  selectItems:
                                    fieldElement.options?.selectItems || [],
                                },
                              })
                            }
                            autoComplete="off"
                            placeholder="Enter select label"
                          />
                        </div>
                        <div className="grid space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Select Items</Label>
                            <p className="text-xs text-muted-foreground">
                              {fieldElement.options?.selectItems.length} Items
                            </p>
                          </div>
                          <div className="space-y-2">
                            {fieldElement.options?.selectItems.map((item) => (
                              <div key={item.value}>
                                <InputGroup>
                                  <InputGroupInput
                                    value={item.label}
                                    className="bg-background"
                                    autoComplete="off"
                                    placeholder={`Option ${item.label}`}
                                    onChange={(e) => {
                                      const updatedItems = [
                                        ...(fieldElement.options?.selectItems ||
                                          []),
                                      ];

                                      const nextIndex = updatedItems.findIndex(
                                        (entry) => entry.value === item.value,
                                      );

                                      if (nextIndex === -1) return;

                                      updatedItems[nextIndex] = {
                                        label: e.target.value,
                                        value: toCamelCase(e.target.value),
                                      };

                                      updateNode(fieldElement.id, {
                                        options: {
                                          selectLabel:
                                            fieldElement.options?.selectLabel ||
                                            "",
                                          selectItems: updatedItems,
                                        },
                                      });
                                    }}
                                  />
                                  <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                      size="icon-xs"
                                      onClick={() => {
                                        const updatedItems =
                                          fieldElement.options?.selectItems.filter(
                                            (entry) =>
                                              entry.value !== item.value,
                                          ) || [];

                                        updateNode(fieldElement.id, {
                                          options: {
                                            selectLabel:
                                              fieldElement.options
                                                ?.selectLabel || "",
                                            selectItems: updatedItems,
                                          },
                                        });
                                      }}
                                    >
                                      <Trash2Icon />
                                    </InputGroupButton>
                                  </InputGroupAddon>
                                </InputGroup>
                              </div>
                            ))}
                          </div>
                          <Button
                            variant="outline"
                            className="border-dashed"
                            size="sm"
                            onClick={() => {
                              const currentItems =
                                fieldElement.options?.selectItems || [];

                              updateNode(fieldElement.id, {
                                options: {
                                  selectLabel:
                                    fieldElement.options?.selectLabel || "",
                                  selectItems: [
                                    ...currentItems,
                                    {
                                      label: `Option ${currentItems.length + 1}`,
                                      value: `option${currentItems.length + 1}`,
                                    },
                                  ],
                                },
                              });
                            }}
                          >
                            <PlusIcon />
                          </Button>
                        </div>
                      </div>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </>
              )}
              <SidebarSeparator className="mx-0" />
              <SidebarGroup>
                <SidebarGroupLabel>Advanced</SidebarGroupLabel>
                <SidebarGroupContent className="px-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label id="field-name" className="text-xs">
                        Name
                      </Label>
                      <Input
                        value={fieldElement.name}
                        className="bg-background"
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">
                        Used as the variable name in the generated schema
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Field ID</Label>
                      <Input
                        value={fieldElement.id}
                        className="bg-background"
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">
                        Unique identifier for this field
                      </p>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </>
          ) : layoutElement ? (
            <>
              <SidebarGroup>
                <SidebarGroupLabel>Element Type</SidebarGroupLabel>
                <SidebarGroupContent className="px-2">
                  <Input
                    className="bg-background"
                    value={layoutTypeLabel(layoutElement.type)}
                    disabled
                  />
                </SidebarGroupContent>
              </SidebarGroup>
              {layoutElement.type === "separator" && (
                <>
                  <SidebarSeparator className="mx-0" />
                  <SidebarGroup>
                    <SidebarGroupLabel>Separator Label</SidebarGroupLabel>
                    <SidebarGroupContent className="px-2">
                      <div className="space-y-2">
                        <Label className="text-xs" htmlFor="separator-label">
                          Label (Optional)
                        </Label>
                        <Input
                          id="separator-label"
                          value={layoutElement.label ?? ""}
                          className="bg-background"
                          onChange={(e) =>
                            updateNode(layoutElement.id, {
                              label: e.target.value,
                            })
                          }
                          autoComplete="off"
                          placeholder="Enter separator label"
                        />
                      </div>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </>
              )}
              {layoutElement.type === "two-columns" && (
                <>
                  <SidebarSeparator className="mx-0" />
                  <div className="px-4 pt-4">
                    <div className="rounded-md border border-dashed bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                      Assign fields from this form to each column. Each column
                      holds one field at a time and can be replaced anytime.
                    </div>
                  </div>
                  <SidebarGroup>
                    <SidebarGroupLabel>Columns</SidebarGroupLabel>
                    <SidebarGroupContent className="px-2">
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Left Column</Label>
                            <span className="text-xs text-muted-foreground">
                              {layoutElement.columns.left.length} items
                            </span>
                          </div>
                          {layoutElement.columns.left.length > 0 ? (
                            <div className="space-y-2">
                              {layoutElement.columns.left
                                .slice(0, 1)
                                .map((fieldId) => {
                                  const field = fieldById.get(fieldId);
                                  const label = field?.label ?? fieldId;

                                  return (
                                    <InputGroup key={fieldId}>
                                      <InputGroupInput
                                        value={label}
                                        className="bg-background"
                                        disabled
                                      />
                                      <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                          size="icon-xs"
                                          onClick={() =>
                                            handleRemoveColumnItem(
                                              layoutElement,
                                              "left",
                                              fieldId,
                                            )
                                          }
                                        >
                                          <Trash2Icon />
                                        </InputGroupButton>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  );
                                })}
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              No fields assigned yet.
                            </p>
                          )}
                          <Select
                            value=""
                            onValueChange={(value) => {
                              if (!value) return;
                              handleAddColumnItem(layoutElement, "left", value);
                            }}
                          >
                            <SelectTrigger className="bg-background w-full">
                              <SelectValue placeholder="Add field to left column" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableFieldElements.length === 0 ? (
                                <SelectItem value="__empty" disabled>
                                  No available fields
                                </SelectItem>
                              ) : (
                                availableFieldElements.map((field) => (
                                  <SelectItem key={field.id} value={field.id}>
                                    {field.label}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Right Column</Label>
                            <span className="text-xs text-muted-foreground">
                              {layoutElement.columns.right.length} items
                            </span>
                          </div>
                          {layoutElement.columns.right.length > 0 ? (
                            <div className="space-y-2">
                              {layoutElement.columns.right
                                .slice(0, 1)
                                .map((fieldId) => {
                                  const field = fieldById.get(fieldId);
                                  const label = field?.label ?? fieldId;

                                  return (
                                    <InputGroup key={fieldId}>
                                      <InputGroupInput
                                        value={label}
                                        className="bg-background"
                                        disabled
                                      />
                                      <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                          size="icon-xs"
                                          onClick={() =>
                                            handleRemoveColumnItem(
                                              layoutElement,
                                              "right",
                                              fieldId,
                                            )
                                          }
                                        >
                                          <Trash2Icon />
                                        </InputGroupButton>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  );
                                })}
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              No fields assigned yet.
                            </p>
                          )}
                          <Select
                            value=""
                            onValueChange={(value) => {
                              if (!value) return;
                              handleAddColumnItem(
                                layoutElement,
                                "right",
                                value,
                              );
                            }}
                          >
                            <SelectTrigger className="bg-background w-full">
                              <SelectValue placeholder="Add field to right column" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableFieldElements.length === 0 ? (
                                <SelectItem value="__empty" disabled>
                                  No available fields
                                </SelectItem>
                              ) : (
                                availableFieldElements.map((field) => (
                                  <SelectItem key={field.id} value={field.id}>
                                    {field.label}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </>
              )}
            </>
          ) : (
            <div className="min-h-[calc(100vh-71px)] flex items-center justify-center">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Settings2Icon />
                  </EmptyMedia>
                  <EmptyTitle>No element selected</EmptyTitle>
                  <EmptyDescription>
                    Select an element from the canvas to edit its properties
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          )}
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
};
