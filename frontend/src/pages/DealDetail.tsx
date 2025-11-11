import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import { Deal } from '../types';

const DealDetailPage: React.FC = () => {
  const { dealId } = useParams<{ dealId: string }>();
  const { deals, loading, error, deleteDeal, currentUser } = useDeals();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirect if not logged in
      return;
    }

    // Find deal from context if available, otherwise fetch if needed
    const foundDeal = deals.find(d => d.id === dealId);
    if (foundDeal) {
      setDeal(foundDeal);
    } else {
      // If deal is not in context, it might need to be fetched.
      // In a more complex app, you might have a dedicated fetchDealById in context.
      // For now, we'll assume it should be in the `deals` list if it exists.
      // If not found here, it likely doesn't exist or there's a loading/fetch issue.
      console.warn(`Deal with ID ${dealId} not found in context. Attempting to fetch.`);
      // A more robust solution would involve a dedicated `fetchDealById` in DealContext
      // For this example, we'll rely on the main `deals` list.
      // If `deals` is empty or doesn't contain it, we show an error.
    }
  }, [dealId, deals, currentUser, navigate]);

  const handleDelete = async () => {
    if (!deal) return;
    if (!window.confirm('Are you sure you want to delete this deal?')) {
      return;
    }
    setIsDeleting(true);
    const success = await deleteDeal(deal.id);
    setIsDeleting(false);
    if (success) {
      navigate('/deals'); // Redirect to deals list after deletion
    } else {
      console.error('Failed to delete deal');
      // Optionally show an error message to the user
    }
  };

  if (!currentUser) {
    return <div>Please log in to view this page.</div>;
  }

  if (loading && !deal) {
    return <div>Loading deal details...</div>;
  }

  if (error) {
    return <div>Error loading deal: {error}</div>;
  }

  if (!deal) {
    return <div>Deal not found.</div>;
  }

  return (
    <div>
      <h1>{deal.name}</h1>
      <p><strong>ID:</strong> {deal.id}</p>
      <p><strong>Stage:</strong> {deal.stage}</p>
      <p><strong>Value:</strong> ${deal.value.toLocaleString()}</p>
      {deal.description && <p><strong>Description:</strong> {deal.description}</p>}
      <p><strong>Created At:</strong> {deal.createdAt.toLocaleDateString()}</p>
      <p><strong>Last Updated:</strong> {deal.updatedAt.toLocaleDateString()}</p>

      <Link to={`/deals/edit/${deal.id}`}>
        <button disabled={isDeleting}>Edit Deal</button>
      </Link>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete Deal'}
      </button>
      <button onClick={() => navigate('/deals')}>Back to Deals</button>
    </div>
  );
};

export default DealDetailPage;
