import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaPaperclip, FaComment, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaIndustry, FaBuilding, FaTag } from 'react-icons/fa';
import { useDeals } from '../contexts/DealContext';

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
      case 'Prise de contact': return '#e65100';
      case 'Découverte': return '#bf360c';
      case 'Proposition de valeur': return '#870000';
      case 'Négociation': return '#4a148c';
      case 'Closing': return '#1b5e20';
      case 'Livraison/Onboarding': return '#0d47a1';
      case 'Fidélisation/Upsell/Cross-sell': return '#00695c';
      default: return '#424242';
    }
  }};
`;

const DealActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
  background: ${props => props.variant === 'edit' ? '#ffc107' : '#dc3545'};
  color: white;
  
  &:hover {
    opacity: 0.9;
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

const DetailItem = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: #555;
  }
  
  p {
    margin: 0;
    color: #333;
  }
`;

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDealById, removeDeal } = useDeals();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        setError(err.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!deal) return <p>Deal not found</p>;

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
          <ActionButton variant="edit">
            <FaEdit /> Edit
          </ActionButton>
          <ActionButton onClick={handleDelete}>
            <FaTrash /> Delete
          </ActionButton>
        </DealActions>
      </DealHeader>

      <DealDetails>
        <DetailItem>
          <label>Status</label>
          <p>{deal.status}</p>
        </DetailItem>
        <DetailItem>
          <label>Priority</label>
          <p>{deal.priority}</p>
        </DetailItem>
        <DetailItem>
          <label>Source</label>
          <p>{deal.source}</p>
        </DetailItem>
        <DetailItem>
          <label>Client</label>
          <p>{deal.client}</p>
        </DetailItem>
        <DetailItem>
          <label>Contact</label>
          <p>{deal.contact}</p>
        </DetailItem>
        <DetailItem>
          <label>Email</label>
          <p>{deal.email}</p>
        </DetailItem>
        {/* Add more fields as needed */}
      </DealDetails>
    </DealDetailContainer>
  );
};

export default DealDetail;
