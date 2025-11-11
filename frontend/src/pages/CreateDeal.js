import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDeal } from '../api/dealsApi';
import './CreateDeal.css';

function CreateDeal() {
  const navigate = useNavigate();
  const [dealData, setDealData] = useState({
    name: '',
    description: '',
    value: 0,
    currency: 'USD',
    stage: 'Prospecting', // Default stage
    customerId: '', // This should ideally be a dropdown populated from a customer API
    assignedUserId: '', // This should ideally be a dropdown populated from a user API
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDealData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation
    if (!dealData.name || !dealData.value || !dealData.customerId || !dealData.assignedUserId) {
      setError('Please fill in all required fields (Name, Value, Customer, Assigned User).');
      setLoading(false);
      return;
    }

    try {
      await createDeal(dealData);
      navigate('/deals'); // Redirect to deals list after successful creation
    } catch (err) {
      setError('Failed to create deal. Please check the details and try again.');
      console.error('Create deal error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-deal-container">
      <h2>Create New Deal</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Deal Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={dealData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={dealData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="value">Value:</label>
          <input
            type="number"
            id="value"
            name="value"
            value={dealData.value}
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
            value={dealData.currency}
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
            value={dealData.stage}
            onChange={handleInputChange}
            required
          />
          {/* Consider using a dropdown for stages */}
        </div>
        <div className="form-group">
          <label htmlFor="customerId">Customer ID:</label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={dealData.customerId}
            onChange={handleInputChange}
            required
            placeholder="Enter Customer ID (e.g., 60f..."
          />
          {/* In a real app, this would be a select dropdown populated by an API call to fetch customers */}
        </div>
        <div className="form-group">
          <label htmlFor="assignedUserId">Assigned User ID:</label>
          <input
            type="text"
            id="assignedUserId"
            name="assignedUserId"
            value={dealData.assignedUserId}
            onChange={handleInputChange}
            required
            placeholder="Enter User ID (e.g., 60f..."
          />
          {/* In a real app, this would be a select dropdown populated by an API call to fetch users */}
        </div>
        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? 'Creating...' : 'Create Deal'}
        </button>
        <button type="button" onClick={() => navigate('/deals')} disabled={loading} className="btn-cancel">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateDeal;
