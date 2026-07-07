export default function AnalysisTab({ analysis }) {
  return (
    <div className="analysis-dashboard">

      <div className="hero-card">
        <div>
          <p className="hero-label">AI Repository Intelligence</p>
          <h1>MATLAB-Simulink-Challenge-Project-Hub</h1>
          <span className="status-badge">Excellent Repository</span>
        </div>

        <div className="score-circle">
          <span>92</span>
          <small>/100</small>
        </div>
      </div>

      <div className="grid">

        <div className="card large">
          <h2>Executive Summary</h2>

          <p>
            {analysis || "Loading..."}
          </p>
        </div>

        <div className="card">
          <h2>Repository Health</h2>

          <div className="progress-row">
            <span>Community</span>
            <progress value="90" max="100"></progress>
          </div>

          <div className="progress-row">
            <span>Security</span>
            <progress value="82" max="100"></progress>
          </div>

          <div className="progress-row">
            <span>Documentation</span>
            <progress value="95" max="100"></progress>
          </div>
        </div>

        <div className="card">
          <h2>Architecture</h2>

          <div className="chips">
            <span>REST API</span>
            <span>Layered</span>
            <span>MVC</span>
            <span>Component Based</span>
          </div>
        </div>

        <div className="card">
          <h2>Technology</h2>

          <div className="chips">
            <span>React</span>
            <span>Express</span>
            <span>Node</span>
            <span>GitHub API</span>
          </div>
        </div>

      </div>

    </div>
  );
}