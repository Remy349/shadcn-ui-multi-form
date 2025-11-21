import { codeToHtml } from "shiki";
import { cn } from "../utils";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const cache = new Map<string, string>();

const highlightCached = async (code: string, lang: string, theme: string) => {
  const key = `${theme}-${lang}-${code}`;

  if (cache.has(key)) {
    const value = cache.get(key);

    if (value !== undefined) return value;
  }

  const html = await codeToHtml(code, { lang, theme });

  cache.set(key, html);

  return html;
};

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  header?: string;
}

const CodeBlock = ({ children, header, className }: CodeBlockProps) => {
  return (
    <div
      className={cn("relative flex w-full flex-col overflow-clip", className)}
    >
      {header && (
        <div className="border-b bg-muted px-4 py-1 text-xs font-mono">
          {header}
        </div>
      )}
      {children}
    </div>
  );
};

interface CodeBlockContentProps {
  code: string;
  lang: string;
  className?: string;
}

const CodeBlockContent = ({ code, lang, className }: CodeBlockContentProps) => {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const runHighlight = async () => {
      const theme = resolvedTheme === "light" ? "github-light" : "github-dark";

      const html = await highlightCached(code, lang, theme);

      setHighlightedHtml(html);
    };

    runHighlight();
  }, [code, lang, resolvedTheme]);

  if (!highlightedHtml) {
    return (
      <div className="px-4 py-4 text-sm text-muted-foreground">
        Loading code…
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full text-[13px] [&>pre]:px-4 [&>pre]:py-4 [&>pre]:text-wrap",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  );
};

export { CodeBlock, CodeBlockContent };
