import React from 'react';
import { useDeals } from '../contexts/DealContext';
import './Dashboard.css'; // Assuming Dashboard.css is still relevant
import { Deal } from '../types';

const Dashboard: React.FC = () => {
  const { deals, loading, error } = useDeals();

  if (loading) {
    return <div className="dashboard-container">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="dashboard-container">Error loading dashboard: {error.message}</div>;
  }

  // Calculate key metrics
  const totalDeals: number = deals.length;
  const closedWonDeals: number = deals.filter((deal: Deal) => deal.stage === 'Closed Won').length;
  const closedLostDeals: number = deals.filter((deal: Deal) => deal.stage === 'Closed Lost').length;
  const totalDealValue: number = deals.reduce((sum: number, deal: Deal) => sum + parseFloat(deal.value?.toString() || '0'), 0);
  const avgDealValue: string = totalDeals > 0 ? (totalDealValue / totalDeals).toFixed(2) : '0.00';

  // Group deals by stage for visualization
  const dealsByStage: { [key: string]: number } = deals.reduce((acc: { [key: string]: number }, deal: Deal) => {
    acc[deal.stage] = (acc[deal.stage] || 0) + 1;
    return acc;
  }, {});

  const stageNames: string[] = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

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
