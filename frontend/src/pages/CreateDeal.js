import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import './CreateDeal.css';

function CreateDeal() {
  const navigate = useNavigate();
  const { addDeal } = useDeals();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    value: 0,
    stage: 'Prospecting', // Default stage
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Basic validation
    if (!formData.name || !formData.value || !formData.stage) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      await addDeal(formData);
      navigate('/deals'); // Redirect to deals page after successful creation
    } catch (err) {
      setError(err.message || 'Failed to create deal. Please try again.');
    }
  };

  return (
    <div className="create-deal-page">
      <h1>Create New Deal</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="deal-form">
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
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="value">Value:</label>
          <input
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
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
            value={formData.stage}
            onChange={handleChange}
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
        <button type="submit" className="submit-button">Create Deal</button>
      </form>
    </div>
  );
}

export default CreateDeal;
