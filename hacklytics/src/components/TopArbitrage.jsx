"use client";

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArbitrageItem } from "./ArbitrageItem"
import { useState, useEffect } from 'react';
// import data from './starterData.json';



export function TopArbitrages() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/starterData.json')
          .then(response => {
            if (!response.ok) {
              throw new Error('Did not fetch data successfully');
            } return response.json();
          }).then(data => setData(data))
          .catch(error => console.error('Error fetching JSON:', error));
      }, []);

    if (!data) {
        return <div>Loading...</div>;
    }


    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                    Top Arbitrages
                </CardTitle>
                <CardDescription>
                    Top calculated arbitrages just for you by our algorithm!
                </CardDescription>
            </CardHeader>

            {data.arbitrages?.map(arb => (
                <ArbitrageItem key={arb.title} {...arb} />
            ))}
        </Card>
    )
}