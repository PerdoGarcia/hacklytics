// app/markets/[id]/page.tsx
"use server";
import { api } from '../../utils/helpers';
import MarketDashboard from '@/components/MarketDashboard';


export default async function MarketPage({ params }) {
    const [seriesTicker, marketNumber] = params.id.split('-');
    const ticker = `${seriesTicker}-${marketNumber}`;

    try {
      const candleData = await api.get(`/api/candlesticks?series_ticker=${seriesTicker}&ticker=${ticker}`);

      if (!candleData) {
        return <div>No data available</div>;
      }

      return (
        <div>
          <h1>Market Page</h1>
          <MarketDashboard data={candleData} />
        </div>
      );
    } catch (error) {
      console.error('Error:', error);
      return <div>Error loading market data</div>;
    }
  }
