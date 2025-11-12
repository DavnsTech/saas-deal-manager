import React from 'react';
import { Link } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import './Deals.css';

const Deals = () => {
  const { deals, loading, error, deleteDealFromContext } = useDeals();

  if (loading) {
    return <div className="deals-container">Loading deals...</div>;
  }

  if (error) {
    return <div className="deals-container">Error loading deals: {error.message}</div>;
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await deleteDealFromContext(id);
      } catch (err) {
        console.error('Error deleting deal:', err);
        // You might want to show a user-facing error message here
      }
    }
  };

  return (
    <div className="deals-container">
      <h2>All Deals</h2>
      <Link to="/create-deal" className="add-deal-button">Add New Deal</Link>
      {deals.length === 0 ? (
        <p>No deals found. <Link to="/create-deal">Create one now!</Link></p>
      ) : (
        <table className="deals-table">
          <thead>
            <tr>
              <th>Deal Name</th>
              <th>Company</th>
              <th>Value</th>
              <th>Sales Stage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id}>
                <td><Link to={`/deals/${deal.id}`}>{deal.name}</Link></td>
                <td>{deal.company}</td>
                <td>${parseFloat(deal.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>{deal.stage}</td>
                <td>
                  <Link to={`/deals/${deal.id}/edit`} className="action-button edit">Edit</Link>
                  <button onClick={() => handleDelete(deal.id)} className="action-button delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Deals;
