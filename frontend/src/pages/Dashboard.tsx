import React, { useEffect } from 'react';
import { useDeals } from '../contexts/DealContext';
import './Dashboard.css';

// Define the Deal type for clarity
interface Deal {
  id: number;
  name: string;
  description?: string;
  value: number;
  stage: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const { deals, loading, error, fetchDeals } = useDeals();

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  // Calculate summary statistics
  const totalDeals: number = deals.length;
  const totalValue: number = deals.reduce((sum: number, deal: Deal) => sum + deal.value, 0);

  // Count deals by stage
  const dealsByStage: { [key: string]: number } = deals.reduce((acc: { [key: string]: number }, deal: Deal) => {
    acc[deal.stage] = (acc[deal.stage] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return <div className="dashboard-page">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-page error-message">Error loading dashboard: {error}</div>;
  }

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="dashboard-summary">
        <div className="summary-card">
          <h2>Total Deals</h2>
          <p>{totalDeals}</p>
        </div>
        <div className="summary-card">
          <h2>Total Deal Value</h2>
          <p>${totalValue.toFixed(2)}</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="deals-by-stage">
          <h2>Deals by Stage</h2>
          {Object.keys(dealsByStage).length > 0 ? (
            <ul>
              {Object.entries(dealsByStage).map(([stage, count]) => (
                <li key={stage}>
                  {stage}: {count}
                </li>
              ))}
            </ul>
          ) : (
            <p>No deals found.</p>
          )}
        </div>

        {/* Add more dashboard sections here, e.g., recent deals, sales performance charts */}
      </div>
    </div>
  );
};

export default Dashboard;
