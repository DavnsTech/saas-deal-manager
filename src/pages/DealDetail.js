import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
      case 'Qualification': return '#664000';
      case 'Prise de contact': return '#663c00';
      case 'Découverte': return '#663300';
      case 'Proposition de valeur': return '#662e00';
      case 'Négociation': return '#654900';
      case 'Closing': return '#212121';
      case 'Livraison/Onboarding': return '#1b5e20';
      case 'Fidélisation/Upsell/Cross-sell': return '#0d47a1';
      default: return '#424242';
    }
  }};
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled(Link)`
  background: #f0f4f8;
  color: #4361ee;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #e0e7ee;
    color: #3a56d4;
  }
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s ease;

  &:hover {
    background: #c82333;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const InfoCard = styled.div`
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

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
  svg {
    color: #4361ee;
    margin-right: 10px;
    font-size: 18px;
  }
  
  span {
    font-weight: 500;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #555;
    flex: 1; /* Allow description to take available space */
  }
`;

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);

  useEffect(() => {
    // Fetch deal details based on id
    // In a real app, this would be an API call
    console.log(`Fetching details for deal ID: ${id}`);
    const mockDealData = {
      id: id,
      name: 'Project Alpha',
      amount: 50000,
      currency: 'USD',
      stage: 'Proposition de valeur',
      source: 'Inbound Marketing',
      priority: 'High',
      probability: 75,
      creationDate: '2023-10-26',
      expectedCloseDate: '2023-12-15',
      salesRep: 'Jane Doe',
      client: {
        company: 'TechCorp',
        contact: 'John Smith',
        email: 'john.smith@techcorp.com',
        phone: '+1 123 456 7890',
        industry: 'Technology',
        companySize: '51-200',
      },
      acquisitionChannel: 'Website Inquiry',
      identifiedNeed: 'Need for scalable cloud solutions.',
      proposedSolution: 'Custom cloud migration and management package.',
      contractType: 'Project-based',
      contractDuration: '6 months',
      paymentMode: 'Invoice',
      lastInteractionDate: '2023-11-10',
      internalComments: 'Client is very interested in the scalability aspect. Follow up next week.',
      documents: ['proposal.pdf', 'contract_template.docx'],
    };
    setDeal(mockDealData);
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      console.log(`Deleting deal ID: ${id}`);
      // In a real app, make an API call to delete the deal
      alert('Deal deleted successfully!');
      navigate('/deals');
    }
  };

  if (!deal) {
    return <DealDetailContainer>Loading deal details...</DealDetailContainer>;
  }

  return (
    <DealDetailContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Retour à la liste des deals
      </BackLink>
      <DealHeader>
        <DealTitleAndStatus>
          <DealTitle>{deal.name}</DealTitle>
          <StageBadge stage={deal.stage}>{deal.stage}</StageBadge>
        </DealTitleAndStatus>
        <DealAmount>{deal.amount} {deal.currency}</DealAmount>
        <ActionsContainer>
          <IconButton to={`/deals/${deal.id}/edit`}>
            <FaEdit /> Modifier
          </IconButton>
          <DeleteButton onClick={handleDelete}>
            <FaTrash /> Supprimer
          </DeleteButton>
        </ActionsContainer>
      </DealHeader>

      <DetailsGrid>
        <InfoCard>
          <CardTitle>Informations Générales</CardTitle>
          <DetailRow>
            <FaTag /> <span>Source du Lead:</span> <p>{deal.source}</p>
          </DetailRow>
          <DetailRow>
            <FaTag /> <span>Priorité:</span> <p>{deal.priority}</p>
          </DetailRow>
          <DetailRow>
            <FaTag /> <span>Probabilité de Closing:</span> <p>{deal.probability}%</p>
          </DetailRow>
          <DetailRow>
            <FaCalendarAlt /> <span>Date de Création:</span> <p>{deal.creationDate}</p>
          </DetailRow>
          <DetailRow>
            <FaCalendarAlt /> <span>Date de Clôture Prévue:</span> <p>{deal.expectedCloseDate}</p>
          </DetailRow>
           <DetailRow>
            <FaCalendarAlt /> <span>Date de Dernière Interaction:</span> <p>{deal.lastInteractionDate}</p>
          </DetailRow>
        </InfoCard>

        <InfoCard>
          <CardTitle>Client et Contact</CardTitle>
          <DetailRow>
            <FaBuilding /> <span>Entreprise:</span> <p>{deal.client.company}</p>
          </DetailRow>
          <DetailRow>
            <FaUser /> <span>Contact Principal:</span> <p>{deal.client.contact}</p>
          </DetailRow>
          <DetailRow>
            <FaEnvelope /> <span>Email:</span> <p>{deal.client.email}</p>
          </DetailRow>
          <DetailRow>
            <FaPhone /> <span>Téléphone:</span> <p>{deal.client.phone}</p>
          </DetailRow>
          <DetailRow>
            <FaIndustry /> <span>Secteur:</span> <p>{deal.client.industry}</p>
          </DetailRow>
          <DetailRow>
            <FaTag /> <span>Taille Entreprise:</span> <p>{deal.client.companySize}</p>
          </DetailRow>
        </InfoCard>

        <InfoCard>
          <CardTitle>Détails du Deal</CardTitle>
          <DetailRow>
            <FaTag /> <span>Canal d’Acquisition:</span> <p>{deal.acquisitionChannel}</p>
          </DetailRow>
          <DetailRow>
            <FaTag /> <span>Besoin Identifié:</span> <p>{deal.identifiedNeed}</p>
          </DetailRow>
          <DetailRow>
            <FaTag /> <span>Solution Proposée:</span> <p>{deal.proposedSolution}</p>
          </DetailRow>
          <DetailRow>
            <FaTag /> <span>Type de Contrat:</span> <p>{deal.contractType}</p>
          </DetailRow>
          <DetailRow>
            <FaTag /> <span>Durée du Contrat:</span> <p>{deal.contractDuration}</p>
          </DetailRow>
          <DetailRow>
            <FaTag /> <span>Mode de Paiement:</span> <p>{deal.paymentMode}</p>
          </DetailRow>
        </InfoCard>

        <InfoCard>
          <CardTitle>Autres Informations</CardTitle>
          <DetailRow>
            <FaUser /> <span>Responsable Commercial:</span> <p>{deal.salesRep}</p>
          </DetailRow>
          <DetailRow>
            <FaComment /> <span>Commentaires Internes:</span> <p>{deal.internalComments}</p>
          </DetailRow>
          <DetailRow>
            <FaPaperclip /> <span>Documents:</span>
            {deal.documents && deal.documents.length > 0 ? (
              <ul>
                {deal.documents.map((doc, index) => (
                  <li key={index} style={{ marginLeft: '10px', color: '#555' }}>
                    <a href="#!" onClick={(e) => e.preventDefault()}>{doc}</a> {/* Placeholder link */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun document joint</p>
            )}
          </DetailRow>
        </InfoCard>
      </DetailsGrid>
    </DealDetailContainer>
  );
};

export default DealDetail;
