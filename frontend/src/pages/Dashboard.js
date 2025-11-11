import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaChartLine, FaDollarSign, FaList, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f4f7fc;
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  margin-left: 250px;

  @media (max-width: 768px) {
    margin-left: 70px;
  }
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
  flex-shrink: 0;
  
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
    background: #f8f9fa;
  }
`;

const ActionButton = styled(Link)`
  background: #4361ee;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  transition: background 0.2s ease;
  
  &:hover {
    background: #3a56d4;
  }
  
  svg {
    margin-right: 5px;
  }
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

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    { title: "Total Deals", value: "24", icon: <FaChartLine />, color: "#4361ee" },
    { title: "Revenue", value: "€42,500", icon: <FaDollarSign />, color: "#2ecc71" },
    { title: "New Leads", value: "8", icon: <FaUsers />, color: "#e74c3c" },
    { title: "Tasks", value: "12", icon: <FaList />, color: "#f39c12" }
  ];

  const recentDeals = [
    { id: 1, name: "Website Redesign for TechCorp", company: "TechCorp", amount: "€15,000", stage: "Proposition de valeur" },
    { id: 2, name: "Mobile App Development", company: "Innovate Ltd", amount: "€25,000", stage: "Négociation" },
    { id: 3, name: "Marketing Campaign", company: "Global Brands", amount: "€8,500", stage: "Découverte" },
    { id: 4, name: "Cloud Migration", company: "DataSystems", amount: "€32,000", stage: "Closing" }
  ];

  return (
    <DashboardContainer>
      <SectionHeader>
        <h2>Tableau de bord</h2>
        <ActionButton to="/deals/create">
          <FaPlus /> Nouveau Deal
        </ActionButton>
      </SectionHeader>
      
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatIcon color={stat.color}>
              {stat.icon}
            </StatIcon>
            <StatInfo>
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </StatInfo>
          </StatCard>
        ))}
      </StatsGrid>
      
      <SectionHeader>
        <h2>Deals récents</h2>
        <ActionButton to="/deals">Voir tous</ActionButton>
      </SectionHeader>
      
      <DealsTable>
        <thead>
          <tr>
            <th>Nom du deal</th>
            <th>Client</th>
            <th>Montant</th>
            <th>Étape</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentDeals.map(deal => (
            <tr key={deal.id}>
              <td>{deal.name}</td>
              <td>{deal.company}</td>
              <td>{deal.amount}</td>
              <td>
                <StageBadge stage={deal.stage}>
                  {deal.stage}
                </StageBadge>
              </td>
              <td>
                <ActionButton to={`/deals/${deal.id}`}>
                  <FaCalendarAlt /> Suivre
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </DealsTable>
    </DashboardContainer>
  );
};

export default Dashboard;
