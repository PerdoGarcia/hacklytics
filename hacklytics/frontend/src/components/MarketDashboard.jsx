'use client';
import CandleChart from './CandleChart';

export default function MarketDashboard({ data, market }) {
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
                askPrice: candlestick.yes_ask.close,
                volume: candlestick.volume,
                openInterest: candlestick.open_interest
            };
        });
    }

    const chartData = transformData(data);

    return (
        <div className="space-y-4">
            <div className="h-96 w-full ">
                <CandleChart data={chartData}
                market={market || []}/>
            </div>
        </div>
    );
}