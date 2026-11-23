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

export default function Chart14AveragePriceSorted({ data = [], isLoading, error, onRetry }) {
  const chartData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    // Data is returned pre-sorted ascending from backend query: ->orderBy('avg_price', 'asc')
    return data.map((item) => ({
      name: item.name || 'Unknown',
      avg_price: Number(item.avg_price) || 0,
    }));
  }, [data]);

  return (
    <ChartCard
      problemNumber={14}
      section="D"
      title="Average Price per Category (Sorted Ascending)"
      subtitle="Ranked horizontal visualization ordering categories from lowest to highest mean product cost."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && chartData.length === 0}
      onRetry={onRetry}
      badgeColor="orange"
      height={380}
      footerNote="Sorted in ascending order from lowest to highest average price."
    >
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 15, right: 40, left: 20, bottom: 15 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: '#64748b' }}
            stroke="#cbd5e1"
            tickFormatter={(val) => `$${val}`}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            tick={{ fontSize: 12, fill: '#1e293b', fontWeight: 600 }}
            stroke="#cbd5e1"
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
          <Bar dataKey="avg_price" radius={[0, 8, 8, 0]}>
            <LabelList
              dataKey="avg_price"
              position="right"
              formatter={(val) => `$${Number(val).toFixed(2)}`}
              style={{ fontSize: '11px', fill: '#1e293b', fontWeight: 600 }}
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
