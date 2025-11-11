import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import './DealDetail.css';

function DealDetail() {
  const { id } = useParams();
  const { deals, removeDeal } = useDeals();
  const navigate = useNavigate();
  const deal = deals.find(d => d.id === parseInt(id));

  if (!deal) return <div>Deal not found</div>;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      await removeDeal(deal.id);
      navigate('/deals');
    }
  };

  return (
    <div className="deal-detail">
      <Link to="/deals" className="back-link">
        <FaArrowLeft /> Back to Deals
      </Link>
      <div className="deal-header">
        <h2>{deal.name}</h2>
        <div className="actions">
          <button className="edit-btn">
            <FaEdit /> Edit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            <FaTrash /> Delete
          </button>
        </div>
      </div>
      <div className="deal-info">
        <p><strong>Amount:</strong> ${deal.amount}</p>
        <p><strong>Stage:</strong> {deal.stage}</p>
        {/* Add more fields */}
      </div>
    </div>
  );
}

export default DealDetail;
