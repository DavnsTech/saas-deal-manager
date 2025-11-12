import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DealContext, useDeals } from '../contexts/DealContext'; // Import DealContext and useDeals hook
import './CreateDeal.css'; // Assuming CreateDeal.css exists for styling

const CreateDeal = () => {
  const { addDeal, error: contextError, refreshDeals } = useDeals(); // Get addDeal and error from context
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    value: '', // Initialize value as empty string for better input handling
    stage: 'Prospecting', // Default stage
    description: '',
    // Add other fields from your custom fields list as needed
    currency: 'USD', // Example custom field
    priority: 'Medium', // Example custom field
    source: '', // Example custom field
  });
  const [localError, setLocalError] = useState(''); // Local error state for form specific issues
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear local error if the user starts typing in a field that had an error
    if (localError) {
      setLocalError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(''); // Clear local errors

    // Basic validation
    if (!formData.name || !formData.company) {
      setLocalError('Deal Name and Company are required.');
      return;
    }
    const numericValue = parseFloat(formData.value);
    if (isNaN(numericValue) || numericValue < 0) {
      setLocalError('Value must be a non-negative number.');
      return;
    }

    try {
      // Prepare data to send, ensure value is a number
      const dealDataToSend = {
        ...formData,
        value: numericValue,
      };

      await addDeal(dealDataToSend); // Use the context function to add the deal
      // Optionally refresh deals if context doesn't auto-update, or rely on context update
      // refreshDeals(); // Uncomment if context doesn't automatically update the list
      navigate('/deals'); // Navigate to deals list on success
    } catch (err) {
      // Error is already set in context by addDeal, but we can also set local error
      setLocalError(err.message || 'An unexpected error occurred.');
      console.error('Error in CreateDeal handleSubmit:', err);
    }
  };

  // Combined error display from context and local
  const displayError = localError || contextError;

  return (
    <div className="create-deal-container">
      <h2>Create New Deal</h2>
      {displayError && <p className="error-message">{displayError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Deal Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="value">Value:</label>
            <input
              type="number"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="currency">Currency:</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              {/* Add more currencies as needed */}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="stage">Sales Stage:</label>
            <select
              id="stage"
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              required
            >
              <option value="Prospection">Prospection</option>
              <option value="Qualification">Qualification</option>
              <option value="Prise de contact">Prise de contact</option>
              <option value="Découverte">Découverte</option>
              <option value="Proposition de valeur">Proposition de valeur</option>
              <option value="Négociation">Négociation</option>
              <option value="Closing">Closing</option>
              <option value="Livraison/Onboarding">Livraison/Onboarding</option>
              <option value="Fidélisation/Upsell/Cross-sell">Fidélisation/Upsell/Cross-sell</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="source">Lead Source:</label>
          <input
            type="text"
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="e.g., Website, Referral, Cold Call"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">Create Deal</button>
      </form>
    </div>
  );
};

export default CreateDeal;
