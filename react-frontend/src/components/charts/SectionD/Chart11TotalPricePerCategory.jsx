import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import ChartCard from '../ChartCard';

const CATEGORY_COLORS = {
  Electronics: '#2563eb',
  Books: '#8b5cf6',
  Clothing: '#ec4899',
  Home: '#f59e0b',
  Sports: '#10b981',
};

export default function Chart11TotalPricePerCategory({ data = [], isLoading, error, onRetry }) {
  const chartData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
      name: item.name || 'Unknown',
      total_price: Number(item.total_price) || 0,
    }));
  }, [data]);

  return (
    <ChartCard
      problemNumber={11}
      section="D"
      title="Total Product Price per Category"
      subtitle="Sum of product prices grouped by category."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && chartData.length === 0}
      onRetry={onRetry}
      badgeColor="orange"
      height={380}
      footerNote="Total price value grouped by product category."
    >
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={chartData}
          margin={{ top: 25, right: 20, left: 20, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#1e293b', fontWeight: 600 }}
            stroke="#cbd5e1"
          />
          <YAxis
            type="number"
            tick={{ fontSize: 11, fill: '#64748b' }}
            stroke="#cbd5e1"
            tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="custom-tooltip">
                    <div className="label">{item.name}</div>
                    <div className="value">Total Value: ${item.total_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="total_price" radius={[8, 8, 0, 0]}>
            <LabelList
              dataKey="total_price"
              position="top"
              formatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : Number(val).toFixed(0)}`}
              style={{ fontSize: '11px', fill: '#334155', fontWeight: 600 }}
            />
            {chartData.map((entry) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={CATEGORY_COLORS[entry.name] || '#3b82f6'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
