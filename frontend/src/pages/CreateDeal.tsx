import React, { useState } from 'react';
import { useDealContext } from '../contexts/DealContext';
import './CreateDeal.css'; // Assuming CSS is imported
import { useNavigate } from 'react-router-dom'; // Assuming navigation is used

// Define a type for form state, ensuring all required fields are present
interface CreateDealForm {
  name: string;
  client: string;
  value: number;
  stage: string;
  // Add other relevant fields from your Deal type
}

const CreateDeal: React.FC = () => {
  const { addDeal, error: contextError, loading: contextLoading } = useDealContext();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<CreateDealForm>({
    name: '',
    client: '',
    value: 0,
    stage: 'Prospecting', // Default stage
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
    // Clear specific form error when user types
    if (formError) {
      setFormError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!formState.name || !formState.client || formState.value <= 0 || !formState.stage) {
      setFormError('Please fill in all required fields correctly.');
      return;
    }

    try {
      // Prepare data for API call (ensure it matches backend expectations)
      const dealData: Omit<Deal, 'id'> = { // Assuming Deal type has an 'id' field
        name: formState.name,
        client: formState.client,
        value: formState.value,
        stage: formState.stage,
        // Map other form fields to dealData as needed
      };

      const newDeal = await addDeal(dealData);

      if (newDeal) {
        // Success: Navigate or show a success message
        navigate('/deals'); // Redirect to deals list
      } else {
        // addDeal might return null on error, though contextError should also be set
        setFormError('Failed to create deal. Please try again.');
      }
    } catch (err) {
      // Error is likely already set in contextError, but we can catch here for specific UI feedback
      setFormError('An error occurred while creating the deal.');
      console.error("Error during create deal submission:", err);
    }
  };

  // Combine context errors with form-specific errors for display
  const displayError = formError || contextError;

  return (
    <div className="create-deal-container">
      <h1>Create New Deal</h1>
      {displayError && <p className="error-message">{displayError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Deal Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="client">Client Name:</label>
          <input
            type="text"
            id="client"
            name="client"
            value={formState.client}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">Value ($):</label>
          <input
            type="number"
            id="value"
            name="value"
            value={formState.value}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stage">Sales Stage:</label>
          <select
            id="stage"
            name="stage"
            value={formState.stage}
            onChange={handleInputChange}
            required
          >
            <option value="Prospecting">Prospecting</option>
            <option value="Qualification">Qualification</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Closed Lost">Closed Lost</option>
            {/* Add other stages as defined in your backend/types */}
          </select>
        </div>
        {/* Add more fields as necessary */}

        <button type="submit" disabled={contextLoading}>
          {contextLoading ? 'Creating...' : 'Create Deal'}
        </button>
      </form>
    </div>
  );
};

export default CreateDeal;
