import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaChartLine, FaDollarSign, FaList, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { useDeals } from '../contexts/DealContext';

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f4f7fc;
  min-height: calc(100vh - 70px); /* Ensure content fills remaining height */
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.color || '#4361ee'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0; /* Prevent icon from shrinking */
  
  svg {
    color: white;
    font-size: 20px;
  }
`;

const StatInfo = styled.div`
  h3 {
    font-size: 24px;
    margin-bottom: 5px;
    font-weight: 700;
    color: #333;
  }
  
  p {
    color: #666;
    font-size: 14px;
    margin: 0;
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
  
  tbody tr:hover {
    background: #f8f9fa;
  }
`;

const ActionLink = styled(Link)`
  color: #4361ee;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Dashboard = () => {
  const { deals, fetchDeals, loading, error } = useDeals();

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const totalDeals = deals.length;
  const totalValue = deals.reduce((sum, deal) => sum + (parseFloat(deal.amount) || 0), 0);
  const closedDeals = deals.filter(deal => deal.status === 'Closing').length;
  const recentDeals = deals.slice(0, 5); // Assuming sorted by date, take first 5

  return (
    <DashboardContainer>
      <StatsGrid>
        <StatCard>
          <StatIcon color="#4361ee">
            <FaList />
          </StatIcon>
          <StatInfo>
            <h3>{totalDeals}</h3>
            <p>Total Deals</p>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon color="#28a745">
            <FaDollarSign />
          </StatIcon>
          <StatInfo>
            <h3>{totalValue.toLocaleString()} €</h3>
            <p>Total Value</p>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon color="#ffc107">
            <FaChartLine />
          </StatIcon>
          <StatInfo>
            <h3>{closedDeals}</h3>
            <p>Closed Deals</p>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon color="#17a2b8">
            <FaUsers />
          </StatIcon>
          <StatInfo>
            <h3>{Math.round((closedDeals / totalDeals) * 100) || 0}%</h3>
            <p>Conversion Rate</p>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      <SectionHeader>
        <h2>Recent Deals</h2>
        <Link to="/deals" style={{ color: '#4361ee', textDecoration: 'none', fontWeight: '500' }}>
          View All <FaCalendarAlt style={{ marginLeft: '5px' }} />
        </Link>
      </SectionHeader>

      {loading ? (
        <p>Loading deals...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <DealsTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Client</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentDeals.map(deal => (
              <tr key={deal.id}>
                <td>{deal.name}</td>
                <td>{deal.amount} {deal.currency}</td>
                <td>{deal.status}</td>
                <td>{deal.clientCompany}</td>
                <td>
                  <ActionLink to={`/deals/${deal.id}`}>View</ActionLink>
                </td>
              </tr>
            ))}
          </tbody>
        </DealsTable>
      )}

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/deals/new" style={{ 
          background: '#4361ee', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '4px', 
          textDecoration: 'none', 
          display: 'inline-flex', 
          alignItems: 'center',
          fontWeight: '600'
        }}>
          <FaPlus style={{ marginRight: '8px' }} /> Create New Deal
        </Link>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
