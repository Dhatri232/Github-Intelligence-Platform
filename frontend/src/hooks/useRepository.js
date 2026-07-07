import { useState, useCallback } from 'react';
import { fetchRepository, fetchAnalysis } from '../services/api';

export function useRepository() {
  const [repoData, setRepoData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const saveToHistory = useCallback((owner, repo) => {
    const newEntry = { owner, repo, timestamp: new Date().toISOString() };
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => !(item.owner === owner && item.repo === repo));
      const updated = [newEntry, ...filtered].slice(0, 10);
      localStorage.setItem('searchHistory', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const fetchRepository_ = useCallback(
    async (owner, repo) => {
      setLoading(true);
      setError('');
      setRepoData(null);
      setAiAnalysis(null);

      try {
        const data = await fetchRepository(owner, repo);
        setRepoData(data);
        saveToHistory(owner, repo);

        try {
          const analysis = await fetchAnalysis(owner, repo);
          setAiAnalysis(analysis);
        } catch (err) {
          setAiAnalysis('AI analysis unavailable');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch repository');
      } finally {
        setLoading(false);
      }
    },
    [saveToHistory]
  );

  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  }, []);

  return {
    repoData,
    aiAnalysis,
    loading,
    error,
    searchHistory,
    fetchRepository: fetchRepository_,
    clearSearchHistory,
  };
}
