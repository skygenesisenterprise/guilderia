"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Compass, Home, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockServers, getServerHomeRoute, type Server } from "@/lib/server-data";

function PillIndicator({ isActive, isUnread }: { isActive: boolean; isUnread?: boolean }) {
  if (!isActive && !isUnread) return null;

  return (
    <span
      className={cn(
        "absolute -left-4.5 top-1/2 w-1 -translate-y-1/2 rounded-r-full bg-white transition-all duration-200",
        isActive ? "h-10" : isUnread ? "h-2" : "h-0"
      )}
    />
  );
}

function MentionBadge({ count }: { count: number }) {
  return (
    <span className="absolute -bottom-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f23f43] px-1 text-[11px] font-bold text-white ring-4 ring-[#313338]">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function ServerIcon({ server, isActive }: { server: Server; isActive: boolean }) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <PillIndicator isActive={isActive} isUnread={server.unread} />

      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center overflow-hidden text-sm font-semibold transition-all duration-200",
          isActive ? "rounded-2xl" : "rounded-3xl hover:rounded-2xl",
          server.icon ? "" : "bg-[#2b2d31] text-white"
        )}
      >
        {server.icon ? (
          <Image src={server.icon} alt={server.name} fill className="object-cover" />
        ) : (
          <span>{server.acronym}</span>
        )}
      </div>

      {server.mentions && server.mentions > 0 && <MentionBadge count={server.mentions} />}
    </div>
  );
}

export function SidebarServerList() {
  const pathname = usePathname();
  const isHomeActive = pathname === "/channels/me";

  return (
    <div className="flex min-h-0 flex-1 w-18 shrink-0 flex-col items-center border-r border-[#3f4147] bg-[#313338] py-3">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href="/channels/me"
            className={cn(
              "relative flex h-12 w-12 items-center justify-center transition-all duration-200",
              isHomeActive
                ? "rounded-2xl bg-[#5865f2] text-white"
                : "rounded-3xl bg-[#2b2d31] text-[#dbdee1] hover:rounded-2xl hover:bg-[#5865f2] hover:text-white"
            )}
          >
            <PillIndicator isActive={isHomeActive} />
            <Home className="h-6 w-6" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Messages privés</TooltipContent>
      </Tooltip>

      <div className="my-2 h-0.5 w-8 rounded-full bg-[#35363c]" />

      <div className="flex flex-1 flex-col items-center gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-width:none">
        {mockServers.map((server) => {
          const isActive = pathname.startsWith(`/channels/${server.id}`);
          return (
            <Tooltip key={server.id}>
              <TooltipTrigger asChild>
                <Link href={getServerHomeRoute(server.id)}>
                  <ServerIcon server={server} isActive={isActive} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{server.name}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#2b2d31] text-[#3ba55d] transition-all duration-200 hover:rounded-2xl hover:bg-[#3ba55d] hover:text-white">
            <Plus className="h-6 w-6" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">Ajouter un serveur</TooltipContent>
      </Tooltip>

      <div className="my-2 h-0.5 w-8 rounded-full bg-[#35363c]" />

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#2b2d31] text-[#3ba55d] transition-all duration-200 hover:rounded-2xl hover:bg-[#3ba55d] hover:text-white">
            <Compass className="h-6 w-6" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">Explorer les serveurs publics</TooltipContent>
      </Tooltip>
    </div>
  );
}
