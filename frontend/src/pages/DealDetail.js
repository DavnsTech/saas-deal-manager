import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaEdit, 
  FaTrash, 
  FaPaperclip, 
  FaComment, 
  FaCalendarAlt, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaIndustry, 
  FaBuilding, 
  FaTag 
} from 'react-icons/fa';

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
      case 'Qualification': return '#947600';
      case 'Prise de contact': return '#947600';
      case 'Découverte': return '#947600';
      case 'Proposition de valeur': return '#947600';
      case 'Négociation': return '#947600';
      case 'Closing': return '#947600';
      case 'Livraison/Onboarding': return '#1b5e20';
      case 'Fidélisation/Upsell/Cross-sell': return '#1b5e20';
      default: return '#424242';
    }
  }};
  align-self: flex-start;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
  
  svg {
    margin-right: 5px;
  }
  
  &.edit {
    background: #4361ee;
    color: white;
    
    &:hover {
      background: #3a56d4;
    }
  }
  
  &.delete {
    background: #dc3545;
    color: white;
    
    &:hover {
      background: #c82333;
    }
  }
`;

const DetailSection = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin-bottom: 25px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #333;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const DetailItem = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: #555;
    font-size: 14px;
  }
  
  span {
    display: block;
    font-size: 16px;
    color: #333;
  }
`;

const ContactCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-top: 10px;
`;

const CommentSection = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 25px;
`;

const CommentForm = styled.form`
  display: flex;
  margin-top: 20px;
`;

const CommentInput = styled.textarea`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 16px;
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
`;

const CommentButton = styled.button`
  background: #4361ee;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  margin-left: 10px;
  cursor: pointer;
  font-weight: 600;
  align-self: flex-start;
  
  &:hover {
    background: #3a56d4;
  }
`;

const CommentsList = styled.div`
  margin-top: 30px;
`;

const Comment = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CommentAuthor = styled.div`
  font-weight: 600;
  color: #333;
`;

const CommentDate = styled.div`
  font-size: 14px;
  color: #666;
`;

const CommentText = styled.div`
  color: #444;
  line-height: 1.5;
`;

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const deal = {
    id: id,
    name: 'Contrat ABC Corporation',
    amount: 75000,
    currency: 'EUR',
    stage: 'Négociation',
    source: 'Réseau',
    priority: 'Haute',
    probability: 80,
    createdDate: '2023-06-15',
    expectedCloseDate: '2023-09-30',
    salesRep: 'Marie Dubois',
    company: 'ABC Corporation',
    primaryContact: 'Jean Martin',
    email: 'jean.martin@abccorp.com',
    phone: '+33 1 23 45 67 89',
    industry: 'Technologie',
    companySize: '500-1000 employés',
    acquisitionChannel: 'Partenariat',
    identifiedNeed: 'Solution de gestion CRM',
    proposedSolution: 'Plateforme CRM personnalisée',
    contractType: 'Contrat annuel',
    contractDuration: '12 mois',
    paymentMethod: 'Facturation mensuelle',
    lastInteraction: '2023-07-18',
    internalComments: 'Client très intéressé, négociations en cours',
    followUpReminder: 'Relance prévue le 2023-07-25',
    leadScore: 85,
    estimatedLifetimeValue: 150000,
    region: 'Île-de-France'
  };

  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Marie Dubois',
      date: '2023-07-15',
      text: 'Premier contact établi. Le client est intéressé par notre solution.'
    },
    {
      id: 2,
      author: 'Pierre Lambert',
      date: '2023-07-18',
      text: 'Négociations en cours sur le prix. Attendre leur réponse.'
    }
  ]);

  const [newComment, setNewComment] = useState('');

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce deal ?')) {
      // In a real app, this would call an API to delete the deal
      alert('Deal supprimé avec succès');
      navigate('/deals');
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'Utilisateur Actuel',
        date: new Date().toISOString().split('T')[0],
        text: newComment
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  return (
    <DealDetailContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Retour aux deals
      </BackLink>
      
      <DealHeader>
        <DealTitleAndStatus>
          <DealTitle>{deal.name}</DealTitle>
          <DealAmount>{deal.amount.toLocaleString('fr-FR')} {deal.currency}</DealAmount>
          <StageBadge stage={deal.stage}>{deal.stage}</StageBadge>
        </DealTitleAndStatus>
        
        <ActionButtons>
          <ActionButton className="edit">
            <FaEdit /> Modifier
          </ActionButton>
          <ActionButton className="delete" onClick={handleDelete}>
            <FaTrash /> Supprimer
          </ActionButton>
        </ActionButtons>
      </DealHeader>
      
      <DetailSection>
        <SectionTitle>Informations du Deal</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <label>Statut</label>
            <span>{deal.stage}</span>
          </DetailItem>
          <DetailItem>
            <label>Source du lead</label>
            <span>{deal.source}</span>
          </DetailItem>
          <DetailItem>
            <label>Priorité</label>
            <span>{deal.priority}</span>
          </DetailItem>
          <DetailItem>
            <label>Probabilité de closing</label>
            <span>{deal.probability}%</span>
          </DetailItem>
          <DetailItem>
            <label>Date de création</label>
            <span>{deal.createdDate}</span>
          </DetailItem>
          <DetailItem>
            <label>Date de clôture prévue</label>
            <span>{deal.expectedCloseDate}</span>
          </DetailItem>
          <DetailItem>
            <label>Responsable commercial</label>
            <span>{deal.salesRep}</span>
          </DetailItem>
          <DetailItem>
            <label>Valeur à vie estimée</label>
            <span>{deal.estimatedLifetimeValue.toLocaleString('fr-FR')} {deal.currency}</span>
          </DetailItem>
        </DetailGrid>
      </DetailSection>
      
      <DetailSection>
        <SectionTitle>Informations Client</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <label>Client/Entreprise</label>
            <span>{deal.company}</span>
          </DetailItem>
          <DetailItem>
            <label>Contact principal</label>
            <span>{deal.primaryContact}</span>
          </DetailItem>
          <DetailItem>
            <label>Email</label>
            <span>{deal.email}</span>
          </DetailItem>
          <DetailItem>
            <label>Téléphone</label>
            <span>{deal.phone}</span>
          </DetailItem>
          <DetailItem>
            <label>Secteur d'activité</label>
            <span>{deal.industry}</span>
          </DetailItem>
          <DetailItem>
            <label>Taille de l'entreprise</label>
            <span>{deal.companySize}</span>
          </DetailItem>
          <DetailItem>
            <label>Canal d'acquisition</label>
            <span>{deal.acquisitionChannel}</span>
          </DetailItem>
          <DetailItem>
            <label>Région/Pays</label>
            <span>{deal.region}</span>
          </DetailItem>
        </DetailGrid>
        
        <ContactCard>
          <h3>Détails du Contact</h3>
          <DetailGrid>
            <DetailItem>
              <label>Nom</label>
              <span>{deal.primaryContact}</span>
            </DetailItem>
            <DetailItem>
              <label>Email</label>
              <span>{deal.email}</span>
            </DetailItem>
            <DetailItem>
              <label>Téléphone</label>
              <span>{deal.phone}</span>
            </DetailItem>
          </DetailGrid>
        </ContactCard>
      </DetailSection>
      
      <DetailSection>
        <SectionTitle>Détails de l'Offre</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <label>Besoin identifié</label>
            <span>{deal.identifiedNeed}</span>
          </DetailItem>
          <DetailItem>
            <label>Solution proposée</label>
            <span>{deal.proposedSolution}</span>
          </DetailItem>
          <DetailItem>
            <label>Type de contrat</label>
            <span>{deal.contractType}</span>
          </DetailItem>
          <DetailItem>
            <label>Durée du contrat</label>
            <span>{deal.contractDuration}</span>
          </DetailItem>
          <DetailItem>
            <label>Mode de paiement</label>
            <span>{deal.paymentMethod}</span>
          </DetailItem>
        </DetailGrid>
      </DetailSection>
      
      <DetailSection>
        <SectionTitle>Suivi</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <label>Date de dernière interaction</label>
            <span>{deal.lastInteraction}</span>
          </DetailItem>
          <DetailItem>
            <label>Score du lead</label>
            <span>{deal.leadScore}/100</span>
          </DetailItem>
          <DetailItem>
            <label>Suivi de relance</label>
            <span>{deal.followUpReminder}</span>
          </DetailItem>
        </DetailGrid>
        
        <DetailItem>
          <label>Commentaires internes</label>
          <span>{deal.internalComments}</span>
        </DetailItem>
        
        <DetailItem>
          <label>Documents joints</label>
          <span><FaPaperclip /> 3 fichiers joints</span>
        </DetailItem>
      </DetailSection>
      
      <CommentSection>
        <SectionTitle>Commentaires</SectionTitle>
        <CommentForm onSubmit={handleAddComment}>
          <CommentInput 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
          />
          <CommentButton type="submit">
            <FaComment /> Ajouter
          </CommentButton>
        </CommentForm>
        
        <CommentsList>
          {comments.map(comment => (
            <Comment key={comment.id}>
              <CommentHeader>
                <CommentAuthor>{comment.author}</CommentAuthor>
                <CommentDate>{comment.date}</CommentDate>
              </CommentHeader>
              <CommentText>{comment.text}</CommentText>
            </Comment>
          ))}
        </CommentsList>
      </CommentSection>
    </DealDetailContainer>
  );
};

export default DealDetail;
