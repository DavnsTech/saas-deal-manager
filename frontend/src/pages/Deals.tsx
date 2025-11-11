import React, { useState, useEffect, useContext } from 'react';
import { Deal } from '../types'; // Assuming Deal type is defined here
import { getDeals } from '../api/dealsApi'; // Assuming this function exists and is typed
import DealListItem from '../components/DealListItem'; // Assuming a component for each deal
import { DealContext } from '../contexts/DealContext'; // If context is used for state

const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Example: Using context if it provides deal data
  // const { deals: contextDeals, fetchDeals } = useContext(DealContext);

  useEffect(() => {
    const fetchDealData = async () => {
      try {
        setLoading(true);
        const fetchedDeals = await getDeals(); // Call API
        setDeals(fetchedDeals);
        // If using context, maybe: await fetchDeals();
      } catch (err) {
        console.error("Failed to fetch deals:", err);
        setError("Could not load deals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDealData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading deals...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h1>All Deals</h1>
      {deals.length > 0 ? (
        <ul>
          {deals.map((deal) => (
            <DealListItem key={deal.id} deal={deal} /> // Pass individual deal as prop
          ))}
        </ul>
      ) : (
        <p>No deals found. Start creating some!</p>
      )}
    </div>
  );
};

export default DealsPage;
