"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
}

const services: ServiceStatus[] = [
  { name: "API Gateway", status: "operational" },
  { name: "Realtime Gateway", status: "operational" },
  { name: "Database", status: "operational" },
  { name: "Redis", status: "operational" },
  { name: "Object Storage", status: "operational" },
  { name: "Media Processing", status: "degraded" },
];

const statusConfig = {
  operational: {
    label: "Operational",
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  degraded: {
    label: "Degraded",
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
  },
  outage: {
    label: "Major Outage",
    dot: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
  },
};

export function PlatformHealth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Platform Health</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const config = statusConfig[service.status];
            return (
              <div
                key={service.name}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <span className="text-sm font-medium">{service.name}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={cn("relative flex size-2", config.dot)}
                  >
                    {service.status === "operational" && (
                      <span
                        className={cn(
                          "absolute inline-flex size-full animate-ping rounded-full opacity-75",
                          config.dot
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "relative inline-flex size-2 rounded-full",
                        config.dot
                      )}
                    />
                  </span>
                  <span className={cn("text-xs font-medium", config.text)}>
                    {config.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
