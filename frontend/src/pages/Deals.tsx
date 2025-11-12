import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import './Deals.css'; // Assuming Deals.css is used for styling

const Deals: React.FC = () => {
  const navigate = useNavigate();
  const { deals, loading, error, deleteDeal } = useDeals();

  const handleViewDeal = (id: string) => {
    navigate(`/deals/${id}`);
  };

  const handleDelete = async (id: string, dealName: string) => {
    if (window.confirm(`Are you sure you want to delete the deal "${dealName}"?`)) {
      try {
        await deleteDeal(id);
        // No need to manually remove from state, context handles it
      } catch (err) {
        console.error(`Error deleting deal ${id}:`, err);
        // Optionally show an error message to the user
      }
    }
  };

  if (loading) {
    return <div className="deals-page">Loading deals...</div>;
  }

  if (error) {
    return <div className="deals-page error-message">Error: {error}</div>;
  }

  return (
    <div className="deals-page">
      <h2>All Deals</h2>
      <button onClick={() => navigate('/deals/create')} className="create-deal-button">
        Create New Deal
      </button>
      <table className="deals-table">
        <thead>
          <tr>
            <th>Deal Name</th>
            <th>Company</th>
            <th>Value ($)</th>
            <th>Stage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deals.length > 0 ? (
            deals.map((deal) => (
              <tr key={deal.id}>
                <td>{deal.name}</td>
                <td>{deal.company}</td>
                <td>{deal.value.toLocaleString()}</td>
                <td>{deal.stage}</td>
                <td>
                  <button onClick={() => handleViewDeal(deal.id)} className="view-button">View</button>
                  <button onClick={() => handleDelete(deal.id, deal.name)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No deals found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Deals;
