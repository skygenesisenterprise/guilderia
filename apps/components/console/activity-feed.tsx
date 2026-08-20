"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  MessageSquarePlus,
  UserX,
  AppWindow,
  Settings,
  Rocket,
  ShieldAlert,
} from "lucide-react";

interface ActivityEvent {
  time: string;
  action: string;
  actor: string;
  resource: string;
  status: "success" | "warning" | "error";
  icon: React.ComponentType<{ className?: string }>;
}

const events: ActivityEvent[] = [
  {
    time: "12:41",
    action: "Guild created",
    actor: "system",
    resource: "Guild #48291",
    status: "success",
    icon: MessageSquarePlus,
  },
  {
    time: "12:38",
    action: "User suspended",
    actor: "moderator_alex",
    resource: "User #128421",
    status: "warning",
    icon: UserX,
  },
  {
    time: "12:31",
    action: "Application registered",
    actor: "developer_jane",
    resource: "App \"Dashboard Widget\" ",
    status: "success",
    icon: AppWindow,
  },
  {
    time: "12:27",
    action: "Configuration updated",
    actor: "admin_liam",
    resource: "Platform Settings",
    status: "success",
    icon: Settings,
  },
  {
    time: "12:19",
    action: "Deployment completed",
    actor: "ci_pipeline",
    resource: "api-gateway v2.4.1",
    status: "success",
    icon: Rocket,
  },
  {
    time: "11:52",
    action: "Moderation action",
    actor: "moderator_alex",
    resource: "Report #38921",
    status: "warning",
    icon: ShieldAlert,
  },
];

const statusDot = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
};

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-1">
          {events.map((event, index) => (
            <div
              key={index}
              className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted/50"
            >
              <div className="flex shrink-0 flex-col items-center gap-1 pt-0.5">
                <div className="flex size-8 items-center justify-center rounded-md border bg-background">
                  <event.icon className="size-3.5 text-muted-foreground" />
                </div>
                {index < events.length - 1 && (
                  <div className="w-px flex-1 bg-border" />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {event.time}
                  </span>
                  <span
                    className={cn("size-1.5 rounded-full", statusDot[event.status])}
                  />
                </div>
                <p className="text-sm font-medium">{event.action}</p>
                <p className="text-xs text-muted-foreground">
                  by <span className="font-medium text-foreground">{event.actor}</span>
                  {" "}&middot;{" "}
                  <span className="truncate">{event.resource}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
