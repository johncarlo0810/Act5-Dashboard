import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search,
  Filter,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { getProducts, getProductById } from '../services/api';

export default function Products({ fallbackProducts = [], categories = [], isLiveApi }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeProductDetail, setActiveProductDetail] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Category ID to Name map
  const categoryMap = useMemo(() => {
    const map = {};
    if (Array.isArray(categories)) {
      categories.forEach((cat) => {
        map[cat.id] = cat.name;
      });
    }
    return map;
  }, [categories]);

  const fetchProducts = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      if (isLiveApi) {
        const res = await getProducts(page);
        if (res && res.data) {
          const rawItems = res.data;
          const normalized = rawItems.map((item) => {
            const attrs = item.attributes || item;
            const catId = item.relationships?.category?.data?.id || item.category_id;
            return {
              id: item.id,
              name: attrs.name || 'Unnamed',
              price: Number(attrs.price) || 0,
              categoryId: catId,
              categoryName: categoryMap[catId] || item.category?.name || 'General',
            };
          });
          setProducts(normalized);
          if (res.meta) {
            setCurrentPage(res.meta.current_page || page);
            setTotalPages(res.meta.last_page || 1);
            setTotalCount(res.meta.total || normalized.length);
          }
          return;
        }
      }
      throw new Error('Using local catalog');
    } catch {
      // Fallback to local products list
      const raw = Array.isArray(fallbackProducts) && fallbackProducts.length > 0
        ? fallbackProducts
        : [];
      const normalized = raw.map((item, index) => ({
        id: item.id || index + 1,
        name: item.name,
        price: Number(item.price) || 0,
        categoryId: item.category_id || 1,
        categoryName: item.category?.name || categoryMap[item.category_id] || 'General',
      }));

      // In offline mode, do client-side pagination
      const pageSize = 10;
      const filtered = normalized.filter((item) => {
        const matchesSearch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || String(item.categoryId) === String(selectedCategory);
        return matchesSearch && matchesCategory;
      });

      const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
      const validPage = Math.min(page, pages);
      const start = (validPage - 1) * pageSize;

      setProducts(filtered.slice(start, start + pageSize));
      setCurrentPage(validPage);
      setTotalPages(pages);
      setTotalCount(filtered.length);
    } finally {
      setIsLoading(false);
    }
  }, [isLiveApi, fallbackProducts, categoryMap, searchTerm, selectedCategory]);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      if (!ignore) {
        await fetchProducts(1);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [fetchProducts]);

  const handleViewDetail = async (prod) => {
    setIsLoadingDetail(true);
    setActiveProductDetail(prod);
    try {
      if (isLiveApi && prod.id) {
        const res = await getProductById(prod.id);
        const detail = res.data || res;
        const attrs = detail.attributes || detail;
        setActiveProductDetail((prev) => ({
          ...prev,
          description: attrs.description || 'No extended description provided.',
        }));
      }
    } catch {
      setActiveProductDetail((prev) => ({
        ...prev,
        description: 'Authentic high-grade product from the Activity 5 catalog database.',
      }));
    } finally {
      setIsLoadingDetail(false);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
            Product Catalog Data Table
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Inspect full product records, live Laravel pagination meta, and detail views via <code>/products</code> and <code>/products/{'{id}'}</code>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchProducts(currentPage)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '7px 14px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#334155',
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={14} className={isLoading ? 'spin' : ''} />
          Reload Table
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search products by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '13px',
              width: '100%',
              color: '#0f172a',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color="#64748b" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              fontSize: '13px',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#334155',
              cursor: 'pointer',
            }}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: '12px', color: '#64748b', marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
          Total: <strong>{totalCount}</strong> products
        </div>
      </div>

      {/* Table Card */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '700', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.04em' }}>
                <th style={{ padding: '14px 20px' }}>ID</th>
                <th style={{ padding: '14px 20px' }}>Product Name</th>
                <th style={{ padding: '14px 20px' }}>Category</th>
                <th style={{ padding: '14px 20px' }}>Unit Price</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                    Loading product data from API...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                    No products found matching the criteria.
                  </td>
                </tr>
              ) : (
                products.map((p, idx) => (
                  <tr
                    key={p.id || idx}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
                  >
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                      #{p.id}
                    </td>
                    <td style={{ padding: '14px 20px', fontWeight: '600', color: '#0f172a' }}>
                      {p.name}
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span
                        style={{
                          background: '#eff6ff',
                          color: '#2563eb',
                          border: '1px solid #bfdbfe',
                          padding: '3px 9px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '600',
                        }}
                      >
                        {p.categoryName}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontWeight: '700', color: '#047857' }}>
                      ${p.price.toFixed(2)}
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => handleViewDetail(p)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#334155',
                          cursor: 'pointer',
                        }}
                      >
                        <Eye size={13} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#ffffff',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Showing page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              disabled={currentPage <= 1 || isLoading}
              onClick={() => fetchProducts(currentPage - 1)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: currentPage <= 1 ? '#f1f5f9' : '#ffffff',
                color: currentPage <= 1 ? '#94a3b8' : '#334155',
                fontSize: '12px',
                fontWeight: '600',
                cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
              }}
            >
              <ChevronLeft size={14} /> Previous
            </button>

            <button
              type="button"
              disabled={currentPage >= totalPages || isLoading}
              onClick={() => fetchProducts(currentPage + 1)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: currentPage >= totalPages ? '#f1f5f9' : '#ffffff',
                color: currentPage >= totalPages ? '#94a3b8' : '#334155',
                fontSize: '12px',
                fontWeight: '600',
                cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
              }}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {activeProductDetail && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setActiveProductDetail(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                  ID #{activeProductDetail.id}
                </span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  GET /api/v1/products/{activeProductDetail.id}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveProductDetail(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={18} />
              </button>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
              {activeProductDetail.name}
            </h3>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Price</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#047857', fontFamily: 'var(--font-mono)' }}>
                  ${activeProductDetail.price.toFixed(2)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Category</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#2563eb', marginTop: '4px' }}>
                  {activeProductDetail.categoryName}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>
                Description
              </div>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#334155', minHeight: '60px' }}>
                {isLoadingDetail ? 'Loading full description from API...' : (activeProductDetail.description || 'Standard catalog product item.')}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveProductDetail(null)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                background: '#0f172a',
                color: '#ffffff',
                border: 'none',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
