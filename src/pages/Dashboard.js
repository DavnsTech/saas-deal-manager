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
  
  tbody tr:hover {
    background: #f9f9f9;
  }
`;

const StageBadge = styled.span`
  padding: 5px 10px;
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
      case 'Qualification': return '#664000';
      case 'Prise de contact': return '#663c00';
      case 'Découverte': return '#663300';
      case 'Proposition de valeur': return '#662e00';
      case 'Négociation': return '#654900';
      case 'Closing': return '#212121';
      case 'Livraison/Onboarding': return '#1b5e20';
      case 'Fidélisation/Upsell/Cross-sell': return '#0d47a1';
      default: return '#424242';
    }
  }};
`;

const SeeAllLink = styled(Link)`
  color: #4361ee;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const Dashboard = () => {
  // Dummy data for demonstration
  const stats = [
    { title: 'Total Deals', value: 150, icon: FaList, color: '#4361ee' },
    { title: 'Total Value', value: '$250,000', icon: FaDollarSign, color: '#198754' },
    { title: 'Active Deals', value: 75, icon: FaChartLine, color: '#ffc107' },
    { title: 'New Leads', value: 45, icon: FaUsers, color: '#0dcaf0' },
  ];

  const recentDeals = [
    { id: 1, name: 'Project Alpha', company: 'TechCorp', stage: 'Proposition de valeur', amount: '$50,000' },
    { id: 2, name: 'Software License Renewal', company: 'DataSolutions', stage: 'Négociation', amount: '$15,000' },
    { id: 3, name: 'Cloud Migration Service', company: 'Cloudify Inc.', stage: 'Découverte', amount: '$80,000' },
    { id: 4, name: 'Consulting Package', company: 'BizConsult', stage: 'Qualification', amount: '$25,000' },
  ];

  return (
    <DashboardContainer>
      <StatsGrid>
        {stats.map((stat, index) => (
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

      <SectionHeader>
        <h2>Deals Récents</h2>
        <SeeAllLink to="/deals">Voir tous les deals</SeeAllLink>
      </SectionHeader>
      <DealsTable>
        <thead>
          <tr>
            <th>Nom du Deal</th>
            <th>Entreprise</th>
            <th>Étape</th>
            <th>Montant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentDeals.map(deal => (
            <tr key={deal.id}>
              <td>{deal.name}</td>
              <td>{deal.company}</td>
              <td><StageBadge stage={deal.stage}>{deal.stage}</StageBadge></td>
              <td>{deal.amount}</td>
              <td>
                <SeeAllLink to={`/deals/${deal.id}`}>Détails</SeeAllLink>
              </td>
            </tr>
          ))}
        </tbody>
      </DealsTable>
    </DashboardContainer>
  );
};

export default Dashboard;
