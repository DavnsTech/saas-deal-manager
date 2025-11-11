import React, { useState, useEffect } from 'react';
import { fetchDeals } from '../api/dealsApi'; // Assuming an api service
import './Deals.css'; // Component-specific styles

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
      } catch (err) {
        setError('Failed to load deals. Please try again later.');
        console.error('Error fetching deals:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div className="deals-container">Loading deals...</div>;
  }

  if (error) {
    return <div className="deals-container error">{error}</div>;
  }

  return (
    <div className="deals-container">
      <h1>All Deals</h1>
      {deals.length === 0 ? (
        <p>No deals found. Start by creating a new one!</p>
      ) : (
        <table className="deals-table">
          <thead>
            <tr>
              <th>Deal Name</th>
              <th>Client</th>
              <th>Value</th>
              <th>Stage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map(deal => (
              <tr key={deal.id}>
                <td>{deal.name}</td>
                <td>{deal.clientName}</td>
                <td>${deal.value.toLocaleString()}</td>
                <td>{deal.stage}</td>
                <td>
                  <button onClick={() => alert(`View details for ${deal.name}`)}>View</button>
                  <button onClick={() => alert(`Edit deal ${deal.name}`)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Deals;
