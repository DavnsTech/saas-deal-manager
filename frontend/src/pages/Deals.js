import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
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
  align-items: center;
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

const DealCardHeader = styled.div`
  margin-bottom: 15px;
`;

const DealName = styled(Link)`
  font-size: 20px;
  font-weight: 600;
  color: #4361ee;
  text-decoration: none;
  margin-bottom: 5px;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const DealAmount = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const StageBadge = styled.span`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => props.stageColor || '#e0e0e0'};
  color: ${props => props.textColor || '#616161'};
  display: inline-block;
`;

const DealCardBody = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
`;

const DealInfo = styled.p`
  margin-bottom: 8px;
`;

const DealCardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: auto; /* Pushes footer to the bottom */
`;

const ActionButtonSmall = styled(Link)`
  background: #f0f4f8;
  color: #4361ee;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  transition: background 0.2s ease;
  border: 1px solid #e0e7ee;

  &:hover {
    background: #e0e7ee;
  }

  svg {
    margin-right: 5px;
  }
`;

const DeleteButton = styled.button`
  background: #f8d7da;
  color: #721c24;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: #f5c6cb;
  }

  svg {
    margin-right: 5px;
  }
`;

const StageColorMap = {
  'Prospection': { background: '#e0e0e0', color: '#616161' },
  'Qualification': { background: '#fff9c4', color: '#616161' },
  'Prise de contact': { background: '#ffecb3', color: '#616161' },
  'Découverte': { background: '#ffe0b2', color: '#616161' },
  'Proposition de valeur': { background: '#ffcc80', color: '#333' },
  'Négociation': { background: '#ffb74d', color: '#333' },
  'Closing': { background: '#f57c00', color: '#fff' },
  'Livraison/Onboarding': { background: '#81c784', color: '#333' },
  'Fidélisation/Upsell/Cross-sell': { background: '#388e3c', color: '#fff' },
  'Open': { background: '#b0bec5', color: '#37474f'},
  'Closed Won': { background: '#a5d6a7', color: '#2e7d32'},
  'Closed Lost': { background: '#ef9a9a', color: '#c62828'},
  'On Hold': { background: '#fff59d', color: '#f57f17'}
};

const Deals = () => {
  const { deals, loading, error, loadDeals, removeDeal } = useDeals();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    // Only load deals if they aren't already loaded (e.g., on initial app load)
    if (deals.length === 0) {
      loadDeals();
    }
  }, [deals.length, loadDeals]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterStageChange = (e) => {
    setFilterStage(e.target.value);
  };

  const handleFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await removeDeal(id);
      } catch (err) {
        console.error("Failed to delete deal:", err);
        // Optionally show an error message to the user
      }
    }
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          deal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          deal.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === '' || deal.stage === filterStage;
    const matchesStatus = filterStatus === '' || deal.status === filterStatus;
    return matchesSearch && matchesStage && matchesStatus;
  });
  
  // Extract unique stages and statuses for filters
  const uniqueStages = [...new Set(deals.map(deal => deal.stage))];
  const uniqueStatuses = [...new Set(deals.map(deal => deal.status))];

  return (
    <DealsContainer>
      <SectionHeader>
        <h2>Deals</h2>
      </SectionHeader>
      <ControlsContainer>
        <SearchBar>
          <FaSearch size={18} color="#aaa" style={{ marginRight: '10px' }} />
          <SearchInput
            type="text"
            placeholder="Search deals by name, client, or contact..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchBar>
        <FilterButton onClick={() => { /* Handle filter logic, maybe open a modal or dropdown */ }}>
          <FaFilter /> Filter
        </FilterButton>
        <CreateDealButton to="/deals/create">
          <FaPlus /> New Deal
        </CreateDealButton>
      </ControlsContainer>

      {/* Basic Filter Dropdowns (can be enhanced with a modal) */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <select value={filterStage} onChange={handleFilterStageChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
          <option value="">All Stages</option>
          {uniqueStages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
        </select>
        <select value={filterStatus} onChange={handleFilterStatusChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
          <option value="">All Statuses</option>
           {uniqueStatuses.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
      </div>

      {loading && <p>Loading deals...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && filteredDeals.length === 0 && (
        <p>No deals found. <Link to="/deals/create">Create your first deal</Link>.</p>
      )}

      {!loading && !error && filteredDeals.length > 0 && (
        <DealsGrid>
          {filteredDeals.map(deal => {
            const stageInfo = StageColorMap[deal.stage] || StageColorMap['Open']; // Default to Open if stage not found
            const statusInfo = StageColorMap[deal.status] || StageColorMap['Open']; // Use StageColorMap for statuses too

            return (
              <DealCard key={deal.id}>
                <DealCardHeader>
                  <DealName to={`/deals/${deal.id}`}>{deal.name}</DealName>
                  <DealAmount>{deal.currency} {deal.amount.toLocaleString()}</DealAmount>
                  <StageBadge stageColor={stageInfo.background} textColor={stageInfo.color}>{deal.stage}</StageBadge>
                </DealCardHeader>
                <DealCardBody>
                  <DealInfo><strong>Client:</strong> {deal.client}</DealInfo>
                  <DealInfo><strong>Contact:</strong> {deal.contact}</DealInfo>
                  <DealInfo><strong>Next Step:</strong> {deal.closeDate || 'N/A'}</DealInfo>
                  <DealInfo><strong>Status:</strong> <span style={{ background: statusInfo.background, color: statusInfo.color, padding: '4px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>{deal.status}</span></DealInfo>
                </DealCardBody>
                <DealCardFooter>
                  <ActionButtonSmall to={`/deals/${deal.id}/edit`}> {/* Assuming an edit route */}
                    <FaEdit /> Edit
                  </ActionButtonSmall>
                  <DeleteButton onClick={() => handleDelete(deal.id)}>
                    <FaTrash /> Delete
                  </DeleteButton>
                </DealCardFooter>
              </DealCard>
            );
          })}
        </DealsGrid>
      )}
    </DealsContainer>
  );
};

export default Deals;
