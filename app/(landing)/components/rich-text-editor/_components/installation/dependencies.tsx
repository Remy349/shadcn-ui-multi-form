import { Code } from "@/app/(landing)/components/_components/code";

export const Dependencies = () => {
  const code = `// Packages required to use Tiptap's functionalities
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit
// Required Shadcn UI component for toolbar functionality
npx shadcn@latest add toggle
// Beautiful typographic defaults for HTML you don't control
// Read more at https://tailwindcss.com/blog/tailwindcss-typography
npm install -D @tailwindcss/typography
// Then use the plugin in your TailwindCSS configuration file
// TailwindCSS v3 (plugins: [require("@tailwindcss/typography")])
// TailwindCSS v4 (@plugin "@tailwindcss/typography")`;

  return <Code code={code} />;
};
