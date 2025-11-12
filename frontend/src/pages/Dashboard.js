import React from 'react';
import { useDeals } from '../contexts/DealContext';
import './Dashboard.css';

const Dashboard = () => {
  const { deals, loading, error } = useDeals();

  if (loading) {
    return <div className="dashboard-container">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="dashboard-container">Error loading dashboard: {error.message}</div>;
  }

  // Calculate key metrics
  const totalDeals = deals.length;
  const closedWonDeals = deals.filter(deal => deal.stage === 'Closed Won').length;
  const closedLostDeals = deals.filter(deal => deal.stage === 'Closed Lost').length;
  const totalDealValue = deals.reduce((sum, deal) => sum + parseFloat(deal.value || 0), 0);
  const avgDealValue = totalDeals > 0 ? (totalDealValue / totalDeals).toFixed(2) : 0;

  // Group deals by stage for visualization
  const dealsByStage = deals.reduce((acc, deal) => {
    acc[deal.stage] = (acc[deal.stage] || 0) + 1;
    return acc;
  }, {});

  const stageNames = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  return (
    <div className="dashboard-container">
      <h2>Dashboard Overview</h2>

      <div className="dashboard-metrics">
        <div className="metric-card">
          <h3>Total Deals</h3>
          <p>{totalDeals}</p>
        </div>
        <div className="metric-card">
          <h3>Closed Won</h3>
          <p>{closedWonDeals}</p>
        </div>
        <div className="metric-card">
          <h3>Closed Lost</h3>
          <p>{closedLostDeals}</p>
        </div>
        <div className="metric-card">
          <h3>Total Deal Value</h3>
          <p>${totalDealValue.toLocaleString()}</p>
        </div>
        <div className="metric-card">
          <h3>Average Deal Value</h3>
          <p>${avgDealValue}</p>
        </div>
      </div>

      <h3>Deals by Sales Stage</h3>
      <div className="stage-visualization">
        {stageNames.map(stage => (
          <div key={stage} className="stage-bar">
            <div className="stage-label">{stage}</div>
            <div
              className="stage-count"
              style={{
                height: `${(dealsByStage[stage] || 0) * 20}px`, // Adjust multiplier for visual scaling
                backgroundColor: '#4CAF50', // Example color
              }}
            >
              {dealsByStage[stage] || 0}
            </div>
          </div>
        ))}
      </div>
      {/* You could add more charts or visualizations here */}
    </div>
  );
};

export default Dashboard;
