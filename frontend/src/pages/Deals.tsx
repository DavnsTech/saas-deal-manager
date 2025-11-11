import React, { useEffect, useState } from 'react';
import { useDeals } from '../contexts/DealContext';
import { Deal } from '../types';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation

const DealsPage: React.FC = () => {
  const { deals, loading, error, fetchDeals, deleteDeal, currentUser } = useDeals();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const handleDelete = async (dealId: string) => {
    if (!window.confirm('Are you sure you want to delete this deal?')) {
      return;
    }
    setIsDeleting(dealId);
    const success = await deleteDeal(dealId);
    if (success) {
      // Deals state is updated by the context hook
      console.log('Deal deleted successfully');
    } else {
      console.error('Failed to delete deal');
    }
    setIsDeleting(null);
  };

  if (loading && deals.length === 0) {
    return <div>Loading deals...</div>;
  }

  if (error) {
    return <div>Error loading deals: {error}</div>;
  }

  if (!currentUser) {
    return <div>Please log in to view deals.</div>; // Or redirect
  }

  return (
    <div>
      <h1>Deals</h1>
      <Link to="/deals/new">
        <button>Add New Deal</button>
      </Link>

      {loading && <div>Updating...</div>} {/* Show subtle loading for updates */}

      {deals.length === 0 ? (
        <p>No deals found. Add one to get started!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stage</th>
              <th>Value</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal: Deal) => (
              <tr key={deal.id}>
                <td><Link to={`/deals/${deal.id}`}>{deal.name}</Link></td>
                <td>{deal.stage}</td>
                <td>${deal.value.toLocaleString()}</td>
                <td>{deal.updatedAt.toLocaleDateString()}</td>
                <td>
                  <Link to={`/deals/edit/${deal.id}`}>
                    <button disabled={isDeleting === deal.id}>Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(deal.id)}
                    disabled={isDeleting === deal.id || loading}
                  >
                    {isDeleting === deal.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DealsPage;
