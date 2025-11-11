import React, { useState, useEffect } from 'react';
import { dealsApi } from '../api/dealsApi'; // Import the module
import './Dashboard.css';

function Dashboard() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        // Use the correct API function to fetch all deals
        const data = await dealsApi.getAllDeals();
        setDeals(data);
        setError(null);
      } catch (err) {
        setError(`Failed to load deals: ${err.message}`);
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  const totalDeals = deals.length;
  // Example: Calculate total value of deals
  const totalValue = deals.reduce((sum, deal) => sum + (deal.amount || 0), 0); // Use 'amount' and handle potential nulls

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
          {/* Format currency appropriately */}
          <p>{totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        </div>
        {/* Add more stats here */}
      </div>

      <h3>Recent Deals</h3>
      {deals.length > 0 ? (
        <ul className="recent-deals-list">
          {deals.slice(0, 5).map((deal) => ( // Show first 5 recent deals
            // Use Link for navigation to deal detail page
            <li key={deal._id || deal.id}> {/* Use a unique key, assuming _id or id from backend */}
              <Link to={`/deals/${deal._id || deal.id}`}>{deal.name || 'Untitled Deal'}</Link> - {deal.stage}
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
