import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaPaperclip, FaComment, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaIndustry, FaBuilding, FaTag } from 'react-icons/fa';
import { useDealContext } from '../contexts/DealContext';

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
      case 'Qualification': return '#9e9d24';
      case 'Prise de contact': return '#f57f17';
      case 'Découverte': return '#ef6c00';
      case 'Proposition de valeur': return '#e65100';
      case 'Négociation': return '#d84315';
      case 'Closing': return '#bf360c';
      case 'Livraison/Onboarding': return '#1b5e20';
      case 'Fidélisation/Upsell/Cross-sell': return '#0d5302';
      default: return '#424242';
    }
  }};
`;

const DealActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: #f0f4f8;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #4361ee;
  transition: background 0.2s ease;
  
  &:hover {
    background: #e0e7ee;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const DealDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const DetailCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const DetailTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #333;
`;

const DetailItem = styled.div`
  display: flex;
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.div`
  font-weight: 600;
  min-width: 150px;
  color: #666;
`;

const DetailValue = styled.div`
  flex: 1;
  color: #333;
`;

const CommentsSection = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  padding: 20px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

const DealDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentDeal, loading, error, loadDeal, removeDeal } = useDealContext();

  useEffect(() => {
    if (id) {
      loadDeal(id);
    }
  }, [id, loadDeal]);

  const handleDelete = async () => {
    if (id && window.confirm('Are you sure you want to delete this deal?')) {
      await removeDeal(id);
      navigate('/deals');
    }
  };

  if (loading) return <LoadingMessage>Loading deal details...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!currentDeal) return <ErrorMessage>Deal not found</ErrorMessage>;

  return (
    <DealDetailContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Back to Deals
      </BackLink>
      
      <DealHeader>
        <DealTitleAndStatus>
          <DealTitle>{currentDeal.name}</DealTitle>
          <DealAmount>
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: currentDeal.currency
            }).format(currentDeal.amount)}
          </DealAmount>
          <StageBadge stage={currentDeal.stage}>
            {currentDeal.stage}
          </StageBadge>
        </DealTitleAndStatus>
        
        <DealActions>
          <Link to={`/deals/${currentDeal._id}/edit`}>
            <ActionButton>
              <FaEdit /> Edit
            </ActionButton>
          </Link>
          <ActionButton onClick={handleDelete}>
            <FaTrash /> Delete
          </ActionButton>
        </DealActions>
      </DealHeader>
      
      <DealDetailsGrid>
        <DetailCard>
          <DetailTitle>Contact Information</DetailTitle>
          <DetailItem>
            <DetailLabel>Company:</DetailLabel>
            <DetailValue>{currentDeal.company}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Contact Person:</DetailLabel>
            <DetailValue>{currentDeal.contact}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Email:</DetailLabel>
            <DetailValue>{currentDeal.email}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Phone:</DetailLabel>
            <DetailValue>{currentDeal.phone}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Industry:</DetailLabel>
            <DetailValue>{currentDeal.industry}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Company Size:</DetailLabel>
            <DetailValue>{currentDeal.companySize}</DetailValue>
          </DetailItem>
        </DetailCard>
        
        <DetailCard>
          <DetailTitle>Deal Information</DetailTitle>
          <DetailItem>
            <DetailLabel>Stage:</DetailLabel>
            <DetailValue>
              <StageBadge stage={currentDeal.stage}>
                {currentDeal.stage}
              </StageBadge>
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Status:</DetailLabel>
            <DetailValue>{currentDeal.status}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Priority:</DetailLabel>
            <DetailValue>{currentDeal.priority}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Probability:</DetailLabel>
            <DetailValue>{currentDeal.probability}%</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Created:</DetailLabel>
            <DetailValue>
              {new Date(currentDeal.createdAt).toLocaleDateString()}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Expected Close Date:</DetailLabel>
            <DetailValue>
              {currentDeal.expectedCloseDate 
                ? new Date(currentDeal.expectedCloseDate).toLocaleDateString() 
                : 'Not set'}
            </DetailValue>
          </DetailItem>
        </DetailCard>
        
        <DetailCard>
          <DetailTitle>Additional Details</DetailTitle>
          <DetailItem>
            <DetailLabel>Sales Rep:</DetailLabel>
            <DetailValue>{currentDeal.salesRep}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Acquisition Channel:</DetailLabel>
            <DetailValue>{currentDeal.acquisitionChannel}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Contract Type:</DetailLabel>
            <DetailValue>{currentDeal.contractType}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Contract Duration:</DetailLabel>
            <DetailValue>{currentDeal.contractDuration}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Payment Method:</DetailLabel>
            <DetailValue>{currentDeal.paymentMethod}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Region:</DetailLabel>
            <DetailValue>{currentDeal.region}</DetailValue>
          </DetailItem>
        </DetailCard>
      </DealDetailsGrid>
      
      <CommentsSection>
        <DetailTitle>Comments & Notes</DetailTitle>
        <DetailItem>
          <DetailLabel>Comments:</DetailLabel>
          <DetailValue>{currentDeal.comments || 'No comments added'}</DetailValue>
        </DetailItem>
      </CommentsSection>
    </DealDetailContainer>
  );
};

export default DealDetailPage;
