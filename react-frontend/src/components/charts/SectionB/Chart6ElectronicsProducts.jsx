import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import ChartCard from '../ChartCard';

export default function Chart6ElectronicsProducts({ data = [], isLoading, error, onRetry }) {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const formattedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
      id: item.id,
      name: item.name || 'Electronics Item',
      price: Number(item.price) || 0,
    }));
  }, [data]);

  const avgElectronicsPrice = useMemo(() => {
    if (formattedData.length === 0) return 0;
    const sum = formattedData.reduce((acc, curr) => acc + curr.price, 0);
    return sum / formattedData.length;
  }, [formattedData]);

  const totalPages = Math.max(1, Math.ceil(formattedData.length / pageSize));
  const validPage = Math.min(page, totalPages);

  const paginatedData = useMemo(() => {
    const start = (validPage - 1) * pageSize;
    return formattedData.slice(start, start + pageSize);
  }, [formattedData, validPage, pageSize]);

  const controls = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button
        type="button"
        disabled={validPage <= 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        style={{
          fontSize: '12px',
          padding: '4px 8px',
          borderRadius: '4px',
          border: '1px solid #cbd5e1',
          background: validPage <= 1 ? '#f1f5f9' : '#ffffff',
          cursor: validPage <= 1 ? 'not-allowed' : 'pointer',
        }}
      >
        ‹
      </button>
      <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
        {validPage} / {totalPages}
      </span>
      <button
        type="button"
        disabled={validPage >= totalPages}
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        style={{
          fontSize: '12px',
          padding: '4px 8px',
          borderRadius: '4px',
          border: '1px solid #cbd5e1',
          background: validPage >= totalPages ? '#f1f5f9' : '#ffffff',
          cursor: validPage >= totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        ›
      </button>
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setPage(1);
        }}
        style={{
          fontSize: '12px',
          padding: '4px 8px',
          borderRadius: '6px',
          border: '1px solid #cbd5e1',
          background: '#ffffff',
        }}
      >
        <option value={8}>8 items</option>
        <option value={10}>10 items</option>
        <option value={15}>15 items</option>
      </select>
    </div>
  );

  return (
    <ChartCard
      problemNumber={6}
      section="B"
      title="Electronics Category Products"
      subtitle="Products belonging to the Electronics category."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && paginatedData.length === 0}
      onRetry={onRetry}
      badgeColor="purple"
      controls={controls}
      height={380}
      footerNote={`Total Electronics products: ${formattedData.length} | Category Mean: $${avgElectronicsPrice.toFixed(2)}`}
    >
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={paginatedData}
          margin={{ top: 20, right: 20, left: 10, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-30}
            textAnchor="end"
            height={55}
            tick={{ fontSize: 10, fill: '#1e293b' }}
            tickFormatter={(val) => (val.length > 15 ? `${val.substring(0, 13)}...` : val)}
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
                    <div style={{ color: '#67e8f9', fontSize: '11px', marginTop: '2px' }}>
                      Category: Electronics
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          {avgElectronicsPrice > 0 && (
            <ReferenceLine
              y={avgElectronicsPrice}
              stroke="#06b6d4"
              strokeDasharray="3 3"
              label={{
                value: `Avg: $${avgElectronicsPrice.toFixed(2)}`,
                position: 'insideTopRight',
                fill: '#0891b2',
                fontSize: 11,
              }}
            />
          )}
          <Bar dataKey="price" radius={[6, 6, 0, 0]}>
            {paginatedData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index % 2 === 0 ? '#0284c7' : '#38bdf8'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
