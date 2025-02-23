'use client';
import React, { useState, useEffect } from 'react';
import TopMatrices from './TopMatrices';

export default function MarketDashboard({ data, market, url}) {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        fetch('/market_data.json')
          .then(response => {
            if (!response.ok) {
              throw new Error('Did not fetch data successfully');
            }
            return response.json();
          })
          .then(data => {
            // Filter out entries with volume < 20
            const filteredData = data.filter(item => item.volume >= 20);
            setDashboardData(filteredData);
          })
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
                bid: candlestick.yes_bid.close,
                ask: candlestick.yes_ask.close,
                volume: candlestick.volume,
                openInterest: candlestick.open_interest
            };
        });
    }

    const chartData = transformData(data);

    const yes0 = chartData[chartData.length - 1].price;
    const title0 = market.title;

    return (
        <div className="space-y-4">
            <div className="h-96 w-full ">
                <TopMatrices
                    dashboardData={dashboardData}
                    yes0={yes0}
                    title0={title0}
                />
            </div>
        </div>
    );
}