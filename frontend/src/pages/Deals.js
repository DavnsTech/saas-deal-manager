import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { dealsApi } from '../api/dealsApi';

const DealsContainer = styled.div`
  padding: 20px;
  background-color: #f4f7fc;
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  margin-left: 250px;

  @media (max-width: 768px) {
    margin-left: 70px;
  }
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
  margin: 0;
  color: #333;
  flex: 1;
`;

const DealAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #4361ee;
  margin-bottom: 10px;
`;

const DealInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
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
      case 'Qualification': return '#998000';
      case 'Prise de contact': return '#996600';
      case 'Découverte': return '#995200';
      case 'Proposition de valeur': return '#993d00';
      case 'Négociation': return '#992900';
      case 'Closing': return '#7a3d00';
      case 'Livraison/Onboarding': return '#1b5e20';
      case 'Fidélisation/Upsell/Cross-sell': return '#0d3c0d';
      default: return '#424242';
    }
  }};
`;

const DealDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #888;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #e74c3c;
`;

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const data = await dealsApi.getAllDeals();
        setDeals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const filteredDeals = deals.filter(deal => 
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingMessage>Chargement des deals...</LoadingMessage>;
  if (error) return <ErrorMessage>Erreur: {error}</ErrorMessage>;

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
          <FaSearch />
          <SearchInput 
            type="text" 
            placeholder="Rechercher un deal..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        <FilterButton>
          <FaFilter /> Filtrer
        </FilterButton>
      </ControlsContainer>
      
      <DealsGrid>
        {filteredDeals.map(deal => (
          <DealCard key={deal.id} as={Link} to={`/deals/${deal.id}`}>
            <DealHeader>
              <DealTitle>{deal.name}</DealTitle>
            </DealHeader>
            <DealAmount>{deal.amount} {deal.currency}</DealAmount>
            <DealInfo>
              <div>{deal.company}</div>
              <StageBadge stage={deal.stage}>
                {deal.stage}
              </StageBadge>
            </DealInfo>
            <DealDetails>
              <div>Responsable: {deal.owner}</div>
              <div>Date de création: {new Date(deal.createdAt).toLocaleDateString()}</div>
            </DealDetails>
          </DealCard>
        ))}
      </DealsGrid>
    </DealsContainer>
  );
};

export default Deals;
