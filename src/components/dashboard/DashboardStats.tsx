"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Product } from "@/types/product";

interface DashboardStatsProps {
  products: Product[];
}

export function DashboardStats({ products }: DashboardStatsProps) {
  const data = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    products.forEach((p) => {
      const cat = p.category || "Other";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    return Object.entries(categoryCounts)
      .map(([name, count]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  if (!products || products.length === 0) return null;

  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Your Items by Category</h2>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">
        A quick overview of your listed products.
      </p>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(150, 150, 150, 0.1)" }}
              contentStyle={{
                backgroundColor: "var(--background, #fff)",
                borderColor: "var(--border, #e2e8f0)",
                borderRadius: "8px",
                color: "var(--foreground, #000)"
              }}
              itemStyle={{ color: "var(--foreground, #000)" }}
            />
            <Bar
              dataKey="count"
              name="Products"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
