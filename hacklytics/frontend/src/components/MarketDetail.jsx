"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MarketDetails({ market }) {
  console.log(market);
  const data = market;
  return (
    <div>
    <Card className="shadow-md border rounded-lg p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-gray-100 text-gray-800">Type: {market.market_type.toUpperCase()}</Badge>
          <Badge className={`text-white ${market.status === "active" ? "bg-green-500" : "bg-gray-500"}`}>
            {market.status.toUpperCase()}
          </Badge>
        </div>

        <p className="text-sm text-gray-600">
          <strong>Expiration Date:</strong> {new Date(market.expiration_time).toLocaleDateString()}
        </p>

        {/* Market Stats */}
        <div className="border-t pt-3 mt-3 text-sm space-y-2">
          <p><strong>Volume:</strong> ${market.volume.toLocaleString()} </p>
          <p><strong>Open Interest:</strong> {market.open_interest.toLocaleString()}</p>
        </div>

        {/* Rules Summary */}
        <div className="border-t pt-3 mt-3">
          <p className="text-sm text-gray-600">
            <strong>Rules:</strong> {market.rules_primary}
          </p>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
