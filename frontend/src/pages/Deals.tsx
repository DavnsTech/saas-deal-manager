import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import { useDealContext } from '../contexts/DealContext';

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

const DealsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #555;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tr:hover {
    background-color: #f8f9fa;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 5px;
  margin: 0 5px;
  
  &:hover {
    color: #4361ee;
  }
`;

const StageBadge = styled.span<{ stage: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
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
      case 'Qualification': return '#9e9d24';
      case 'Prise de contact': return '#f57f17';
      case 'Découverte': return '#ef6c00';
      case 'Proposition de valeur': return '#e65100';
      case 'Négociation': return '#d84315';
      case 'Closing': return '#bf360c';
      case 'Livraison/Onboarding': return '#1b5e20';
      case 'Fidélisation/Upsell/Cross-sell': return '#0d5302';
      default: return '#424242';
    }
  }};
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  padding: 20px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

const DealsPage: React.FC = () => {
  const { deals, loading, error, loadDeals, removeDeal } = useDealContext();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDeals();
  }, [loadDeals]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      await removeDeal(id);
    }
  };

  const filteredDeals = deals.filter(deal => 
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingMessage>Loading deals...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

  return (
    <DealsContainer>
      <SectionHeader>
        <h2>Deals Management</h2>
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

      <DealsTable>
        <thead>
          <tr>
            <th>Deal Name</th>
            <th>Company</th>
            <th>Amount</th>
            <th>Stage</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeals.map(deal => (
            <tr key={deal._id}>
              <td>
                <Link to={`/deals/${deal._id}`}>{deal.name}</Link>
              </td>
              <td>{deal.company}</td>
              <td>
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: deal.currency
                }).format(deal.amount)}
              </td>
              <td>
                <StageBadge stage={deal.stage}>
                  {deal.stage}
                </StageBadge>
              </td>
              <td>
                {new Date(deal.createdAt).toLocaleDateString()}
              </td>
              <td>
                <Link to={`/deals/${deal._id}/edit`}>
                  <ActionButton>
                    <FaEdit />
                  </ActionButton>
                </Link>
                <ActionButton onClick={() => handleDelete(deal._id)}>
                  <FaTrash />
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </DealsTable>
    </DealsContainer>
  );
};

export default DealsPage;
