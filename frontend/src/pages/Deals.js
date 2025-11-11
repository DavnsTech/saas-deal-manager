import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { dealsApi } from '../api/dealsApi'; // Import the module

const DealsContainer = styled.div`
  padding: 20px;
  background-color: #f4f7fc;
  min-height: calc(100vh - 70px);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    font-size: 22px;
    color: #333;
    font-weight: 600;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
`;

const SearchBar = styled.div`
  display: flex;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 15px;
  flex: 1; /* Take available space */
  min-width: 250px; /* Minimum width */
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 5px 10px;
  font-size: 16px;
  outline: none;
  background: transparent;
`;

const FilterButton = styled.button`
  background: #f0f4f8;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #4361ee;
  transition: background 0.2s ease;
  
  &:hover {
    background: #e0e7ee;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const CreateDealButton = styled(Link)`
  background: #4361ee;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  transition: background 0.2s ease;
  
  &:hover {
    background: #3a56d4;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const DealsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const DealCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const DealCardTitle = styled(Link)`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  margin-bottom: 10px;
  display: block;
  &:hover {
    color: #4361ee;
    text-decoration: underline;
  }
`;

const DealCardInfo = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  
  strong {
    color: #333;
  }
`;

const StageBadge = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.stage) {
      case 'Prospection': return '#e0e0e0';
      case 'Qualification': return '#fff9c4';
      case 'Prise de contact': return '#ffecb3';
      case 'Découverte': return '#ffe0b2';
      case 'Proposition de valeur': return '#ffcc80';
      case 'Négociation': return '#ffb74d';
      case 'Closing': return '#f57c00';
      case 'Livraison/Onboarding': return '#81c784';
      case 'Fidélisation/Upsell/Cross-sell': return '#388e3c';
      default: return '#bdbdbd';
    }
  }};
  color: ${props => {
    switch(props.stage) {
      case 'Prospection': return '#616161';
      default: return '#333';
    }
  }};
`;


function Deals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  // Add state for filters if needed

  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        // Use the correct API function to fetch all deals
        const data = await dealsApi.getAllDeals();
        setDeals(data);
        setError(null);
      } catch (err) {
        setError(`Failed to load deals: ${err.message}`);
        console.error('Deals page fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // In a real app, you'd trigger a filtered search here or client-side filtering
  };

  // Filter deals based on search term (simple client-side filtering)
  const filteredDeals = deals.filter(deal =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <DealsContainer>Loading deals...</DealsContainer>;
  }

  if (error) {
    return <DealsContainer className="error">{error}</DealsContainer>;
  }

  return (
    <DealsContainer>
      <SectionHeader>
        <h2>All Deals</h2>
      </SectionHeader>
      <ControlsContainer>
        <SearchBar>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder="Search deals..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchBar>
        <FilterButton><FaFilter /> Filter</FilterButton>
        {/* Link to the new deal creation page */}
        <CreateDealButton to="/deals/new"><FaPlus /> Create New Deal</CreateDealButton>
      </ControlsContainer>

      <DealsGrid>
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => (
            <DealCard key={deal._id || deal.id}> {/* Use a unique key */}
              <DealCardTitle to={`/deals/${deal._id || deal.id}`}>{deal.name || 'Untitled Deal'}</DealCardTitle>
              <DealCardInfo><strong>Amount:</strong> {deal.amount !== undefined && deal.amount !== null ? deal.amount.toLocaleString('en-US', { style: 'currency', currency: deal.currency || 'USD' }) : 'N/A'}</DealCardInfo>
              <DealCardInfo><strong>Customer ID:</strong> {deal.customerId || 'N/A'}</DealCardInfo>
              <DealCardInfo><strong>Stage:</strong> <StageBadge stage={deal.stage}>{deal.stage || 'Unknown Stage'}</StageBadge></DealCardInfo>
            </DealCard>
          ))
        ) : (
          <p>No deals found matching your criteria.</p>
        )}
      </DealsGrid>
    </DealsContainer>
  );
}

export default Deals;
