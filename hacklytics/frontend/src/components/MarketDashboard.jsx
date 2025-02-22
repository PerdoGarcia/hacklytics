'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar, Area } from 'recharts';

export default function MarketDashboard({ data }) {
    console.log('Initial data received:', data); // See what we're getting

    const transformData = (candlesticks) => {
      if (!candlesticks) {
        console.log('No candlesticks data received');
        return [];
      }

      if (!Array.isArray(candlesticks)) {
        console.log('Candlesticks is not an array:', candlesticks);
        return [];
      }

      return candlesticks.map(stick => {
        try {
          const midPrice = (stick.yes_ask.close + stick.yes_bid.close) / 2;

          return {
            timestamp: new Date(stick.end_period_ts * 1000).toLocaleDateString(),
            bidPrice: stick.yes_bid.close,
            askPrice: stick.yes_ask.close,
            volume: stick.volume,
            openInterest: stick.open_interest,
            price: stick.price.close !== null ? stick.price.close : midPrice,
            spread: stick.yes_ask.close - stick.yes_bid.close,
            hasTraded: stick.price.close !== null
          };
        } catch (error) {
          console.error('Error processing candlestick:', stick, error);
          return null;
        }
      }).filter(Boolean); // Remove any null entries
    };

    const chartData = transformData(data);

    return (
      <div className="space-y-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Market Price Movement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                {/* Chart will go here */}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }