import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import { Deal, DealStage } from '../types';
import './CreateDeal.css'; // Assuming CreateDeal.css is used for styling

const CreateDeal: React.FC = () => {
  const navigate = useNavigate();
  const { addDeal } = useDeals();
  const [dealName, setDealName] = useState('');
  const [company, setCompany] = useState('');
  const [value, setValue] = useState<number>(0);
  const [stage, setStage] = useState<DealStage>('Prospecting');
  const [error, setError] = useState<string | null>(null);

  const availableStages: DealStage[] = [
    'Prospecting',
    'Qualification',
    'Proposal',
    'Negotiation',
    'Closed Won',
    'Closed Lost',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealName || !company || value <= 0) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const newDealData: Omit<Deal, 'id'> = {
        name: dealName,
        company: company,
        value: value,
        stage: stage,
      };
      await addDeal(newDealData);
      navigate('/deals'); // Redirect to deals list after creation
    } catch (err) {
      setError('Failed to create deal. Please try again.');
      console.error('Error in createDeal:', err);
    }
  };

  return (
    <div className="create-deal-page">
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
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">Value ($):</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stage">Stage:</label>
          <select
            id="stage"
            value={stage}
            onChange={(e) => setStage(e.target.value as DealStage)}
            required
          >
            {availableStages.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Create Deal</button>
      </form>
    </div>
  );
};

export default CreateDeal;
