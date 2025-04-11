import type { Metadata } from "next";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/components/password-input">
            <Card className="shadow-sm ease-in-out duration-200 md:hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Password Input</CardTitle>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </div>
                <CardDescription>
                  Allows users to toggle password visibility for better
                  usability.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/components/file-input">
            <Card className="shadow-sm ease-in-out duration-200 md:hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">File Input</CardTitle>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </div>
                <CardDescription>
                  Enables users to upload files with a clean and simple
                  interface.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/components/rich-text-editor">
            <Card className="shadow-sm ease-in-out duration-200 md:hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Rich Text Editor</CardTitle>
                  <Badge className="font-medium px-2 py-0 text-[0.65rem]">
                    New
                  </Badge>
                </div>
                <CardDescription>
                  Enables easy text formatting with support for bold, italics,
                  lists, and more.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
