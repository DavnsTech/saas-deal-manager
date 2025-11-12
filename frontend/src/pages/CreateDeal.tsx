import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import './CreateDeal.css';

// Define the accepted stages
const salesStages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

const CreateDeal: React.FC = () => {
  const navigate = useNavigate();
  const { addDeal } = useDeals();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    value: 0,
    stage: salesStages[0], // Default to the first stage
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true);

    // Basic validation
    if (!formData.name || formData.value <= 0 || !formData.stage) {
      setError('Please fill in all required fields with valid data.');
      setIsLoading(false);
      return;
    }

    try {
      await addDeal(formData);
      navigate('/deals'); // Redirect to deals page after successful creation
    } catch (err: any) {
      setError(err.message || 'Failed to create deal. Please try again.');
    } finally {
      setIsLoading(false);
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
            aria-required="true"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
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
            aria-required="true"
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
            aria-required="true"
          >
            {salesStages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Deal'}
        </button>
      </form>
    </div>
  );
};

export default CreateDeal;
