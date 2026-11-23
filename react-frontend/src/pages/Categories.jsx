import { useMemo } from 'react';
import { FolderTree } from 'lucide-react';

const CATEGORY_STYLES = {
  Electronics: { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  Books: { color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe' },
  Clothing: { color: '#ec4899', bg: '#fdf2f8', border: '#fbcfe8' },
  Home: { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
  Sports: { color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
};

export default function Categories({ categories = [], queriesData = {} }) {
  // Aggregate category stats from queriesData
  const categoryStats = useMemo(() => {
    const stats = {};
    const totalMap = queriesData.total_price_per_category || [];
    const avgMap = queriesData.average_price_per_category || [];
    const minMap = queriesData.lowest_price_per_category || [];

    totalMap.forEach((item) => {
      if (!stats[item.name]) stats[item.name] = {};
      stats[item.name].total_price = Number(item.total_price) || 0;
    });

    avgMap.forEach((item) => {
      if (!stats[item.name]) stats[item.name] = {};
      stats[item.name].avg_price = Number(item.avg_price) || 0;
    });

    minMap.forEach((item) => {
      if (!stats[item.name]) stats[item.name] = {};
      stats[item.name].min_price = Number(item.min_price) || 0;
    });

    return stats;
  }, [queriesData]);

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
          Category Directory & Architecture
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Overview of product classification categories fetched via <code>GET /api/v1/categories</code> and their relational aggregates.
        </p>
      </div>

      {/* Grid of Categories */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {categories.map((cat) => {
          const style = CATEGORY_STYLES[cat.name] || {
            color: '#3b82f6',
            bg: '#eff6ff',
            border: '#bfdbfe',
          };
          const stat = categoryStats[cat.name] || {};

          return (
            <div
              key={cat.id || cat.name}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: style.bg,
                      border: `1px solid ${style.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FolderTree size={20} color={style.color} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: '#64748b',
                      background: '#f1f5f9',
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    Category ID #{cat.id}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '20px' }}>
                  {cat.description || 'General product category catalog collection.'}
                </p>
              </div>

              {/* Stats Box */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #edf2f7',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  textAlign: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700' }}>
                    Total Value
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                    ${(stat.total_price || 0) >= 1000 ? `${((stat.total_price || 0) / 1000).toFixed(1)}k` : (stat.total_price || 0).toFixed(0)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700' }}>
                    Avg Price
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: style.color, fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                    ${(stat.avg_price || 0).toFixed(2)}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700' }}>
                    Floor (Min)
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#047857', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                    ${(stat.min_price || 0).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
