import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaEdit, FaTrash, FaPaperclip, FaComment, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaIndustry, FaBuilding, FaTag } from 'react-icons/fa';
import { useDeals } from '../contexts/DealContext';
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

const DealTitleAndStatus = styled.div`
  display: flex;
  flex-direction: column;
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
      case 'Prise de contact': return '#e65100';
      case 'Découverte': return '#bf360c';
      case 'Proposition de valeur': return '#ff6f00';
      case 'Négociation': return '#e65100';
      case 'Closing': return '#ffffff';
      case 'Livraison/Onboarding': return '#ffffff';
      case 'Fidélisation/Upsell/Cross-sell': return '#ffffff';
      default: return '#424242';
    }
  }};
`;

const DealActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button<{ variant?: string }>`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  background: ${props => props.variant === 'danger' ? '#dc3545' : '#4361ee'};
  color: white;
  &:hover {
    background: ${props => props.variant === 'danger' ? '#c82333' : '#3a56d4'};
  }
`;

const DealInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const InfoCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { deals, deleteDeal } = useDeals();
  const [deal, setDeal] = useState<Deal | null>(null);

  useEffect(() => {
    if (id) {
      const foundDeal = deals.find(d => d.id === parseInt(id));
      setDeal(foundDeal || null);
    }
  }, [deals, id]);

  if (!deal) return <p>Deal not found</p>;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      await deleteDeal(deal.id);
      navigate('/deals');
    }
  };

  return (
    <DealDetailContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Back to Deals
      </BackLink>
      <DealHeader>
        <DealTitleAndStatus>
          <DealTitle>{deal.name}</DealTitle>
          <DealAmount>${deal.amount}</DealAmount>
          <StageBadge stage={deal.stage}>{deal.stage}</StageBadge>
        </DealTitleAndStatus>
        <DealActions>
          <ActionButton>
            <FaEdit /> Edit
          </ActionButton>
          <ActionButton variant="danger" onClick={handleDelete}>
            <FaTrash /> Delete
          </ActionButton>
        </DealActions>
      </DealHeader>
      <DealInfoGrid>
        <InfoCard>
          <InfoTitle><FaUser /> Contact Information</InfoTitle>
          <InfoItem><FaBuilding /> Company: {deal.company}</InfoItem>
          <InfoItem><FaUser /> Contact: {deal.contact}</InfoItem>
          <InfoItem><FaEnvelope /> Email: {deal.email}</InfoItem>
          <InfoItem><FaPhone /> Phone: {deal.phone}</InfoItem>
        </InfoCard>
        <InfoCard>
          <InfoTitle><FaIndustry /> Company Details</InfoTitle>
          <InfoItem><FaIndustry /> Industry: {deal.industry}</InfoItem>
          <InfoItem><FaBuilding /> Size: {deal.companySize}</InfoItem>
          <InfoItem><FaTag /> Acquisition Channel: {deal.acquisitionChannel}</InfoItem>
          <InfoItem><FaTag /> Region: {deal.region}</InfoItem>
        </InfoCard>
        <InfoCard>
          <InfoTitle><FaCalendarAlt /> Deal Timeline</InfoTitle>
          <InfoItem><FaCalendarAlt /> Created: {new Date(deal.createdAt).toLocaleDateString()}</InfoItem>
          <InfoItem><FaCalendarAlt /> Expected Close: {deal.expectedCloseDate}</InfoItem>
          <InfoItem><FaCalendarAlt /> Last Interaction: {deal.lastInteraction}</InfoItem>
        </InfoCard>
        <InfoCard>
          <InfoTitle><FaComment /> Additional Information</InfoTitle>
          <InfoItem>Identified Need: {deal.identifiedNeed}</InfoItem>
          <InfoItem>Proposed Solution: {deal.proposedSolution}</InfoItem>
          <InfoItem>Internal Comments: {deal.internalComments}</InfoItem>
        </InfoCard>
      </DealInfoGrid>
    </DealDetailContainer>
  );
};

export default DealDetail;
