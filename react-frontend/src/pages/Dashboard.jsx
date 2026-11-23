import {
  Package,
  Layers,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Database,
} from 'lucide-react';
import StatCard from '../components/StatCard';

// Section A Charts
import Chart1ProductNamePrice from '../components/charts/SectionA/Chart1ProductNamePrice';
import Chart2ProductsWithCategory from '../components/charts/SectionA/Chart2ProductsWithCategory';
import Chart3ProductsOrderedByPrice from '../components/charts/SectionA/Chart3ProductsOrderedByPrice';
import Chart4FirstFiveProducts from '../components/charts/SectionA/Chart4FirstFiveProducts';

// Section B Charts
import Chart5PriceGteThree from '../components/charts/SectionB/Chart5PriceGteThree';
import Chart6ElectronicsProducts from '../components/charts/SectionB/Chart6ElectronicsProducts';

// Section C Charts
import Chart7TotalPriceKPI from '../components/charts/SectionC/Chart7TotalPriceKPI';
import Chart8AveragePriceKPI from '../components/charts/SectionC/Chart8AveragePriceKPI';
import Chart9HighestPriceKPI from '../components/charts/SectionC/Chart9HighestPriceKPI';
import Chart10LowestPriceKPI from '../components/charts/SectionC/Chart10LowestPriceKPI';

// Section D Charts
import Chart11TotalPricePerCategory from '../components/charts/SectionD/Chart11TotalPricePerCategory';
import Chart12AveragePricePerCategory from '../components/charts/SectionD/Chart12AveragePricePerCategory';
import Chart13LowestPricePerCategory from '../components/charts/SectionD/Chart13LowestPricePerCategory';
import Chart14AveragePriceSorted from '../components/charts/SectionD/Chart14AveragePriceSorted';
import Chart15ElectronicsAndBooks from '../components/charts/SectionD/Chart15ElectronicsAndBooks';

export default function Dashboard({
  queriesData,
  categoriesData = [],
  isLoading,
  error,
  onRetry,
  isLiveApi,
}) {
  const data = queriesData || {};

  // Overview stats calculation
  const totalProductsCount = Array.isArray(data.name_and_price) ? data.name_and_price.length : 0;
  const categoriesCount = Array.isArray(categoriesData) ? categoriesData.length : (data.total_price_per_category?.length || 5);
  const catalogSum = Number(data.total_price) || 0;
  const catalogAvg = Number(data.average_price) || 0;

  return (
    <div className="page-container">
      {/* Banner / Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
              Activity 5 – Eloquent ORM Analytics Dashboard
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
              Complete visual reporting across all 15 individual query problems under Sections A, B, C, and D.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', padding: '6px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
            <Database size={16} color="#2563eb" />
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
              {isLiveApi ? 'Connected to http://127.0.0.1:8000/api/v1' : 'Offline Snapshot Data Mode'}
            </span>
          </div>
        </div>

        {error && (
          <div
            style={{
              marginTop: '16px',
              padding: '14px 18px',
              borderRadius: '12px',
              background: '#fffbeb',
              border: '1px solid #fde68a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={18} color="#d97706" />
              <div style={{ fontSize: '13px', color: '#92400e' }}>
                <strong>API Notice:</strong> {error.message}. Running in offline fallback mode so all 15 charts remain fully functional. Start Laravel with <code>php artisan serve</code> to connect live.
              </div>
            </div>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: '#d97706',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Reconnect
              </button>
            )}
          </div>
        )}
      </div>

      {/* KPI Overview Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '36px',
        }}
      >
        <StatCard
          title="Total Products Available"
          value={totalProductsCount.toLocaleString()}
          subtext="Active in product catalog"
          icon={Package}
          color="#2563eb"
          bgColor="#eff6ff"
          borderColor="#bfdbfe"
        />
        <StatCard
          title="Catalog Total Valuation"
          value={`$${catalogSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtext="Sum of all product prices"
          icon={DollarSign}
          color="#10b981"
          bgColor="#ecfdf5"
          borderColor="#bbf7d0"
        />
        <StatCard
          title="Mean Unit Price"
          value={`$${catalogAvg.toFixed(2)}`}
          subtext="Average product price"
          icon={TrendingUp}
          color="#8b5cf6"
          bgColor="#f5f3ff"
          borderColor="#ddd6fe"
        />
        <StatCard
          title="Active Categories"
          value={categoriesCount}
          subtext="Electronics, Books, Clothing, Home, Sports"
          icon={Layers}
          color="#f59e0b"
          bgColor="#fffbeb"
          borderColor="#fde68a"
        />
      </div>

      {/* ========================================================================= */}
      {/* SECTION A – QUERYING TABLES */}
      {/* ========================================================================= */}
      <section id="section-a" style={{ marginBottom: '48px', scrollMarginTop: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span className="section-badge blue">Section A</span>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            Querying Tables
          </h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            (Problems 1 – 4: Basic table selection, relations, ordering & limits)
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Chart 1: Product Name and Price */}
          <Chart1ProductNamePrice
            data={data.name_and_price}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />

          {/* Chart 2: Products with Category */}
          <Chart2ProductsWithCategory
            data={data.products_with_category}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />

          {/* Chart 3: Products Ordered by Price */}
          <Chart3ProductsOrderedByPrice
            data={data.products_ordered_by_price}
            nameAndPriceData={data.name_and_price}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />

          {/* Chart 4: First Five Products */}
          <Chart4FirstFiveProducts
            data={data.first_five_products}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B – FILTERING DATA */}
      {/* ========================================================================= */}
      <section id="section-b" style={{ marginBottom: '48px', scrollMarginTop: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span className="section-badge purple">Section B</span>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            Filtering Data
          </h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            (Problems 5 – 6: Conditional filtering with WHERE & whereHas)
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Chart 5: Price >= 3 */}
          <Chart5PriceGteThree
            data={data.price_greater_than_or_equal}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />

          {/* Chart 6: Electronics Products */}
          <Chart6ElectronicsProducts
            data={data.electronics}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C – AGGREGATING DATA */}
      {/* ========================================================================= */}
      <section id="section-c" style={{ marginBottom: '48px', scrollMarginTop: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span className="section-badge green">Section C</span>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            Aggregating Data
          </h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            (Problems 7 – 10: Individual SQL aggregate KPI visualizations)
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Chart 7: Total Product Price */}
          <Chart7TotalPriceKPI
            value={data.total_price}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />

          {/* Chart 8: Average Product Price */}
          <Chart8AveragePriceKPI
            value={data.average_price}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />

          {/* Chart 9: Highest Product Price */}
          <Chart9HighestPriceKPI
            value={data.highest_price}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />

          {/* Chart 10: Lowest Product Price */}
          <Chart10LowestPriceKPI
            value={data.lowest_price}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D – GROUPING, FILTERING AND SORTING */}
      {/* ========================================================================= */}
      <section id="section-d" style={{ marginBottom: '48px', scrollMarginTop: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span className="section-badge orange">Section D</span>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            Grouping, Filtering and Sorting
          </h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            (Problems 11 – 15: JOIN operations, GROUP BY categories & sorted comparisons)
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Chart 11: Total Price per Category */}
          <Chart11TotalPricePerCategory
            data={data.total_price_per_category}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />

          {/* Chart 12: Average Price per Category */}
          <Chart12AveragePricePerCategory
            data={data.average_price_per_category}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />

          {/* Chart 13: Lowest Price per Category */}
          <Chart13LowestPricePerCategory
            data={data.lowest_price_per_category}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />

          {/* Chart 14: Average Price Sorted Ascending */}
          <Chart14AveragePriceSorted
            data={data.average_price_sorted}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />

          {/* Chart 15: Electronics vs Books Average Price */}
          <Chart15ElectronicsAndBooks
            data={data.electronics_and_books}
            isLoading={isLoading}
            error={error}
            onRetry={onRetry}
          />
        </div>
      </section>
    </div>
  );
}
