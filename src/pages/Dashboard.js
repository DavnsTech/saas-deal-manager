import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaChartLine, FaDollarSign, FaList } from 'react-icons/fa';

const DashboardContainer = styled.div`
  padding: 20px;
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
  
  svg {
    color: white;
    font-size: 20px;
  }
`;

const StatInfo = styled.div`
  h3 {
    font-size: 24px;
    margin-bottom: 5px;
  }
  
  p {
    color: #666;
    font-size: 14px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    font-size: 22px;
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
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch(props.stage) {
      case 'Prospection': return '#e0e0e0';
      case 'Qualification': return '#ffecb3';
      case 'Prise de contact': return '#ffe082';
      case 'Découverte': return '#ffcc80';
      case 'Proposition de valeur': return '#ffb74d';
      case 'Négociation': return '#ff9800';
      case 'Closing': return '#f57c00';
      case 'Livraison/Onboarding': return '#4caf50';
      case 'Fidélisation/Upsell/Cross-sell': return '#2e7d32';
      default: return '#e0e0e0';
    }
  }};
  color: ${props => {
    switch(props.stage) {
      case 'Prospection': return '#666';
      case 'Qualification': return '#ff8f00';
      case 'Prise de contact': return '#ff6f00';
      case 'Découverte': return '#ef6c00';
      case 'Proposition de valeur': return '#e65100';
      case 'Négociation': return '#fff';
      case 'Closing': return '#fff';
      case 'Livraison/Onboarding': return '#fff';
      case 'Fidélisation/Upsell/Cross-sell': return '#fff';
      default: return '#666';
    }
  }};
`;

const Dashboard = () => {
  // Mock data
  const stats = [
    { title: "Total Deals", value: "24", icon: <FaList />, color: "#4361ee" },
    { title: "Valeur Totale", value: "€124,500", icon: <FaDollarSign />, color: "#28a745" },
    { title: "Taux de Conversion", value: "68%", icon: <FaChartLine />, color: "#ffc107" },
  ];
  
  const recentDeals = [
    { id: 1, name: "Contrat avec ABC Corp", amount: "€25,000", stage: "Négociation", company: "ABC Corp" },
    { id: 2, name: "Partenariat XYZ", amount: "€15,000", stage: "Proposition de valeur", company: "XYZ Ltd" },
    { id: 3, name: "Contrat Logiciel", amount: "€8,500", stage: "Closing", company: "Tech Solutions" },
    { id: 4, name: "Service Maintenance", amount: "€42,000", stage: "Livraison/Onboarding", company: "Global Services" },
  ];

  return (
    <DashboardContainer>
      <SectionHeader>
        <h2>Tableau de bord</h2>
        <CreateDealButton to="/deals/create">
          <FaPlus /> Nouveau Deal
        </CreateDealButton>
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
        <h2>Deals Récents</h2>
      </SectionHeader>
      
      <DealsTable>
        <thead>
          <tr>
            <th>Nom du Deal</th>
            <th>Entreprise</th>
            <th>Montant</th>
            <th>Étape</th>
          </tr>
        </thead>
        <tbody>
          {recentDeals.map(deal => (
            <tr key={deal.id}>
              <td>
                <Link to={`/deals/${deal.id}`} style={{ textDecoration: 'none', color: '#4361ee' }}>
                  {deal.name}
                </Link>
              </td>
              <td>{deal.company}</td>
              <td>{deal.amount}</td>
              <td>
                <StageBadge stage={deal.stage}>
                  {deal.stage}
                </StageBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </DealsTable>
    </DashboardContainer>
  );
};

export default Dashboard;
