export default function ContributorsTab({ contributors = [] }) {
  if (contributors.length === 0) {
    return <div className="empty-tab">No contributors data available</div>;
  }

  return (
    <div className="tab-contributors">
      <h3>Top Contributors</h3>
      <div className="contributors-list">
        {contributors.map((contributor, index) => (
          <div key={index} className="contributor-card">
            <img src={contributor.avatar_url} alt={contributor.login} />
            <div className="contributor-info">
              <h4>{contributor.login}</h4>
              <p>{contributor.contributions.toLocaleString()} contributions</p>
            </div>
            <a href={contributor.profile_url} target="_blank" rel="noopener noreferrer" className="contributor-link">
              →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
