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
    <Card className="h-[500px] w-full flex flex-col bg-black ">
      <CardHeader className="text-center flex-none pb-2"> {/* Reduce padding */}
        <CardTitle>Top Matrices</CardTitle>
        <CardDescription>
          Top matrices computed for you by our algorithm!
        </CardDescription>
      </CardHeader>

      <div className="flex-1 overflow-y-auto px-4 no-scrollbar"> {/* Hide scrollbar */}
        <div className="space-y-4">
          {currentMatrices.map((matrix, index) => (
            <OddsMatrix
              key={index}
              dashboardData={matrix}
            />
          ))}
        </div>
      </div>

      <div className="p-4 border-t flex-none mt-auto"> {/* Push to bottom */}
        <div className="space-x-2 flex justify-center">
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
      </div>
    </Card>
  );
}
