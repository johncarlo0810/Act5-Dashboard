import { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';
import ChartCard from '../ChartCard';

const CATEGORY_COLORS = {
  Electronics: '#2563eb',
  Books: '#8b5cf6',
  Clothing: '#ec4899',
  Home: '#f59e0b',
  Sports: '#10b981',
};

const DEFAULT_COLOR = '#64748b';

export default function Chart2ProductsWithCategory({ data = [], isLoading, error, onRetry }) {
  const [metric, setMetric] = useState('count'); // 'count' | 'avgPrice'

  const categoryAggregates = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];

    const map = {};

    data.forEach((p) => {
      const catName = p.category?.name || 'Uncategorized';
      if (!map[catName]) {
        map[catName] = { name: catName, count: 0, totalPrice: 0 };
      }
      map[catName].count += 1;
      map[catName].totalPrice += Number(p.price) || 0;
    });

    return Object.values(map).map((item) => ({
      name: item.name,
      count: item.count,
      avgPrice: item.count > 0 ? Number((item.totalPrice / item.count).toFixed(2)) : 0,
      totalPrice: Number(item.totalPrice.toFixed(2)),
    }));
  }, [data]);

  const controls = (
    <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
      <button
        type="button"
        onClick={() => setMetric('count')}
        style={{
          fontSize: '11px',
          fontWeight: '600',
          padding: '4px 10px',
          borderRadius: '6px',
          border: 'none',
          background: metric === 'count' ? '#ffffff' : 'transparent',
          color: metric === 'count' ? '#0f172a' : '#64748b',
          boxShadow: metric === 'count' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
          cursor: 'pointer',
        }}
      >
        Product Count
      </button>
      <button
        type="button"
        onClick={() => setMetric('avgPrice')}
        style={{
          fontSize: '11px',
          fontWeight: '600',
          padding: '4px 10px',
          borderRadius: '6px',
          border: 'none',
          background: metric === 'avgPrice' ? '#ffffff' : 'transparent',
          color: metric === 'avgPrice' ? '#0f172a' : '#64748b',
          boxShadow: metric === 'avgPrice' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
          cursor: 'pointer',
        }}
      >
        Avg Price ($)
      </button>
    </div>
  );

  return (
    <ChartCard
      problemNumber={2}
      section="A"
      title="Products with Category"
      subtitle="Products aggregated through the Category relationship."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && categoryAggregates.length === 0}
      onRetry={onRetry}
      badgeColor="blue"
      controls={controls}
      height={380}
      footerNote={`Analyzed ${data.length} product records with category relations.`}
    >
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={categoryAggregates}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#1e293b', fontWeight: 500 }}
            stroke="#cbd5e1"
          />
          <YAxis
            type="number"
            tick={{ fontSize: 11, fill: '#64748b' }}
            stroke="#cbd5e1"
            tickFormatter={(val) => (metric === 'avgPrice' ? `$${val}` : val)}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="custom-tooltip">
                    <div className="label">{item.name} Category</div>
                    <div style={{ color: '#e2e8f0', fontSize: '12px' }}>Total Products: <b>{item.count}</b></div>
                    <div style={{ color: '#e2e8f0', fontSize: '12px' }}>Avg Price: <b>${item.avgPrice.toFixed(2)}</b></div>
                    <div style={{ color: '#e2e8f0', fontSize: '12px' }}>Total Value: <b>${item.totalPrice.toFixed(2)}</b></div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={() => (metric === 'count' ? 'Total Products in Category' : 'Average Product Price ($)')}
          />
          <Bar
            dataKey={metric}
            name={metric === 'count' ? 'Product Count' : 'Average Price'}
            radius={[8, 8, 0, 0]}
          >
            {categoryAggregates.map((entry) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={CATEGORY_COLORS[entry.name] || DEFAULT_COLOR}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
