import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FrameIcon,
  LockClosedIcon,
  Pencil2Icon,
  TextAlignLeftIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Components",
};

export default function ComponentsPage() {
  return (
    <section className="py-[4rem]">
      <div className="px-6 max-w-5xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-bold tracking-tighter text-3xl md:text-4xl lg:text-5xl text-balance">
            Build Forms Faster with Ready to Use Components
          </h1>
          <p className="text-foreground/80 text-base mt-6">
            Explore a curated collection of modern, reusable form components
            powered by Shadcn UI. Each element is designed for flexibility,
            seamless integration, and clean React + TypeScript code generation.
          </p>
        </div>
        <div className="grid border divide-x divide-y *:p-5 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/components/password-input">
            <Card className="border hover:border-dashed hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Password Input</CardTitle>
                  <div className="bg-muted p-1.5 border">
                    <LockClosedIcon className="size-4" />
                  </div>
                </div>
                <CardDescription>
                  Allows users to toggle password visibility for better
                  usability.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/components/file-input">
            <Card className="border hover:border-dashed hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>File Input</CardTitle>
                  <div className="bg-muted p-1.5 border">
                    <UploadIcon className="size-4" />
                  </div>
                </div>
                <CardDescription>
                  Enables users to upload files with a clean and simple
                  interface.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/components/rich-text-editor">
            <Card className="border hover:border-dashed hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Rich Text Editor</CardTitle>
                  <div className="bg-muted p-1.5 border">
                    <TextAlignLeftIcon className="size-4" />
                  </div>
                </div>
                <CardDescription>
                  Enables easy text formatting with support for bold, italics,
                  lists, and more.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/components/email-input">
            <Card className="border hover:border-dashed hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Email Input</CardTitle>
                  <div className="bg-muted p-1.5 border">
                    <EnvelopeClosedIcon className="size-4" />
                  </div>
                </div>
                <CardDescription>
                  Validates email addresses to ensure correct formatting and
                  deliverability.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/components/date-picker">
            <Card className="border hover:border-dashed hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Date Picker</CardTitle>
                  <div className="bg-muted p-1.5 border">
                    <CalendarIcon className="size-4" />
                  </div>
                </div>
                <CardDescription>
                  A date picker that lets users select a date from a calendar
                  popover.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/components/phone-input">
            <Card className="border hover:border-dashed hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Phone Input</CardTitle>
                  <div className="bg-muted p-1.5 border">
                    <FrameIcon className="size-4" />
                  </div>
                </div>
                <CardDescription>
                  Phone number input with country support, formatting, and
                  validation.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/components/signature-input">
            <Card className="border hover:border-dashed hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Signature Input</CardTitle>
                  <div className="bg-muted p-1.5 border">
                    <Pencil2Icon className="size-4" />
                  </div>
                </div>
                <CardDescription>
                  Capture signatures with a smooth canvas-based input.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-center text-lg">
                  More Coming Soon!
                </CardTitle>
                <CardDescription className="text-center text-foreground/70">
                  We're actively working on adding more components to our
                  library.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-center text-lg">
                  More Coming Soon!
                </CardTitle>
                <CardDescription className="text-center text-foreground/70">
                  We're actively working on adding more components to our
                  library.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
