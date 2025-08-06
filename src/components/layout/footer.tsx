import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { BookDemoButton } from "@/components/forms/book-demo-button";
import { SITE_CONFIG, NAVIGATION_ITEMS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">
                Catalyt<span style={{ color: '#DB5461' }}>IQ</span> Systems
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {SITE_CONFIG.description}. Streamline your business processes with intelligent automation solutions.
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
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4 text-right">
            <h3 className="text-sm font-semibold">Navigation</h3>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
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
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Process Automation
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AI Integration
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Workflow Optimization
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Custom Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 text-right">
            <h3 className="text-sm font-semibold">Get Started</h3>
            <ul className="space-y-2">
              <li>
                <BookDemoButton variant="ghost" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground transition-colors justify-start">
                  Book a Demo
                </BookDemoButton>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Resources
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
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for SMEs
          </p>
        </div>
      </div>
    </footer>
  );
}