"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const userActivityData = [
  { time: "00:00", users: 2100 },
  { time: "04:00", users: 1800 },
  { time: "08:00", users: 5400 },
  { time: "12:00", users: 8200 },
  { time: "16:00", users: 7800 },
  { time: "20:00", users: 9500 },
  { time: "23:59", users: 6200 },
];

const trafficData = [
  { time: "00:00", requests: 120000 },
  { time: "04:00", requests: 85000 },
  { time: "08:00", requests: 320000 },
  { time: "12:00", requests: 480000 },
  { time: "16:00", requests: 450000 },
  { time: "20:00", requests: 520000 },
  { time: "23:59", requests: 380000 },
];

interface ChartCardProps {
  title: string;
  data: Array<{ time: string; value: number }>;
  dataKey: string;
  color?: string;
  fillColor?: string;
  valueFormatter?: (value: number) => string;
}

function ChartCard({
  title,
  data,
  dataKey,
  color = "hsl(var(--primary))",
  valueFormatter = (v) => v.toLocaleString(),
}: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-50 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
              <defs>
                <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={valueFormatter}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium">
                        {valueFormatter(payload[0].value as number)}
                      </p>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fill={`url(#gradient-${dataKey})`}
                dot={false}
                activeDot={{ r: 4, fill: color, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function TrafficCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ChartCard
        title="User Activity"
        data={userActivityData.map((d) => ({ time: d.time, value: d.users }))}
        dataKey="users"
        color="hsl(var(--chart-1))"
        fillColor="hsl(var(--chart-1) / 0.1)"
        valueFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
      />
      <ChartCard
        title="Platform Traffic"
        data={trafficData.map((d) => ({ time: d.time, value: d.requests }))}
        dataKey="traffic"
        color="hsl(var(--chart-2))"
        fillColor="hsl(var(--chart-2) / 0.1)"
        valueFormatter={(v) => `${(v / 1000).toFixed(0)}k req/h`}
      />
    </div>
  );
}
