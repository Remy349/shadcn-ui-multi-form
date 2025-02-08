import { Button } from "@/components/ui/button";
import { Highlight, themes } from "prism-react-renderer";
import { toast } from "sonner";

interface IProps {
  code: string;
}

export const Code = ({ code }: IProps) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end mb-2">
        <Button
          className="font-medium"
          size="sm"
          onClick={handleCopyToClipboard}
        >
          Copy Code
        </Button>
      </div>
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
