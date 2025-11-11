import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dealsApi } from '../api/dealsApi';
import './Deals.css';

function Deals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('');

  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        const data = await dealsApi.getAllDeals();
        setDeals(data);
        setError(null);
      } catch (err) {
        setError(`Failed to load deals: ${err.message}`);
        console.error('Deals fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (deal.customerId && deal.customerId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStage === '' || deal.stage === filterStage;
    return matchesSearch && matchesFilter;
  });

  const salesStages = ['Prospection', 'Qualification', 'Prise de contact', 'Découverte', 'Proposition de valeur', 'Négociation', 'Closing', 'Livraison/Onboarding', 'Fidélisation/Upsell/Cross-sell'];

  if (loading) {
    return <div className="deals-container">Loading deals...</div>;
  }

  if (error) {
    return <div className="deals-container error">{error}</div>;
  }

  // Helper function to format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: currency });
  };

  return (
    <div className="deals-container">
      <div className="section-header">
        <h2>All Deals</h2>
        <Link to="/deals/new" className="create-deal-button">
          {/* <FaPlus /> */}
          Create New Deal
        </Link>
      </div>

      <div className="controls-container">
        <div className="search-bar">
          {/* <FaSearch /> */}
          <input
            type="text"
            placeholder="Search by deal name or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-dropdown"
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
        >
          <option value="">Filter by Stage</option>
          {salesStages.map(stage => (
            <option key={stage} value={stage}>{stage}</option>
          ))}
        </select>
      </div>

      {filteredDeals.length > 0 ? (
        <div className="deals-grid">
          {filteredDeals.map((deal) => (
            <div key={deal._id || deal.id} className="deal-card">
              <h3>
                <Link to={`/deals/${deal._id || deal.id}`}>{deal.name}</Link>
              </h3>
              <p><strong>Customer:</strong> {deal.customerId || 'N/A'}</p>
              <p><strong>Stage:</strong> {deal.stage}</p>
              <p><strong>Amount:</strong> {formatCurrency(deal.amount, deal.currency)}</p>
              <p><strong>Assigned To:</strong> {deal.assignedUserId || 'N/A'}</p>
              <Link to={`/deals/${deal._id || deal.id}`} className="view-deal-link">View Details &rarr;</Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No deals found matching your criteria.</p>
      )}
    </div>
  );
}

export default Deals;
