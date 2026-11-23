import { ArrowDownRight, Tag, ShieldCheck } from 'lucide-react';
import ChartCard from '../ChartCard';

export default function Chart10LowestPriceKPI({ value = 0, isLoading, error, onRetry }) {
  const numValue = Number(value) || 0;
  const formatted = numValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <ChartCard
      problemNumber={10}
      section="C"
      title="Lowest Product Price"
      subtitle="Minimum recorded product price floor in the catalog."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && numValue === 0}
      onRetry={onRetry}
      badgeColor="green"
      height={280}
      footerNote="Represents the base entry-level price point across the entire catalog."
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '20px',
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          borderRadius: '14px',
          border: '1px solid #fde68a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Tag
          size={140}
          style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            color: '#fcd34d',
            opacity: 0.25,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
            marginBottom: '16px',
          }}
        >
          <ArrowDownRight size={28} color="#ffffff" />
        </div>

        <div style={{ fontSize: '13px', fontWeight: '700', color: '#b45309', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
          Minimum Price Floor
        </div>

        <div
          style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#92400e',
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
            border: '1px solid #fde68a',
            fontSize: '12px',
            color: '#b45309',
            fontWeight: '600',
          }}
        >
          <ShieldCheck size={14} />
          <span>Minimum Price</span>
        </div>
      </div>
    </ChartCard>
  );
}
