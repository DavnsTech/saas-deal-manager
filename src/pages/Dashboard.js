import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaChartLine, FaDollarSign, FaList, FaUsers, FaCalendarAlt } from 'react-icons/fa';

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
  
  tr:hover {
    background: #f8f9ff;
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

const StageBadge = styled.span`
  padding: 5px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => {
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
      case 'Qualification': return '#f57f17';
      case 'Prise de contact': return '#f57f17';
      case 'Découverte': return '#e65100';
      case 'Proposition de valeur': return '#e65100';
      case 'Négociation': return '#fff';
      case 'Closing': return '#fff';
      case 'Livraison/Onboarding': return '#fff';
      case 'Fidélisation/Upsell/Cross-sell': return '#fff';
      default: return '#424242';
    }
  }};
`;

const RecentDealsSection = styled.div`
  margin-top: 30px;
`;

// Mock data for dashboard stats and recent deals
const dashboardStats = [
  { title: 'Total Deals', value: '150', icon: FaList, color: '#4361ee' },
  { title: 'Deals Ouverts', value: '75', icon: FaChartLine, color: '#008080' },
  { title: 'Valeur Totale', value: '$1.2M', icon: FaDollarSign, color: '#28a745' },
  { title: 'Nouveaux Clients', value: '15', icon: FaUsers, color: '#ffc107' },
];

const recentDealsData = [
  { id: 1, name: 'Projet Alpha', amount: '$50,000', stage: 'Négociation', closeDate: '2024-08-15' },
  { id: 2, name: 'Solution Beta', amount: '$75,000', stage: 'Proposition de valeur', closeDate: '2024-09-01' },
  { id: 3, name: 'Partenariat Gamma', amount: '$120,000', stage: 'Closing', closeDate: '2024-07-30' },
  { id: 4, name: 'Service Delta', amount: '$30,000', stage: 'Qualification', closeDate: '2024-10-10' },
  { id: 5, name: 'Consulting Epsilon', amount: '$90,000', stage: 'Découverte', closeDate: '2024-09-20' },
];

const Dashboard = () => {
  return (
    <DashboardContainer>
      <StatsGrid>
        {dashboardStats.map((stat, index) => (
          <StatCard key={index}>
            <StatIcon color={stat.color}>
              <stat.icon />
            </StatIcon>
            <StatInfo>
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </StatInfo>
          </StatCard>
        ))}
      </StatsGrid>

      <RecentDealsSection>
        <SectionHeader>
          <h2>Deals Récents</h2>
          <CreateDealButton to="/deals/create">
            <FaPlus /> Nouveau Deal
          </CreateDealButton>
        </SectionHeader>
        <DealsTable>
          <thead>
            <tr>
              <th>Nom du Deal</th>
              <th>Montant</th>
              <th>Étape de vente</th>
              <th>Date de clôture prévue</th>
            </tr>
          </thead>
          <tbody>
            {recentDealsData.map(deal => (
              <tr key={deal.id}>
                <td>
                  <Link to={`/deals/${deal.id}`} style={{ textDecoration: 'none', color: '#4361ee' }}>
                    {deal.name}
                  </Link>
                </td>
                <td>{deal.amount}</td>
                <td><StageBadge stage={deal.stage}>{deal.stage}</StageBadge></td>
                <td>{deal.closeDate}</td>
              </tr>
            ))}
          </tbody>
        </DealsTable>
      </RecentDealsSection>
    </DashboardContainer>
  );
};

export default Dashboard;
