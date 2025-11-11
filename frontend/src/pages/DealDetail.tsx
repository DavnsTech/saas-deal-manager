import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDealContext } from '../contexts/DealContext';
import './DealDetail.css'; // Assuming CSS is imported
import { Deal } from '../types'; // Assuming 'Deal' type is defined

const DealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    selectedDeal,
    fetchDeal,
    editDeal,
    removeDeal,
    loading: contextLoading,
    error: contextError,
    setSelectedDeal, // To clear selected deal when navigating away
  } = useDealContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editFormState, setEditFormState] = useState<Partial<Deal> | null>(null); // Use Partial for editable fields
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    const loadDeal = async () => {
      if (!selectedDeal || (selectedDeal && selectedDeal.id !== id)) {
        const deal = await fetchDeal(id!); // Fetch if not available or different
        if (!deal) {
          // Handle case where deal is not found
          navigate('/404'); // Or redirect to deals list with an error
        }
      }
    };
    loadDeal();

    // Cleanup function to clear selectedDeal when component unmounts
    return () => {
      setSelectedDeal(null);
    };
  }, [id, fetchDeal, selectedDeal, navigate, setSelectedDeal]);

  // Initialize edit form state when selectedDeal is available and not editing
  useEffect(() => {
    if (selectedDeal && !isEditing) {
      setEditFormState({ ...selectedDeal });
    }
  }, [selectedDeal, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormState(prevState => ({
      ...(prevState || {}), // Ensure prevState is not null
      [name]: value,
    }));
    if (updateError) {
      setUpdateError(null); // Clear error on input change
    }
  };

  const handleSaveClick = async () => {
    if (!editFormState || !id) return;

    // Basic validation for fields being edited
    if (!editFormState.name || !editFormState.client || (editFormState.value !== undefined && editFormState.value <= 0) || !editFormState.stage) {
      setUpdateError('Please fill in all required fields correctly.');
      return;
    }

    try {
      const updatedDeal = await editDeal(id, editFormState);
      if (updatedDeal) {
        setIsEditing(false); // Exit editing mode on success
        setUpdateError(null);
      } else {
        setUpdateError('Failed to update deal. Please try again.');
      }
    } catch (err) {
      setUpdateError('An error occurred during update.');
      console.error("Error during deal update:", err);
    }
  };

  const handleDeleteClick = async () => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this deal?')) {
      const success = await removeDeal(id);
      if (success) {
        navigate('/deals'); // Redirect to deals list on successful deletion
      } else {
        setUpdateError('Failed to delete deal. Please try again.');
      }
    }
  };

  const displayError = updateError || contextError;

  if (contextLoading && !selectedDeal) {
    return <div className="loading">Loading Deal...</div>;
  }

  if (!selectedDeal) {
    return <div className="error-message">Deal not found or an error occurred.</div>;
  }

  return (
    <div className="deal-detail-container">
      {displayError && <p className="error-message">{displayError}</p>}
      <h1>Deal Details: {selectedDeal.name}</h1>

      {isEditing ? (
        <div className="edit-form">
          <div className="form-group">
            <label htmlFor="edit-name">Deal Name:</label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={editFormState?.name || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-client">Client Name:</label>
            <input
              type="text"
              id="edit-client"
              name="client"
              value={editFormState?.client || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-value">Value ($):</label>
            <input
              type="number"
              id="edit-value"
              name="value"
              value={editFormState?.value || 0}
              onChange={handleInputChange}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-stage">Sales Stage:</label>
            <select
              id="edit-stage"
              name="stage"
              value={editFormState?.stage || 'Prospecting'}
              onChange={handleInputChange}
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
          {/* Add other editable fields */}
          <button onClick={handleSaveClick} disabled={contextLoading}>
            {contextLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <button onClick={() => setIsEditing(false)} disabled={contextLoading}>Cancel</button>
        </div>
      ) : (
        <div className="deal-info">
          <p><strong>Client:</strong> {selectedDeal.client}</p>
          <p><strong>Value:</strong> ${selectedDeal.value.toLocaleString()}</p>
          <p><strong>Stage:</strong> {selectedDeal.stage}</p>
          {/* Display other deal details */}
          <button onClick={() => setIsEditing(true)} disabled={contextLoading}>Edit Deal</button>
          <button onClick={handleDeleteClick} disabled={contextLoading} style={{ marginLeft: '10px', backgroundColor: 'red' }}>Delete Deal</button>
        </div>
      )}
      <button onClick={() => navigate('/deals')} style={{ marginTop: '20px' }}>Back to Deals</button>
    </div>
  );
};

export default DealDetail;
