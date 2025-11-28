"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export const ToggleDarkMode = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="cursor-pointer"
      variant="ghost"
      size="icon-sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
