'use client';
import React, { useState, useEffect } from 'react';
import CandleChart from './CandleChart';

export default function MarketDashboard({ url, data, market }) {
  const [dashboardData, setDashboardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch('/market_data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Did not fetch data successfully');
        }
        return response.json();
      })
      .then(data => setDashboardData(data))
      .catch(error => console.error('Error fetching JSON:', error));
  }, []);

  useEffect(() => {
    const filtered = dashboardData.filter(item => item.volume >= 10);
    setFilteredData(filtered);
  }, [dashboardData]);

  // Check if dashboardData is empty to show a loading state
  if (dashboardData.length === 0) {
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
  };

  const chartData = transformData(data);

  return (
    <div className="space-y-4">
      <div className="h-96 w-full">
        <CandleChart
          url={url}
          data={chartData}
          market={market || []}
        />

      </div>
    </div>
  );
}