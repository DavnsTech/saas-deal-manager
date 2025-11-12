import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './Deals.css';
import { useDeals } from '../contexts/DealContext'; // Using JS context for now

const Deals = () => {
  const { deals, loading, error, fetchDeals } = useDeals();

  useEffect(() => {
    fetchDeals();
    // The dependency array is empty, so this runs once when the component mounts.
    // If you were updating deals from another component, you might need to re-fetch or use context updates.
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
                {deals.map((deal) => (
                  <tr key={deal.id}>
                    <td><Link to={`/deals/${deal.id}`}>{deal.name}</Link></td>
                    <td>{deal.company || 'N/A'}</td>
                    <td>{deal.stage}</td>
                    <td>{deal.value !== undefined ? `$${deal.value.toLocaleString()}` : 'N/A'}</td>
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
