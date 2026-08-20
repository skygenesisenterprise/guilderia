"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
          {icon && (
            <div className="flex size-8 items-center justify-center rounded-md bg-muted">
              {icon}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-semibold tracking-tight">{value}</span>
          {change && (
            <div className="flex items-center gap-1 text-xs">
              {changeType === "positive" && (
                <TrendingUp className="size-3 text-emerald-500" />
              )}
              {changeType === "negative" && (
                <TrendingDown className="size-3 text-red-500" />
              )}
              {changeType === "neutral" && (
                <Minus className="size-3 text-muted-foreground" />
              )}
              <span
                className={cn(
                  "font-medium",
                  changeType === "positive" && "text-emerald-600 dark:text-emerald-400",
                  changeType === "negative" && "text-red-600 dark:text-red-400",
                  changeType === "neutral" && "text-muted-foreground"
                )}
              >
                {change}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
