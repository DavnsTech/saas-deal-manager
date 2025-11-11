import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import { Deal } from '../types';

interface CreateDealProps {
  isEditMode: boolean;
}

const CreateDealPage: React.FC<CreateDealProps> = ({ isEditMode }) => {
  const { dealId } = useParams<{ dealId: string }>();
  const { deals, addDeal, updateDeal, currentUser } = useDeals();
  const navigate = useNavigate();

  const [dealName, setDealName] = useState<string>('');
  const [stage, setStage] = useState<string>('Prospecting');
  const [value, setValue] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const stages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  useEffect(() => {
    if (isEditMode && dealId) {
      const existingDeal = deals.find(d => d.id === dealId);
      if (existingDeal) {
        setDealName(existingDeal.name);
        setStage(existingDeal.stage);
        setValue(existingDeal.value);
        setDescription(existingDeal.description || '');
      } else if (currentUser) {
        // If deal not found in context, but user is logged in, it might be a fetch issue or invalid ID
        console.warn(`Deal with ID ${dealId} not found for editing.`);
        // Optionally, you could try to fetch the deal here if your context supported it.
      }
    }
     if (!currentUser) {
      navigate('/login'); // Redirect if not logged in
    }
  }, [dealId, deals, isEditMode, navigate, currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert('You must be logged in to create or edit deals.');
      return;
    }

    const dealData = {
      name: dealName,
      stage: stage,
      value: Number(value),
      description: description,
      // ownerId is automatically handled by the backend based on JWT
    };

    setLoading(true);
    try {
      if (isEditMode && dealId) {
        const updatedDeal = await updateDeal(dealId, dealData);
        if (updatedDeal) {
          alert('Deal updated successfully!');
          navigate(`/deals/${dealId}`);
        } else {
          alert('Failed to update deal. Please check the ID and your permissions.');
        }
      } else {
        const newDeal = await addDeal(dealData as any); // Cast because ownerId is inferred
        if (newDeal) {
          alert('Deal created successfully!');
          navigate('/deals');
        } else {
          alert('Failed to create deal.');
        }
      }
    } catch (err) {
      console.error('Form submission error:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div>
      <h1>{isEditMode ? 'Edit Deal' : 'Create New Deal'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dealName">Deal Name:</label>
          <input
            type="text"
            id="dealName"
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="stage">Stage:</label>
          <select
            id="stage"
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            required
          >
            {stages.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="value">Value:</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            required
            min="0"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : (isEditMode ? 'Update Deal' : 'Create Deal')}
        </button>
        <button type="button" onClick={() => navigate(isEditMode ? `/deals/${dealId}` : '/deals')} disabled={loading}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateDealPage;
