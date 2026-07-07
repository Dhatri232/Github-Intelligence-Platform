import { useState } from 'react';
import './SearchBox.css';

export default function SearchBox({ onSearch, loading }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmed = input.trim();
    if (!trimmed) {
      setError('Please enter a repository URL or owner/repo');
      return;
    }

    let owner, repo;

    if (trimmed.includes('/')) {
      const parts = trimmed.replace(/^(https?:\/\/)?(www\.)?github\.com\//i, '').split('/');
      owner = parts[0];
      repo = parts[1];
    } else {
      setError('Please use format: owner/repo');
      return;
    }

    if (!owner || !repo) {
      setError('Invalid format. Use: owner/repo');
      return;
    }

    onSearch(owner, repo);
    setInput('');
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search repositories... (e.g., vercel/next.js)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          className="search-input"
        />
        <button type="submit" disabled={loading} className="search-button">
          {loading ? (
            <>
              <span className="spinner-small" />
              Searching...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="5 12 19 12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
              Search
            </>
          )}
        </button>
      </div>
      {error && <p className="search-error">{error}</p>}
    </form>
  );
}
