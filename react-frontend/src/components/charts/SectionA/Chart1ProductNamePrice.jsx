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

export default function Chart1ProductNamePrice({ data = [], isLoading, error, onRetry }) {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Normalize data and apply search
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const term = searchTerm.toLowerCase().trim();
    return data
      .filter((item) => !term || (item.name && item.name.toLowerCase().includes(term)))
      .map((item) => ({
        name: item.name || 'Unnamed Product',
        price: Number(item.price) || 0,
      }));
  }, [data, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const validPage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const start = (validPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, validPage, pageSize]);

  const controls = (
    <>
      <input
        type="text"
        placeholder="Filter by name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          fontSize: '12px',
          padding: '5px 10px',
          borderRadius: '6px',
          border: '1px solid #cbd5e1',
          outline: 'none',
          width: '140px',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button
          type="button"
          disabled={validPage <= 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          style={{
            fontSize: '12px',
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid #cbd5e1',
            background: validPage <= 1 ? '#f1f5f9' : '#ffffff',
            cursor: validPage <= 1 ? 'not-allowed' : 'pointer',
            color: '#334155',
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
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          style={{
            fontSize: '12px',
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid #cbd5e1',
            background: validPage >= totalPages ? '#f1f5f9' : '#ffffff',
            cursor: validPage >= totalPages ? 'not-allowed' : 'pointer',
            color: '#334155',
          }}
        >
          ›
        </button>
      </div>
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setCurrentPage(1);
        }}
        style={{
          fontSize: '12px',
          padding: '4px 8px',
          borderRadius: '6px',
          border: '1px solid #cbd5e1',
          outline: 'none',
          color: '#334155',
          background: '#ffffff',
        }}
      >
        <option value={5}>Top 5</option>
        <option value={10}>10 items</option>
        <option value={15}>15 items</option>
        <option value={20}>20 items</option>
      </select>
    </>
  );

  return (
    <ChartCard
      problemNumber={1}
      section="A"
      title="Product Name and Price"
      subtitle="Visualizing product names and corresponding unit prices in horizontal bars."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && paginatedData.length === 0}
      onRetry={onRetry}
      badgeColor="blue"
      controls={controls}
      height={380}
      footerNote={`Showing page ${validPage} of ${totalPages} (${filteredData.length} total products loaded from API).`}
    >
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          layout="vertical"
          data={paginatedData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis
            type="number"
            tickFormatter={(val) => `$${val}`}
            tick={{ fontSize: 11, fill: '#64748b' }}
            stroke="#cbd5e1"
          />
          <YAxis
            type="category"
            dataKey="name"
            width={160}
            tick={{ fontSize: 11, fill: '#1e293b' }}
            tickFormatter={(val) => (val.length > 20 ? `${val.substring(0, 18)}...` : val)}
            stroke="#cbd5e1"
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="custom-tooltip">
                    <div className="label">{item.name}</div>
                    <div className="value">Price: ${item.price.toFixed(2)}</div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="price" radius={[0, 6, 6, 0]}>
            {paginatedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index % 2 === 0 ? '#2563eb' : '#3b82f6'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
