import { format } from "prettier/standalone";
import parserTypescript from "prettier/plugins/typescript.js";
import pluginEstree from "prettier/plugins/estree.js";

export const formatCode = async (code: string) => {
  return format(code, {
    parser: "typescript",
    plugins: [parserTypescript, pluginEstree],
  }).then((formatted) => formatted);
};
