// TypeScript version of Deals.tsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './Deals.css';
import { useDeals } from '../contexts/DealContext'; // Import TS version of context
import { Deal as DealType } from '../api/dealsApi'; // Import Deal type

const Deals = () => {
  const { deals, loading, error, fetchDeals } = useDeals();

  useEffect(() => {
    // Fetch deals when the component mounts.
    // If the context already has deals, you might want to add logic to avoid refetching unnecessarily,
    // or rely on the context's fetchDeals to handle this.
    fetchDeals();
    // The dependency array is empty, so this runs once when the component mounts.
  }, []);

  if (loading) return <div className="deals-container">Loading deals...</div>;
  if (error) return <div className="deals-container error-message">Error: {error}</div>;

  return (
    <div className="deals-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="deals-main">
          <h1>All Deals</h1>
          <Link to="/deals/new" className="create-deal-button">Create New Deal</Link>

          {deals.length > 0 ? (
            <table className="deals-table">
              <thead>
                <tr>
                  <th>Deal Name</th>
                  <th>Company</th>
                  <th>Stage</th>
                  <th>Value</th>
                  <th>Expected Close Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal: DealType) => (
                  <tr key={deal.id}>
                    <td><Link to={`/deals/${deal.id}`}>{deal.name}</Link></td>
                    <td>{deal.company || 'N/A'}</td>
                    <td>{deal.stage}</td>
                    <td>{deal.value !== undefined ? `$${deal.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'N/A'}</td>
                    <td>{deal.expectedCloseDate ? new Date(deal.expectedCloseDate).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <Link to={`/deals/${deal.id}`} className="action-link">View</Link>
                      {/* Add edit/delete buttons here if desired, or manage via DealDetail */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No deals found. <Link to="/deals/new">Create your first deal!</Link></p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Deals;
