import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeal } from '../contexts/DealContext';
import { Deal } from '../types';

interface DealDetailForm {
    name: string;
    description: string;
    amount: string; // Use string for input
    stage: string;
}

const DealDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { deals, loading: dealLoading, error: dealError, editDeal, removeDeal } = useDeal();
    const [deal, setDeal] = useState<Deal | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formState, setFormState] = useState<DealDetailForm | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const stages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']; // Example stages

    useEffect(() => {
        // Find the deal from the context first
        const foundDeal = deals.find(d => d.id === parseInt(id!, 10));
        if (foundDeal) {
            setDeal(foundDeal);
            setFormState({
                name: foundDeal.name,
                description: foundDeal.description || '',
                amount: foundDeal.amount.toString(),
                stage: foundDeal.stage,
            });
        } else {
            // If not found in context (e.g., direct navigation or refresh), try fetching
            // This part assumes you have a way to fetch a single deal by ID in the context or API
            // For simplicity here, we'll assume context is authoritative after initial load.
            // If direct fetch is needed, you'd call a dedicated fetchDealById function.
            console.warn(`Deal with ID ${id} not found in context. Consider fetching individually.`);
            // For this example, we'll navigate back if not found.
            navigate('/deals');
        }
    }, [deals, id, navigate]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => {
            if (!prevState) return null; // Should not happen if deal is loaded
            return {
                ...prevState,
                [name]: value,
            };
        });
        if (submitError) {
            setSubmitError(null);
        }
    };

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        if (!deal || !formState) return;

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

        const updatedDealData = {
            name: formState.name,
            description: formState.description,
            amount: amountNumber,
            stage: formState.stage,
        };

        try {
            const updatedDeal = await editDeal(deal.id, updatedDealData);
            if (updatedDeal) {
                setDeal(updatedDeal); // Update local state with confirmed updated deal
                setIsEditing(false); // Exit editing mode
            } else {
                setSubmitError('Failed to update deal. Please try again.');
            }
        } catch (err: any) {
            setSubmitError(err.message || 'An error occurred during update.');
        }
    };

    const handleDelete = async () => {
        if (!deal) return;
        if (window.confirm('Are you sure you want to delete this deal?')) {
            setIsDeleting(true);
            try {
                const success = await removeDeal(deal.id);
                if (success) {
                    navigate('/deals'); // Redirect to deals list after deletion
                } else {
                    setSubmitError('Failed to delete deal. Please try again.');
                }
            } catch (err: any) {
                setSubmitError(err.message || 'An error occurred during deletion.');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    if (dealLoading && !deal) { // If loading and deal not yet found
        return <div>Loading deal details...</div>;
    }

    if (dealError && !deal) { // If there was an error fetching and no deal found
        return <div className="alert alert-danger">Error loading deal: {dealError}</div>;
    }

    if (!deal) { // If deal is null after loading/error handling
        return <div>Deal not found.</div>;
    }

    return (
        <div className="deal-detail-page">
            <h2>Deal Details</h2>

            {isEditing ? (
                <form onSubmit={handleSave}>
                    {submitError && <div className="alert alert-danger">{submitError}</div>}
                    <div className="form-group">
                        <label htmlFor="edit-name">Name *</label>
                        <input
                            type="text"
                            id="edit-name"
                            name="name"
                            value={formState?.name || ''}
                            onChange={handleInputChange}
                            required
                            disabled={dealLoading || isDeleting}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-description">Description</label>
                        <textarea
                            id="edit-description"
                            name="description"
                            value={formState?.description || ''}
                            onChange={handleInputChange}
                            disabled={dealLoading || isDeleting}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-amount">Amount *</label>
                        <input
                            type="text"
                            id="edit-amount"
                            name="amount"
                            value={formState?.amount || ''}
                            onChange={handleInputChange}
                            required
                            disabled={dealLoading || isDeleting}
                            placeholder="e.g., 1000.50"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-stage">Stage *</label>
                        <select
                            id="edit-stage"
                            name="stage"
                            value={formState?.stage || ''}
                            onChange={handleInputChange}
                            required
                            disabled={dealLoading || isDeleting}
                        >
                            {stages.map(stage => (
                                <option key={stage} value={stage}>{stage}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success" disabled={dealLoading || isDeleting}>
                        {dealLoading || isDeleting ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)} disabled={dealLoading || isDeleting}>
                        Cancel
                    </button>
                </form>
            ) : (
                <div className="deal-info">
                    <p><strong>Name:</strong> {deal.name}</p>
                    <p><strong>Description:</strong> {deal.description || 'N/A'}</p>
                    <p><strong>Amount:</strong> {deal.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</p> {/* Formatted currency */}
                    <p><strong>Stage:</strong> {deal.stage}</p>
                    <p><strong>Created At:</strong> {new Date(deal.createdAt).toLocaleDateString()}</p> {/* Assuming createdAt exists */}
                    <p><strong>Updated At:</strong> {new Date(deal.updatedAt).toLocaleDateString()}</p> {/* Assuming updatedAt exists */}

                    <button onClick={() => setIsEditing(true)} className="btn btn-info" disabled={dealLoading || isDeleting}>
                        Edit
                    </button>
                    <button onClick={handleDelete} className="btn btn-danger" disabled={dealLoading || isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                    <button onClick={() => navigate('/deals')} className="btn btn-outline-secondary" disabled={dealLoading || isDeleting}>
                        Back to Deals
                    </button>
                </div>
            )}
        </div>
    );
};

export default DealDetail;
