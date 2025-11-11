import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaPaperclip, FaComment, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaIndustry, FaBuilding, FaTag, FaHourglassHalf, FaPercent, FaMoneyBillWave, FaFileAlt } from 'react-icons/fa';
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
  font-weight: 500;
  
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
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
`;

const DealTitleAndStatus = styled.div`
  display: flex;
  flex-direction: column;
`;

const DealTitle = styled.h1`
  font-size: 28px;
  margin: 0 0 10px 0;
  color: #333;
  font-weight: 700;
`;

const DealAmount = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #4361ee;
  margin-bottom: 10px;
`;

const StageBadge = styled.span`
  padding: 8px 15px;
  border-radius: 20px;
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
      case 'Qualification': return '#616161';
      case 'Prise de contact': return '#616161';
      case 'Découverte': return '#616161';
      case 'Proposition de valeur': return '#333';
      case 'Négociation': return '#333';
      case 'Closing': return '#fff';
      case 'Livraison/Onboarding': return '#333';
      case 'Fidélisation/Upsell/Cross-sell': return '#fff';
      default: return '#616161';
    }
  }};
  margin-bottom: 10px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto; /* Push to the right */

  @media (max-width: 768px) {
    margin-top: 15px;
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
`;

const IconButton = styled(Link)`
  background: #f0f4f8;
  color: #4361ee;
  padding: 10px 15px;
  border-radius: 4px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  transition: background 0.2s ease;
  border: 1px solid #e0e7ee;
  cursor: pointer;

  &:hover {
    background: #e0e7ee;
  }

  svg {
    margin-right: 8px;
  }
`;

const DeleteIconButton = styled.button`
  background: #f8d7da;
  color: #721c24;
  padding: 10px 15px;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: #f5c6cb;
  }

  svg {
    margin-right: 8px;
  }
`;

const DetailSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 25px;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #333;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start; /* Align items from the top */
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;
  
  svg {
    margin-right: 15px;
    color: #4361ee;
    font-size: 20px;
    flex-shrink: 0; /* Prevent icon from shrinking */
  }
  
  .detail-label {
    font-weight: 600;
    color: #333;
    min-width: 180px; /* Fixed width for labels for alignment */
    display: inline-block;
  }

  .detail-value {
    flex-grow: 1; /* Allow value to take remaining space */
  }

  .detail-value a {
      color: #4361ee;
      text-decoration: none;
      &:hover {
          text-decoration: underline;
      }
  }
`;

const FullWidthDetail = styled(DetailItem)`
  grid-column: 1 / -1; /* Span across all columns */
  align-items: center; /* Center align for single line items */

  svg {
    margin-top: 2px; /* Adjust vertical alignment */
  }
`;

const DealDetail = () => {
  const { id } = useParams();
  const { getDealById, removeDeal } = useDeals();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeal = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDealById(id);
        setDeal(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching deal:", err);
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
        console.error("Failed to delete deal:", err);
        // Optionally show an error message to the user
      }
    }
  };

  const stageColorMap = {
    'Prospection': { background: '#e0e0e0', color: '#616161' },
    'Qualification': { background: '#fff9c4', color: '#616161' },
    'Prise de contact': { background: '#ffecb3', color: '#616161' },
    'Découverte': { background: '#ffe0b2', color: '#616161' },
    'Proposition de valeur': { background: '#ffcc80', color: '#333' },
    'Négociation': { background: '#ffb74d', color: '#333' },
    'Closing': { background: '#f57c00', color: '#fff' },
    'Livraison/Onboarding': { background: '#81c784', color: '#333' },
    'Fidélisation/Upsell/Cross-sell': { background: '#388e3c', color: '#fff' },
    'Open': { background: '#b0bec5', color: '#37474f'},
    'Closed Won': { background: '#a5d6a7', color: '#2e7d32'},
    'Closed Lost': { background: '#ef9a9a', color: '#c62828'},
    'On Hold': { background: '#fff59d', color: '#f57f17'}
  };

  const getStageStyle = (stage) => {
    return stageColorMap[stage] || stageColorMap['Open'];
  };

  if (loading) return <DealDetailContainer><p>Loading deal details...</p></DealDetailContainer>;
  if (error) return <DealDetailContainer><p style={{ color: 'red' }}>Error loading deal: {error}</p></DealDetailContainer>;
  if (!deal) return <DealDetailContainer><p>Deal not found.</p></DealDetailContainer>;

  const stageStyle = getStageStyle(deal.stage);

  // Format dates for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <DealDetailContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Back to Deals
      </BackLink>
      <DealHeader>
        <DealTitleAndStatus>
          <DealTitle>{deal.name}</DealTitle>
          <DealAmount>{deal.currency} {deal.amount ? deal.amount.toLocaleString() : '0'}</DealAmount>
          <StageBadge stage={deal.stage} style={{ background: stageStyle.background, color: stageStyle.color }}>
            {deal.stage}
          </StageBadge>
          {deal.status && (
             <StageBadge stage={deal.status} style={{ background: getStageStyle(deal.status).background, color: getStageStyle(deal.status).color, marginLeft: '10px' }}>
                {deal.status}
             </StageBadge>
          )}
        </DealTitleAndStatus>
        <ActionButtons>
          <IconButton to={`/deals/${deal.id}/edit`}> {/* Assuming an edit route */}
            <FaEdit /> Edit Deal
          </IconButton>
          <DeleteIconButton onClick={handleDelete}>
            <FaTrash /> Delete Deal
          </DeleteIconButton>
        </ActionButtons>
      </DealHeader>

      <DetailSection>
        <Card>
          <CardTitle>Deal Information</CardTitle>
          <DetailItem>
            <FaTag />
            <div>
              <div className="detail-label">Deal Name:</div>
              <div className="detail-value">{deal.name}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaMoneyBillWave />
            <div>
              <div className="detail-label">Amount:</div>
              <div className="detail-value">{deal.currency} {deal.amount ? deal.amount.toLocaleString() : '0'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaHourglassHalf />
            <div>
              <div className="detail-label">Status:</div>
              <div className="detail-value">{deal.status || 'N/A'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaPercent />
            <div>
              <div className="detail-label">Probability:</div>
              <div className="detail-value">{deal.probability || 0}%</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaCalendarAlt />
            <div>
              <div className="detail-label">Expected Close Date:</div>
              <div className="detail-value">{formatDate(deal.closeDate)}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaFileAlt />
            <div>
              <div className="detail-label">Contract Type:</div>
              <div className="detail-value">{deal.contractType || 'N/A'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaHourglassHalf />
            <div>
              <div className="detail-label">Contract Duration:</div>
              <div className="detail-value">{deal.contractDuration || 'N/A'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaMoneyBillWave />
            <div>
              <div className="detail-label">Payment Mode:</div>
              <div className="detail-value">{deal.paymentMode || 'N/A'}</div>
            </div>
          </DetailItem>
        </Card>

        <Card>
          <CardTitle>Client & Contact</CardTitle>
          <DetailItem>
            <FaBuilding />
            <div>
              <div className="detail-label">Client/Company:</div>
              <div className="detail-value">{deal.client || 'N/A'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaUser />
            <div>
              <div className="detail-label">Primary Contact:</div>
              <div className="detail-value">{deal.contact || 'N/A'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaEnvelope />
            <div>
              <div className="detail-label">Email:</div>
              <div className="detail-value">{deal.email ? <a href={`mailto:${deal.email}`}>{deal.email}</a> : 'N/A'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaPhone />
            <div>
              <div className="detail-label">Phone:</div>
              <div className="detail-value">{deal.phone || 'N/A'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaIndustry />
            <div>
              <div className="detail-label">Industry/Sector:</div>
              <div className="detail-value">{deal.sector || 'N/A'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaTag />
            <div>
              <div className="detail-label">Company Size:</div>
              <div className="detail-value">{deal.companySize || 'N/A'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaTag />
            <div>
              <div className="detail-label">Region/Country:</div>
              <div className="detail-value">{deal.region || 'N/A'}</div>
            </div>
          </DetailItem>
        </Card>

        <Card>
          <CardTitle>Sales & Acquisition</CardTitle>
          <DetailItem>
            <FaTag />
            <div>
              <div className="detail-label">Source:</div>
              <div className="detail-value">{deal.source || 'N/A'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaTag />
            <div>
              <div className="detail-label">Acquisition Channel:</div>
              <div className="detail-value">{deal.acquisitionChannel || 'N/A'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaTag />
            <div>
              <div className="detail-label">Sales Rep:</div>
              <div className="detail-value">{deal.responsible || 'N/A'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaTag />
            <div>
              <div className="detail-label">Priority:</div>
              <div className="detail-value">{deal.priority || 'N/A'}</div>
            </div>
          </DetailItem>
          <DetailItem>
            <FaTag />
            <div>
              <div className="detail-label">Lead Score:</div>
              <div className="detail-value">{deal.leadScore !== undefined ? deal.leadScore : 'N/A'}</div>
            </div>
          </DetailItem>
           <DetailItem>
            <FaMoneyBillWave />
            <div>
              <div className="detail-label">Est. Lifetime Value:</div>
              <div className="detail-value">{deal.currency} {deal.lifetimeValue ? deal.lifetimeValue.toLocaleString() : '0'}</div>
            </div>
          </DetailItem>
        </Card>

        <FullWidthDetail>
          <FaComment />
          <div>
            <div className="detail-label">Identified Need:</div>
            <div className="detail-value">{deal.identifiedNeed || 'N/A'}</div>
          </div>
        </FullWidthDetail>

        <FullWidthDetail>
          <FaComment />
          <div>
            <div className="detail-label">Proposed Solution:</div>
            <div className="detail-value">{deal.proposedSolution || 'N/A'}</div>
          </div>
        </FullWidthDetail>
        
        <FullWidthDetail>
          <FaComment />
          <div>
            <div className="detail-label">Internal Comments:</div>
            <div className="detail-value">{deal.internalComments || 'N/A'}</div>
          </div>
        </FullWidthDetail>

        <FullWidthDetail>
          <FaPaperclip />
          <div>
            <div className="detail-label">Attached Documents:</div>
            <div className="detail-value">{deal.attachedDocuments || 'None'}</div>
          </div>
        </FullWidthDetail>
      </DetailSection>
    </DealDetailContainer>
  );
};

export default DealDetail;
