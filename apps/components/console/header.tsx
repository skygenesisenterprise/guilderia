"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  AppWindow,
  Bell,
  Code,
  Flag,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  ScrollText,
  Search,
  Server,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";

const breadcrumbMap: Record<string, { label: string; parent?: string }> = {
  "/dash": { label: "Overview", parent: "Platform" },
  "/dash/users": { label: "Users", parent: "Platform" },
  "/dash/guilds": { label: "Guilds", parent: "Platform" },
  "/dash/applications": { label: "Applications", parent: "Platform" },
  "/dash/instances": { label: "Instances", parent: "Platform" },
  "/dash/discovery": { label: "Discovery", parent: "Platform" },
  "/dash/services": { label: "Services", parent: "Operations" },
  "/dash/deployments": { label: "Deployments", parent: "Operations" },
  "/dash/jobs": { label: "Jobs", parent: "Operations" },
  "/dash/queues": { label: "Queues", parent: "Operations" },
  "/dash/incidents": { label: "Incidents", parent: "Operations" },
  "/dash/maintenance": { label: "Maintenance", parent: "Operations" },
  "/dash/reports": { label: "Reports", parent: "Trust & Safety" },
  "/dash/moderation": { label: "Moderation", parent: "Trust & Safety" },
  "/dash/appeals": { label: "Appeals", parent: "Trust & Safety" },
  "/dash/bans": { label: "Bans", parent: "Trust & Safety" },
  "/dash/audit": { label: "Audit Logs", parent: "Trust & Safety" },
  "/dash/api": { label: "API", parent: "Developer" },
  "/dash/oauth2": { label: "OAuth2", parent: "Developer" },
  "/dash/bots": { label: "Bots", parent: "Developer" },
  "/dash/webhooks": { label: "Webhooks", parent: "Developer" },
  "/dash/api-keys": { label: "API Keys", parent: "Developer" },
  "/dash/feature-flags": { label: "Feature Flags", parent: "Developer" },
  "/dash/database": { label: "Database", parent: "Infrastructure" },
  "/dash/redis": { label: "Redis", parent: "Infrastructure" },
  "/dash/storage": { label: "Storage", parent: "Infrastructure" },
  "/dash/workers": { label: "Workers", parent: "Infrastructure" },
  "/dash/regions": { label: "Regions", parent: "Infrastructure" },
  "/dash/staff": { label: "Staff", parent: "Administration" },
  "/dash/roles": { label: "Roles & Permissions", parent: "Administration" },
  "/dash/security": { label: "Security", parent: "Administration" },
  "/dash/billing": { label: "Billing", parent: "Administration" },
  "/dash/settings": { label: "Settings", parent: "Administration" },
};

const searchItems = [
  {
    group: "Platform",
    items: [
      { label: "Overview", href: "/dash", icon: LayoutDashboard },
      { label: "Users", href: "/dash/users", icon: Users },
      { label: "Guilds", href: "/dash/guilds", icon: MessageSquare },
      { label: "Applications", href: "/dash/applications", icon: AppWindow },
      { label: "Instances", href: "/dash/instances", icon: Server },
    ],
  },
  {
    group: "Trust & Safety",
    items: [
      { label: "Reports", href: "/dash/reports", icon: Flag },
      { label: "Moderation", href: "/dash/moderation", icon: Shield },
      { label: "Audit Logs", href: "/dash/audit", icon: ScrollText },
    ],
  },
  {
    group: "Developer",
    items: [
      { label: "API", href: "/dash/api", icon: Code },
      { label: "API Keys", href: "/dash/api-keys", icon: Code },
    ],
  },
  {
    group: "Administration",
    items: [{ label: "Settings", href: "/dash/settings", icon: Settings }],
  },
];

export function ConsoleHeader() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = React.useState(false);

  const breadcrumb = breadcrumbMap[pathname] ?? { label: "Dashboard", parent: "Guilderia" };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
      <SidebarTrigger className="-ml-1" />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {breadcrumb.parent ? (
              <BreadcrumbLink href="/dash">{breadcrumb.parent}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>Guilderia</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {breadcrumb.parent && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex-1" />

      <Button
        variant="outline"
        size="sm"
        className="relative h-8 w-full justify-start rounded-md bg-muted/50 text-sm font-normal shadow-none hover:bg-muted md:w-64 lg:w-80"
        onClick={() => setSearchOpen(true)}
      >
        <Search className="mr-2 size-3.5 text-muted-foreground" />
        <span className="text-muted-foreground">Search Guilderia...</span>
        <kbd className="pointer-events-none absolute right-2 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search users, guilds, applications, reports..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchItems.map((group) => (
            <React.Fragment key={group.group}>
              <CommandGroup heading={group.group}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.href}
                    onSelect={() => {
                      setSearchOpen(false);
                      window.location.href = item.href;
                    }}
                  >
                    <item.icon className="mr-2 size-4" />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative size-8">
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <span className="sr-only">Notifications</span>
        </Button>

        <Button variant="ghost" size="icon" className="size-8">
          <HelpCircle className="size-4" />
          <span className="sr-only">Help</span>
        </Button>

        <div className="ml-1 flex items-center gap-1.5 pl-1">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="hidden text-xs font-medium text-muted-foreground lg:inline">
            All systems operational
          </span>
        </div>
      </div>
    </header>
  );
}
