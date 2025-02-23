import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    color: "black",
  },
  bid: {
    label: "Bid Price",
    color: "blue",
  },
  ask: {
    label: "Ask Price",
    color: "green",
  },
};

export default function CandleChart({ data, market }) {
  const yesPrice = market.yes_ask;
  const noPrice = market.no_ask;
  const yesPayout = ((100 / yesPrice) * 100).toFixed(2);
  const noPayout = ((100 / noPrice) * 100).toFixed(2);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col space-y-4 border-b py-5">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{market.title}</CardTitle>
            <CardDescription className="mt-1">
              Showing bid/ask spread and trade prices
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-6 lg:grid-cols-3 px-2 pt-4 sm:px-6 sm:pt-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full" // Made chart taller
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
                dataKey="bid"
                type="natural"
                fill="url(#fillBid)"
                stroke="var(--color-bid)"
                stackId="a"
              />
              <Area
                dataKey="ask"
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
        </div>

        {/* Market Details Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="flex-1 text-right">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Yes</p>
                <p className="text-xl font-bold text-blue-700">{yesPrice}¢</p>
                <p className="text-xs text-blue-600">Payout: ${yesPayout}</p>
              </div>
            </div>
            <div className="flex-1 text-right">
              <div className="bg-purple-50 px-4 py-2 rounded-lg">
                <p className="text-sm font-medium text-purple-600">No</p>
                <p className="text-xl font-bold text-purple-700">{noPrice}¢</p>
                <p className="text-xs text-purple-600">Payout: ${noPayout}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="flex-1 text-right">
              <div className="bg-slate-50 px-4 py-2 rounded-lg">
                <p className="text-sm font-medium text-slate-600">Volume</p>
                <p className="text-xl font-bold text-slate-700">${market.volume.toLocaleString()}</p>
                <p className="text-xs text-slate-600">24h: ${market.volume_24h.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex-1 text-right">
              <div className="bg-emerald-50 px-4 py-2 rounded-lg">
                <p className="text-sm font-medium text-emerald-600">Open Interest</p>
                <p className="text-xl font-bold text-emerald-700">{market.open_interest.toLocaleString()}</p>
                <p className="text-xs text-emerald-600">Liquidity: ${(market.liquidity / 100).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            <strong>Expiration:</strong> {new Date(market.expiration_time).toLocaleDateString()}
          </p>
          <div className="text-sm space-y-1">
            <p className="text-sm text-gray-600">
              <strong>Rules:</strong> {market.rules_primary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}