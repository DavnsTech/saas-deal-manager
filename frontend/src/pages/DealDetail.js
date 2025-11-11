import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import { FaArrowLeft, FaEdit, FaTrash, FaPaperclip, FaComment, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaIndustry, FaBuilding, FaTag } from 'react-icons/fa';

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

const StageBadge = styled.span`
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
      default: return '#616161';
    }
  }};
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? '#4361ee' : '#6c757d'};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
  }
`;

const DealDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const DetailSection = styled.div`
  h3 {
    font-size: 18px;
    margin-bottom: 15px;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #4361ee;
  }
  
  span {
    font-weight: 500;
    color: #666;
  }
`;

const DealDetail = () => {
  const { id } = useParams();
  const { getDealById, removeDeal } = useDeals();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const dealData = await getDealById(id);
        setDeal(dealData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [id, getDealById]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await removeDeal(id);
        navigate('/deals');
      } catch (err) {
        alert('Failed to delete deal');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!deal) return <p>Deal not found</p>;

  return (
    <DealDetailContainer>
      <BackLink to="/deals">
        <FaArrowLeft />
        Back to Deals
      </BackLink>
      <DealHeader>
        <DealTitleAndStatus>
          <DealTitle>{deal.name}</DealTitle>
          <DealAmount>${deal.amount.toLocaleString()} {deal.currency}</DealAmount>
          <StageBadge stage={deal.stage}>{deal.stage}</StageBadge>
        </DealTitleAndStatus>
        <Actions>
          <ActionButton primary>
            <FaEdit />
            Edit
          </ActionButton>
          <ActionButton onClick={handleDelete}>
            <FaTrash />
            Delete
          </ActionButton>
        </Actions>
      </DealHeader>
      <DealDetails>
        <DetailSection>
          <h3>Client Information</h3>
          <DetailItem>
            <FaBuilding />
            <span>Client: {deal.client}</span>
          </DetailItem>
          <DetailItem>
            <FaUser />
            <span>Contact: {deal.contact}</span>
          </DetailItem>
          <DetailItem>
            <FaEnvelope />
            <span>Email: {deal.email}</span>
          </DetailItem>
          <DetailItem>
            <FaPhone />
            <span>Phone: {deal.phone}</span>
          </DetailItem>
          <DetailItem>
            <FaIndustry />
            <span>Sector: {deal.sector}</span>
          </DetailItem>
          <DetailItem>
            <FaBuilding />
            <span>Company Size: {deal.companySize}</span>
          </DetailItem>
        </DetailSection>
        <DetailSection>
          <h3>Deal Details</h3>
          <DetailItem>
            <FaTag />
            <span>Status: {deal.status}</span>
          </DetailItem>
          <DetailItem>
            <FaCalendarAlt />
            <span>Close Date: {new Date(deal.closeDate).toLocaleDateString()}</span>
          </DetailItem>
          <DetailItem>
            <FaUser />
            <span>Responsible: {deal.responsible}</span>
          </DetailItem>
          <DetailItem>
            <FaComment />
            <span>Internal Comments: {deal.internalComments}</span>
          </DetailItem>
        </DetailSection>
      </DealDetails>
    </DealDetailContainer>
  );
};

export default DealDetail;
