import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaChartLine, FaDollarSign, FaList, FaUsers, FaCalendarAlt, FaCog, FaChartBar } from 'react-icons/fa';

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

const QuickActions = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

const ActionButton = styled(Link)`
  background: #4361ee;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  transition: background 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: #3a56d4;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const RecentDealsTable = styled.table`
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

  td.deal-name {
    font-weight: 500;
    color: #4361ee;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  td.stage-badge {
    font-weight: 500;
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 12px;
    text-transform: uppercase;
    background: ${props => props.stageColor || '#e0e0e0'};
    color: ${props => props.textColor || '#616161'};
  }
`;

const Dashboard = () => {
  // Dummy data for demonstration
  const recentDeals = [
    { id: 'deal-1', name: 'Project Alpha', stage: 'Qualification', amount: 150000, currency: 'USD', closeDate: '2023-12-15' },
    { id: 'deal-2', name: 'Service Expansion Beta', stage: 'Prospection', amount: 75000, currency: 'EUR', closeDate: '2024-01-31' },
    { id: 'deal-3', name: 'Website Redesign', stage: 'Proposition de valeur', amount: 50000, currency: 'USD', closeDate: '2023-11-30' },
    { id: 'deal-4', name: 'New Product Launch', stage: 'Négociation', amount: 200000, currency: 'CAD', closeDate: '2024-02-28' },
  ];

  const getStageColor = (stage) => {
    switch(stage) {
      case 'Prospection': return { background: '#e0e0e0', color: '#616161' };
      case 'Qualification': return { background: '#fff9c4', color: '#616161' };
      case 'Prise de contact': return { background: '#ffecb3', color: '#616161' };
      case 'Découverte': return { background: '#ffe0b2', color: '#616161' };
      case 'Proposition de valeur': return { background: '#ffcc80', color: '#333' };
      case 'Négociation': return { background: '#ffb74d', color: '#333' };
      case 'Closing': return { background: '#f57c00', color: '#fff' };
      case 'Livraison/Onboarding': return { background: '#81c784', color: '#333' };
      case 'Fidélisation/Upsell/Cross-sell': return { background: '#388e3c', color: '#fff' };
      default: return { background: '#bdbdbd', color: '#616161' };
    }
  };

  return (
    <DashboardContainer>
      <StatsGrid>
        <StatCard>
          <StatIcon color="#4361ee">
            <FaDollarSign />
          </StatIcon>
          <StatInfo>
            <h3>$1.2M</h3>
            <p>Total Pipeline Value</p>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon color="#00c853">
            <FaChartLine />
          </StatIcon>
          <StatInfo>
            <h3>25</h3>
            <p>Active Deals</p>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon color="#ffab00">
            <FaUsers />
          </StatIcon>
          <StatInfo>
            <h3>150</h3>
            <p>New Leads This Month</p>
          </StatInfo>
        </StatCard>
        <StatCard>
          <StatIcon color="#6200ea">
            <FaCalendarAlt />
          </StatIcon>
          <StatInfo>
            <h3>5</h3>
            <p>Deals Closing This Week</p>
          </StatInfo>
        </StatCard>
      </StatsGrid>

      <SectionHeader>
        <h2>Quick Actions</h2>
      </SectionHeader>
      <QuickActions>
        <ActionButton to="/deals/create">
          <FaPlus /> Create New Deal
        </ActionButton>
        <ActionButton to="/deals">
          <FaList /> View All Deals
        </ActionButton>
        <ActionButton to="/reports">
          <FaChartBar /> View Reports
        </ActionButton>
        <ActionButton to="/settings">
          <FaCog /> Settings
        </ActionButton>
      </QuickActions>

      <SectionHeader>
        <h2>Recent Deals</h2>
        <Link to="/deals" style={{ textDecoration: 'none', color: '#4361ee', fontWeight: 500 }}>View All</Link>
      </SectionHeader>
      <RecentDealsTable>
        <thead>
          <tr>
            <th>Deal Name</th>
            <th>Stage</th>
            <th>Amount</th>
            <th>Expected Close Date</th>
          </tr>
        </thead>
        <tbody>
          {recentDeals.map(deal => (
            <tr key={deal.id}>
              <td className="deal-name">
                <Link to={`/deals/${deal.id}`}>{deal.name}</Link>
              </td>
              <td className="stage-badge" style={{ background: getStageColor(deal.stage).background, color: getStageColor(deal.stage).color }}>
                {deal.stage}
              </td>
              <td>{deal.currency} {deal.amount.toLocaleString()}</td>
              <td>{deal.closeDate}</td>
            </tr>
          ))}
        </tbody>
      </RecentDealsTable>
    </DashboardContainer>
  );
};

export default Dashboard;
