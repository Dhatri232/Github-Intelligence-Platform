import LanguageChart from '../LanguageChart';
import StatCard from '../StatCard';

export default function MetricsTab({ repoData }) {
  const { repo, languages } = repoData;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const languageEntries = Object.entries(languages || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const totalBytes = languageEntries.reduce((sum, [, bytes]) => sum + bytes, 0);

  return (
    <div className="tab-metrics">
      <div className="metrics-header">
        <h3>Repository Metrics</h3>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <label>Repository Size</label>
          <p className="metric-value">{(repo.size / 1024).toFixed(2)} MB</p>
        </div>
        <div className="metric-card">
          <label>Last Updated</label>
          <p className="metric-value">{formatDate(repo.updatedAt)}</p>
        </div>
        <div className="metric-card">
          <label>Created At</label>
          <p className="metric-value">{formatDate(repo.createdAt)}</p>
        </div>
      </div>

      {languageEntries.length > 0 && (
        <div className="languages-section">
          <h3>Languages</h3>
          <LanguageChart languages={languages} />
          <div className="language-breakdown">
            {languageEntries.map(([lang, bytes]) => {
              const percent = ((bytes / totalBytes) * 100).toFixed(1);
              return (
                <div key={lang} className="language-stat">
                  <div className="language-info">
                    <span className="language-name">{lang}</span>
                    <span className="language-percent">{percent}%</span>
                  </div>
                  <div className="language-bar">
                    <div
                      className="language-bar-fill"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
