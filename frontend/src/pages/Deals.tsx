import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Deals.css'; // Assuming CSS is imported
import { Deal } from '../types'; // Assuming a shared types file
import { getDeals, deleteDeal as apiDeleteDeal } from '../api/dealsApi'; // Assuming API functions
import { DealContext } from '../contexts/DealContext'; // Assuming context for state management

// Define component props if any
interface DealsPageProps {
    // e.g., userId?: string;
}

export const DealsPage: React.FC<DealsPageProps> = () => {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Using context to potentially update deals list after an action elsewhere
    const { refreshDeals } = useContext(DealContext);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getDeals();
                setDeals(data);
            } catch (err: any) {
                console.error("Failed to fetch deals:", err);
                setError('Could not load deals. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, [refreshDeals]); // Re-fetch if refreshDeals context value changes

    const handleDeleteDeal = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this deal?')) {
            try {
                await apiDeleteDeal(id);
                // Optimistically update UI or re-fetch
                setDeals(deals.filter(deal => deal.id !== id));
                // Optionally use context to signal other components
                // if (refreshDeals) refreshDeals();
            } catch (err: any) {
                console.error(`Failed to delete deal ${id}:`, err);
                setError('Failed to delete deal. Please try again.');
            }
        }
    };

    if (loading) {
        return <div className="deals-container">Loading deals...</div>;
    }

    if (error) {
        return <div className="deals-container error">{error}</div>;
    }

    return (
        <div className="deals-container">
            <h1>All Deals</h1>
            <Link to="/deals/new" className="btn-create-deal">Create New Deal</Link>

            {deals.length === 0 ? (
                <p>No deals found. Start by creating one!</p>
            ) : (
                <table className="deals-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Stage</th>
                            <th>Value</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deals.map((deal) => (
                            <tr key={deal.id}>
                                <td>
                                    <Link to={`/deals/${deal.id}`}>{deal.name}</Link>
                                </td>
                                <td>{deal.stage}</td>
                                <td>${deal.value.toLocaleString()}</td>
                                <td>
                                    <Link to={`/deals/edit/${deal.id}`} className="btn-edit">Edit</Link>
                                    <button onClick={() => handleDeleteDeal(deal.id)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// Exporting as default for typical React app structure if this is the main component
// export default DealsPage;
