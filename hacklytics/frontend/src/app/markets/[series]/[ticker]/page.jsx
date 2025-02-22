// app/markets/[id]/page.tsx
"use server";
import { api } from '../../../utils/helpers';
import MarketDashboard from '@/components/MarketDashboard';


export default async function MarketPage({ params }) {
    const resolvedParams = await Promise.resolve(params);
    const series = resolvedParams.series;
    const ticker = resolvedParams.ticker;

    try {
        const candleData = await api.get(`/api/candlesticks?series_ticker=${series}&ticker=${ticker}`);

        if (!candleData) {
            console.log("No data received");
            return <div>No data available</div>;
        }

        return (
            <div>
                <h1>Market Page</h1>
                <MarketDashboard data={candleData.candlesticks || []} />
            </div>
        );
    } catch (error) {
        console.error('Error fetching data:', error);
        return <div>Error loading market data</div>;
    }
}