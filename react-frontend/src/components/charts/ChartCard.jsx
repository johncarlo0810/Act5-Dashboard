import { AlertCircle, RefreshCw, Database, Info } from 'lucide-react';

export default function ChartCard({
  problemNumber,
  section,
  title,
  subtitle,
  isLoading,
  error,
  isEmpty,
  emptyMessage = 'No data returned from query.',
  onRetry,
  children,
  badgeColor = 'blue',
  controls,
  height = 360,
  footerNote,
}) {
  return (
    <div
      id={`problem-${problemNumber}`}
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className={`section-badge ${badgeColor}`}>
              Section {section}
            </span>
            <span
              style={{
                background: '#0f172a',
                color: '#f8fafc',
                fontSize: '11px',
                fontWeight: '700',
                padding: '3px 8px',
                borderRadius: '6px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Chart {problemNumber}
            </span>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
            {title}
          </h3>

          {subtitle && (
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              {subtitle}
            </p>
          )}
        </div>

        {controls && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {controls}
          </div>
        )}
      </div>

      {/* Main Body */}
      <div style={{ minHeight: height, flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {isLoading ? (
          <div
            style={{
              height: '100%',
              minHeight: height,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              color: '#64748b',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                border: '3px solid #e2e8f0',
                borderTopColor: '#2563eb',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <span style={{ fontSize: '13px', fontWeight: '500' }}>Loading visualization data...</span>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error ? (
          <div
            style={{
              height: '100%',
              minHeight: height,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              textAlign: 'center',
              background: '#fef2f2',
              borderRadius: '12px',
              border: '1px solid #fee2e2',
            }}
          >
            <AlertCircle size={36} color="#ef4444" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#991b1b', marginBottom: '4px' }}>
              Failed to load data
            </div>
            <div style={{ fontSize: '13px', color: '#b91c1c', maxWidth: '400px', marginBottom: '16px' }}>
              {error.message || 'An error occurred while fetching the visualization data.'}
            </div>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                <RefreshCw size={14} /> Retry
              </button>
            )}
          </div>
        ) : isEmpty ? (
          <div
            style={{
              height: '100%',
              minHeight: height,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              textAlign: 'center',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px dashed #cbd5e1',
            }}
          >
            <Database size={32} color="#94a3b8" style={{ marginBottom: '8px' }} />
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>
              {emptyMessage}
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
              No records found.
            </div>
          </div>
        ) : (
          <div style={{ width: '100%', height: '100%', minHeight: height, flex: 1 }}>
            {children}
          </div>
        )}
      </div>

      {/* Footer / Notes */}
      {footerNote && (
        <div
          style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: '#64748b',
          }}
        >
          <Info size={14} color="#94a3b8" style={{ flexShrink: 0 }} />
          <span>{footerNote}</span>
        </div>
      )}
    </div>
  );
}
