import React, { useState, useEffect } from 'react';
import { dealsApi } from '../api/dealsApi';
// import { Link } from 'react-router-dom'; // Assuming routing is set up

function DealsPage() {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                setLoading(true);
                const data = await dealsApi.getAllDeals();
                setDeals(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch deals:", err);
                setError(err.message || 'Could not load deals.');
                setDeals([]); // Clear deals on error
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []); // Empty dependency array means this runs once on mount

    const handleDeleteDeal = async (dealId) => {
        if (window.confirm('Are you sure you want to delete this deal?')) {
            try {
                await dealsApi.deleteDeal(dealId);
                // Optimistically update UI or re-fetch
                setDeals(deals.filter(deal => deal.id !== dealId));
                alert('Deal deleted successfully!');
            } catch (err) {
                console.error("Failed to delete deal:", err);
                setError(err.message || 'Could not delete deal.');
            }
        }
    };

    if (loading) {
        return <div>Loading deals...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Deals</h2>
            <button /* onClick={() => history.push('/deals/new')} */>
                Add New Deal
            </button> {/* Assuming routing */}

            {deals.length === 0 ? (
                <p>No deals found.</p>
            ) : (
                <ul>
                    {deals.map(deal => (
                        <li key={deal.id}>
                            {/* <Link to={`/deals/${deal.id}`}> */}
                                <strong>{deal.name}</strong> - Stage: {deal.stage} - Value: ${deal.value}
                            {/* </Link> */}
                            <button onClick={() => handleDeleteDeal(deal.id)} style={{ marginLeft: '10px' }}>
                                Delete
                            </button>
                            {/* <Link to={`/deals/${deal.id}/edit`}>Edit</Link> */} {/* Assuming routing */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DealsPage;
