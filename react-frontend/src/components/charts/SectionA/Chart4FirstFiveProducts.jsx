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

const PALETTE = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

export default function Chart4FirstFiveProducts({ data = [], isLoading, error, onRetry }) {
  const chartData = (Array.isArray(data) ? data.slice(0, 5) : []).map((p, i) => ({
    id: p.id || i + 1,
    name: p.name || `Product #${p.id || i + 1}`,
    price: Number(p.price) || 0,
    categoryName: p.category?.name || 'Standard',
  }));

  return (
    <ChartCard
      problemNumber={4}
      section="A"
      title="First Five Products"
      subtitle="Direct price comparison of the initial 5 database records."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && chartData.length === 0}
      onRetry={onRetry}
      badgeColor="blue"
      height={380}
      footerNote="Displays the first 5 records in the database."
    >
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={chartData}
          margin={{ top: 30, right: 20, left: 10, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-15}
            textAnchor="end"
            height={50}
            tick={{ fontSize: 11, fill: '#1e293b' }}
            tickFormatter={(val) => (val.length > 18 ? `${val.substring(0, 16)}...` : val)}
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
                    <div className="value">Price: ${item.price.toFixed(2)}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                      ID: {item.id}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="price" radius={[8, 8, 0, 0]}>
            <LabelList
              dataKey="price"
              position="top"
              formatter={(val) => `$${Number(val).toFixed(2)}`}
              style={{ fontSize: '11px', fill: '#1e293b', fontWeight: 600 }}
            />
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={PALETTE[index % PALETTE.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
