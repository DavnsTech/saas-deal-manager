import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import { Deal, DealStage } from '../types';
import './DealDetail.css'; // Assuming DealDetail.css is used for styling

const DealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDealById, updateDeal, deleteDeal, deals } = useDeals();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDeal, setEditedDeal] = useState<Partial<Deal>>({});
  const [error, setError] = useState<string | null>(null);

  const availableStages: DealStage[] = [
    'Prospecting',
    'Qualification',
    'Proposal',
    'Negotiation',
    'Closed Won',
    'Closed Lost',
  ];

  useEffect(() => {
    const fetchDeal = async () => {
      if (!id) return;
      // Try to find in context first for performance if deals are already loaded
      const foundDeal = deals.find(d => d.id === id);
      if (foundDeal) {
        setDeal(foundDeal);
        setEditedDeal(foundDeal); // Initialize editedDeal with current deal data
      } else {
        // If not in context, fetch from API
        try {
          const fetchedDeal = await getDealById(id);
          if (fetchedDeal) {
            setDeal(fetchedDeal);
            setEditedDeal(fetchedDeal); // Initialize editedDeal with current deal data
          } else {
            setError('Deal not found.');
          }
        } catch (err) {
          setError('Failed to load deal details.');
          console.error(err);
        }
      }
    };
    fetchDeal();
  }, [id, deals, getDealById]); // Re-fetch if id or deals change

  const handleEditClick = () => {
    setIsEditing(true);
    // Ensure editedDeal is initialized with the current deal's data
    if (deal) {
      setEditedDeal({ ...deal });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedDeal({}); // Clear edited state
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedDeal((prev) => ({
      ...prev,
      [name]: name === 'value' ? parseFloat(value) : value,
    }));
  };

  const handleSaveEdit = async () => {
    if (!deal || !id) return;
    try {
      // Only send fields that have actually changed and are valid
      const changesToApply: Partial<Deal> = {};
      for (const key in editedDeal) {
        if (editedDeal[key as keyof typeof editedDeal] !== deal[key as keyof Deal]) {
          // Type assertion needed for accessing deal[key] as it might not be in editedDeal but is in deal
          if (editedDeal[key as keyof typeof editedDeal] !== undefined) {
             changesToApply[key as keyof typeof editedDeal] = editedDeal[key as keyof typeof editedDeal]!;
          }
        }
      }

      if (Object.keys(changesToApply).length === 0) {
        setIsEditing(false); // No changes to save
        return;
      }

      await updateDeal(id, changesToApply);
      setDeal((prevDeal) => prevDeal ? { ...prevDeal, ...changesToApply } : null); // Update local state
      setIsEditing(false);
      setEditedDeal({}); // Clear edited state
    } catch (err) {
      setError('Failed to save changes.');
      console.error('Error saving deal:', err);
    }
  };

  const handleDeleteClick = async () => {
    if (!deal || !id) return;
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await deleteDeal(id);
        navigate('/deals'); // Redirect to deals list after deletion
      } catch (err) {
        setError('Failed to delete deal.');
        console.error('Error deleting deal:', err);
      }
    }
  };

  if (error) {
    return <div className="deal-detail-page error-message">Error: {error}</div>;
  }

  if (!deal) {
    return <div className="deal-detail-page">Loading deal details...</div>;
  }

  return (
    <div className="deal-detail-page">
      <h2>Deal Details</h2>

      {isEditing ? (
        <div className="edit-form">
          <h3>Edit Deal</h3>
          <div className="form-group">
            <label htmlFor="editDealName">Deal Name:</label>
            <input
              type="text"
              id="editDealName"
              name="name"
              value={editedDeal.name || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="editCompany">Company:</label>
            <input
              type="text"
              id="editCompany"
              name="company"
              value={editedDeal.company || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="editValue">Value ($):</label>
            <input
              type="number"
              id="editValue"
              name="value"
              value={editedDeal.value === undefined ? '' : editedDeal.value}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="editStage">Stage:</label>
            <select
              id="editStage"
              name="stage"
              value={editedDeal.stage || ''}
              onChange={handleInputChange}
              required
            >
              {availableStages.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="edit-actions">
            <button onClick={handleSaveEdit} className="save-button">Save</button>
            <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="deal-info">
          <p><strong>Deal Name:</strong> {deal.name}</p>
          <p><strong>Company:</strong> {deal.company}</p>
          <p><strong>Value:</strong> ${deal.value.toLocaleString()}</p>
          <p><strong>Stage:</strong> {deal.stage}</p>
          {deal.createdAt && <p><strong>Created At:</strong> {new Date(deal.createdAt).toLocaleDateString()}</p>}
          {deal.updatedAt && <p><strong>Updated At:</strong> {new Date(deal.updatedAt).toLocaleDateString()}</p>}
          <div className="deal-actions">
            <button onClick={handleEditClick} className="edit-button">Edit</button>
            <button onClick={handleDeleteClick} className="delete-button">Delete</button>
            <button onClick={() => navigate('/deals')} className="back-button">Back to Deals</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealDetail;
