"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'dark' 
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Handle hydration and initial theme setup
  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
    } else {
      // Check system preference as fallback
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = systemPrefersDark ? 'dark' : defaultTheme;
      setThemeState(initialTheme);
      localStorage.setItem('theme', initialTheme);
    }
  }, [defaultTheme]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Always provide the context, but handle mounting state
  const value = { theme, setTheme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      <div className={mounted ? undefined : 'dark'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}