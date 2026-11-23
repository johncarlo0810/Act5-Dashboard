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

export default function Chart15ElectronicsAndBooks({ data = [], isLoading, error, onRetry }) {
  const chartData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
      name: item.name || 'Category',
      avg_price: Number(item.avg_price) || 0,
    }));
  }, [data]);

  const stats = useMemo(() => {
    const elec = chartData.find((d) => d.name.toLowerCase() === 'electronics')?.avg_price || 0;
    const books = chartData.find((d) => d.name.toLowerCase() === 'books')?.avg_price || 0;
    const diff = Math.abs(elec - books);
    const ratio = books > 0 ? (elec / books).toFixed(1) : 'N/A';
    return { elec, books, diff, ratio };
  }, [chartData]);

  return (
    <ChartCard
      problemNumber={15}
      section="D"
      title="Electronics vs Books Average Price Comparison"
      subtitle="Targeted comparison of average product pricing for Electronics and Books."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && chartData.length === 0}
      onRetry={onRetry}
      badgeColor="orange"
      height={380}
      footerNote={
        stats.books > 0 && stats.elec > 0
          ? `Electronics averages $${stats.diff.toFixed(2)} (${stats.ratio}x) ${stats.elec >= stats.books ? 'higher' : 'lower'} than Books.`
          : 'Direct comparison between Electronics and Books average prices.'
      }
    >
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={chartData}
          margin={{ top: 35, right: 40, left: 20, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 13, fill: '#0f172a', fontWeight: 700 }}
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
                    <div className="label">{item.name} Category</div>
                    <div className="value">Average Price: ${item.avg_price.toFixed(2)}</div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="avg_price" radius={[10, 10, 0, 0]} maxBarSize={120}>
            <LabelList
              dataKey="avg_price"
              position="top"
              formatter={(val) => `$${Number(val).toFixed(2)}`}
              style={{ fontSize: '13px', fill: '#0f172a', fontWeight: 700 }}
            />
            {chartData.map((entry) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={entry.name.toLowerCase() === 'electronics' ? '#2563eb' : '#8b5cf6'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
