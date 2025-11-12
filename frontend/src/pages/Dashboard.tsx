import React from 'react';
import { useDeals } from '../contexts/DealContext';
import './Dashboard.css'; // Assuming Dashboard.css is used for styling

const Dashboard: React.FC = () => {
  const { deals, loading, error } = useDeals();

  // Example dashboard metrics
  const totalDeals = deals.length;
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const dealsInProgress = deals.filter(deal => deal.stage !== 'Closed Won' && deal.stage !== 'Closed Lost').length;
  const dealsWon = deals.filter(deal => deal.stage === 'Closed Won').length;
  const dealsLost = deals.filter(deal => deal.stage === 'Closed Lost').length;

  if (loading) {
    return <div className="dashboard-page">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-page error-message">Error: {error}</div>;
  }

  return (
    <div className="dashboard-page">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-metrics">
        <div className="metric-card">
          <h3>Total Deals</h3>
          <p>{totalDeals}</p>
        </div>
        <div className="metric-card">
          <h3>Total Deal Value</h3>
          <p>${totalValue.toLocaleString()}</p>
        </div>
        <div className="metric-card">
          <h3>Deals in Progress</h3>
          <p>{dealsInProgress}</p>
        </div>
        <div className="metric-card">
          <h3>Deals Won</h3>
          <p>{dealsWon}</p>
        </div>
        <div className="metric-card">
          <h3>Deals Lost</h3>
          <p>{dealsLost}</p>
        </div>
      </div>

      {/* You can add more visualizations or summaries here */}
      {/* e.g., A chart showing deals by stage, recent activity, etc. */}

      <h3>Deal Stages Summary</h3>
      <div className="stage-summary">
        {/* This could be a simple list or a more visual representation */}
        <ul>
          {Object.entries({
            Prospecting: deals.filter(d => d.stage === 'Prospecting').length,
            Qualification: deals.filter(d => d.stage === 'Qualification').length,
            Proposal: deals.filter(d => d.stage === 'Proposal').length,
            Negotiation: deals.filter(d => d.stage === 'Negotiation').length,
            'Closed Won': deals.filter(d => d.stage === 'Closed Won').length,
            'Closed Lost': deals.filter(d => d.stage === 'Closed Lost').length,
          }).map(([stageName, count]) => (
            <li key={stageName}><strong>{stageName}:</strong> {count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
