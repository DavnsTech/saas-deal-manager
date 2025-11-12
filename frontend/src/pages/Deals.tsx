import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import { useDeals } from '../contexts/DealContext';
import { fetchDeals } from '../api/dealsApi';
import { Deal } from '../types';

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
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const DealTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 18px;
`;

const DealDetails = styled.div`
  margin-bottom: 10px;
  p {
    margin: 5px 0;
    color: #666;
    font-size: 14px;
  }
`;

const DealActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DealAmount = styled.span`
  font-weight: bold;
  color: #4361ee;
  font-size: 16px;
`;

const ViewButton = styled(Link)`
  background: #4361ee;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  &:hover {
    background: #3a56d4;
  }
`;

const Deals: React.FC = () => {
  const { deals, setDeals, loading, setLoading, error, setError } = useDeals();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadDeals = async () => {
      try {
        const fetchedDeals = await fetchDeals();
        setDeals(fetchedDeals);
      } catch (err) {
        setError('Failed to fetch deals');
      } finally {
        setLoading(false);
      }
    };
    loadDeals();
  }, [setDeals, setError, setLoading]);

  const filteredDeals = deals.filter(deal =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DealsContainer>
      <SectionHeader>
        <h2>All Deals</h2>
        <CreateDealButton to="/deals/create">
          <FaPlus /> Create Deal
        </CreateDealButton>
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
      </ControlsContainer>
      <DealsGrid>
        {filteredDeals.map(deal => (
          <DealCard key={deal.id}>
            <DealTitle>{deal.name}</DealTitle>
            <DealDetails>
              <p><strong>Company:</strong> {deal.company}</p>
              <p><strong>Stage:</strong> {deal.stage}</p>
              <p><strong>Contact:</strong> {deal.contact}</p>
            </DealDetails>
            <DealActions>
              <DealAmount>${deal.amount.toLocaleString()}</DealAmount>
              <ViewButton to={`/deals/${deal.id}`}>View</ViewButton>
            </DealActions>
          </DealCard>
        ))}
      </DealsGrid>
    </DealsContainer>
  );
};

export default Deals;
