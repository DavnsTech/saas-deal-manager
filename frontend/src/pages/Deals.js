import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import './Deals.css';

function Deals() {
  const { deals, loading, error, fetchDeals } = useDeals();

  useEffect(() => {
    // Fetch deals only if they haven't been fetched yet or if there's an error that needs re-fetching
    if (deals.length === 0 && !loading && !error) {
      fetchDeals();
    }
  }, [deals, loading, error, fetchDeals]);

  if (loading) {
    return <div className="deals-page">Loading deals...</div>;
  }

  if (error) {
    return <div className="deals-page error-message">Error loading deals: {error}</div>;
  }

  return (
    <div className="deals-page">
      <h1>All Deals</h1>
      <Link to="/create-deal" className="create-deal-button">Create New Deal</Link>
      <div className="deals-list">
        {deals.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Stage</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deals.map(deal => (
                <tr key={deal.id}>
                  <td>{deal.name}</td>
                  <td>${deal.value.toFixed(2)}</td>
                  <td>{deal.stage}</td>
                  <td>{new Date(deal.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/deals/${deal.id}`} className="view-button">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No deals found. <Link to="/create-deal">Create one now!</Link></p>
        )}
      </div>
    </div>
  );
}

export default Deals;
