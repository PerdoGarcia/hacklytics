"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  price: {
    label: "Trade Price",
    color: "hsl(var(--chart-1))",
  },
  bid: {
    label: "Bid Price",
    color: "hsl(var(--chart-2))",
  },
  ask: {
    label: "Ask Price",
    color: "hsl(var(--chart-3))",
  },
};

export default function CandleChart({ data }) {
    console.log("First 3 items:", data.slice(0, 3));
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Market Price Movement</CardTitle>
          <CardDescription>
            Showing bid/ask spread and trade prices
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillBid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-bid)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-bid)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillAsk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-ask)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-ask)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="bidPrice"
              type="natural"
              fill="url(#fillBid)"
              stroke="var(--color-bid)"
              stackId="a"
            />
            <Area
              dataKey="askPrice"
              type="natural"
              fill="url(#fillAsk)"
              stroke="var(--color-ask)"
              stackId="a"
            />
            <Area
              dataKey="price"
              type="natural"
              stroke="var(--color-price)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}