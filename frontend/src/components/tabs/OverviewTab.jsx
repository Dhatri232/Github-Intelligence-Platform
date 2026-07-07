import HealthScore from '../HealthScore';
import StatCard from '../StatCard';

export default function OverviewTab({ repoData }) {
  const { repo, healthScore } = repoData;

  return (
    <div className="tab-overview">
      <div className="overview-header">
        <div>
          <h2>{repo.name}</h2>
          <p className="repo-description">{repo.description || 'No description'}</p>
          <div className="repo-meta">
            {repo.language && <span className="language-badge">{repo.language}</span>}
            {repo.license && <span className="license-badge">{repo.license}</span>}
            {repo.topics.length > 0 && (
              <div className="topics">
                {repo.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className="topic-tag">
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <HealthScore score={healthScore} />

      <div className="stats-grid">
        <StatCard label="Stars" value={repo.stars.toLocaleString()} icon="star" />
        <StatCard label="Forks" value={repo.forks.toLocaleString()} icon="fork" />
        <StatCard label="Issues" value={repo.issues.toLocaleString()} icon="issue" />
        <StatCard label="Watchers" value={repo.watchers.toLocaleString()} icon="eye" />
      </div>

      <div className="repo-info">
        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="github-link">
          View on GitHub →
        </a>
      </div>
    </div>
  );
}
