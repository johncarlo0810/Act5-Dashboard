import { Percent, BarChart2, TrendingUp } from 'lucide-react';
import ChartCard from '../ChartCard';

export default function Chart8AveragePriceKPI({ value = 0, isLoading, error, onRetry }) {
  const numValue = Number(value) || 0;
  const formatted = numValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <ChartCard
      problemNumber={8}
      section="C"
      title="Average Product Price"
      subtitle="Statistical mean product pricing across the entire catalog."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && numValue === 0}
      onRetry={onRetry}
      badgeColor="green"
      height={280}
      footerNote="Calculated across all products in the active catalog."
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '20px',
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderRadius: '14px',
          border: '1px solid #bfdbfe',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <TrendingUp
          size={140}
          style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            color: '#93c5fd',
            opacity: 0.25,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
            marginBottom: '16px',
          }}
        >
          <BarChart2 size={28} color="#ffffff" />
        </div>

        <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e40af', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
          Catalog Mean Price
        </div>

        <div
          style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#1e3a8a',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '-0.02em',
            marginBottom: '12px',
          }}
        >
          {formatted}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '9999px',
            border: '1px solid #bfdbfe',
            fontSize: '12px',
            color: '#1d4ed8',
            fontWeight: '600',
          }}
        >
          <Percent size={14} />
          <span>Average Price</span>
        </div>
      </div>
    </ChartCard>
  );
}
