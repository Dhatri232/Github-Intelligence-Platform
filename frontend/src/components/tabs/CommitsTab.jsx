export default function CommitsTab({ commits = [] }) {
  if (commits.length === 0) {
    return <div className="empty-tab">No commits data available</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="tab-commits">
      <h3>Recent Commits</h3>
      <div className="commits-list">
        {commits.map((commit, index) => (
          <a
            key={index}
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="commit-card"
          >
            <div className="commit-header">
              <code className="commit-hash">{commit.sha}</code>
              <span className="commit-author">{commit.author}</span>
            </div>
            <p className="commit-message">{commit.message}</p>
            <span className="commit-date">{formatDate(commit.date)}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
