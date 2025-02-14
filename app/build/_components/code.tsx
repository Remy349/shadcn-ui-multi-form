import { Button } from "@/components/ui/button";
import { Check, File } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  code: string;
}

export const Code = ({ code }: IProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(code);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    toast.success("Code copied to clipboard");
  };

  return (
    <div className="h-full flex flex-col relative">
      <Button
        className="font-medium absolute top-4 right-8 z-40 size-8"
        size="icon"
        variant="outline"
        onClick={handleCopyToClipboard}
      >
        {isCopied ? <Check className="size-4" /> : <File className="size-4" />}
      </Button>
      <div className="relative flex-grow overflow-auto">
        <Highlight theme={themes.nightOwl} code={code} language="tsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} p-4 rounded-md`} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  <span className="inline-block w-8 text-right mr-4 text-gray-500 select-none">
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};
