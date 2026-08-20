"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
    menuLabel: string;
  };
  links: {
    home: string;
    downloads: string;
    signup: string;
  };
  navigation: NavEntry[];
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
    <li className="relative group">
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
    </li>
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
}: HeaderClientProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          {/* Open Guilderia - Primary CTA */}
          <Link href={`/${locale}${links.signup}`} className="hidden lg:block">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-5 text-sm font-medium rounded-full border-white text-white bg-transparent hover:bg-white hover:text-[#1a1547] transition-colors"
            >
              {t.openGuilderia}
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
                  <SheetClose asChild>
                    <Link href={`/${locale}${links.signup}`} className="block w-full">
                      <Button
                        variant="outline"
                        className="w-full h-10 text-sm font-medium"
                      >
                        {t.openGuilderia}
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
