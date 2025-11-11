import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaPlus, FaChartLine, FaDollarSign, FaList, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f4f7fc;
  min-height: calc(100vh - 70px);
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

const StatusBadge = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
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
    switch(props.status) {
      case 'Prospection': return '#616161';
      case 'Qualification': return '#947600';
      case 'Prise de contact': return '#947600';
      case 'Découverte': return '#947600';
      case 'Proposition de valeur': return '#947600';
      case 'Négociation': return '#947600';
      case 'Closing': return '#947600';
      case 'Livraison/Onboarding': return '#1b5e20';
      case 'Fidélisation/Upsell/Cross-sell': return '#1b5e20';
      default: return '#424242';
    }
  }};
`;

const CreateDealButton = styled(Link)`
  background: #4361ee;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  transition: background 0.2s ease;
  font-size: 14px;
  
  &:hover {
    background: #3a56d4;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const Dashboard = () => {
  // Mock data for demonstration
  const deals = [
    { id: 1, name: 'Contrat ABC Corp', amount: 50000, stage: 'Négociation', company: 'ABC Corporation' },
    { id: 2, name: 'Solution XYZ', amount: 25000, stage: 'Proposition de valeur', company: 'XYZ Industries' },
    { id: 3, name: 'Partenariat DEF', amount: 75000, stage: 'Closing', company: 'DEF Solutions' },
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
        <StatCard>
          <StatIcon color="#4361ee">
            <FaDollarSign />
          </StatIcon>
          <StatInfo>
            <h3>125 000 €</h3>
            <p>Revenus prévus</p>
          </StatInfo>
        </StatCard>
        
        <StatCard>
          <StatIcon color="#2ecc71">
            <FaChartLine />
          </StatIcon>
          <StatInfo>
            <h3>78%</h3>
            <p>Taux de conversion</p>
          </StatInfo>
        </StatCard>
        
        <StatCard>
          <StatIcon color="#e74c3c">
            <FaList />
          </StatIcon>
          <StatInfo>
            <h3>12</h3>
            <p>Deals actifs</p>
          </StatInfo>
        </StatCard>
        
        <StatCard>
          <StatIcon color="#9b59b6">
            <FaUsers />
          </StatIcon>
          <StatInfo>
            <h3>42</h3>
            <p>Clients actifs</p>
          </StatInfo>
        </StatCard>
      </StatsGrid>
      
      <SectionHeader>
        <h2>Deals récents</h2>
        <Link to="/deals">Voir tous</Link>
      </SectionHeader>
      
      <DealsTable>
        <thead>
          <tr>
            <th>Nom du deal</th>
            <th>Client</th>
            <th>Montant</th>
            <th>Étape</th>
          </tr>
        </thead>
        <tbody>
          {deals.map(deal => (
            <tr key={deal.id}>
              <td>
                <Link to={`/deals/${deal.id}`}>{deal.name}</Link>
              </td>
              <td>{deal.company}</td>
              <td>{deal.amount.toLocaleString('fr-FR')} €</td>
              <td>
                <StatusBadge status={deal.stage}>
                  {deal.stage}
                </StatusBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </DealsTable>
    </DashboardContainer>
  );
};

export default Dashboard;
