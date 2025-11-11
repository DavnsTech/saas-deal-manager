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
  flex: 1;
  min-width: 250px;
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
  margin: 0 0 10px 0;
  color: #333;
  flex: 1;
`;

const DealAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #4361ee;
  margin-bottom: 15px;
`;

const DealInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  
  div {
    font-size: 14px;
    color: #666;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
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
      case 'Qualification': return '#947600';
      case 'Prise de contact': return '#947600';
      case 'Découverte': return '#947600';
      case 'Proposition de valeur': return '#947600';
      case 'Négociation': return '#947600';
      case 'Closing': return '#947600';
      case 'Livraison/Onboarding': return '#1b5e20';
      case 'Fidélisation/Upsell/Cross-sell': return '#1b5e20';
      default: return '#424242';
    }
  }};
`;

const Deals = () => {
  // Mock data for demonstration
  const [deals] = useState([
    { 
      id: 1, 
      name: 'Contrat ABC Corp', 
      amount: 50000, 
      stage: 'Négociation', 
      company: 'ABC Corporation',
      lastContact: '2023-07-15',
      priority: 'Haute'
    },
    { 
      id: 2, 
      name: 'Solution XYZ', 
      amount: 25000, 
      stage: 'Proposition de valeur', 
      company: 'XYZ Industries',
      lastContact: '2023-07-10',
      priority: 'Moyenne'
    },
    { 
      id: 3, 
      name: 'Partenariat DEF', 
      amount: 75000, 
      stage: 'Closing', 
      company: 'DEF Solutions',
      lastContact: '2023-07-18',
      priority: 'Haute'
    },
    { 
      id: 4, 
      name: 'Projet GHI', 
      amount: 35000, 
      stage: 'Découverte', 
      company: 'GHI Enterprises',
      lastContact: '2023-07-12',
      priority: 'Basse'
    },
    { 
      id: 5, 
      name: 'Accord JKL', 
      amount: 60000, 
      stage: 'Qualification', 
      company: 'JKL Group',
      lastContact: '2023-07-14',
      priority: 'Moyenne'
    },
    { 
      id: 6, 
      name: 'Contrat MNO', 
      amount: 45000, 
      stage: 'Prise de contact', 
      company: 'MNO Ltd',
      lastContact: '2023-07-16',
      priority: 'Haute'
    },
  ]);

  return (
    <DealsContainer>
      <SectionHeader>
        <h2>Gestion des Deals</h2>
        <CreateDealButton to="/deals/create">
          <FaPlus /> Nouveau Deal
        </CreateDealButton>
      </SectionHeader>
      
      <ControlsContainer>
        <SearchBar>
          <FaSearch style={{ color: '#999', marginRight: '10px' }} />
          <SearchInput 
            type="text" 
            placeholder="Rechercher des deals..." 
          />
        </SearchBar>
        <FilterButton>
          <FaFilter /> Filtres
        </FilterButton>
      </ControlsContainer>
      
      <DealsGrid>
        {deals.map(deal => (
          <DealCard key={deal.id}>
            <DealHeader>
              <DealTitle>
                <Link to={`/deals/${deal.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {deal.name}
                </Link>
              </DealTitle>
            </DealHeader>
            <DealAmount>{deal.amount.toLocaleString('fr-FR')} €</DealAmount>
            <DealInfo>
              <div>Client: {deal.company}</div>
              <div>Priorité: {deal.priority}</div>
            </DealInfo>
            <DealInfo>
              <div>Dernier contact: {deal.lastContact}</div>
              <StatusBadge stage={deal.stage}>
                {deal.stage}
              </StatusBadge>
            </DealInfo>
          </DealCard>
        ))}
      </DealsGrid>
    </DealsContainer>
  );
};

export default Deals;
