'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar, Area } from 'recharts';
import CandleChart from './CandleChart';
import OddsMatrix from './OddsMatrix';
import { Dancing_Script } from 'next/font/google';

export default function MarketDashboard({ data }) {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        fetch('/dummyOdds.json')
          .then(response => {
            if (!response.ok) {
              throw new Error('Did not fetch data successfully');
            }
            return response.json();
          })
          .then(data => setDashboardData(data))
          .catch(error => console.error('Error fetching JSON:', error));
      }, []);
    
    if (!dashboardData) {
    return <div>Loading...</div>;
    }
    
    const transformData = (candlesticks) => {
        if (!candlesticks || !Array.isArray(candlesticks)) {
          return [];
        }

        return candlesticks.map(candlestick => {
            const currentPrice = candlestick.price.mean !== null
                ? candlestick.price.mean
                : candlestick.price.previous;

            return {
                timestamp: new Date(candlestick.end_period_ts * 1000).toLocaleDateString(),
                price: currentPrice,
                bidPrice: candlestick.yes_bid.close,
                askPrice: candlestick.yes_ask.close,
                volume: candlestick.volume,
                openInterest: candlestick.open_interest
            };
        });
    }

    const chartData = transformData(data);

    return (
        <div className="space-y-4">
            <div className="h-96 w-full">
                <CandleChart data={chartData} />
                <OddsMatrix chartData={chartData} dashboardData={dashboardData} />
            </div>
        </div>
    );
}