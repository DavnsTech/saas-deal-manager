import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming react-router-dom is used
import { useDeal } from '../contexts/DealContext';
import { Deal } from '../types'; // Assuming Deal type is defined

// Define the shape of the form state
interface CreateDealForm {
    name: string;
    description: string;
    amount: string; // Use string for input, convert to number for API
    stage: string;
}

const CreateDeal: React.FC = () => {
    const navigate = useNavigate();
    const { addDeal, error: dealError, loading: dealLoading } = useDeal();
    const [formState, setFormState] = useState<CreateDealForm>({
        name: '',
        description: '',
        amount: '',
        stage: 'Prospecting', // Default stage
    });
    const [submitError, setSubmitError] = useState<string | null>(null);

    const stages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']; // Example stages

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
        // Clear submit error when user starts typing again
        if (submitError) {
            setSubmitError(null);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitError(null); // Clear previous errors

        // Basic client-side validation
        if (!formState.name || !formState.amount || !formState.stage) {
            setSubmitError('Please fill in all required fields (Name, Amount, Stage).');
            return;
        }

        const amountNumber = parseFloat(formState.amount);
        if (isNaN(amountNumber) || amountNumber < 0) {
            setSubmitError('Amount must be a valid non-negative number.');
            return;
        }

        const newDealData: Omit<Deal, 'id'> = {
            name: formState.name,
            description: formState.description,
            amount: amountNumber,
            stage: formState.stage,
            // userId is handled by context/backend, not needed here unless explicitly passed
        };

        try {
            const createdDeal = await addDeal(newDealData);
            if (createdDeal) {
                // Redirect to the deals list or the newly created deal detail page
                navigate('/deals'); // Or navigate(`/deals/${createdDeal.id}`);
            } else {
                // addDeal might return null on auth failure or other issues
                setSubmitError('Could not create deal. Please check your connection or permissions.');
            }
        } catch (err: any) {
            // Error handled by context, but we can also set a local error for immediate feedback
            setSubmitError(err.message || 'An error occurred while creating the deal.');
        }
    };

    return (
        <div className="create-deal-page">
            <h2>Create New Deal</h2>
            {(dealError || submitError) && (
                <div className="alert alert-danger">
                    {dealError || submitError}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Deal Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        disabled={dealLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        disabled={dealLoading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount *</label>
                    <input
                        type="text" // Using text to allow for validation before parsing
                        id="amount"
                        name="amount"
                        value={formState.amount}
                        onChange={handleChange}
                        required
                        disabled={dealLoading}
                        placeholder="e.g., 1000.50"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stage">Stage *</label>
                    <select
                        id="stage"
                        name="stage"
                        value={formState.stage}
                        onChange={handleChange}
                        required
                        disabled={dealLoading}
                    >
                        {stages.map(stage => (
                            <option key={stage} value={stage}>{stage}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={dealLoading}>
                    {dealLoading ? 'Creating...' : 'Create Deal'}
                </button>
            </form>
        </div>
    );
};

export default CreateDeal;
