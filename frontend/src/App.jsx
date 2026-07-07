import { useState } from 'react';
import { useRepository } from './hooks/useRepository';
import SearchBox from './components/SearchBox';
import Dashboard from './components/Dashboard';
import SearchHistory from './components/SearchHistory';
import './App.css';

function App() {
  const {
    repoData,
    aiAnalysis,
    loading,
    error,
    searchHistory,
    fetchRepository,
    clearSearchHistory,
  } = useRepository();

  const [activeTab, setActiveTab] = useState('overview');
  const [showHistory, setShowHistory] = useState(false);

  const handleSearch = async (owner, repo) => {
    setShowHistory(false);
    setActiveTab('overview');
    await fetchRepository(owner, repo);
  };

  const handleHistorySelect = (item) => {
    handleSearch(item.owner, item.repo);
    setShowHistory(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">GI</div>
            <div>
              <h1>GitHub Intelligence</h1>
              <p>Advanced Repository Analytics with AI</p>
            </div>
          </div>
          <button
            className="history-btn"
            onClick={() => setShowHistory(!showHistory)}
            title="Search History"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="search-container">
          <SearchBox onSearch={handleSearch} loading={loading} />
          {showHistory && (
            <SearchHistory
              history={searchHistory}
              onSelect={handleHistorySelect}
              onClear={clearSearchHistory}
            />
          )}
        </div>

        {error && (
          <div className="error-banner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="spinner" />
            <p>Analyzing repository...</p>
          </div>
        )}

        {repoData && !loading && (
          <Dashboard
            repoData={repoData}
            aiAnalysis={aiAnalysis}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}

        {!repoData && !loading && !error && (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.375 3.375 0 0 0-.975-2.438A3.365 3.365 0 0 0 16 13H8a3.365 3.365 0 0 0-2.025.575A3.375 3.375 0 0 0 5 3.013V9" />
            </svg>
            <h2>Enter a Repository</h2>
            <p>Search for any GitHub repository to get started with analysis</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
