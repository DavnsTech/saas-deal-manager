import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dealsApi } from '../api/dealsApi';
import './DealDetail.css';

function DealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDealDetails = async () => {
      try {
        setLoading(true);
        const data = await dealsApi.getDealById(id);
        setDeal(data);
        setError(null);
      } catch (err) {
        setError(`Failed to load deal details: ${err.message}`);
        console.error('DealDetail fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDealDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await dealsApi.deleteDeal(id);
        navigate('/deals'); // Redirect to the deals list
      } catch (err) {
        setError(`Failed to delete deal: ${err.message}`);
        console.error('DealDetail delete error:', err);
      }
    }
  };

  if (loading) {
    return <div className="deal-detail-container">Loading deal details...</div>;
  }

  if (error) {
    return <div className="deal-detail-container error">{error}</div>;
  }

  if (!deal) {
    return <div className="deal-detail-container">Deal not found.</div>;
  }

  // Helper function to format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: currency });
  };

  return (
    <div className="deal-detail-container">
      <div className="back-and-edit">
        <button className="back-button" onClick={() => navigate('/deals')}>&larr; Back to Deals</button>
        <div className="actions">
          <Link to={`/deals/edit/${deal._id || deal.id}`} className="edit-button">Edit</Link>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      </div>
      <h1>{deal.name}</h1>
      <div className="deal-summary">
        <div className="deal-amount">{formatCurrency(deal.amount, deal.currency)}</div>
        <span className={`stage-badge stage-${deal.stage.toLowerCase().replace(/\s+/g, '-')}`}>{deal.stage}</span>
      </div>

      <div className="deal-details-grid">
        <div className="detail-card">
          <h4>Client</h4>
          <p>{deal.customerId || 'N/A'}</p> {/* Display customer name/ID */}
        </div>
        <div className="detail-card">
          <h4>Sales Representative</h4>
          <p>{deal.assignedUserId || 'N/A'}</p> {/* Display assigned user name/ID */}
        </div>
        <div className="detail-card">
          <h4>Contact</h4>
          <p>{deal.contactPrincipal || 'N/A'}</p>
        </div>
        <div className="detail-card">
          <h4>Email</h4>
          <p>{deal.email || 'N/A'}</p>
        </div>
        <div className="detail-card">
          <h4>Phone</h4>
          <p>{deal.phone || 'N/A'}</p>
        </div>
        <div className="detail-card">
          <h4>Activity Sector</h4>
          <p>{deal.activitySector || 'N/A'}</p>
        </div>
        <div className="detail-card">
          <h4>Company Size</h4>
          <p>{deal.companySize || 'N/A'}</p>
        </div>
        <div className="detail-card">
          <h4>Lead Source</h4>
          <p>{deal.sourceLead || 'N/A'}</p>
        </div>
        <div className="detail-card">
          <h4>Acquisition Channel</h4>
          <p>{deal.acquisitionChannel || 'N/A'}</p>
        </div>
        <div className="detail-card">
          <h4>Priority</h4>
          <p>{deal.priority || 'N/A'}</p>
        </div>
        <div className="detail-card">
          <h4>Probability (%)</h4>
          <p>{deal.probabilityClosing || 'N/A'}</p>
        </div>
        <div className="detail-card">
          <h4>Contract Type</h4>
          <p>{deal.contractType || 'N/A'}</p>
        </div>
        <div className="detail-card">
          <h4>Contract Duration (Months)</h4>
          <p>{deal.contractDuration || 'N/A'}</p>
        </div>
        <div className="detail-card">
          <h4>Payment Mode</h4>
          <p>{deal.paymentMode || 'N/A'}</p>
        </div>
      </div>

      <div className="deal-description">
        <h3>Description</h3>
        <p>{deal.description || 'No description provided.'}</p>
      </div>

      <div className="deal-notes">
        <h3>Identified Need</h3>
        <p>{deal.identifiedNeed || 'N/A'}</p>
      </div>

      <div className="deal-notes">
        <h3>Proposed Solution</h3>
        <p>{deal.proposedSolution || 'N/A'}</p>
      </div>

      {/* Add more sections for comments, documents, etc. as needed */}
    </div>
  );
}

export default DealDetail;
