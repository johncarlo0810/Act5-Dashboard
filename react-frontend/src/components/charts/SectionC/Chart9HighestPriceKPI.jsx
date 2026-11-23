import { ArrowUpRight, Award, Zap } from 'lucide-react';
import ChartCard from '../ChartCard';

export default function Chart9HighestPriceKPI({ value = 0, isLoading, error, onRetry }) {
  const numValue = Number(value) || 0;
  const formatted = numValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <ChartCard
      problemNumber={9}
      section="C"
      title="Highest Product Price"
      subtitle="Maximum recorded item price ceiling in the catalog."
      isLoading={isLoading}
      error={error}
      isEmpty={!isLoading && numValue === 0}
      onRetry={onRetry}
      badgeColor="green"
      height={280}
      footerNote="Represents the premium price ceiling in the current product catalog."
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '20px',
          background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
          borderRadius: '14px',
          border: '1px solid #e9d5ff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Award
          size={140}
          style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            color: '#d8b4fe',
            opacity: 0.25,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#8b5cf6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            marginBottom: '16px',
          }}
        >
          <ArrowUpRight size={28} color="#ffffff" />
        </div>

        <div style={{ fontSize: '13px', fontWeight: '700', color: '#6b21a8', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '6px' }}>
          Maximum Price Peak
        </div>

        <div
          style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#581c87',
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
            border: '1px solid #e9d5ff',
            fontSize: '12px',
            color: '#7e22ce',
            fontWeight: '600',
          }}
        >
          <Zap size={14} />
          <span>Maximum Price</span>
        </div>
      </div>
    </ChartCard>
  );
}
