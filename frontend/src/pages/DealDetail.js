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
      case 'Prise de contact': return '#ef6c00';
      case 'Découverte': return '#e65100';
      case 'Proposition de valeur': return '#bf360c';
      case 'Négociation': return '#b71c1c';
      case 'Closing': return '#880e4f';
      case 'Livraison/Onboarding': return '#1b5e20';
      case 'Fidélisation/Upsell/Cross-sell': return '#0d47a1';
      default: return '#424242';
    }
  }};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &.edit {
    background: #ffc107;
    color: #333;
  }
  
  &.delete {
    background: #dc3545;
    color: white;
  }
  
  &:hover {
    opacity: 0.9;
  }
`;

const DealContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
`;

const MainContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SidebarContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #4361ee;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  
  svg {
    margin-right: 10px;
    color: #666;
    min-width: 16px;
  }
  
  strong {
    margin-right: 10px;
    color: #333;
  }
  
  span {
    color: #666;
  }
`;

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deals, deleteDeal, loading, error } = useDeals();
  const [deal, setDeal] = useState(null);

  useEffect(() => {
    const foundDeal = deals.find(d => d.id === parseInt(id));
    if (foundDeal) {
      setDeal(foundDeal);
    } else {
      // If not in context, could fetch individually, but for now assume deals are loaded
      console.log('Deal not found in context');
    }
  }, [id, deals]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await deleteDeal(deal.id);
        navigate('/deals');
      } catch (err) {
        // Error handled in context
      }
    }
  };

  if (loading) return <DealDetailContainer><p>Loading...</p></DealDetailContainer>;
  if (error) return <DealDetailContainer><p>Error: {error}</p></DealDetailContainer>;
  if (!deal) return <DealDetailContainer><p>Deal not found</p></DealDetailContainer>;

  return (
    <DealDetailContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Retour aux deals
      </BackLink>
      <DealHeader>
        <DealTitleAndStatus>
          <DealTitle>{deal.name}</DealTitle>
          <DealAmount>{deal.amount} {deal.currency}</DealAmount>
          <StageBadge stage={deal.status}>{deal.status}</StageBadge>
        </DealTitleAndStatus>
        <ActionButtons>
          <ActionButton className="edit">
            <FaEdit /> Edit
          </ActionButton>
          <ActionButton className="delete" onClick={handleDelete}>
            <FaTrash /> Delete
          </ActionButton>
        </ActionButtons>
      </DealHeader>
      <DealContent>
        <MainContent>
          <Section>
            <SectionTitle><FaComment /> Description</SectionTitle>
            <p>{deal.identifiedNeed || 'No description available'}</p>
          </Section>
          <Section>
            <SectionTitle><FaPaperclip /> Documents</SectionTitle>
            <p>{deal.documents || 'No documents attached'}</p>
          </Section>
          <Section>
            <SectionTitle><FaComment /> Internal Comments</SectionTitle>
            <p>{deal.internalComments || 'No comments'}</p>
          </Section>
        </MainContent>
        <SidebarContent>
          <Section>
            <SectionTitle><FaUser /> Contact Information</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <FaUser />
                <strong>Contact:</strong> <span>{deal.contact || 'N/A'}</span>
              </InfoItem>
              <InfoItem>
                <FaEnvelope />
                <strong>Email:</strong> <span>{deal.email || 'N/A'}</span>
              </InfoItem>
              <InfoItem>
                <FaPhone />
                <strong>Phone:</strong> <span>{deal.phone || 'N/A'}</span>
              </InfoItem>
              <InfoItem>
                <FaBuilding />
                <strong>Company:</strong> <span>{deal.clientCompany || 'N/A'}</span>
              </InfoItem>
              <InfoItem>
                <FaIndustry />
                <strong>Sector:</strong> <span>{deal.sector || 'N/A'}</span>
              </InfoItem>
              <InfoItem>
                <FaTag />
                <strong>Company Size:</strong> <span>{deal.companySize || 'N/A'}</span>
              </InfoItem>
            </InfoGrid>
          </Section>
          <Section>
            <SectionTitle><FaCalendarAlt /> Deal Details</SectionTitle>
            <InfoGrid>
              <InfoItem>
                <FaCalendarAlt />
                <strong>Created:</strong> <span>{deal.createdDate || 'N/A'}</span>
              </InfoItem>
              <InfoItem>
                <FaCalendarAlt />
                <strong>Close Date:</strong> <span>{deal.closeDate || 'N/A'}</span>
              </InfoItem>
              <InfoItem>
                <FaUser />
                <strong>Responsible:</strong> <span>{deal.responsible || 'N/A'}</span>
              </InfoItem>
              <InfoItem>
                <FaTag />
                <strong>Priority:</strong> <span>{deal.priority || 'N/A'}</span>
              </InfoItem>
              <InfoItem>
                <FaTag />
                <strong>Probability:</strong> <span>{deal.probability}%</span>
              </InfoItem>
              <InfoItem>
                <FaTag />
                <strong>Lifetime Value:</strong> <span>{deal.lifetimeValue || 'N/A'}</span>
              </InfoItem>
            </InfoGrid>
          </Section>
        </SidebarContent>
      </DealContent>
    </DealDetailContainer>
  );
};

export default DealDetail;
