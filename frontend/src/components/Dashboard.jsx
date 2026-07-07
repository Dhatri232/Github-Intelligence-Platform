import { useState } from 'react';
import OverviewTab from './tabs/OverviewTab';
import MetricsTab from './tabs/MetricsTab';
import ContributorsTab from './tabs/ContributorsTab';
import CommitsTab from './tabs/CommitsTab';
import AnalysisTab from './tabs/AnalysisTab';
import './Dashboard.css';

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'overview' },
  { id: 'metrics', label: 'Metrics', icon: 'metrics' },
  { id: 'contributors', label: 'Contributors', icon: 'contributors' },
  { id: 'commits', label: 'Commits', icon: 'commits' },
  { id: 'analysis', label: 'Analysis', icon: 'analysis' },
];

export default function Dashboard({ repoData, aiAnalysis, activeTab, onTabChange }) {
  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab repoData={repoData} />;
      case 'metrics':
        return <MetricsTab repoData={repoData} />;
      case 'contributors':
        return <ContributorsTab contributors={repoData.contributors} />;
      case 'commits':
        return <CommitsTab commits={repoData.commits} />;
      case 'analysis':
        return <AnalysisTab analysis={aiAnalysis} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="tabs-container">
        <div className="tabs-nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tab-content">
        {renderTab()}
      </div>
    </div>
  );
}
