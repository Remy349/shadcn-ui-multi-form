const serializeValue = (value: unknown): string => {
  if (value === undefined) return "undefined";

  if (value === null) return "null";

  if (typeof value === "string") return JSON.stringify(value);

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map(serializeValue).join(", ")}]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(
        ([key, innerValue]) =>
          `${JSON.stringify(key)}: ${serializeValue(innerValue)}`,
      )
      .join(", ");

    return `{ ${entries} }`;
  }

  return "undefined";
};

export const serializeDefaultValues = (
  defaults: Record<string, unknown>,
): string => {
  const entries = Object.entries(defaults)
    .map(([key, value]) => `  ${key}: ${serializeValue(value)}`)
    .join(",\n");

  return `{\n${entries}\n}`;
};
