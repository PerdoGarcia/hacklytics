"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MarketDetails({ market }) {
  const data = market;
  return (
    <div>
    <Card className="shadow-md border rounded-lg p-4 bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-50 text-blue-700">Type: {market.market_type.toUpperCase()}</Badge>
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
