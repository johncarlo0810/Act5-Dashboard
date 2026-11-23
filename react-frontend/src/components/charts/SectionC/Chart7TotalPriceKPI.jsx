import { DollarSign, Layers } from 'lucide-react';
import ChartCard from '../ChartCard';

export default function Chart7TotalPriceKPI({ value = 0, isLoading, error, onRetry }) {
  const numValue = Number(value) || 0;
  const formatted = numValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <ChartCard
      problemNumber={7}
      section="C"
      title="Total Product Price"
      subtitle="Total cumulative monetary valuation of all catalog products."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && numValue === 0}
      onRetry={onRetry}
      badgeColor="green"
      height={280}
      footerNote="Calculated across all products in the database catalog."
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '20px',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
          borderRadius: '14px',
          border: '1px solid #bbf7d0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <DollarSign
          size={140}
          style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            color: '#86efac',
            opacity: 0.25,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            marginBottom: '16px',
          }}
        >
          <DollarSign size={28} color="#ffffff" />
        </div>

        <div style={{ fontSize: '13px', fontWeight: '700', color: '#047857', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
          Cumulative Catalog Value
        </div>

        <div
          style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#065f46',
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
            border: '1px solid #bbf7d0',
            fontSize: '12px',
            color: '#047857',
            fontWeight: '600',
          }}
        >
          <Layers size={14} />
          <span>Total Catalog Value</span>
        </div>
      </div>
    </ChartCard>
  );
}
