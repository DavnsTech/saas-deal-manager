import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as dealsApi from '../api/dealsApi';
import './DealDetail.css';

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        setLoading(true);
        const data = await dealsApi.getDealById(id);
        setDeal(data);
        setEditFormData(data); // Initialize edit form with current deal data
      } catch (err) {
        console.error('Error fetching deal:', err);
        setError('Failed to load deal details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData(deal); // Reset form to original data
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSaveEdit = async () => {
    setError(''); // Clear previous errors
    try {
       // Basic validation
      if (!editFormData.name || !editFormData.company || editFormData.value === undefined || editFormData.value === null) {
        setError('Please fill in all required fields.');
        return;
      }
      if (isNaN(parseFloat(editFormData.value)) || parseFloat(editFormData.value) < 0) {
        setError('Value must be a non-negative number.');
        return;
      }

      const updatedDeal = await dealsApi.updateDeal(id, editFormData);
      setDeal(updatedDeal);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating deal:', err);
      setError(err.response?.data?.message || 'Failed to update deal. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await dealsApi.deleteDeal(id);
        navigate('/deals');
      } catch (err) {
        console.error('Error deleting deal:', err);
        setError('Failed to delete deal. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="deal-detail-container">Loading deal details...</div>;
  }

  if (error) {
    return <div className="deal-detail-container">Error: {error}</div>;
  }

  if (!deal) {
    return <div className="deal-detail-container">Deal not found.</div>;
  }

  return (
    <div className="deal-detail-container">
      {isEditing ? (
        <div>
          <h2>Edit Deal</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="edit-name">Deal Name:</label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={editFormData.name}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-company">Company:</label>
            <input
              type="text"
              id="edit-company"
              name="company"
              value={editFormData.company}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-value">Value ($):</label>
            <input
              type="number"
              id="edit-value"
              name="value"
              value={editFormData.value}
              onChange={handleEditChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-stage">Sales Stage:</label>
            <select
              id="edit-stage"
              name="stage"
              value={editFormData.stage}
              onChange={handleEditChange}
              required
            >
              <option value="Prospecting">Prospecting</option>
              <option value="Qualification">Qualification</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Closed Lost">Closed Lost</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="edit-description">Description:</label>
            <textarea
              id="edit-description"
              name="description"
              value={editFormData.description}
              onChange={handleEditChange}
              rows="4"
            ></textarea>
          </div>
          <div className="edit-buttons">
            <button onClick={handleSaveEdit} className="save-button">Save</button>
            <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Deal Details</h2>
          <div className="deal-info">
            <p><strong>Deal Name:</strong> {deal.name}</p>
            <p><strong>Company:</strong> {deal.company}</p>
            <p><strong>Value:</strong> ${parseFloat(deal.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p><strong>Sales Stage:</strong> {deal.stage}</p>
            <p><strong>Description:</strong> {deal.description || 'N/A'}</p>
            {/* Add more deal details if available */}
          </div>
          <div className="deal-actions">
            <button onClick={handleEdit} className="edit-button">Edit</button>
            <button onClick={handleDelete} className="delete-button">Delete</button>
            <button onClick={() => navigate('/deals')} className="back-button">Back to Deals</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealDetail;
