"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ToggleDarkMode = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="size-8"
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Moon className="size-4" />
      ) : (
        <Sun className="size-4" />
      )}
    </Button>
  );
};
