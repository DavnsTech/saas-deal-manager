import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { useDeals } from '../contexts/DealContext';

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
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const DealTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
`;

const DealAmount = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #4361ee;
  margin: 0 0 10px 0;
`;

const DealStage = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: #e0e0e0;
  color: #616161;
`;

const Deals = () => {
  const { deals } = useDeals();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDeals = deals.filter(deal =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        <FilterButton>
          <FaFilter /> Filter
        </FilterButton>
        <CreateDealButton to="/deals/create">
          <FaPlus /> Create Deal
        </CreateDealButton>
      </ControlsContainer>

      <DealsGrid>
        {filteredDeals.map(deal => (
          <DealCard key={deal.id}>
            <DealTitle>
              <Link to={`/deals/${deal.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {deal.name}
              </Link>
            </DealTitle>
            <DealAmount>${deal.amount}</DealAmount>
            <DealStage>{deal.stage}</DealStage>
          </DealCard>
        ))}
      </DealsGrid>
    </DealsContainer>
  );
};

export default Deals;
