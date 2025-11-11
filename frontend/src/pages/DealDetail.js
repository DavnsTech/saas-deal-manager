import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaPaperclip, FaComment, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaIndustry, FaBuilding, FaTag } from 'react-icons/fa';
import { dealsApi } from '../api/dealsApi'; // Import the module

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
      case 'Quali
      default: return '#333';
    }
  }};
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #777;
  transition: color 0.2s ease;
  
  &:hover {
    color: #4361ee;
  }
`;

const DetailSection = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #333;
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
    color: #4361ee;
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  
  strong {
    color: #555;
    font-size: 14px;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
  
  span {
    font-size: 16px;
    color: #333;
  }
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  li {
    margin-bottom: 8px;
    a {
      color: #4361ee;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
      svg {
        margin-right: 8px;
      }
    }
  }
`;

const DealDetail = () => {
  const { id } = useParams(); // Get deal ID from URL
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDealDetails = async () => {
      try {
        setLoading(true);
        const data = await dealsApi.getDealById(id);
        setDeal(data);
        setError(null);
      } catch (err) {
        setError(`Failed to load deal details: ${err.message}`);
        console.error('DealDetail fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDealDetails();
  }, [id]); // Re-fetch if ID changes

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await dealsApi.deleteDeal(id);
        navigate('/deals'); // Redirect to deals list after deletion
      } catch (err) {
        setError(`Failed to delete deal: ${err.message}`);
        console.error('Deal deletion error:', err);
      }
    }
  };

  const handleEdit = () => {
    // Navigate to an edit page or open a modal
    navigate(`/deals/${id}/edit`); // Assuming an edit route
  };

  if (loading) {
    return <DealDetailContainer>Loading deal details...</DealDetailContainer>;
  }

  if (error) {
    return <DealDetailContainer className="error">{error}</DealDetailContainer>;
  }

  if (!deal) {
    return <DealDetailContainer>Deal not found.</DealDetailContainer>;
  }

  // Format currency and amount
  const formattedAmount = deal.amount !== undefined && deal.amount !== null
    ? deal.amount.toLocaleString('en-US', { style: 'currency', currency: deal.currency || 'USD' })
    : 'N/A';

  return (
    <DealDetailContainer>
      <BackLink to="/deals"><FaArrowLeft /> Back to Deals</BackLink>
      <DealHeader>
        <DealTitleAndStatus>
          <DealTitle>{deal.name || 'Untitled Deal'}</DealTitle>
          <StageBadge stage={deal.stage}>{deal.stage || 'Unknown Stage'}</StageBadge>
        </DealTitleAndStatus>
        <ActionsContainer>
          <IconButton onClick={handleEdit}><FaEdit /></IconButton>
          <IconButton onClick={handleDelete}><FaTrash /></IconButton>
        </ActionsContainer>
      </DealHeader>

      <DealAmount>{formattedAmount}</DealAmount>

      <DetailSection>
        <SectionTitle><FaTag /> Deal Overview</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <strong>Deal Name</strong>
            <span>{deal.name || 'N/A'}</span>
          </DetailItem>
          <DetailItem>
            <strong>Amount</strong>
            <span>{formattedAmount}</span>
          </DetailItem>
          <DetailItem>
            <strong>Currency</strong>
            <span>{deal.currency || 'N/A'}</span>
          </DetailItem>
          <DetailItem>
            <strong>Sales Stage</strong>
            <span>{deal.stage || 'N/A'}</span>
          </DetailItem>
          <DetailItem>
            <strong>Probability of Closing</strong>
            <span>{deal.probabilityClosing !== undefined && deal.probabilityClosing !== null ? `${deal.probabilityClosing}%` : 'N/A'}</span>
          </DetailItem>
          <DetailItem>
            <strong>Source of Lead</strong>
            <span>{deal.sourceLead || 'N/A'}</span>
          </DetailItem>
          <DetailItem>
            <strong>Acquisition Channel</strong>
            <span>{deal.acquisitionChannel || 'N/A'}</span>
          </DetailItem>
        </DetailGrid>
      </DetailSection>

      <DetailSection>
        <SectionTitle><FaUser /> Client Information</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <strong>Customer/Company ID</strong>
            <span>{deal.customerId || 'N/A'}</span>
          </DetailItem>
          <DetailItem>
            <strong>Company Size</strong>
            <span>{deal.companySize || 'N/A'}</span>
          </DetailItem>
          <DetailItem>
            <strong>Activity Sector</strong>
            <span>{deal.activitySector || 'N/A'}</span>
          </DetailItem>
        </DetailGrid>
      </DetailSection>

      <DetailSection>
        <SectionTitle><FaEnvelope /> Contact Information</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <strong>Contact Person</strong>
            <span>{deal.contactPrincipal || 'N/A'}</span>
          </DetailItem>
          <DetailItem>
            <strong>Email</strong>
            <span>{deal.email || 'N/A'}</span>
          </DetailItem>
          <DetailItem>
            <strong>Phone</strong>
            <span>{deal.phone || 'N/A'}</span>
          </DetailItem>
        </DetailGrid>
      </DetailSection>

      <DetailSection>
        <SectionTitle><FaComment /> Deal Details</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <strong>Identified Need</strong>
            <span>{deal.identifiedNeed || 'N/A'}</span>
          </DetailItem>
          <DetailItem>
            <strong>Proposed Solution</strong>
            <span>{deal.proposedSolution || 'N/A'}</span>
          </DetailItem>
          <DetailItem>
            <strong>Contract Type</strong>
            <span>{deal.contractType || 'N/A'}</span>
          </DetailItem>
          <DetailItem>
            <strong>Contract Duration</strong>
            <span>{deal.contractDuration || 'N/A'}</span>
          </DetailItem>
          <DetailItem>
            <strong>Payment Mode</strong>
            <span>{deal.paymentMode || 'N/A'}</span>
          </DetailItem>
        </DetailGrid>
      </DetailSection>

      <DetailSection>
        <SectionTitle><FaPaperclip /> Documents</SectionTitle>
        {deal.documents && deal.documents.length > 0 ? (
          <FileList>
            {deal.documents.map((doc, index) => (
              <li key={index}>
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  <FaPaperclip /> {doc.name}
                </a>
              </li>
            ))}
          </FileList>
        ) : (
          <span>No documents attached.</span>
        )}
      </DetailSection>

      <DetailSection>
        <SectionTitle><FaCalendarAlt /> Other Information</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <strong>Description</strong>
            <span>{deal.description || 'N/A'}</span>
          </DetailItem>
          {/* Add other fields that don't fit neatly above */}
        </DetailGrid>
      </DetailSection>

    </DealDetailContainer>
  );
};

export default DealDetail;
