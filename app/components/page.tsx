import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { PasswordInput } from "@/components/ui/password-input";
import { RenderExampleCode } from "./_components/example/render-code";
import { Separator } from "@/components/ui/separator";
import { RenderInstallCode } from "./_components/install/render-code";

export const metadata: Metadata = {
  title: "Components",
};

export default function Page() {
  return (
    <section className="pt-[4rem] pb-[2.5rem]">
      <div className="px-6 mx-auto md:max-w-3xl lg:max-w-5xl">
        <h1 className="font-bold text-2xl mb-2 text-left md:text-3xl">
          Components
        </h1>
        <p className="text-muted-foreground text-left text-sm mb-8">
          Discover custom components designed specifically for Shadcn UI Multi
          Form. These components are essential for building seamless multi-step
          forms with enhanced functionality and a smooth user experience.
        </p>
        <div className="border rounded-md p-4 bg-primary/5 mb-8">
          <p className="text-xs text-muted-foreground">
            <strong>Note: </strong>Currently, only the{" "}
            <strong>Password Input</strong> component is available. More
            components will be added in future updates to expand form
            customization and usability. Stay tuned!
          </p>
        </div>
        <div className="lg:max-w-3xl lg:mx-auto">
          <h2 className="text-left font-bold text-xl mb-2 md:text-2xl">
            Password Input
          </h2>
          <p className="text-left text-sm text-muted-foreground mb-8">
            The Password Input allows users to toggle password visibility,
            making it easier to enter and verify their passwords securely.
          </p>
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <Card className="shadow-sm">
                <div className="h-[16rem] flex items-center justify-center p-4">
                  <PasswordInput placeholder="Password" />
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="code">
              <Card className="shadow-sm">
                <div className="p-4">
                  <RenderExampleCode />
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <Separator className="my-8" />
        <div className="lg:max-w-3xl lg:mx-auto">
          <h2 className="text-left font-bold text-xl mb-2 md:text-2xl">
            Installation
          </h2>
          <p className="text-muted-foreground text-left text-sm mb-8">
            Create the component inside the <strong>/components/ui/</strong>{" "}
            folder to keep your project structure organized.
          </p>
          <Card className="shadow-sm">
            <div className="p-4">
              <RenderInstallCode />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
