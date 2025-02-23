"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OddsMatrix from "./OddsMatrix";

export default function TopMatrices({ dashboardData }) {
  // Ensure dashboardData is an array.
  if (!Array.isArray(dashboardData)) {
    return <div>No matrices data available.</div>;
  }


  const [page, setPage] = useState(0);
  const pageSize = 2;

  // Calculate pagination values.
  const totalMatrices = dashboardData.length;
  const totalPages = Math.ceil(totalMatrices / pageSize);
  const currentMatrices = dashboardData.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <Card className="w-[700px]">
      <CardHeader className="text-center">
        <CardTitle>Top Matrices</CardTitle>
        <CardDescription>
          Top matrices computed for you by our algorithm!
        </CardDescription>
      </CardHeader>

      <div className="space-y-4 pb-6">
        {currentMatrices.map((matrix, index) => (
          <OddsMatrix
            key={index}
            dashboardData={matrix}
          />
        ))}
      </div>

      <div className="space-x-2 flex justify-center pb-6">
        <Button
          size="sm"
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
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
