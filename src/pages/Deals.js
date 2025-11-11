import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';

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
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const DealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const DealTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
  color: #333;
  
  a {
    text-decoration: none;
    color: inherit; /* Inherit color from parent */
    
    &:hover {
      color: #4361ee;
    }
  }
`;

const DealAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #4361ee;
`;

const DealInfo = styled.div`
  margin-bottom: 15px;
  
  p {
    margin: 8px 0;
    display: flex;
    justify-content: space-between;
    color: #555;
    font-size: 14px;
  }
  
  span:first-child {
    font-weight: 500;
    color: #666;
    min-width: 140px; /* Align labels */
  }
`;

const StageBadge = styled.span`
  padding: 5px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => {
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
      case 'Qualification': return '#f57f17';
      case 'Prise de contact': return '#f57f17';
      case 'Découverte': return '#e65100';
      case 'Proposition de valeur': return '#e65100';
      case 'Négociation': return '#fff';
      case 'Closing': return '#fff';
      case 'Livraison/Onboarding': return '#fff';
      case 'Fidélisation/Upsell/Cross-sell': return '#fff';
      default: return '#424242';
    }
  }};
`;

// Mock data for deals
const mockDeals = [
  { id: 'deal-001', name: 'Projet Alpha', amount: 50000, currency: 'USD', stage: 'Négociation', closeDate: '2024-08-15', client: 'Tech Solutions Inc.' },
  { id: 'deal-002', name: 'Solution Beta', amount: 75000, currency: 'USD', stage: 'Proposition de valeur', closeDate: '2024-09-01', client: 'Global Corp' },
  { id: 'deal-003', name: 'Partenariat Gamma', amount: 120000, currency: 'EUR', stage: 'Closing', closeDate: '2024-07-30', client: 'Innovate Ltd.' },
  { id: 'deal-004', name: 'Service Delta', amount: 30000, currency: 'USD', stage: 'Qualification', closeDate: '2024-10-10', client: 'Startup Hub' },
  { id: 'deal-005', name: 'Consulting Epsilon', amount: 90000, currency: 'GBP', stage: 'Découverte', closeDate: '2024-09-20', client: 'Enterprise Solutions' },
  { id: 'deal-006', name: 'Plateforme Zeta', amount: 200000, currency: 'USD', stage: 'Prospection', closeDate: '2024-11-01', client: 'MegaCorp' },
  { id: 'deal-007', name: 'Support Omega', amount: 40000, currency: 'CAD', stage: 'Livraison/Onboarding', closeDate: '2024-07-15', client: 'Local Business' },
];

const Deals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({}); // e.g., { stage: 'Négociation' }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = () => {
    // In a real app, this would open a modal or dropdown for filtering options
    alert('Filter functionality not implemented yet.');
  };

  // Filter deals based on search term and applied filters
  const filteredDeals = mockDeals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          deal.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Add logic for other filters here if needed
    // Example: if (filters.stage && deal.stage !== filters.stage) return false;

    return matchesSearch;
  });

  return (
    <DealsContainer>
      <SectionHeader>
        <h2>Tous les Deals</h2>
        <CreateDealButton to="/deals/create">
          <FaPlus /> Nouveau Deal
        </CreateDealButton>
      </SectionHeader>
      
      <ControlsContainer>
        <SearchBar>
          <FaSearch />
          <SearchInput 
            type="text" 
            placeholder="Rechercher par nom ou client..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
        </SearchBar>
        <FilterButton onClick={handleFilterClick}>
          <FaFilter /> Filtrer
        </FilterButton>
      </ControlsContainer>

      <DealsGrid>
        {filteredDeals.length > 0 ? (
          filteredDeals.map(deal => (
            <DealCard key={deal.id}>
              <DealHeader>
                <DealTitle>
                  <Link to={`/deals/${deal.id}`}>{deal.name}</Link>
                </DealTitle>
                <DealAmount>
                  {deal.amount.toLocaleString('en-US', { style: 'currency', currency: deal.currency })}
                </DealAmount>
              </DealHeader>
              <DealInfo>
                <p>
                  <span>Client</span>
                  <span>{deal.client}</span>
                </p>
                <p>
                  <span>Étape</span>
                  <span><StageBadge stage={deal.stage}>{deal.stage}</StageBadge></span>
                </p>
                <p>
                  <span>Clôture prévue</span>
                  <span>{deal.closeDate}</span>
                </p>
              </DealInfo>
            </DealCard>
          ))
        ) : (
          <p>Aucun deal trouvé.</p>
        )}
      </DealsGrid>
    </DealsContainer>
  );
};

export default Deals;
