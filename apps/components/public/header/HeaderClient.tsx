"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ── Types ────────────────────────────────────────────────────────────────── */

interface NavItem {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
  icon?: React.ReactNode;
}

interface NavSection {
  titleKey: string;
  items: NavItem[];
}

interface NavLink {
  type: "link";
  label: string;
  href: string;
  external?: boolean;
}

interface NavDropdown {
  type: "dropdown";
  label: string;
  sections: NavSection[];
}

type NavEntry = NavLink | NavDropdown;

interface HeaderClientProps {
  locale: string;
  translations: {
    brandName: string;
    downloads: string;
    blog: string;
    careers: string;
    openGuilderia: string;
    login: string;
    menuLabel: string;
  };
  links: {
    home: string;
    downloads: string;
    signup: string;
  };
  navigation: NavEntry[];
  ctaUrls: {
    login: string;
    app: string;
  };
}

/* ── Desktop dropdown ─────────────────────────────────────────────────────── */

function DesktopDropdown({
  label,
  sections,
  locale,
}: {
  label: string;
  sections: NavSection[];
  locale: string;
}) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-white/80 transition-colors">
        {label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 hidden group-hover:block">
        <div className="bg-[#1a1547]/95 backdrop-blur supports-backdrop-filter:bg-[#1a1547]/80 border border-white/10 rounded-xl shadow-xl overflow-hidden min-w-170">
          <div className="p-6">
            <div className="grid grid-cols-2 gap-8">
              {sections.map((section) => (
                <div key={section.titleKey}>
                  <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">
                    {section.titleKey}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={
                            item.href.startsWith("/")
                              ? `/${locale}${item.href}`
                              : item.href
                          }
                          {...(item.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="group/item flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          {item.icon && (
                            <span className="shrink-0 mt-0.5 text-white/40 group-hover/item:text-white/80 transition-colors">
                              {item.icon}
                            </span>
                          )}
                          <div>
                            <span className="block text-sm font-medium text-white">
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="block text-xs text-white/40 mt-0.5">
                                {item.description}
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile navigation section ────────────────────────────────────────────── */

function MobileNavSection({
  label,
  sections,
  locale,
}: {
  label: string;
  sections: NavSection[];
  locale: string;
}) {
  return (
    <AccordionItem value={label} className="border-b-0">
      <AccordionTrigger className="py-3 text-sm font-medium text-foreground hover:no-underline hover:text-primary">
        {label}
      </AccordionTrigger>
      <AccordionContent>
        <div className="pl-2 space-y-4">
          {sections.map((section) => (
            <div key={section.titleKey}>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {section.titleKey}
              </h4>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <SheetClose asChild>
                      <Link
                        href={
                          item.href.startsWith("/")
                            ? `/${locale}${item.href}`
                            : item.href
                        }
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="flex items-center gap-2 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.icon && (
                          <span className="shrink-0 text-muted-foreground">
                            {item.icon}
                          </span>
                        )}
                        <span>{item.label}</span>
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

/* ── Main client component ────────────────────────────────────────────────── */

export function HeaderClient({
  locale,
  translations: t,
  links,
  navigation,
  ctaUrls,
}: HeaderClientProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ctaHref = isAuthenticated ? ctaUrls.app : ctaUrls.login;

  return (
    <header
      className={cn(
        "relative z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-[#1a1547]/95 backdrop-blur supports-backdrop-filter:bg-[#1a1547]/80 border-b border-white/10 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="flex h-24 items-center justify-between px-6">
        {/* Logo - Left */}
        <div className="shrink-0">
          <Link
            href={`/${locale}${links.home}`}
            className="flex items-center gap-2.5 group"
            aria-label={t.brandName}
          >
            <svg
              className="h-7 w-7 text-white transition-transform group-hover:scale-105"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-extrabold text-xl text-white tracking-tight">
              {t.brandName}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <nav
          className="hidden lg:flex items-center justify-center"
          aria-label="Main navigation"
        >
          <ul className="flex items-center gap-0.5">
            {navigation.map((entry) => (
              <li key={entry.label}>
                {entry.type === "link" ? (
                  <Link
                    href={
                      entry.href.startsWith("/")
                        ? `/${locale}${entry.href}`
                        : entry.href
                    }
                    {...(entry.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center h-9 px-3 text-sm font-medium text-white hover:text-white/80 transition-colors"
                  >
                    {entry.label}
                  </Link>
                ) : (
                  <DesktopDropdown
                    label={entry.label}
                    sections={entry.sections}
                    locale={locale}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* GitHub link */}
          <Link
            href="https://github.com/skygenesisenterprise/guilderia"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center justify-center h-9 w-9 text-white/70 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          {/* Open Guilderia / Login - Primary CTA */}
          <Link
            href={ctaHref}
            className="hidden lg:block"
          >
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-5 text-sm font-medium rounded-full border-white text-white bg-transparent hover:bg-white hover:text-[#1a1547] transition-colors"
            >
              {isAuthenticated ? t.openGuilderia : t.login}
            </Button>
          </Link>

          {/* Mobile menu trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="lg:hidden text-white hover:bg-white/10"
                aria-label={t.menuLabel}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-87.5 p-0">
              <SheetHeader className="border-b border-border px-6 py-4">
                <SheetTitle className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  {t.brandName}
                </SheetTitle>
              </SheetHeader>
              <div className="px-6 py-4">
                <Accordion type="multiple" className="w-full">
                  {navigation.map((entry) =>
                    entry.type === "link" ? (
                      <div key={entry.label} className="py-2.5">
                        <SheetClose asChild>
                          <Link
                            href={
                              entry.href.startsWith("/")
                                ? `/${locale}${entry.href}`
                                : entry.href
                            }
                            className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {entry.label}
                          </Link>
                        </SheetClose>
                      </div>
                    ) : (
                      <MobileNavSection
                        key={entry.label}
                        label={entry.label}
                        sections={entry.sections}
                        locale={locale}
                      />
                    )
                  )}
                </Accordion>

                {/* CTA buttons */}
                <div className="mt-6 space-y-3 border-t border-border pt-6">
                  <div className="flex gap-3">
                    <Link
                      href="https://github.com/skygenesisenterprise/guilderia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-10 w-10 shrink-0 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      aria-label="GitHub"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                    <SheetClose asChild>
                      <Link
                        href={ctaHref}
                        className="block flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full h-10 text-sm font-medium"
                        >
                          {isAuthenticated ? t.openGuilderia : t.login}
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
