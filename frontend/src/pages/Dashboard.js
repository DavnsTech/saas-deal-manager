import React from 'react';
import { Link } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import { FaPlus, FaChartLine, FaDollarSign, FaList } from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
  const { deals, loading, error } = useDeals();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalDeals = deals.length;
  const totalValue = deals.reduce((sum, deal) => sum + (deal.amount || 0), 0);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat-card">
          <FaList />
          <div>
            <h3>{totalDeals}</h3>
            <p>Total Deals</p>
          </div>
        </div>
        <div className="stat-card">
          <FaDollarSign />
          <div>
            <h3>${totalValue.toLocaleString()}</h3>
            <p>Total Value</p>
          </div>
        </div>
        {/* Add more stats */}
      </div>
      <div className="recent-deals">
        <h3>Recent Deals</h3>
        <ul>
          {deals.slice(-5).map(deal => (
            <li key={deal.id}>
              <Link to={`/deals/${deal.id}`}>{deal.name} - ${deal.amount}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
