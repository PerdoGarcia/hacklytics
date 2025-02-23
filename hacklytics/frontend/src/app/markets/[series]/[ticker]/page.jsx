// app/markets/[id]/page.tsx
"use server";
import { api } from '../../../utils/helpers';
import MarketDashboard from '@/components/MarketDashboard';
import Analyst from '@/components/Analyst';
import styles from './styles.module.css';

export default async function MarketPage({ params }) {
  const { series, ticker } = params;

  try {
    const candleData = await api.get(
      `/api/candlesticks?series_ticker=${series}&ticker=${ticker}`
    );
    const marketData = await api.get(
      `/api/markets?ticker=${ticker}`
    );

    if (!candleData) {
      return <div className={styles.error}>No data available</div>;
    }

    return (
      <div className = "bg-[#232b2b]">
      <div className={styles.container}>
        <h1 className={styles.header}>Market Dashboard</h1>
        {/* Top (Chart) */}
        <div className={styles.chart}>
          <MarketDashboard
            data={candleData.candlesticks || []}
            market={marketData || []}
          />
        </div>

        {/* Underneath (AI panel) */}
        <div className={styles.analyst}>
          <Analyst />
        </div>
      </div>
      </div> 
    );

  } catch (error) {
    console.error('Error fetching data:', error);
    return <div className={styles.error}>Error loading market data</div>;
  }
}
