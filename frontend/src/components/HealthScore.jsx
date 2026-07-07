import './HealthScore.css';

export default function HealthScore({ score }) {
  const getColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="health-score-container">
      <div className="health-circle">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="var(--bg-tertiary)"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={getColor(score)}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="health-progress"
          />
        </svg>
        <div className="health-content">
          <div className="health-score">{score}</div>
          <div className="health-label">/100</div>
        </div>
      </div>

      <div className="health-info">
        <h3>Repository Health</h3>
        <p className="health-status">{getLabel(score)}</p>
        <p className="health-description">
          This score is calculated based on stars, forks, issues, activity,
          and documentation.
        </p>
      </div>
    </div>
  );
}
