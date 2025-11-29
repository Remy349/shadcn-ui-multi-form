import {
  SiShadcnui,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiZod,
  SiReacthookform,
} from "react-icons/si";

export const TechStack = () => {
  return (
    <section className="bg-muted border-t border-b border-dashed py-[2rem]">
      <div className="px-6 max-w-5xl mx-auto flex items-center justify-center flex-col space-y-6">
        <h2 className="font-bold text-lg md:text-xl text-center">
          Developed with technologies you already trust
        </h2>
        <div className="flex items-center space-x-8 text-muted-foreground">
          <SiNextdotjs className="size-6" />
          <SiTypescript className="size-6" />
          <SiTailwindcss className="size-6" />
          <SiZod className="size-6" />
          <SiReacthookform className="size-6" />
          <SiShadcnui className="size-6" />
        </div>
      </div>
    </section>
  );
};
