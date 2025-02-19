import { Code } from "../code";

export const RenderExampleCode = () => {
  const code = `import { PasswordInput } from "@/components/ui/password-input"

export default function Page() {
  return <PasswordInput placeholder="Password" />
}`;

  return <Code code={code} />;
};
