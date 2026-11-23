import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import { getProductQueries, getCategories } from './services/api';
import { sampleQueriesData, sampleCategories } from './services/sampleData';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [queriesData, setQueriesData] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isLiveApi, setIsLiveApi] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const loadData = useCallback(async (preferLive = isLiveApi) => {
    setIsLoading(true);
    setApiError(null);

    if (preferLive) {
      try {
        const [qRes, cRes] = await Promise.all([
          getProductQueries(),
          getCategories().catch(() => sampleCategories),
        ]);

        setQueriesData(qRes);
        setCategoriesData(Array.isArray(cRes) ? cRes : (cRes?.data || sampleCategories));
        setIsLiveApi(true);
      } catch (err) {
        setApiError(err);
        setQueriesData(sampleQueriesData);
        setCategoriesData(sampleCategories);
      } finally {
        setIsLoading(false);
      }
    } else {
      setQueriesData(sampleQueriesData);
      setCategoriesData(sampleCategories);
      setIsLoading(false);
    }
  }, [isLiveApi]);

  useEffect(() => {
    let ignore = false;
    const executeLoad = async () => {
      setIsLoading(true);
      setApiError(null);
      if (isLiveApi) {
        try {
          const [qRes, cRes] = await Promise.all([
            getProductQueries(),
            getCategories().catch(() => sampleCategories),
          ]);
          if (!ignore) {
            setQueriesData(qRes);
            setCategoriesData(Array.isArray(cRes) ? cRes : (cRes?.data || sampleCategories));
          }
        } catch (err) {
          if (!ignore) {
            setApiError(err);
            setQueriesData(sampleQueriesData);
            setCategoriesData(sampleCategories);
          }
        } finally {
          if (!ignore) {
            setIsLoading(false);
          }
        }
      } else {
        if (!ignore) {
          setQueriesData(sampleQueriesData);
          setCategoriesData(sampleCategories);
          setIsLoading(false);
        }
      }
    };

    executeLoad();
    return () => {
      ignore = true;
    };
  }, [isLiveApi]);

  const handleNavigateSection = (sectionId) => {
    setCurrentView('dashboard');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleJumpToProblem = (problemNumber) => {
    setCurrentView('dashboard');
    setTimeout(() => {
      const el = document.getElementById(`problem-${problemNumber}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onNavigateSection={handleNavigateSection}
        apiConnected={isLiveApi && !apiError}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Navbar
          currentView={currentView}
          onToggleMobileSidebar={() => setIsMobileOpen((prev) => !prev)}
          onRefresh={() => loadData(true)}
          isLoading={isLoading}
          isLiveApi={isLiveApi}
          setIsLiveApi={(updater) => {
            const next = typeof updater === 'function' ? updater(isLiveApi) : updater;
            setIsLiveApi(next);
            loadData(next);
          }}
          apiError={apiError}
          onJumpToProblem={handleJumpToProblem}
        />

        <main style={{ flex: 1, paddingBottom: '60px' }}>
          {currentView === 'dashboard' && (
            <Dashboard
              queriesData={queriesData}
              categoriesData={categoriesData}
              isLoading={isLoading}
              error={apiError}
              onRetry={() => loadData(true)}
              isLiveApi={isLiveApi}
            />
          )}

          {currentView === 'products' && (
            <Products
              fallbackProducts={queriesData?.name_and_price || sampleQueriesData.name_and_price}
              categories={categoriesData}
              isLiveApi={isLiveApi && !apiError}
            />
          )}

          {currentView === 'categories' && (
            <Categories
              categories={categoriesData}
              queriesData={queriesData || sampleQueriesData}
            />
          )}
        </main>
      </div>
    </div>
  );
}
