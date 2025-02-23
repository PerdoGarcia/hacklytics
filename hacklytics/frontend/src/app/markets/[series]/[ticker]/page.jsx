"use server";
import { api } from '../../../utils/helpers';
import MarketDashboard from '@/components/MarketDashboard';
import Analyst from '@/components/Analyst';
import styles from './styles.module.css';
import MarketTop from '@/components/MarketTop';

export default async function MarketPage({ params }) {
  const { series, ticker } = await Promise.resolve(params);
  const url = "https://kalshi.com/markets/" + series + "/" + ticker;
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
      <div className="bg-[#232b2b]">
        <div className={styles.layoutContainer}>
          {/* Top Component */}
          <div className={styles.topComponent}>
            <MarketDashboard data={candleData.candlesticks || []} market={marketData || []} />
          </div>

                  <div className={styles.bottomContainer}>
          <div className={styles.leftComponent}>
            <MarketTop data={candleData.candlesticks || []} />
          </div>
          <div className={styles.rightComponent}>
            <Analyst />
          </div>
        </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div className={styles.error}>Error loading market data</div>;
  }
}
