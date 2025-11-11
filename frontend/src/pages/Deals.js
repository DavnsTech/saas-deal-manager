import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import { FaPlus, FaSearch } from 'react-icons/fa';
import './Deals.css';

function Deals() {
  const { deals, loading, error } = useDeals();
  const [search, setSearch] = useState('');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredDeals = deals.filter(deal =>
    deal.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="deals">
      <div className="header">
        <h2>Deals</h2>
        <Link to="/deals/create" className="create-btn">
          <FaPlus /> Create Deal
        </Link>
      </div>
      <div className="search">
        <FaSearch />
        <input
          type="text"
          placeholder="Search deals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="deals-grid">
        {filteredDeals.map(deal => (
          <div key={deal.id} className="deal-card">
            <h3>{deal.name}</h3>
            <p>${deal.amount}</p>
            <p>Stage: {deal.stage}</p>
            <Link to={`/deals/${deal.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Deals;
