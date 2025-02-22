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
  const [page, setPage] = useState(0);
  const pageSize = 5; // Number of arbitrages per page

  useEffect(() => {
    fetch('/starterData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Did not fetch data successfully');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => console.error('Error fetching JSON:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Calculate total pages and slice the arbitrages for the current page
  const totalArbs = data.arbitrages.length;
  const totalPages = Math.ceil(totalArbs / pageSize);
  const currentArbs = data.arbitrages.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <Card className="w-[500px]">
      <CardHeader className="text-center">
        <CardTitle>Top Arbitrages</CardTitle>
        <CardDescription>
          Top calculated arbitrages just for you by our algorithm!
        </CardDescription>
      </CardHeader>

      <div className="space-y-4 pb-6">
        {currentArbs.map(arb => (
          <ArbitrageItem key={arb.title} {...arb} />
        ))}
      </div>

      <div className="space-x-2 flex justify-center pb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
        >
          Next
        </Button>
      </div>
    </Card>
  );
}
