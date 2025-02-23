// app/markets/[id]/page.tsx
"use server";
import { api } from '../../../utils/helpers';
import MarketDashboard from '@/components/MarketDashboard';
import Analyst from '@/components/Analyst';
import MarketDetails from '@/components/MarketDetail';
import BetPanel from '@/components/BetPanel';


export default async function MarketPage({ params }) {
    const resolvedParams = await Promise.resolve(params);
    const series = resolvedParams.series;
    const ticker = resolvedParams.ticker;

    try {
        const candleData = await api.get(`/api/candlesticks?series_ticker=${series}&ticker=${ticker}`);
        // todo: also get data to display on the page
        const marketData = await api.get(`/api/markets?ticker=${ticker}`);

        if (!candleData) {
            console.log("No data received");
            return <div>No data available</div>;
        }
        return (
            <div className="flex flex-col items-center w-full">
                <h1 className="text-2xl font-semibold mb-4"></h1>
                <div className="w-4/5 mx-auto space-y-6"> {/* Changed from w-2/3 to w-4/5 */}
                    <div className="flex gap-6">
                        <div className="flex-1">
                            <MarketDashboard data={candleData.candlesticks || []} market={marketData || []} />
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex-1">
                            <Analyst />
                        </div>
                        <div className="flex-1">
                            {/* <BetPanel market={marketData || []} /> */}
                        </div>
                    </div>
                </div>
            </div>
        );

    } catch (error) {
        console.error('Error fetching data:', error);
        return <div>Error loading market data</div>;
    }
}