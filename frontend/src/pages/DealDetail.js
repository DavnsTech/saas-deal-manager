import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDealById, updateDeal, deleteDeal } from '../api/dealsApi';
import './DealDetail.css';

function DealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDeal, setEditedDeal] = useState({});

  useEffect(() => {
    const loadDeal = async () => {
      try {
        setLoading(true);
        const data = await fetchDealById(id);
        setDeal(data);
        // Initialize editedDeal with current deal data
        setEditedDeal({
          name: data.name,
          description: data.description,
          value: data.value,
          currency: data.currency,
          stage: data.stage,
          // customerId and assignedUserId might be complex to edit directly here
        });
        setError(null);
      } catch (err) {
        setError('Could not load deal details.');
        console.error('Deal detail fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDeal();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset editedDeal to original deal data
    setEditedDeal({
      name: deal.name,
      description: deal.description,
      value: deal.value,
      currency: deal.currency,
      stage: deal.stage,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDeal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      const updatedDeal = await updateDeal(id, editedDeal);
      setDeal(updatedDeal);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update deal.');
      console.error('Deal update error:', err);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await deleteDeal(id);
        navigate('/deals'); // Redirect to deals list after deletion
      } catch (err) {
        setError('Failed to delete deal.');
        console.error('Deal delete error:', err);
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

  return (
    <div className="deal-detail-container">
      <h2>Deal Details</h2>
      {!isEditing ? (
        <>
          <div className="deal-info">
            <strong>Deal Name:</strong> {deal.name}
          </div>
          <div className="deal-info">
            <strong>Description:</strong> {deal.description || 'N/A'}
          </div>
          <div className="deal-info">
            <strong>Value:</strong> {deal.currency} {deal.value.toLocaleString()}
          </div>
          <div className="deal-info">
            <strong>Stage:</strong> {deal.stage}
          </div>
          <div className="deal-info">
            <strong>Customer:</strong> {deal.customerId?.name || 'N/A'}
          </div>
          <div className="deal-info">
            <strong>Assigned To:</strong> {deal.assignedUserId?.firstName || 'N/A'} {deal.assignedUserId?.lastName || 'N/A'}
          </div>
          <div className="deal-actions">
            <button onClick={handleEditClick} className="btn-edit">Edit</button>
            <button onClick={handleDeleteClick} className="btn-delete">Delete</button>
            <button onClick={() => navigate('/deals')} className="btn-back">Back to Deals</button>
          </div>
        </>
      ) : (
        <div className="deal-edit-form">
          <h3>Edit Deal</h3>
          <div className="form-group">
            <label htmlFor="name">Deal Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedDeal.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={editedDeal.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="value">Value:</label>
            <input
              type="number"
              id="value"
              name="value"
              value={editedDeal.value}
              onChange={handleInputChange}
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="currency">Currency:</label>
            <input
              type="text"
              id="currency"
              name="currency"
              value={editedDeal.currency}
              onChange={handleInputChange}
              required
              maxLength="3"
              style={{ textTransform: 'uppercase' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="stage">Stage:</label>
            <input
              type="text"
              id="stage"
              name="stage"
              value={editedDeal.stage}
              onChange={handleInputChange}
              required
            />
            {/* Consider using a dropdown for stages */}
          </div>
          <div className="form-actions">
            <button onClick={handleSaveEdit} className="btn-save">Save Changes</button>
            <button onClick={handleCancelEdit} className="btn-cancel">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DealDetail;
