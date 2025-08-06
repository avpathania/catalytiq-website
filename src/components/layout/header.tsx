"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ThemeToggle, ThemeToggleWithLabel } from "@/components/ui/theme-toggle";
import { BookDemoButton } from "@/components/forms/book-demo-button";
import { SITE_CONFIG, NAVIGATION_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">
            Catalyt<span style={{ color: '#DB5461' }}>IQ</span> Systems
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NAVIGATION_ITEMS.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  href={item.href}
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  )}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Theme Toggle, CTA Button & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <ThemeToggle className="hidden sm:flex" />
          <BookDemoButton className="hidden sm:inline-flex">
            Book Free Demo
          </BookDemoButton>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-4">
                <Link href="/" className="flex items-center pb-4 border-b">
                  <span className="text-xl font-bold">
                    Catalyt<span style={{ color: '#DB5461' }}>IQ</span> Systems
                  </span>
                </Link>
                
                <nav className="flex flex-col space-y-2">
                  {NAVIGATION_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-medium">{item.label}</span>
                      {item.description && (
                        <span className="text-sm text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>

                <div className="pt-4 border-t space-y-3">
                  <ThemeToggleWithLabel
                    className="w-full justify-start"
                    variant="ghost"
                    size="default"
                  />
                  <BookDemoButton className="w-full">
                    Book Free Demo
                  </BookDemoButton>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}