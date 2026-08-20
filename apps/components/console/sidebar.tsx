"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  AppWindow,
  Ban,
  Bot,
  Briefcase,
  ChevronRight,
  Code,
  Compass,
  Cpu,
  CreditCard,
  Database,
  Flag,
  FolderOpen,
  Globe,
  HardDrive,
  Key,
  KeyRound,
  Layers,
  LayoutDashboard,
  ListOrdered,
  Lock,
  LogOut,
  MessageCircleQuestion,
  MessageSquare,
  Rocket,
  ScrollText,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  Sparkles,
  ToggleLeft,
  User,
  UserCog,
  Users,
  Webhook,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Platform",
    items: [
      { title: "Overview", href: "/dash", icon: LayoutDashboard },
      { title: "Users", href: "/dash/users", icon: Users },
      { title: "Guilds", href: "/dash/guilds", icon: MessageSquare },
      { title: "Applications", href: "/dash/applications", icon: AppWindow },
      { title: "Instances", href: "/dash/instances", icon: Server },
      { title: "Discovery", href: "/dash/discovery", icon: Compass },
    ],
  },
  {
    title: "Operations",
    items: [
      { title: "Services", href: "/dash/services", icon: Layers },
      { title: "Deployments", href: "/dash/deployments", icon: Rocket },
      { title: "Jobs", href: "/dash/jobs", icon: Briefcase },
      { title: "Queues", href: "/dash/queues", icon: ListOrdered },
      { title: "Incidents", href: "/dash/incidents", icon: AlertTriangle },
      { title: "Maintenance", href: "/dash/maintenance", icon: Wrench },
    ],
  },
  {
    title: "Trust & Safety",
    items: [
      { title: "Reports", href: "/dash/reports", icon: Flag },
      { title: "Moderation", href: "/dash/moderation", icon: Shield },
      { title: "Appeals", href: "/dash/appeals", icon: MessageCircleQuestion },
      { title: "Bans", href: "/dash/bans", icon: Ban },
      { title: "Audit Logs", href: "/dash/audit", icon: ScrollText },
    ],
  },
  {
    title: "Developer",
    items: [
      { title: "API", href: "/dash/api", icon: Code },
      { title: "OAuth2", href: "/dash/oauth2", icon: Key },
      { title: "Bots", href: "/dash/bots", icon: Bot },
      { title: "Webhooks", href: "/dash/webhooks", icon: Webhook },
      { title: "API Keys", href: "/dash/api-keys", icon: KeyRound },
      { title: "Feature Flags", href: "/dash/feature-flags", icon: ToggleLeft },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { title: "Database", href: "/dash/database", icon: Database },
      { title: "Redis", href: "/dash/redis", icon: HardDrive },
      { title: "Storage", href: "/dash/storage", icon: FolderOpen },
      { title: "Workers", href: "/dash/workers", icon: Cpu },
      { title: "Regions", href: "/dash/regions", icon: Globe },
    ],
  },
  {
    title: "Administration",
    items: [
      { title: "Staff", href: "/dash/staff", icon: UserCog },
      { title: "Roles & Permissions", href: "/dash/roles", icon: Lock },
      { title: "Security", href: "/dash/security", icon: ShieldCheck },
      { title: "Billing", href: "/dash/billing", icon: CreditCard },
      { title: "Settings", href: "/dash/settings", icon: Settings },
    ],
  },
];

export function ConsoleSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const userDisplayName = user?.displayName ?? user?.name ?? "Administrator";
  const userRole = "Administrator";
  const userAvatar = user?.avatarUrl;
  const userInitials = userDisplayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/50">
        <Link
          href="/dash"
          className="flex flex-col px-2 py-3 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:py-2"
        >
          <span className="text-base font-semibold tracking-tight text-sidebar-foreground">
            Guilderia
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
            Management Console
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-1 px-2 py-2">
            {navSections.map((section) => {
              const isSectionActive = section.items.some((item) => item.href === pathname);

              return (
                <Collapsible
                  key={section.title}
                  defaultOpen={isSectionActive}
                  className="group/section"
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        "group-data-[collapsible=icon]:hidden"
                      )}
                    >
                      {section.title}
                      <ChevronRight className="ml-auto size-3.5 shrink-0 transition-transform group-data-[state=open]/section:rotate-90" />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="group-data-[collapsible=icon]:hidden">
                    <SidebarMenu>
                      {section.items.map((item) => {
                        const isActive = item.href === pathname;
                        return (
                          <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                              <Link href={item.href}>
                                <item.icon className="size-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
              <Avatar className="size-8 shrink-0">
                {userAvatar && <AvatarImage src={userAvatar} alt={userDisplayName} />}
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-medium">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-medium">{userDisplayName}</span>
                <span className="truncate text-xs text-sidebar-foreground/60">{userRole}</span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-56" sideOffset={8}>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{userDisplayName}</p>
                <p className="text-xs text-muted-foreground">{userRole}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Sparkles className="mr-2 size-4" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
