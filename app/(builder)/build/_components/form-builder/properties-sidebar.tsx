import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { toCamelCase } from "@/lib/utils";
import {
  FormElement,
  FormElementType,
  UpdateFormElement,
} from "@/types/form-builder";
import { PlusIcon, Settings2Icon, Trash2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertiesSidebarProps {
  selectedElement: FormElement | null;
  updateElement: (elementId: string, updatedElement: UpdateFormElement) => void;
}

export const PropertiesSidebar = ({
  selectedElement,
  updateElement,
}: PropertiesSidebarProps) => {
  const elementTypeLabel = (type: FormElementType) => {
    const labels: Record<FormElementType, string> = {
      text: "Text",
      email: "Email",
      textarea: "Textarea",
      checkbox: "Checkbox",
      switch: "Switch",
      password: "Password",
      select: "Select",
      file: "File",
    };

    return labels[type];
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
      <ScrollArea className="h-[calc(100svh-71px)]">
        <SidebarContent>
          {selectedElement ? (
            <>
              <SidebarGroup>
                <SidebarGroupLabel>Element Type</SidebarGroupLabel>
                <SidebarGroupContent className="px-2">
                  <Input
                    className="bg-background"
                    value={elementTypeLabel(selectedElement.type)}
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
                        value={selectedElement.label}
                        className="bg-background"
                        onChange={(e) =>
                          updateElement(selectedElement.id, {
                            label: e.target.value,
                            name: toCamelCase(e.target.value),
                          })
                        }
                        autoComplete="off"
                        placeholder="Enter field label"
                      />
                    </div>
                    {!["switch", "checkbox", "file"].includes(
                      selectedElement.type,
                    ) && (
                      <div className="space-y-2">
                        <Label className="text-xs" htmlFor="placeholder">
                          Placeholder (Optional)
                        </Label>
                        <Input
                          id="placeholder"
                          value={selectedElement.placeholder}
                          className="bg-background"
                          onChange={(e) =>
                            updateElement(selectedElement.id, {
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
                        value={selectedElement.description}
                        className="bg-background"
                        onChange={(e) =>
                          updateElement(selectedElement.id, {
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
                        checked={selectedElement.required}
                        onCheckedChange={(checked) =>
                          updateElement(selectedElement.id, {
                            required: checked,
                          })
                        }
                      />
                    </div>
                    {!["select", "checkbox", "switch", "file"].includes(
                      selectedElement.type,
                    ) && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="min-length">
                            Minimum Length
                          </Label>
                          <Input
                            id="min-length"
                            type="number"
                            min={0}
                            value={selectedElement.minLength}
                            className="bg-background"
                            onChange={(e) =>
                              updateElement(selectedElement.id, {
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
                            value={selectedElement.maxLength}
                            className="bg-background"
                            onChange={(e) =>
                              updateElement(selectedElement.id, {
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
                        checked={selectedElement.disabled}
                        onCheckedChange={(checked) =>
                          updateElement(selectedElement.id, {
                            disabled: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
              {selectedElement.type === "file" && (
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
                            value={selectedElement.fileConfig?.accept}
                            onValueChange={(value) =>
                              updateElement(selectedElement.id, {
                                fileConfig: {
                                  ...selectedElement.fileConfig,
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
                              selectedElement.fileConfig?.maxSize
                                ? selectedElement.fileConfig.maxSize /
                                  (1024 * 1024)
                                : 5
                            }
                            onChange={(e) =>
                              updateElement(selectedElement.id, {
                                fileConfig: {
                                  ...selectedElement.fileConfig,
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
                            disabled={!selectedElement.fileConfig?.multiple}
                            min={1}
                            max={10}
                            value={selectedElement.fileConfig?.maxFiles}
                            onChange={(e) =>
                              updateElement(selectedElement.id, {
                                fileConfig: {
                                  ...selectedElement.fileConfig,
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
                            value={selectedElement.fileConfig?.previewSize}
                            onValueChange={(value) =>
                              updateElement(selectedElement.id, {
                                fileConfig: {
                                  ...selectedElement.fileConfig,
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
                            value={selectedElement.fileConfig?.variant}
                            onValueChange={(value) =>
                              updateElement(selectedElement.id, {
                                fileConfig: {
                                  ...selectedElement.fileConfig,
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
                            checked={selectedElement.fileConfig?.multiple}
                            onCheckedChange={(checked) =>
                              updateElement(selectedElement.id, {
                                fileConfig: {
                                  ...selectedElement.fileConfig,
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
                            checked={selectedElement.fileConfig?.showPreview}
                            onCheckedChange={(checked) =>
                              updateElement(selectedElement.id, {
                                fileConfig: {
                                  ...selectedElement.fileConfig,
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
              {selectedElement.type === "select" && (
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
                            value={selectedElement.options?.selectLabel}
                            className="bg-background"
                            onChange={(e) =>
                              updateElement(selectedElement.id, {
                                options: {
                                  selectLabel: e.target.value,
                                  selectItems:
                                    selectedElement.options?.selectItems || [],
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
                              {selectedElement.options?.selectItems.length}{" "}
                              Items
                            </p>
                          </div>
                          <div className="space-y-2">
                            {selectedElement.options?.selectItems.map(
                              (item, index) => (
                                <div
                                  className="flex items-center space-x-1"
                                  key={index}
                                >
                                  <Input
                                    value={item.label}
                                    className="bg-background"
                                    autoComplete="off"
                                    placeholder={`Option ${index + 1}`}
                                    onChange={(e) => {
                                      const updatedItems = [
                                        ...(selectedElement.options
                                          ?.selectItems || []),
                                      ];

                                      updatedItems[index] = {
                                        label: e.target.value,
                                        value: toCamelCase(e.target.value),
                                      };

                                      updateElement(selectedElement.id, {
                                        options: {
                                          selectLabel:
                                            selectedElement.options
                                              ?.selectLabel || "",
                                          selectItems: updatedItems,
                                        },
                                      });
                                    }}
                                  />
                                  <Button
                                    variant="secondary"
                                    size="icon-sm"
                                    onClick={() => {
                                      const updatedItems =
                                        selectedElement.options?.selectItems.filter(
                                          (_, i) => i !== index,
                                        ) || [];

                                      updateElement(selectedElement.id, {
                                        options: {
                                          selectLabel:
                                            selectedElement.options
                                              ?.selectLabel || "",
                                          selectItems: updatedItems,
                                        },
                                      });
                                    }}
                                  >
                                    <Trash2Icon />
                                  </Button>
                                </div>
                              ),
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const currentItems =
                                selectedElement.options?.selectItems || [];

                              updateElement(selectedElement.id, {
                                options: {
                                  selectLabel:
                                    selectedElement.options?.selectLabel || "",
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
                        value={selectedElement.name}
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
                        value={selectedElement.id}
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
