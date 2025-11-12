import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as dealsApi from '../api/dealsApi'; // Import from the TS API file
import './DealDetail.css';

// Define the Deal type for clarity
interface Deal {
  id: number;
  name: string;
  description?: string;
  value: number;
  stage: string;
  createdAt: string;
  updatedAt: string;
}

const salesStages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

const DealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get id from URL params
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<Partial<Deal>>({}); // Use Partial for editable fields

  useEffect(() => {
    const fetchDeal = async () => {
      if (!id) return; // Guard against missing id
      try {
        const data = await dealsApi.getDealById(parseInt(id, 10));
        setDeal(data);
        setEditFormData(data); // Initialize edit form with current deal data
      } catch (err: any) {
        setError(err.message || 'Failed to load deal details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

  const handleEditClick = (): void => {
    setIsEditing(true);
  };

  const handleCancelClick = (): void => {
    setIsEditing(false);
    if (deal) {
      setEditFormData(deal); // Reset form data to original deal data
    }
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setEditFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError('');
    if (!id) return; // Guard against missing id

    // Basic validation for required fields in edit mode
    if (!editFormData.name || editFormData.value === undefined || editFormData.value < 0 || !editFormData.stage) {
      setError('Please ensure all required fields are filled correctly.');
      return;
    }

    try {
      const updatedDeal = await dealsApi.updateDeal(parseInt(id, 10), editFormData as Deal); // Cast to Deal for backend
      setDeal(updatedDeal); // Update state with saved data
      setIsEditing(false);
      // Optionally navigate to deals list or show a success message
      // navigate('/deals');
    } catch (err: any) {
      setError(err.message || 'Failed to update deal.');
    }
  };

  const handleDeleteClick = async (): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      if (!id) return; // Guard against missing id
      try {
        await dealsApi.deleteDeal(parseInt(id, 10));
        navigate('/deals'); // Redirect to deals list after deletion
      } catch (err: any) {
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
              value={editFormData.name || ''}
              onChange={handleEditFormChange}
              required
              aria-required="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={editFormData.description || ''}
              onChange={handleEditFormChange}
              rows={4}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="value">Value:</label>
            <input
              type="number"
              id="value"
              name="value"
              value={editFormData.value !== undefined ? editFormData.value : 0}
              onChange={handleEditFormChange}
              required
              min="0"
              step="0.01"
              aria-required="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="stage">Sales Stage:</label>
            <select
              id="stage"
              name="stage"
              value={editFormData.stage || ''}
              onChange={handleEditFormChange}
              required
              aria-required="true"
            >
              {salesStages.map(stage => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
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
};

export default DealDetail;
