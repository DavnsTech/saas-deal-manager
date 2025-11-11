import React, { useState, useEffect } from 'react';
import { fetchDeals } from '../api/dealsApi';
import './Deals.css'; // Import Deals-specific styles

function Deals() {
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
        setError('Could not load deals. Please check your connection or try again.');
        console.error('Deals page fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  if (loading) {
    return <div className="deals-container">Loading deals...</div>;
  }

  if (error) {
    return <div className="deals-container error">{error}</div>;
  }

  return (
    <div className="deals-container">
      <h2>All Deals</h2>
      <a href="/deals/new" className="btn-create-deal">Create New Deal</a>
      {deals.length > 0 ? (
        <table className="deals-table">
          <thead>
            <tr>
              <th>Deal Name</th>
              <th>Customer</th>
              <th>Value</th>
              <th>Stage</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal._id}>
                <td><a href={`/deals/${deal._id}`}>{deal.name}</a></td>
                <td>{deal.customerId?.name || 'N/A'}</td> {/* Assuming customer object is populated */}
                <td>{deal.currency} {deal.value.toLocaleString()}</td>
                <td>{deal.stage}</td>
                <td>{deal.assignedUserId?.firstName || 'N/A'} {deal.assignedUserId?.lastName || 'N/A'}</td> {/* Assuming user object is populated */}
                <td>
                  <a href={`/deals/${deal._id}`} className="btn-view">View</a>
                  {/* Add edit/delete buttons here, potentially with confirmation */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No deals found. Start by creating one!</p>
      )}
    </div>
  );
}

export default Deals;
