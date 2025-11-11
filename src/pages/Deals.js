import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';

const DealsContainer = styled.div`
  padding: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    font-size: 22px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  font-size: 16px;
  outline: none;
`;

const FilterButton = styled.button`
  background: #f0f4f8;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    background: #e0e7ee;
  }
  
  svg {
    margin-right: 5px;
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
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
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
  
  a {
    text-decoration: none;
    color: #333;
    
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
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
  }
  
  span:first-child {
    font-weight: 500;
    color: #666;
  }
`;

const StageBadge = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch(props.stage) {
      case 'Prospection': return '#e0e0e0';
      case 'Qualification': return '#ffecb3';
      case 'Prise de contact': return '#ffe082';
      case 'Découverte': return '#ffcc80';
      case 'Proposition de valeur': return '#ffb74d';
      case 'Négociation': return '#ff9800';
      case 'Closing': return '#f57c00';
      case 'Livraison/Onboarding': return '#4caf50';
      case 'Fidélisation/Upsell/Cross-sell': return '#2e7d32';
      default: return '#e0e0e0';
    }
  }};
  color: ${props => {
    switch(props.stage) {
      case 'Prospection': return '#666';
      case 'Qualification': return '#ff8f00';
      case 'Prise de contact': return '#ff6f00';
      case 'Découverte': return '#ef6c00';
      case 'Proposition de valeur': return '#e65100';
      case 'Négociation': return '#fff';
      case 'Closing': return '#fff';
      case 'Livraison/Onboarding': return '#fff';
      case 'Fidélisation/Upsell/Cross-sell': return '#fff';
      default: return '#666';
    }
  }};
`;

const Deals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data
  const deals = [
    { 
      id: 1, 
      name: "Contrat avec ABC Corp", 
      amount: "€25,000", 
      stage: "Négociation", 
      company: "ABC Corp",
      contact: "Jean Dupont",
      probability: "80%",
      closeDate: "15/04/2023"
    },
    { 
      id: 2, 
      name: "Partenariat XYZ", 
      amount: "€15,000", 
      stage: "Proposition de valeur", 
      company: "XYZ Ltd",
      contact: "Marie Martin",
      probability: "60%",
      closeDate: "30/04/2023"
    },
    { 
      id: 3, 
      name: "Contrat Logiciel", 
      amount: "€8,500", 
      stage: "Closing", 
      company: "Tech Solutions",
      contact: "Pierre Dubois",
      probability: "90%",
      closeDate: "10/03/2023"
    },
    { 
      id: 4, 
      name: "Service Maintenance", 
      amount: "€42,000", 
      stage: "Livraison/Onboarding", 
      company: "Global Services",
      contact: "Sophie Lambert",
      probability: "95%",
      closeDate: "05/02/2023"
    },
    { 
      id: 5, 
      name: "Formation Entreprise", 
      amount: "€12,000", 
      stage: "Découverte", 
      company: "Formation Pro",
      contact: "Thomas Bernard",
      probability: "40%",
      closeDate: "20/05/2023"
    },
    { 
      id: 6, 
      name: "Consulting Stratégique", 
      amount: "€30,000", 
      stage: "Prospection", 
      company: "Strat & Co",
      contact: "Claire Moreau",
      probability: "25%",
      closeDate: "30/06/2023"
    },
  ];

  const filteredDeals = deals.filter(deal => 
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DealsContainer>
      <SectionHeader>
        <h2>Tous les Deals</h2>
        <Link to="/deals/create" className="btn btn-primary">
          <FaPlus /> Nouveau Deal
        </Link>
      </SectionHeader>
      
      <SearchBar>
        <SearchInput 
          type="text" 
          placeholder="Rechercher un deal..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterButton>
          <FaFilter /> Filtres
        </FilterButton>
      </SearchBar>
      
      <DealsGrid>
        {filteredDeals.map(deal => (
          <DealCard key={deal.id}>
            <DealHeader>
              <DealTitle>
                <Link to={`/deals/${deal.id}`}>{deal.name}</Link>
              </DealTitle>
              <DealAmount>{deal.amount}</DealAmount>
            </DealHeader>
            
            <DealInfo>
              <p>
                <span>Entreprise:</span>
                <span>{deal.company}</span>
              </p>
              <p>
                <span>Contact:</span>
                <span>{deal.contact}</span>
              </p>
              <p>
                <span>Probabilité:</span>
                <span>{deal.probability}</span>
              </p>
              <p>
                <span>Date de clôture:</span>
                <span>{deal.closeDate}</span>
              </p>
            </DealInfo>
            
            <StageBadge stage={deal.stage}>
              {deal.stage}
            </StageBadge>
          </DealCard>
        ))}
      </DealsGrid>
    </DealsContainer>
  );
};

export default Deals;
