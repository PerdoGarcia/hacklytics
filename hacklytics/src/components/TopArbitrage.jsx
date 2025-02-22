"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArbitrageItem } from "./ArbitrageItem";

export function TopArbitrages() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/starterData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Did not fetch data successfully");
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <Card className="mx-auto w-[750px] text-center">
      <CardHeader>
        <CardTitle>Top Arbitrages</CardTitle>
        <CardDescription>
          Top calculated arbitrages just for you by our algorithm!
        </CardDescription>
      </CardHeader>

      {/* The arbitrage items go into the CardContent below the header. */}
      <CardContent className="space-y-4 pb-8">
        {data.arbitrages?.map((arb) => (
          <ArbitrageItem key={arb.title} {...arb} />
        ))}
      </CardContent>
    </Card>
  );
}
