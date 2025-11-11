import React, { useState, useEffect } from 'react';
import { fetchDeals } from '../api/dealsApi';
import './Dashboard.css';

function Dashboard() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        const data = await fetchDeals();
        setDeals(data);
        setError(null);
      } catch (err) {
        setError('Failed to load deals. Please try again later.');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  const totalDeals = deals.length;
  // Example: Calculate total value of deals
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);

  if (loading) {
    return <div className="dashboard-container">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-container error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Deals</h3>
          <p>{totalDeals}</p>
        </div>
        <div className="stat-card">
          <h3>Total Deal Value</h3>
          <p>${totalValue.toLocaleString()}</p>
        </div>
        {/* Add more stats here */}
      </div>

      <h3>Recent Deals</h3>
      {deals.length > 0 ? (
        <ul className="recent-deals-list">
          {deals.slice(0, 5).map((deal) => ( // Show first 5 recent deals
            <li key={deal._id}>
              <a href={`/deals/${deal._id}`}>{deal.name}</a> - {deal.stage}
            </li>
          ))}
        </ul>
      ) : (
        <p>No deals found.</p>
      )}
    </div>
  );
}

export default Dashboard;
