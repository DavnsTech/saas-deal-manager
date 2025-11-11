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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const DealCardTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
`;

const DealCardInfo = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const DealCardStage = styled.span`
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: auto; /* Pushes the badge to the bottom */
  align-self: flex-start; /* Aligns the badge to the left */
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
      case 'Qualification': return '#664000';
      case 'Prise de contact': return '#663c00';
      case 'Découverte': return '#663300';
      case 'Proposition de valeur': return '#662e00';
      case 'Négociation': return '#654900';
      case 'Closing': return '#212121';
      case 'Livraison/Onboarding': return '#1b5e20';
      case 'Fidélisation/Upsell/Cross-sell': return '#0d47a1';
      default: return '#424242';
    }
  }};
`;

const Deals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({}); // e.g., { stage: 'Closing', priority: 'High' }

  // Dummy data for demonstration
  const dummyDeals = [
    { id: 1, name: 'Project Alpha', company: 'TechCorp', stage: 'Proposition de valeur', amount: '$50,000', priority: 'High', salesRep: 'Jane Doe' },
    { id: 2, name: 'Software License Renewal', company: 'DataSolutions', stage: 'Négociation', amount: '$15,000', priority: 'Medium', salesRep: 'John Smith' },
    { id: 3, name: 'Cloud Migration Service', company: 'Cloudify Inc.', stage: 'Découverte', amount: '$80,000', priority: 'High', salesRep: 'Jane Doe' },
    { id: 4, name: 'Consulting Package', company: 'BizConsult', stage: 'Qualification', amount: '$25,000', priority: 'Low', salesRep: 'Peter Jones' },
    { id: 5, name: 'Enterprise Solution', company: 'Global Enterprises', stage: 'Closing', amount: '$120,000', priority: 'Urgent', salesRep: 'Jane Doe' },
    { id: 6, name: 'New Product Launch Support', company: 'Innovate Ltd.', stage: 'Prospection', amount: '$30,000', priority: 'Medium', salesRep: 'Sarah Lee' },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterClick = () => {
    // In a real app, this would open a modal or dropdown for filtering
    alert('Filter functionality is not yet implemented.');
    // Example of how you might set filters programmatically:
    // setFilters({ stage: 'Négociation', priority: 'High' });
  };

  // Filter deals based on search term and filters
  const filteredDeals = dummyDeals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          deal.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply other filters if they exist
    // This is a basic example; actual filtering logic would be more complex
    const matchesFilters = Object.keys(filters).every(key => {
      if (filters[key]) {
        return deal[key] === filters[key];
      }
      return true;
    });

    return matchesSearch && matchesFilters;
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
          <SearchInput
            type="text"
            placeholder="Rechercher par nom de deal ou entreprise..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch color="#aaa" />
        </SearchBar>
        <FilterButton onClick={handleFilterClick}>
          <FaFilter /> Filtrer
        </FilterButton>
      </ControlsContainer>
      
      <DealsGrid>
        {filteredDeals.length > 0 ? (
          filteredDeals.map(deal => (
            <DealCard key={deal.id}>
              <DealCardTitle>{deal.name}</DealCardTitle>
              <DealCardInfo><strong>Entreprise:</strong> {deal.company}</DealCardInfo>
              <DealCardInfo><strong>Responsable:</strong> {deal.salesRep}</DealCardInfo>
              <DealCardInfo><strong>Montant:</strong> {deal.amount}</DealCardInfo>
              <DealCardStage stage={deal.stage}>{deal.stage}</DealCardStage>
              <Link to={`/deals/${deal.id}`} style={{ marginTop: '10px', color: '#4361ee', textDecoration: 'none', fontWeight: '500' }}>
                Voir les détails &rarr;
              </Link>
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
