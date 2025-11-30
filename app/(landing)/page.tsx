import { FAQs } from "./_components/home/faqs";
import { Features } from "./_components/home/features";
import { Hero } from "./_components/home/hero";
import { TechStack } from "./_components/home/tech-stack";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStack />
      <Features />
      <FAQs />
    </>
  );
}
