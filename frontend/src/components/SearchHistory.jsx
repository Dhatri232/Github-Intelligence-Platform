import './SearchHistory.css';

export default function SearchHistory({ history, onSelect, onClear }) {
  if (history.length === 0) {
    return (
      <div className="search-history dropdown">
        <p className="empty-history">No search history yet</p>
      </div>
    );
  }

  return (
    <div className="search-history dropdown">
      <div className="history-header">
        <h3>Recent Searches</h3>
        <button className="clear-history" onClick={onClear}>
          Clear
        </button>
      </div>
      <div className="history-list">
        {history.map((item, index) => (
          <button
            key={index}
            className="history-item"
            onClick={() => onSelect(item)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.375 3.375 0 0 0-.975-2.438A3.365 3.365 0 0 0 16 13H8a3.365 3.365 0 0 0-2.025.575A3.375 3.375 0 0 0 5 3.013V9" />
            </svg>
            <span>{item.owner}/{item.repo}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
