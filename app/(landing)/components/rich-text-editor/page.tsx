import type { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Preview } from "./_components/preview/preview";
import { RenderCode } from "./_components/preview/render-code";
import { Separator } from "@/components/ui/separator";
import { Dependencies } from "./_components/installation/dependencies";
import { EditorRenderCode } from "./_components/installation/editor-render-code";
import { ToolbarRenderCode } from "./_components/installation/toolbar-render-code";
import { FormPreview } from "./_components/form/form";
import { RenderFormCode } from "./_components/form/render-code";

export const metadata: Metadata = {
  title: "Rich Text Editor",
};

export default function Page() {
  return (
    <section className="pt-[4rem] pb-[2.5rem]">
      <div className="px-6 mx-auto md:max-w-3xl lg:max-w-5xl">
        <div className="mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/components">Components</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Rich Text Editor</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h1 className="font-bold text-2xl mb-2 text-left md:text-3xl">
          Rich Text Editor
        </h1>
        <p className="text-left text-sm text-muted-foreground mb-4">
          The Rich Text Editor is a fully customizable and lightweight WYSIWYG
          editor built on top of Tiptap. It provides a smooth and intuitive
          editing experience, making it easy to format text with bold, italics,
          headings, lists, links, and more.
        </p>
        <Button
          className="mb-8 font-bold text-xs h-6 px-2 md:mb-12"
          size="sm"
          asChild
        >
          <Link
            href="https://tiptap.dev/docs/editor/getting-started/overview"
            target="_blank"
          >
            Tiptap Editor Docs
            <SquareArrowOutUpRight className="!size-3" />
          </Link>
        </Button>
        <div className="md:mx-auto md:max-w-3xl">
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <Card className="shadow-sm">
                <div className="min-h-[20rem] flex items-center justify-center p-4">
                  <div className="md:w-[26rem]">
                    <Preview />
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="code">
              <Card className="shadow-sm">
                <div className="p-2">
                  <RenderCode />
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <Separator className="my-8" />
        <div className="md:mx-auto md:max-w-3xl">
          <h2 className="text-left font-bold text-xl mb-2 md:text-2xl">
            Installation
          </h2>
          <p className="text-muted-foreground text-left text-sm mb-8 md:mb-12">
            Create the neccessary components inside the{" "}
            <strong>/components/ui/editor</strong> folder to keep your project
            structure organized.{" "}
            <strong>
              But first you must install the necessary dependencies for the
              correct functionality of the component.
            </strong>
          </p>
          <div className="space-y-6">
            <Card className="shadow-sm">
              <div className="p-2">
                <Dependencies />
              </div>
            </Card>
            <Tabs defaultValue="editor">
              <TabsList>
                <TabsTrigger value="editor">Editor.tsx</TabsTrigger>
                <TabsTrigger value="toolbar">Toolbar.tsx</TabsTrigger>
              </TabsList>
              <TabsContent value="editor">
                <Card className="shadow-sm">
                  <div className="p-2">
                    <EditorRenderCode />
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="toolbar">
                <Card className="shadow-sm">
                  <div className="p-2">
                    <ToolbarRenderCode />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="md:mx-auto md:max-w-3xl">
          <h2 className="text-left font-bold text-xl mb-2 md:text-2xl">Form</h2>
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <Card className="shadow-sm">
                <div className="min-h-[28rem] w-full flex items-center justify-center p-4">
                  <div className="md:w-[26rem]">
                    <FormPreview />
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="code">
              <Card className="shadow-sm">
                <div className="p-2">
                  <RenderFormCode />
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <Separator className="my-8" />
        <div className="md:mx-auto md:max-w-3xl">
          <div className="rounded-md border bg-secondary p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note: </strong>
              This Rich Text Editor provides basic functionality for formatting
              text, including bold, italics and lists. You can customize and
              extend its features by referring to the{" "}
              <strong>Tiptap Editor documentation</strong> to add more advanced
              capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
