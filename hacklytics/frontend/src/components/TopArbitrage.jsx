"use client";
import styles from '../app/animations.module.css';
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArbitrageItem } from "./ArbitrageItem";
import { Button } from "@/components/ui/button";

export function TopArbitrages() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [animate, setAnimate] = useState(false);
  const pageSize = 5;

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

  const totalArbs = data.arbitrages.length;
  const totalPages = Math.ceil(totalArbs / pageSize);
  const currentArbs = data.arbitrages.slice(page * pageSize, page * pageSize + pageSize);

  const handlePageChange = (newPage) => {
    setAnimate(true);
    setTimeout(() => {
      setPage(newPage);
      setAnimate(false);
    }, 500); // Duration of the animation
  };

  return (
    <Card className={`w-[500px] ${styles.slideLeft} ${'bg-[#3b444b] text-white'}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-[#ffffff]">Top Arbitrages</CardTitle>
        <CardDescription>
          <span className="text-[#ffffff]">Top calculated arbitrages just for you by our algorithm!</span>
        </CardDescription>
      </CardHeader>

      <div className="space-y-4 pb-6">
        {currentArbs.map(arb => (
          <div key={arb.title} className={animate ? styles.slideDown : ''}>
            <ArbitrageItem {...arb} />
          </div>
        ))}
      </div>

      <div className="space-x-2 flex justify-center pb-6">
        <Button
          size="sm"
          onClick={() => handlePageChange(Math.max(page - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          size="sm"
          onClick={() => handlePageChange(Math.min(page + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
        >
          Next
        </Button>
      </div>
    </Card>
  );
}
