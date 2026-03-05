import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = [
  {
    prop: "value",
    type: "string",
    defaultValue: '""',
    description: "Data URL string of the signature image.",
  },
  {
    prop: "onChange",
    type: "(value: string) => void",
    defaultValue: "-",
    description: "Called with the PNG data URL when drawing ends.",
  },
  {
    prop: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disables drawing and the clear action.",
  },
  {
    prop: "height",
    type: "number",
    defaultValue: "160",
    description: "Canvas height in pixels.",
  },
  {
    prop: "penColor",
    type: "string",
    defaultValue: '"#0f172a"',
    description: "Stroke color used for drawing.",
  },
  {
    prop: "backgroundColor",
    type: "string",
    defaultValue: '"#ffffff"',
    description: "Canvas background fill color.",
  },
  {
    prop: "strokeWidth",
    type: "number",
    defaultValue: "2",
    description: "Stroke width used for drawing.",
  },
  {
    prop: "className",
    type: "string",
    defaultValue: "-",
    description: "Optional wrapper class name.",
  },
];

export const PropsTable = () => {
  return (
    <div className="space-y-4">
      <h2 className="tracking-tighter text-xl font-bold text-foreground">
        Props
      </h2>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.prop}>
                <TableCell className="font-medium">{row.prop}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.defaultValue}</TableCell>
                <TableCell className="whitespace-normal text-muted-foreground">
                  {row.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
