"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function ThemeToggle({ 
  className, 
  size = "icon", 
  variant = "ghost" 
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn("relative", className)}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

interface ThemeToggleWithLabelProps extends ThemeToggleProps {
  showLabel?: boolean;
  labelPosition?: "left" | "right";
}

export function ThemeToggleWithLabel({ 
  className,
  size = "default",
  variant = "ghost",
  showLabel = true,
  labelPosition = "right"
}: ThemeToggleWithLabelProps) {
  const { theme, toggleTheme } = useTheme();

  const label = theme === 'light' ? 'Dark mode' : 'Light mode';
  const icon = (
    <>
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </>
  );

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(
        "relative gap-2",
        labelPosition === "left" && "flex-row-reverse",
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {icon}
      {showLabel && <span>{label}</span>}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}