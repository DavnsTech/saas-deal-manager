import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
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
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const DealTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const DealInfo = styled.p`
  margin: 5px 0;
  color: #666;
  font-size: 14px;
`;

const DealActions = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
`;

const ViewButton = styled(Link)`
  background: #4361ee;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
`;

const EditButton = styled(Link)`
  background: #ffc107;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
`;

const Deals = () => {
  const { deals, loading, error, removeDeal } = useDeals();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDeals, setFilteredDeals] = useState(deals);

  React.useEffect(() => {
    setFilteredDeals(
      deals.filter(deal =>
        deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.client.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [deals, searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await removeDeal(id);
      } catch (err) {
        alert('Failed to delete deal');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <DealsContainer>
      <SectionHeader>
        <h2>All Deals</h2>
      </SectionHeader>
      <ControlsContainer>
        <SearchBar>
          <FaSearch style={{ color: '#999' }} />
          <SearchInput
            type="text"
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        <FilterButton>
          <FaFilter />
          Filter
        </FilterButton>
        <CreateDealButton to="/deals/create">
          <FaPlus />
          Create Deal
        </CreateDealButton>
      </ControlsContainer>
      <DealsGrid>
        {filteredDeals.map(deal => (
          <DealCard key={deal.id}>
            <DealTitle>{deal.name}</DealTitle>
            <DealInfo>Client: {deal.client}</DealInfo>
            <DealInfo>Amount: ${deal.amount.toLocaleString()}</DealInfo>
            <DealInfo>Stage: {deal.stage}</DealInfo>
            <DealInfo>Close Date: {new Date(deal.closeDate).toLocaleDateString()}</DealInfo>
            <DealActions>
              <ViewButton to={`/deals/${deal.id}`}>View</ViewButton>
              <EditButton to={`/deals/${deal.id}/edit`}>Edit</EditButton> {/* Assuming edit route */}
              <DeleteButton onClick={() => handleDelete(deal.id)}>Delete</DeleteButton>
            </DealActions>
          </DealCard>
        ))}
      </DealsGrid>
    </DealsContainer>
  );
};

export default Deals;
