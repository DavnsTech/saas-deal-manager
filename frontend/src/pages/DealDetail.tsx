import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as dealsApi from '../api/dealsApi';
import './DealDetail.css'; // Assuming DealDetail.css is still relevant
import { Deal } from '../types';

const DealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<Partial<Deal>>({});

  useEffect(() => {
    const fetchDeal = async (): Promise<void> => {
      try {
        setLoading(true);
        const data = await dealsApi.getDealById(id!);
        setDeal(data);
        setEditFormData(data); // Initialize edit form with current deal data
      } catch (err: any) {
        console.error('Error fetching deal:', err);
        setError('Failed to load deal details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleCancelEdit = (): void => {
    setIsEditing(false);
    setEditFormData(deal || {}); // Reset form to original data
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSaveEdit = async (): Promise<void> => {
    setError(''); // Clear previous errors
    try {
      // Basic validation
      if (!editFormData.name || !editFormData.company || editFormData.value === undefined || editFormData.value === null) {
        setError('Please fill in all required fields.');
        return;
      }
      if (typeof editFormData.value !== 'number' || editFormData.value < 0) {
        setError('Value must be a non-negative number.');
        return;
      }

      const updatedDeal = await dealsApi.updateDeal(id!, editFormData as Deal); // Cast to Deal for updateDeal
      setDeal(updatedDeal);
      setIsEditing(false);
    } catch (err: any) {
      console.error('Error updating deal:', err);
      setError(err.response?.data?.message || 'Failed to update deal. Please try again.');
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await dealsApi.deleteDeal(id!);
        navigate('/deals');
      } catch (err: any) {
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
              value={editFormData.name || ''}
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
              value={editFormData.company || ''}
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
              value={editFormData.value !== undefined ? editFormData.value : ''}
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
              value={editFormData.stage || 'Prospecting'}
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
              value={editFormData.description || ''}
              onChange={handleEditChange}
              rows={4}
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
            <p><strong>Value:</strong> ${parseFloat(deal.value?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
