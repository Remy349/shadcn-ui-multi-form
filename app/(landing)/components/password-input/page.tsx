import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PasswordInput } from "@/components/ui/password-input";
import { RenderPreviewCode } from "./_components/preview/render-code";
import { Separator } from "@/components/ui/separator";
import { RenderInstallationCode } from "./_components/installation/render-code";
import { FormPreview } from "./_components/form/form";
import { RenderFormCode } from "./_components/form/render-code";

export const metadata: Metadata = {
  title: "Password Input",
};

export default function Page() {
  return (
    <section className="pt-[4rem] pn-[2.5rem]">
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
                <BreadcrumbPage>Password Input</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <h1 className="font-bold text-2xl mb-2 text-left md:text-3xl">
          Password Input
        </h1>
        <p className="text-left text-sm text-muted-foreground mb-8 md:mb-12">
          The Password Input allows users to toggle password visibility, making
          it easier to enter and verify their passwords securely.
        </p>
        <div className="md:mx-auto md:max-w-3xl">
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <Card className="shadow-sm">
                <div className="h-[20rem] flex items-center justify-center p-4">
                  <div className="md:w-[26rem]">
                    <PasswordInput placeholder="Password" />
                  </div>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="code">
              <Card className="shadow-sm">
                <div className="p-2">
                  <RenderPreviewCode />
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
            Create the component inside the <strong>/components/ui/</strong>{" "}
            folder to keep your project structure organized.
          </p>
          <Card className="shadow-sm">
            <div className="p-2">
              <RenderInstallationCode />
            </div>
          </Card>
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
                <div className="h-[20rem] w-full flex items-center justify-center p-4">
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
      </div>
    </section>
  );
}
