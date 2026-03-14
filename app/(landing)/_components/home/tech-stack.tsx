import {
  SiFramer,
  SiNextdotjs,
  SiReacthookform,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiZod,
} from "react-icons/si";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const techStack = [
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
  { icon: SiZod, label: "Zod" },
  { icon: SiReacthookform, label: "React Hook Form" },
  { icon: SiShadcnui, label: "shadcn/ui" },
  { icon: SiVercel, label: "Vercel" },
  { icon: SiFramer, label: "Framer Motion" },
];

export const TechStack = () => {
  return (
    <section className="bg-muted border-t border-b border-dashed py-[2rem]">
      <div className="px-6 max-w-5xl mx-auto flex items-center justify-center flex-col space-y-6">
        <h2 className="font-bold text-lg md:text-xl text-center tracking-tighter">
          Developed with technologies you already trust
        </h2>
        <div className="flex items-center justify-center flex-wrap space-x-8 gap-y-4 text-muted-foreground">
          {techStack.map(({ icon: Icon, label }) => (
            <Tooltip key={label}>
              <TooltipTrigger>
                <Icon className="size-6" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
};
