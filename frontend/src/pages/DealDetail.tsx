import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { getDealById, deleteDeal } from '../api/dealsApi';
import { Deal } from '../types';

const DealDetailContainer = styled.div`
  padding: 20px;
  background-color: #f4f7fc;
  min-height: calc(100vh - 70px);
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #4361ee;
  text-decoration: none;
  margin-bottom: 20px;
  &:hover {
    text-decoration: underline;
  }
  svg {
    margin-right: 8px;
  }
`;

const DealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const DealTitle = styled.h1`
  font-size: 28px;
  margin: 0 0 10px 0;
  color: #333;
`;

const DealAmount = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #4361ee;
  margin-bottom: 10px;
`;

const StageBadge = styled.span<{ stage: string }>`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
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
      case 'Qualification': return '#f57f17';
      case 'Prise de contact': return '#ef6c00';
      case 'Découverte': return '#e65100';
      case 'Proposition de valeur': return '#bf360c';
      case 'Négociation': return '#bf360c';
      case 'Closing': return '#ffffff';
      case 'Livraison/Onboarding': return '#ffffff';
      case 'Fidélisation/Upsell/Cross-sell': return '#ffffff';
      default: return '#424242';
    }
  }};
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: #4361ee;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    background: #3a56d4;
  }
`;

const DealInfo = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const InfoItem = styled.div`
  p {
    margin: 5px 0;
    font-size: 14px;
    color: #666;
  }
  strong {
    color: #333;
  }
`;

const DealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeal = async () => {
      if (!id) return;
      try {
        const fetchedDeal = await getDealById(parseInt(id));
        setDeal(fetchedDeal);
      } catch (err) {
        setError('Failed to fetch deal');
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

  const handleDelete = async () => {
    if (!deal) return;
    try {
      await deleteDeal(deal.id);
      navigate('/deals');
    } catch (err) {
      setError('Failed to delete deal');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error || !deal) return <div>Error: {error || 'Deal not found'}</div>;

  return (
    <DealDetailContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Back to Deals
      </BackLink>
      <DealHeader>
        <div>
          <DealTitle>{deal.name}</DealTitle>
          <DealAmount>${deal.amount.toLocaleString()} {deal.currency}</DealAmount>
          <StageBadge stage={deal.stage}>{deal.stage}</StageBadge>
        </div>
        <Actions>
          <ActionButton>
            <FaEdit /> Edit
          </ActionButton>
          <ActionButton onClick={handleDelete}>
            <FaTrash /> Delete
          </ActionButton>
        </Actions>
      </DealHeader>
      <DealInfo>
        <h2>Deal Information</h2>
        <InfoGrid>
          <InfoItem>
            <p><strong>Company:</strong> {deal.company}</p>
            <p><strong>Contact:</strong> {deal.contact}</p>
            <p><strong>Email:</strong> {deal.email}</p>
            <p><strong>Phone:</strong> {deal.phone}</p>
          </InfoItem>
          <InfoItem>
            <p><strong>Sector:</strong> {deal.sector}</p>
            <p><strong>Company Size:</strong> {deal.companySize}</p>
            <p><strong>Source:</strong> {deal.source}</p>
            <p><strong>Priority:</strong> {deal.priority}</p>
          </InfoItem>
          <InfoItem>
            <p><strong>Expected Close Date:</strong> {new Date(deal.expectedCloseDate).toLocaleDateString()}</p>
            <p><strong>Probability:</strong> {deal.probability}%</p>
            <p><strong>Responsible:</strong> {deal.responsible}</p>
          </InfoItem>
        </InfoGrid>
      </DealInfo>
    </DealDetailContainer>
  );
};

export default DealDetail;
