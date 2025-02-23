"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BetPanel({ market }) {
  const [amount, setAmount] = React.useState("");
  const yesPrice = market.yes_ask / 100;
  const noPrice = market.no_ask / 100;
  const payoutYes = amount ? (amount / yesPrice) * market.notional_value : 0;
  const payoutNo = amount ? (amount / noPrice) * market.notional_value : 0;

  return (
    <Card className="shadow-md border rounded-lg p-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Place Your Bet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Yes</span>
          <Button variant="outline" className="bg-blue-100 text-blue-600">
            Buy Yes ${yesPrice.toFixed(2)}
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">No</span>
          <Button variant="outline" className="bg-red-100 text-red-600">
            Buy No ${noPrice.toFixed(2)}
          </Button>
        </div>

        {/* Amount Input */}
        <div>
          <Label className="text-sm font-medium">Enter Amount ($)</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Payouts */}
        <div className="text-sm text-gray-600">
          <p>Payout if Yes wins: <span className="font-bold">${payoutYes.toFixed(2)}</span></p>
          <p>Payout if No wins: <span className="font-bold">${payoutNo.toFixed(2)}</span></p>
        </div>

        {/* Place Bet Button */}
        <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
          Place Bet
        </Button>
      </CardContent>
    </Card>
  );
}
