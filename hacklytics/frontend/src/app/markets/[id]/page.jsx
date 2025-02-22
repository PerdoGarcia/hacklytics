// app/markets/[id]/page.tsx
"use server";
import { api } from '../../utils/helpers';
import MarketDashboard from '@/components/MarketDashboard';


export default async function MarketPage({ params }) {
    console.log("Initial params:", params);
    const resolvedParams = await Promise.resolve(params);
    console.log("Resolved params:", resolvedParams);
    const id = resolvedParams.id;
    const [seriesTicker, marketNumber] = id.split('-');
    const ticker = `${seriesTicker}-${marketNumber}`;

    try {
        console.log("Making API request for:", ticker);
        const candleData = await api.get(`/api/candlesticks?series_ticker=${seriesTicker}&ticker=${ticker}`);
        console.log("Received candleData:", candleData);

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