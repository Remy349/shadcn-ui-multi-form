# Shadcn UI Multi Form

Shadcn UI Multi Form is a modern, visual form builder for React that lets you craft single and multi-step flows with **shadcn/ui**, **React Hook Form**, and **Zod**. Build fast, preview instantly, and export clean, production-ready TypeScript code.

## Highlights

- Visual builder for single and multi-step forms
- Real-time preview with React Hook Form + Zod validation
- Code generator with clean, reusable React + TypeScript output
- Layout elements: Two Columns and Separator
- Rich input library including Combobox, Multi Select, Signature, Phone, Date Picker, Slider, and more
- Modern, minimal UI with polished interactions

## Why Shadcn UI Multi Form

- **Faster form delivery**: drag, configure, preview, export
- **Developer-first output**: TypeScript code you can own and extend
- **Consistent UI**: built on shadcn/ui components

## Quick Start

1. Install dependencies

```bash
pnpm install
```

2. Run the dev server

```bash
pnpm dev
```

3. Open the app

```text
http://localhost:3000
```

## Key Features

- **Form Builder**: Build and configure fields with a clean properties panel
- **Layouts**: Two Columns and Separator for structured layouts
- **Inputs**: Text, Email, Password, Textarea, Select, Combobox, Multi Select, Checkbox, Switch, Date Picker, Input OTP, Slider, Phone, Signature, File, and Rich Text
- **Validation**: Required, min/max length, and input-specific rules backed by Zod
- **Codegen**: Generate ready-to-use React + TypeScript form code

## Builder Inputs Snapshot

- Combobox (searchable single select)
- Multi Select (chips)
- Signature (canvas capture)
- Radio Group, Select, Slider, Date Picker
- File Upload, Phone Input, OTP, Rich Text

## Project Structure

- `app/(builder)` - Form builder experience
- `app/(landing)` - Marketing site and docs
- `lib/builder` - Registry, schema, and codegen
- `components/ui` - shadcn/ui components and custom inputs

## Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **shadcn/ui**
- **Tailwind CSS**
- **Zustand**
- **React Hook Form**
- **Zod**

## Roadmap (Next)

- Advanced builder UX: duplicate, copy/paste, keyboard shortcuts, undo/redo
- Conditional logic and field arrays
- More layout presets (tabs, sections, repeaters)

## Issues and Roadmap

If you find bugs, have feature ideas, or want improvements, please open an issue.
All upcoming major enhancements are tracked in the Changelog and Project Roadmap.

## Links

- Live app: https://shadcn-ui-multi-form.vercel.app
- Builder: https://shadcn-ui-multi-form.vercel.app/build
- Components: https://shadcn-ui-multi-form.vercel.app/components
- Changelog: https://shadcn-ui-multi-form.vercel.app/changelog

## License

This project is completely open source under the MIT License.
