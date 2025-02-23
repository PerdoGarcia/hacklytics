// app/markets/[id]/page.tsx
"use server";
import { api } from '../../../utils/helpers';
import MarketDashboard from '@/components/MarketDashboard';
import Analyst from '@/components/Analyst';
import MarketDetails from '@/components/MarketDetail';
import BetPanel from '@/components/BetPanel';
import mstyles from './markets.module.css';


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
            return <div className={mstyles.error}>No data available</div>;
        }
        return (
            <div className={mstyles.container}>
                <h1 className={mstyles.header}>Market Details</h1>
                <div className={mstyles.content}> {/* Changed from w-2/3 to w-4/5 */}
                    <div className={mstyles.dashboard}>
                        <div className={mstyles.panel}>
                            <MarketDashboard data={candleData.candlesticks || []} market={marketData || []} />
                        </div>
                    </div>
                    <div className={mstyles.dashboard}>
                        <div className={mstyles.panel}>
                            <Analyst />
                        </div>
                        <div className={mstyles.panel}>
                            {/* <BetPanel market={marketData || []} /> */}
                        </div>
                    </div>
                </div>
            </div>
        );

    } catch (error) {
        console.error('Error fetching data:', error);
        return <div className={mstyles.error} >Error loading market data</div>;
    }
}