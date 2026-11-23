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

export default function Chart5PriceGteThree({ data = [], isLoading, error, onRetry }) {
  const pageSize = 12;
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('asc'); // 'asc' | 'desc' | 'natural'

  const processedData = useMemo(() => {
    if (!Array.isArray(data)) return [];

    const items = data.map((item) => ({
      id: item.id,
      name: item.name || 'Product',
      price: Number(item.price) || 0,
    }));

    if (sortBy === 'asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'desc') {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [data, sortBy]);

  const totalPages = Math.max(1, Math.ceil(processedData.length / pageSize));
  const validPage = Math.min(page, totalPages);

  const paginatedData = useMemo(() => {
    const start = (validPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, validPage, pageSize]);

  const controls = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
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
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
        <option value="natural">Original Query Order</option>
      </select>

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
    </div>
  );

  return (
    <ChartCard
      problemNumber={5}
      section="B"
      title="Products with Price >= $3.00"
      subtitle="Filtered dataset showing items satisfying the price >= $3.00 threshold."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && paginatedData.length === 0}
      onRetry={onRetry}
      badgeColor="purple"
      controls={controls}
      height={380}
      footerNote={`Found ${processedData.length} products meeting the price >= 3 criteria. Red line indicates the $3.00 threshold.`}
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
            tickFormatter={(val) => (val.length > 14 ? `${val.substring(0, 12)}...` : val)}
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
                    <div style={{ color: '#34d399', fontSize: '11px', marginTop: '2px' }}>
                      Satisfies &gt;= $3.00 threshold
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine
            y={3}
            stroke="#ef4444"
            strokeDasharray="4 4"
            label={{ value: 'Min $3.00', position: 'insideTopLeft', fill: '#ef4444', fontSize: 11 }}
          />
          <Bar dataKey="price" fill="#8b5cf6" radius={[6, 6, 0, 0]}>
            {paginatedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.price >= 50 ? '#7c3aed' : '#a78bfa'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
