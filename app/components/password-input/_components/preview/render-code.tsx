import { Code } from "@/app/components/_components/code";

export const RenderPreviewCode = () => {
  const code = `import { PasswordInput } from "@/components/ui/password-input"

export default function Page() {
  return <PasswordInput placeholder="Password" />
}`;

  return <Code code={code} />;
};
