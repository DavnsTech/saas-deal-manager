import React, { useState, useEffect } from 'react';
import { fetchDeals, deleteDeal } from '../api/dealsApi';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

function DealsPage() {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Use AbortController to cancel the request if the component unmounts
        const abortController = new AbortController();
        const signal = abortController.signal;

        const loadDeals = async () => {
            try {
                setLoading(true);
                setError(null); // Clear previous errors
                const response = await fetchDeals(signal);
                // Ensure the response data is handled correctly, e.g., dates
                const processedDeals = response.data.map(deal => ({
                    ...deal,
                    createdAt: new Date(deal.createdAt),
                    updatedAt: new Date(deal.updatedAt),
                }));
                setDeals(processedDeals);
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                    return; // Don't set error state if aborted
                }
                console.error('Error fetching deals:', err);
                setError(err.message || 'Failed to load deals.');
            } finally {
                setLoading(false);
            }
        };

        loadDeals();

        // Cleanup function to abort the fetch request when the component unmounts
        return () => {
            console.log('Aborting deal fetch on unmount');
            abortController.abort();
        };
    }, []); // Empty dependency array means this effect runs once on mount

    const handleDelete = async (dealId) => {
        if (window.confirm('Are you sure you want to delete this deal?')) {
            try {
                await deleteDeal(dealId);
                // Optimistically update the UI
                setDeals(deals.filter(deal => deal.id !== dealId));
                // Optionally show a success notification
            } catch (err) {
                console.error('Error deleting deal:', err);
                setError(err.message || 'Failed to delete deal.');
                // Revert UI change or show error message
            }
        }
    };

    if (loading) {
        return <div className="deals-page">Loading deals...</div>;
    }

    if (error) {
        return <div className="deals-page error">Error: {error}</div>;
    }

    return (
        <div className="deals-page">
            <h1>Deals</h1>
            <Link to="/deals/new">Create New Deal</Link> {/* Example link */}
            {deals.length === 0 ? (
                <p>No deals found.</p>
            ) : (
                <table className="deals-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Stage</th>
                            <th>Value</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deals.map(deal => (
                            <tr key={deal.id}>
                                <td>
                                    <Link to={`/deals/${deal.id}`}>{deal.name}</Link>
                                </td>
                                <td>{deal.stage}</td>
                                <td>${deal.value.toLocaleString()}</td>
                                <td>{deal.createdAt.toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleDelete(deal.id)} disabled={loading}>Delete</button>
                                    <Link to={`/deals/edit/${deal.id}`}>Edit</Link> {/* Example link */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default DealsPage;
