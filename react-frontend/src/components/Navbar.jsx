import {
  Menu,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export default function Navbar({
  currentView,
  onToggleMobileSidebar,
  onRefresh,
  isLoading,
  isLiveApi,
  setIsLiveApi,
  apiError,
  onJumpToProblem,
}) {
  return (
    <header
      style={{
        height: '68px',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
      }}
    >
      {/* Left: Mobile hamburger & Page Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            color: '#334155',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '6px',
          }}
          className="mobile-only-btn"
        >
          <Menu size={20} />
        </button>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Activity 5</span>
            <span style={{ color: '#cbd5e1' }}>/</span>
            <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
              {currentView === 'dashboard'
                ? 'Laravel Eloquent ORM Analytics'
                : currentView === 'products'
                ? 'Product Data Catalog'
                : 'Category Directory'}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Quick Jump, API Mode & Refresh */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Quick Jump to Chart */}
        {currentView === 'dashboard' && (
          <select
            onChange={(e) => {
              if (e.target.value) onJumpToProblem(Number(e.target.value));
            }}
            defaultValue=""
            style={{
              fontSize: '12px',
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              color: '#334155',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="" disabled>Jump to Chart...</option>
            <optgroup label="Section A: Querying">
              <option value="1">Chart 1: Product Name & Price</option>
              <option value="2">Chart 2: Products with Category</option>
              <option value="3">Chart 3: Products Ordered by Price</option>
              <option value="4">Chart 4: First Five Products</option>
            </optgroup>
            <optgroup label="Section B: Filtering">
              <option value="5">Chart 5: Products with Price &gt;= 3</option>
              <option value="6">Chart 6: Electronics Products</option>
            </optgroup>
            <optgroup label="Section C: Aggregating">
              <option value="7">Chart 7: Total Price (SUM)</option>
              <option value="8">Chart 8: Average Price (AVG)</option>
              <option value="9">Chart 9: Highest Price (MAX)</option>
              <option value="10">Chart 10: Lowest Price (MIN)</option>
            </optgroup>
            <optgroup label="Section D: Grouping/Sorting">
              <option value="11">Chart 11: Total Price per Category</option>
              <option value="12">Chart 12: Average Price per Category</option>
              <option value="13">Chart 13: Lowest Price per Category</option>
              <option value="14">Chart 14: Average Price Sorted Asc</option>
              <option value="15">Chart 15: Electronics vs Books Avg</option>
            </optgroup>
          </select>
        )}

        {/* API Mode Indicator / Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: isLiveApi && !apiError ? '#ecfdf5' : '#fffbeb',
            border: `1px solid ${isLiveApi && !apiError ? '#a7f3d0' : '#fde68a'}`,
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '600',
            color: isLiveApi && !apiError ? '#065f46' : '#92400e',
          }}
        >
          {isLiveApi && !apiError ? (
            <CheckCircle size={14} color="#10b981" />
          ) : (
            <AlertTriangle size={14} color="#f59e0b" />
          )}
          <span>{isLiveApi && !apiError ? 'Laravel API (Live)' : 'Offline Snapshot'}</span>

          <button
            type="button"
            title="Toggle between Live API and offline demo snapshot"
            onClick={() => setIsLiveApi((prev) => !prev)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isLiveApi && !apiError ? '#059669' : '#d97706',
              textDecoration: 'underline',
              fontSize: '11px',
              paddingLeft: '4px',
            }}
          >
            {isLiveApi ? 'Switch to Offline' : 'Try Live API'}
          </button>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#2563eb',
            color: '#ffffff',
            border: 'none',
            padding: '7px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.8 : 1,
            boxShadow: '0 1px 2px rgba(37,99,235,0.2)',
          }}
        >
          <RefreshCw
            size={14}
            style={{
              animation: isLoading ? 'spin 0.8s linear infinite' : 'none',
            }}
          />
          <span>Refresh</span>
        </button>
      </div>
    </header>
  );
}
