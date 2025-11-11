import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router-dom
import { useDealContext } from '../contexts/DealContext';
import { CreateDealPayload } from '../types';
import './CreateDeal.css';

const CreateDeal: React.FC = () => {
  const navigate = useNavigate();
  const { createDeal, error: contextError } = useDealContext();
  const [dealName, setDealName] = useState('');
  const [dealDescription, setDealDescription] = useState('');
  const [dealStage, setDealStage] = useState('Prospecting'); // Default stage
  const [dealValue, setDealValue] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dealName || !dealStage) {
      setError('Deal name and stage are required.');
      return;
    }

    const newDealData: CreateDealPayload = {
      name: dealName,
      description: dealDescription,
      stage: dealStage,
      value: dealValue !== undefined && !isNaN(dealValue) ? dealValue : undefined,
    };

    try {
      const createdDeal = await createDeal(newDealData);
      if (createdDeal) {
        // Navigate to the deals list or the newly created deal's detail page
        navigate('/deals'); // Or navigate(`/deals/${createdDeal.id}`)
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while creating the deal.');
      console.error('Error creating deal:', err);
    }
  };

  // Combine context error with form-specific error
  const displayError = contextError || error;

  return (
    <div className="create-deal-page">
      <h2>Create New Deal</h2>
      {displayError && <p className="error-message">{displayError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dealName">Deal Name *</label>
          <input
            type="text"
            id="dealName"
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dealDescription">Description</label>
          <textarea
            id="dealDescription"
            value={dealDescription}
            onChange={(e) => setDealDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="dealStage">Stage *</label>
          <select
            id="dealStage"
            value={dealStage}
            onChange={(e) => setDealStage(e.target.value)}
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
          <label htmlFor="dealValue">Value</label>
          <input
            type="number"
            id="dealValue"
            value={dealValue === undefined ? '' : dealValue}
            onChange={(e) => setDealValue(e.target.value === '' ? undefined : parseFloat(e.target.value))}
            min="0"
          />
        </div>
        <button type="submit" className="btn-primary">Create Deal</button>
      </form>
    </div>
  );
};

export default CreateDeal;
