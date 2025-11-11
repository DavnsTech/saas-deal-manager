import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaPaperclip, FaComment, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaIndustry, FaBuilding, FaTag } from 'react-icons/fa';
import { dealsApi } from '../api/dealsApi';

const DealDetailContainer = styled.div`
  padding: 20px;
  background-color: #f4f7fc;
  min-height: calc(100vh - 70px);
  margin-top: 70px;
  margin-left: 250px;

  @media (max-width: 768px) {
    margin-left: 70px;
  }
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
      case 'Qualification': return '#998000';
      case 'Prise de contact': return '#996600';
      case 'Découverte': return '#995200';
      case 'Proposition de valeur': return '#993d00';
      case 'Négociation': return '#992900';
      case 'Closing': return '#7a3d00';
      case 'Livraison/Onboarding': return '#1b5e20';
      case 'Fidélisation/Upsell/Cross-sell': return '#0d3c0d';
      default: return '#424242';
    }
  }};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: ${props => props.danger ? '#e74c3c' : '#4361ee'};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${props => props.danger ? '#c0392b' : '#3a56d4'};
  }
  
  svg {
    margin-right: 8px;
  }
`;

const SectionsContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
`;

const SectionCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 20px;
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

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.div`
  width: 200px;
  font-weight: 600;
  color: #555;
`;

const DetailValue = styled.div`
  flex: 1;
  color: #333;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #e74c3c;
`;

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        setLoading(true);
        const data = await dealsApi.getDealById(id);
        setDeal(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDeal();
    }
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce deal ?')) {
      try {
        await dealsApi.deleteDeal(id);
        navigate('/deals');
      } catch (err) {
        alert('Erreur lors de la suppression du deal');
      }
    }
  };

  if (loading) return <LoadingMessage>Chargement du deal...</LoadingMessage>;
  if (error) return <ErrorMessage>Erreur: {error}</ErrorMessage>;
  if (!deal) return <ErrorMessage>Deal non trouvé</ErrorMessage>;

  return (
    <DealDetailContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Retour aux deals
      </BackLink>
      
      <DealHeader>
        <DealTitleAndStatus>
          <DealTitle>{deal.name}</DealTitle>
          <DealAmount>{deal.amount} {deal.currency}</DealAmount>
          <StageBadge stage={deal.stage}>
            {deal.stage}
          </StageBadge>
        </DealTitleAndStatus>
        
        <ActionButtons>
          <ActionButton as={Link} to={`/deals/${id}/edit`}>
            <FaEdit /> Modifier
          </ActionButton>
          <ActionButton danger onClick={handleDelete}>
            <FaTrash /> Supprimer
          </ActionButton>
        </ActionButtons>
      </DealHeader>
      
      <SectionsContainer>
        <div>
          <SectionCard>
            <SectionTitle>
              <FaUser /> Informations sur le client
            </SectionTitle>
            <DetailRow>
              <DetailLabel>Entreprise:</DetailLabel>
              <DetailValue>{deal.company}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Contact principal:</DetailLabel>
              <DetailValue>{deal.primaryContact}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Email:</DetailLabel>
              <DetailValue>{deal.email}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Téléphone:</DetailLabel>
              <DetailValue>{deal.phone}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Secteur d'activité:</DetailLabel>
              <DetailValue>{deal.industry}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Taille de l'entreprise:</DetailLabel>
              <DetailValue>{deal.companySize}</DetailValue>
            </DetailRow>
          </SectionCard>
          
          <SectionCard>
            <SectionTitle>
              <FaTag /> Détails du deal
            </SectionTitle>
            <DetailRow>
              <DetailLabel>Source du lead:</DetailLabel>
              <DetailValue>{deal.leadSource}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Priorité:</DetailLabel>
              <DetailValue>{deal.priority}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Probabilité de closing:</DetailLabel>
              <DetailValue>{deal.closingProbability}%</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Date de création:</DetailLabel>
              <DetailValue>{new Date(deal.createdAt).toLocaleDateString()}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Date de clôture prévue:</DetailLabel>
              <DetailValue>{new Date(deal.expectedCloseDate).toLocaleDateString()}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Responsable commercial:</DetailLabel>
              <DetailValue>{deal.owner}</DetailValue>
            </DetailRow>
          </SectionCard>
          
          <SectionCard>
            <SectionTitle>
              <FaComment /> Commentaires internes
            </SectionTitle>
            <DetailValue>{deal.comments || 'Aucun commentaire'}</DetailValue>
          </SectionCard>
        </div>
        
        <div>
          <SectionCard>
            <SectionTitle>
              <FaCalendarAlt /> Suivi de relance
            </SectionTitle>
            <DetailValue>{deal.followUp || 'Aucun suivi programmé'}</DetailValue>
          </SectionCard>
          
          <SectionCard>
            <SectionTitle>
              <FaPaperclip /> Documents joints
            </SectionTitle>
            <DetailValue>{deal.documents || 'Aucun document'}</DetailValue>
          </SectionCard>
          
          <SectionCard>
            <SectionTitle>
              <FaBuilding /> Informations supplémentaires
            </SectionTitle>
            <DetailRow>
              <DetailLabel>Canal d'acquisition:</DetailLabel>
              <DetailValue>{deal.acquisitionChannel}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Besoin identifié:</DetailLabel>
              <DetailValue>{deal.identifiedNeed}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Solution proposée:</DetailLabel>
              <DetailValue>{deal.proposedSolution}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Type de contrat:</DetailLabel>
              <DetailValue>{deal.contractType}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Durée du contrat:</DetailLabel>
              <DetailValue>{deal.contractDuration}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Mode de paiement:</DetailLabel>
              <DetailValue>{deal.paymentMethod}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Date de dernière interaction:</DetailLabel>
              <DetailValue>{new Date(deal.lastInteraction).toLocaleDateString()}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Score du lead:</DetailLabel>
              <DetailValue>{deal.leadScore}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Valeur à vie estimée:</DetailLabel>
              <DetailValue>{deal.lifetimeValue}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Région/Pays:</DetailLabel>
              <DetailValue>{deal.region}</DetailValue>
            </DetailRow>
          </SectionCard>
        </div>
      </SectionsContainer>
    </DealDetailContainer>
  );
};

export default DealDetail;
