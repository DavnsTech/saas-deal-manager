import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDealById, updateDeal, deleteDeal } from '../api/dealsApi'; // Import from the correct API file
import './DealDetail.css';

function DealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const data = await getDealById(id);
        setDeal(data);
        setEditFormData(data); // Initialize edit form with current deal data
      } catch (err) {
        setError(err.message || 'Failed to load deal details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditFormData(deal); // Reset form data to original deal data
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await updateDeal(id, editFormData);
      setDeal(editFormData); // Update state with saved data
      setIsEditing(false);
      // Optionally navigate to deals list or show a success message
      // navigate('/deals');
    } catch (err) {
      setError(err.message || 'Failed to update deal.');
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await deleteDeal(id);
        navigate('/deals'); // Redirect to deals list after deletion
      } catch (err) {
        setError(err.message || 'Failed to delete deal.');
      }
    }
  };

  if (isLoading) {
    return <div className="deal-detail-page">Loading deal details...</div>;
  }

  if (error) {
    return <div className="deal-detail-page error-message">Error: {error}</div>;
  }

  if (!deal) {
    return <div className="deal-detail-page">Deal not found.</div>;
  }

  return (
    <div className="deal-detail-page">
      <h1>Deal Details</h1>
      {error && <p className="error-message">{error}</p>}

      {isEditing ? (
        <form onSubmit={handleSaveClick} className="deal-edit-form">
          <div className="form-group">
            <label htmlFor="name">Deal Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editFormData.name}
              onChange={handleEditFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={editFormData.description}
              onChange={handleEditFormChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="value">Value:</label>
            <input
              type="number"
              id="value"
              name="value"
              value={editFormData.value}
              onChange={handleEditFormChange}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label htmlFor="stage">Sales Stage:</label>
            <select
              id="stage"
              name="stage"
              value={editFormData.stage}
              onChange={handleEditFormChange}
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
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="deal-info">
          <p><strong>Deal Name:</strong> {deal.name}</p>
          <p><strong>Description:</strong> {deal.description || 'N/A'}</p>
          <p><strong>Value:</strong> ${deal.value.toFixed(2)}</p>
          <p><strong>Sales Stage:</strong> {deal.stage}</p>
          <p><strong>Created At:</strong> {new Date(deal.createdAt).toLocaleDateString()}</p>
          <p><strong>Updated At:</strong> {new Date(deal.updatedAt).toLocaleDateString()}</p>

          <div className="deal-actions">
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteClick} className="delete-button">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DealDetail;
