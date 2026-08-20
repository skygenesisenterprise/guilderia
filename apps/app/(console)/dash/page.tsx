"use client";

import * as React from "react";
import { Users, MessageSquare, Zap, Radio } from "lucide-react";
import { StatCard } from "@/components/console/stat-card";
import { PlatformHealth } from "@/components/console/platform-health";
import { ActivityFeed } from "@/components/console/activity-feed";
import { TrafficCharts } from "@/components/console/traffic-chart";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const displayName = user?.displayName ?? user?.name ?? "Administrator";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {displayName}. Here&apos;s what&apos;s happening across Guilderia.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Users"
          value="128,421"
          change="+8.4%"
          changeType="positive"
          icon={<Users className="size-4 text-muted-foreground" />}
        />
        <StatCard
          title="Guilds"
          value="8,492"
          change="+3.2%"
          changeType="positive"
          icon={<MessageSquare className="size-4 text-muted-foreground" />}
        />
        <StatCard
          title="Messages"
          value="4.8M/day"
          change="+12.1%"
          changeType="positive"
          icon={<Zap className="size-4 text-muted-foreground" />}
        />
        <StatCard
          title="Online"
          value="12,842"
          change="+5.7%"
          changeType="positive"
          icon={<Radio className="size-4 text-muted-foreground" />}
        />
      </div>

      <PlatformHealth />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrafficCharts />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
