import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import './CreateDeal.css';

function CreateDeal() {
  const { addDeal } = useDeals();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    currency: 'USD',
    stage: 'Prospection',
    // Add other fields as needed
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) {
      setError('Name and amount are required');
      return;
    }
    try {
      await addDeal({ ...formData, amount: parseFloat(formData.amount) });
      navigate('/deals');
    } catch (err) {
      setError('Failed to create deal');
    }
  };

  return (
    <div className="create-deal">
      <h2>Create New Deal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Currency</label>
          <select name="currency" value={formData.currency} onChange={handleChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div className="form-group">
          <label>Stage</label>
          <select name="stage" value={formData.stage} onChange={handleChange}>
            <option value="Prospection">Prospection</option>
            <option value="Qualification">Qualification</option>
            {/* Add more options */}
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Deal</button>
      </form>
    </div>
  );
}

export default CreateDeal;
