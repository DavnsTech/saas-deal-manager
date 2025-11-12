import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as dealsApi from '../api/dealsApi';
import './CreateDeal.css';

const CreateDeal = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    value: 0,
    stage: 'Prospecting',
    description: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      // Basic validation
      if (!formData.name || !formData.company || !formData.value) {
        setError('Please fill in all required fields.');
        return;
      }
       if (isNaN(parseFloat(formData.value)) || parseFloat(formData.value) < 0) {
        setError('Value must be a non-negative number.');
        return;
      }

      await dealsApi.createDeal(formData);
      navigate('/deals');
    } catch (err) {
      console.error('Error creating deal:', err);
      setError(err.response?.data?.message || 'Failed to create deal. Please try again.');
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
        <div className="form-group">
          <label htmlFor="value">Value ($):</label>
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
