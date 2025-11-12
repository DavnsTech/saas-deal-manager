import React, { useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';
// Assuming you have a DealContext to manage deals data
import { useDeals } from '../contexts/DealContext'; // Using JS context for now

const Dashboard = () => {
  const { deals, loading, error, fetchDeals } = useDeals();

  useEffect(() => {
    fetchDeals();
  }, []); // Fetch deals when the component mounts

  if (loading) return <div className="dashboard-container">Loading dashboard...</div>;
  if (error) return <div className="dashboard-container error-message">Error: {error}</div>;

  // Simple dashboard metrics
  const totalDeals = deals.length;
  const openDeals = deals.filter(deal => deal.stage !== 'Closed Won' && deal.stage !== 'Closed Lost').length;
  const totalValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0);

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="dashboard-main">
          <h1>Dashboard</h1>
          <div className="dashboard-metrics">
            <div className="metric-card">
              <h3>Total Deals</h3>
              <p>{totalDeals}</p>
            </div>
            <div className="metric-card">
              <h3>Open Deals</h3>
              <p>{openDeals}</p>
            </div>
            <div className="metric-card">
              <h3>Total Pipeline Value</h3>
              <p>${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          {/* You can add charts or more detailed deal summaries here */}
          <div className="recent-deals">
            <h2>Recent Deals</h2>
            {deals.length > 0 ? (
              <ul>
                {deals.slice(0, 5).map(deal => (
                  <li key={deal.id}>
                    <a href={`/deals/${deal.id}`}>{deal.name}</a> - {deal.stage} (${deal.value?.toLocaleString() || 'N/A'})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No deals found yet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
