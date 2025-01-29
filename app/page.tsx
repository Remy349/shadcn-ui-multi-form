import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <section className="pt-[4rem] pb-[2.5rem]">
        <div className="px-6 mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <h1 className="text-center font-bold text-2xl mb-2 md:text-3xl md:mx-auto md:max-w-2xl lg:text-4xl">
            Shadcn UI Multi Form – Build Stunning Multi-Step Forms with Ease
          </h1>
          <p className="text-center text-muted-foreground text-sm md:mx-auto md:max-w-lg">
            Create elegant multi-step forms effortlessly with Shadcn UI, React
            Hook Form, and Zod. Fast, dynamic, and user-friendly—start building
            today!
          </p>
          <div className="mt-12 flex justify-center">
            <Button className="font-medium" asChild>
              <Link href="">Get started now</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="pt-[4rem] pb-[2.5rem]">
        <div className="px-6 mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  What is Shadcn UI Multi Form?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Shadcn UI Multi Form is a tool that helps you create elegant
                  multi-step forms using ReactJS, Shadcn UI, React Hook Form,
                  and Zod.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Why was this website created?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Multi-step forms can be complex to build, so Shadcn UI Multi
                  Form simplifies the process, making it easier and more
                  efficient to create seamless forms.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  Do I need to install Shadcn UI to use this?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes! Shadcn UI is required for styling and UI components. You
                  can install it using ShadcnUI official documentation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
