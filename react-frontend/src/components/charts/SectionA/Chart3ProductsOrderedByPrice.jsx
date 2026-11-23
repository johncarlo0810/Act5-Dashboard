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
} from 'recharts';
import ChartCard from '../ChartCard';

export default function Chart3ProductsOrderedByPrice({
  data = [],
  nameAndPriceData = [],
  isLoading,
  error,
  onRetry,
}) {
  const [sliceCount, setSliceCount] = useState(15);
  const [page, setPage] = useState(1);

  // Cross-reference price if backend omitted it in select('id', 'name')
  const priceMap = useMemo(() => {
    const map = new Map();
    if (Array.isArray(nameAndPriceData)) {
      nameAndPriceData.forEach((item) => {
        if (item.name) map.set(item.name, Number(item.price) || 0);
      });
    }
    return map;
  }, [nameAndPriceData]);

  const orderedProducts = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data.map((item, index) => {
      let resolvedPrice = item.price !== undefined ? Number(item.price) : null;
      if (resolvedPrice === null && priceMap.has(item.name)) {
        resolvedPrice = priceMap.get(item.name);
      }
      return {
        id: item.id || index + 1,
        name: item.name || `Product #${item.id}`,
        price: resolvedPrice !== null ? resolvedPrice : 0,
        hasMissingPriceField: item.price === undefined,
        rank: index + 1,
      };
    });
  }, [data, priceMap]);

  const totalPages = Math.max(1, Math.ceil(orderedProducts.length / sliceCount));
  const validPage = Math.min(page, totalPages);

  const displayData = useMemo(() => {
    const start = (validPage - 1) * sliceCount;
    return orderedProducts.slice(start, start + sliceCount);
  }, [orderedProducts, validPage, sliceCount]);

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
        ‹ Prev
      </button>
      <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
        Page {validPage} / {totalPages}
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
        Next ›
      </button>
      <select
        value={sliceCount}
        onChange={(e) => {
          setSliceCount(Number(e.target.value));
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
        <option value={10}>Show 10</option>
        <option value={15}>Show 15</option>
        <option value={25}>Show 25</option>
      </select>
    </div>
  );

  return (
    <ChartCard
      problemNumber={3}
      section="A"
      title="Products Ordered by Price (Ascending)"
      subtitle="Products arranged from lowest to highest price order."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && displayData.length === 0}
      onRetry={onRetry}
      badgeColor="blue"
      controls={controls}
      height={380}
      footerNote="Products ranked from lowest to highest price order."
    >
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={displayData}
          margin={{ top: 20, right: 20, left: 10, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-35}
            textAnchor="end"
            height={60}
            tick={{ fontSize: 10, fill: '#334155' }}
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
                    <div className="label">#{item.rank} - {item.name}</div>
                    <div className="value">Price: ${Number(item.price).toFixed(2)}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                      Product ID: {item.id}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="price" radius={[6, 6, 0, 0]}>
            {displayData.map((_, index) => {
              // Create an ascending color intensity gradient
              const colorRatio = 0.4 + (index / Math.max(1, displayData.length - 1)) * 0.6;
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={`rgba(37, 99, 235, ${colorRatio.toFixed(2)})`}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
