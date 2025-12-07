import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQs = () => {
  const faqItems = [
    {
      id: "item-1",
      question: "How does Shadcn UI Multi Form generate the code?",
      answer:
        "The builder dynamically creates React + TypeScript code based on the fields you configure. Every form is exported with typed Zod validation and Shadcn UI components ready to use.",
    },
    {
      id: "item-2",
      question: "Can I create both multi-step and single-step forms?",
      answer:
        "Yes. The builder automatically detects whether your structure represents a single form or a multi-step workflow and generates the appropriate code for you.",
    },
    {
      id: "item-3",
      question: "Do I need an account or subscription to use it?",
      answer:
        "No account, no subscription, and no limits the tool is completely free and open-source, with no login or payment required.",
    },
    {
      id: "item-4",
      question: "Does the generated form support Zod validation?",
      answer:
        "Absolutely. Every form is generated with a fully typed Zod schema, including default values, validation rules, and field structure.",
    },
    {
      id: "item-5",
      question: "Can I customize the component after exporting the code?",
      answer:
        "Yes. The generated code uses clean, modern Shadcn UI components and is fully editable, allowing you to adjust styling, structure, or logic as needed.",
    },
  ];

  return (
    <section className="py-[4rem]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Your most common questions answered from how the builder works to
            how you can integrate the generated code into your projects.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1"
          >
            {faqItems.map((item) => (
              <div className="group" key={item.id}>
                <AccordionItem
                  value={item.id}
                  className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base text-foreground/70">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
