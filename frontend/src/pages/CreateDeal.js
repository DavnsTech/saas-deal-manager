import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDeal } from '../api/dealsApi'; // Assuming dealsApi.js is used
import './CreateDeal.css';

const CreateDeal = () => {
  const [dealName, setDealName] = useState('');
  const [stage, setStage] = useState('');
  const [company, setCompany] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [value, setValue] = useState('');
  const [expectedCloseDate, setExpectedCloseDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const dealData = {
      name: dealName,
      stage: stage,
      company: company,
      contactPerson: contactPerson,
      value: parseFloat(value) || undefined, // Convert to number, handle empty string
      expectedCloseDate: expectedCloseDate || undefined,
    };

    try {
      await createDeal(dealData);
      navigate('/deals'); // Redirect to deals list on success
    } catch (err) {
      setError(err.message || 'Failed to create deal. Please try again.');
      console.error('Create Deal Error:', err);
    }
  };

  const stages = ["Prospecting", "Qualification", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

  return (
    <div className="create-deal-container">
      <h2>Create New Deal</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dealName">Deal Name:</label>
          <input
            type="text"
            id="dealName"
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stage">Stage:</label>
          <select
            id="stage"
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            required
          >
            <option value="">Select Stage</option>
            {stages.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactPerson">Contact Person:</label>
          <input
            type="text"
            id="contactPerson"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">Value:</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="expectedCloseDate">Expected Close Date:</label>
          <input
            type="date"
            id="expectedCloseDate"
            value={expectedCloseDate}
            onChange={(e) => setExpectedCloseDate(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Create Deal</button>
      </form>
    </div>
  );
};

export default CreateDeal;
