"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ThemeToggle, ThemeToggleWithLabel, LanguageSwitcher } from "@/components/ui";
import { BookDemoButton } from "@/components/forms/book-demo-button";
import { BookDemoButtonIT } from "@/components/forms/book-demo-button-it";
import { SITE_CONFIG, NAVIGATION_ITEMS, NAVIGATION_ITEMS_IT } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Detect current locale
  const isItalian = pathname.startsWith('/it');
  const currentLocale = isItalian ? 'it' : 'en';
  
  // Generate locale-aware navigation items
  const getLocalizedHref = (href: string) => {
    if (currentLocale === 'it') {
      return `/it${href}`;
    }
    return href;
  };
  
  // Get localized navigation items with proper labels
  const baseNavigationItems = isItalian ? NAVIGATION_ITEMS_IT : NAVIGATION_ITEMS;
  const localizedNavigationItems = baseNavigationItems.map(item => ({
    ...item,
    href: getLocalizedHref(item.href)
  }));
  
  // Get localized button text
  const bookDemoText = isItalian ? "Prenota Demo Gratuita" : "Book Free Demo";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={getLocalizedHref("/")} className="flex items-center">
          <span className="text-xl font-bold">
            Catalyt<span style={{ color: '#DB5461' }}>IQ</span> Systems
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {localizedNavigationItems.map((item) => (
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

        {/* Language Switcher, Theme Toggle, CTA Button & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle className="hidden sm:flex" />
          {isItalian ? (
            <BookDemoButtonIT className="hidden sm:inline-flex">
              {bookDemoText}
            </BookDemoButtonIT>
          ) : (
            <BookDemoButton className="hidden sm:inline-flex">
              {bookDemoText}
            </BookDemoButton>
          )}

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
                <Link href={getLocalizedHref("/")} className="flex items-center pb-4 border-b">
                  <span className="text-xl font-bold">
                    Catalyt<span style={{ color: '#DB5461' }}>IQ</span> Systems
                  </span>
                </Link>
                
                <nav className="flex flex-col space-y-2">
                  {localizedNavigationItems.map((item) => (
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
                  <div className="flex justify-center">
                    <LanguageSwitcher />
                  </div>
                  <ThemeToggleWithLabel
                    className="w-full justify-start"
                    variant="ghost"
                    size="default"
                  />
                  {isItalian ? (
                    <BookDemoButtonIT className="w-full">
                      {bookDemoText}
                    </BookDemoButtonIT>
                  ) : (
                    <BookDemoButton className="w-full">
                      {bookDemoText}
                    </BookDemoButton>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}