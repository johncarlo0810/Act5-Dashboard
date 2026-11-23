export default function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  color = '#2563eb',
  bgColor = '#eff6ff',
  borderColor = '#bfdbfe',
}) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '14px',
        padding: '20px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <div>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
          {title}
        </div>
        <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', fontFamily: 'var(--font-mono)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
          {value}
        </div>
        {subtext && (
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            {subtext}
          </div>
        )}
      </div>

      {Icon && (
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: bgColor,
            border: `1px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={22} color={color} />
        </div>
      )}
    </div>
  );
}
