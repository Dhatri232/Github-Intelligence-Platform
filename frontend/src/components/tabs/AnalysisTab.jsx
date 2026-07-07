export default function AnalysisTab({ analysis }) {
  return (
    <div className="tab-analysis">
      <h3>AI Analysis</h3>
      <div className="analysis-content">
        <div className="analysis-text">
          {analysis ? (
            <p>{analysis}</p>
          ) : (
            <p className="loading-text">Loading analysis...</p>
          )}
        </div>
      </div>
    </div>
  );
}
