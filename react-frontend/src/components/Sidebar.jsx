import {
  LayoutDashboard,
  Table,
  FolderTree,
  FileSpreadsheet,
  Filter,
  Calculator,
  Layers,
  Database,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export default function Sidebar({
  currentView,
  setCurrentView,
  onNavigateSection,
  apiConnected,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const navItems = [
    { id: 'dashboard', label: 'All 15 Charts', icon: LayoutDashboard },
    { id: 'products', label: 'Products Table', icon: Table },
    { id: 'categories', label: 'Category Directory', icon: FolderTree },
  ];

  const sectionLinks = [
    { id: 'section-a', label: 'Section A: Querying', count: '4 Charts', color: '#3b82f6', icon: FileSpreadsheet },
    { id: 'section-b', label: 'Section B: Filtering', count: '2 Charts', color: '#8b5cf6', icon: Filter },
    { id: 'section-c', label: 'Section C: Aggregating', count: '4 Charts', color: '#10b981', icon: Calculator },
    { id: 'section-d', label: 'Section D: Grouping/Sorting', count: '5 Charts', color: '#f59e0b', icon: Layers },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            zIndex: 40,
            display: 'block',
          }}
        />
      )}

      <aside
        style={{
          width: '260px',
          background: '#0f172a',
          color: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          borderRight: '1px solid #1e293b',
          zIndex: 50,
          position: isMobileOpen ? 'fixed' : 'relative',
          top: 0,
          bottom: 0,
          left: 0,
          transition: 'transform 0.2s ease',
          transform: isMobileOpen ? 'translateX(0)' : undefined,
        }}
      >
        {/* Brand / Header */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(37, 99, 235, 0.4)',
            }}
          >
            <Database size={20} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '-0.02em', color: '#ffffff' }}>
              Eloquent ORM
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
              Activity 5 Dashboard
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', padding: '0 8px 8px 8px', letterSpacing: '0.05em' }}>
            Main Views
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCurrentView(item.id);
                    if (setIsMobileOpen) setIsMobileOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isActive ? '#2563eb' : 'transparent',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    fontWeight: isActive ? '600' : '500',
                    fontSize: '13px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = '#1e293b';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Icon size={18} color={isActive ? '#ffffff' : '#94a3b8'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Section Jump Links for Dashboard */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', padding: '0 8px 8px 8px', letterSpacing: '0.05em' }}>
              Activity 5 Sections (15 Charts)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {sectionLinks.map((sec) => {
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => {
                      if (currentView !== 'dashboard') setCurrentView('dashboard');
                      onNavigateSection(sec.id);
                      if (setIsMobileOpen) setIsMobileOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'transparent',
                      color: '#cbd5e1',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#1e293b';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: sec.color,
                        }}
                      />
                      <span>{sec.label}</span>
                    </div>
                    <span
                      style={{
                        fontSize: '10px',
                        background: '#1e293b',
                        color: '#94a3b8',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {sec.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* API Status Badge in Sidebar Footer */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid #1e293b',
            background: '#0b132b',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            {apiConnected ? (
              <CheckCircle2 size={16} color="#10b981" />
            ) : (
              <XCircle size={16} color="#f59e0b" />
            )}
            <span style={{ fontSize: '12px', fontWeight: '600', color: apiConnected ? '#34d399' : '#fbbf24' }}>
              {apiConnected ? 'Laravel API Online' : 'Offline / Fallback Mode'}
            </span>
          </div>
          <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>
            :8000/api/v1
          </div>
        </div>
      </aside>
    </>
  );
}
