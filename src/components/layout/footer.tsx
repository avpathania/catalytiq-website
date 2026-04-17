"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { BookDemoButton } from "@/components/forms/book-demo-button";
import { SITE_CONFIG, NAVIGATION_ITEMS, NAVIGATION_ITEMS_IT, FOOTER_CONTENT } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();
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
  
  // Get localized navigation items and content
  const baseNavigationItems = isItalian ? NAVIGATION_ITEMS_IT : NAVIGATION_ITEMS;
  const localizedNavigationItems = baseNavigationItems.map(item => ({
    ...item,
    href: getLocalizedHref(item.href)
  }));
  
  const content = FOOTER_CONTENT[currentLocale];

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href={getLocalizedHref("/")} className="flex items-center">
              <span className="text-xl font-bold">
                Catalyt<span style={{ color: '#DB5461' }}>IQ</span> Systems
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {SITE_CONFIG.description}. {content.description}
            </p>
            <div className="flex space-x-4">
              <Link
                href={SITE_CONFIG.links.linkedin}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link
                href={SITE_CONFIG.links.twitter}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">X (Twitter)</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link
                href={SITE_CONFIG.links.youtube}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">YouTube</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4 text-right">
            <h3 className="text-sm font-semibold">{content.navigation}</h3>
            <ul className="space-y-2">
              {localizedNavigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 text-right">
            <h3 className="text-sm font-semibold">{content.services}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={getLocalizedHref("/solutions")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {content.processAutomation}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedHref("/solutions")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {content.aiIntegration}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedHref("/solutions")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {content.workflowOptimization}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedHref("/solutions")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {content.customSolutions}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 text-right">
            <h3 className="text-sm font-semibold">{content.getStarted}</h3>
            <ul className="space-y-2">
              <li>
                <BookDemoButton variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground transition-colors justify-start">
                  {content.bookDemo}
                </BookDemoButton>
              </li>
              <li>
                <Link href={getLocalizedHref("/contact")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {content.contactUs}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedHref("/support")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {content.support}
                </Link>
              </li>
              <li>
                <Link href={getLocalizedHref("/resources")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {content.resources}
                </Link>
              </li>
            </ul>
          </div>

          {/* Empty Column */}
          <div className="space-y-4">
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {SITE_CONFIG.name}. {content.allRightsReserved}.
            </p>
            <div className="flex space-x-4">
              <Link href={getLocalizedHref("/privacy")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {content.privacyPolicy}
              </Link>
              <Link href={getLocalizedHref("/terms")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {content.termsOfService}
              </Link>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {content.builtWithLove}
          </p>
        </div>
      </div>
    </footer>
  );
}