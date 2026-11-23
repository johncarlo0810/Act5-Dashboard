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

export default function Chart12AveragePricePerCategory({ data = [], isLoading, error, onRetry }) {
  const chartData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
      name: item.name || 'Unknown',
      avg_price: Number(item.avg_price) || 0,
    }));
  }, [data]);

  return (
    <ChartCard
      problemNumber={12}
      section="D"
      title="Average Product Price per Category"
      subtitle="Statistical mean product unit price broken down by category."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && chartData.length === 0}
      onRetry={onRetry}
      badgeColor="orange"
      height={380}
      footerNote="Average unit price across product categories."
    >
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={chartData}
          margin={{ top: 25, right: 20, left: 10, bottom: 25 }}
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
            tickFormatter={(val) => `$${val}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="custom-tooltip">
                    <div className="label">{item.name}</div>
                    <div className="value">Average Price: ${item.avg_price.toFixed(2)}</div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="avg_price" radius={[8, 8, 0, 0]}>
            <LabelList
              dataKey="avg_price"
              position="top"
              formatter={(val) => `$${Number(val).toFixed(2)}`}
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
