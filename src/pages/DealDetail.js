import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaPaperclip, FaComment } from 'react-icons/fa';

const DealDetailContainer = styled.div`
  padding: 20px;
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
`;

const DealTitle = styled.h1`
  font-size: 28px;
  margin: 0;
`;

const DealAmount = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #4361ee;
`;

const StageBadge = styled.span`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  background: ${props => {
    switch(props.stage) {
      case 'Prospection': return '#e0e0e0';
      case 'Qualification': return '#ffecb3';
      case 'Prise de contact': return '#ffe082';
      case 'Découverte': return '#ffcc80';
      case 'Proposition de valeur': return '#ffb74d';
      case 'Négociation': return '#ff9800';
      case 'Closing': return '#f57c00';
      case 'Livraison/Onboarding': return '#4caf50';
      case 'Fidélisation/Upsell/Cross-sell': return '#2e7d32';
      default: return '#e0e0e0';
    }
  }};
  color: ${props => {
    switch(props.stage) {
      case 'Prospection': return '#666';
      case 'Qualification': return '#ff8f00';
      case 'Prise de contact': return '#ff6f00';
      case 'Découverte': return '#ef6c00';
      case 'Proposition de valeur': return '#e65100';
      case 'Négociation': return '#fff';
      case 'Closing': return '#fff';
      case 'Livraison/Onboarding': return '#fff';
      case 'Fidélisation/Upsell/Cross-sell': return '#fff';
      default: return '#666';
    }
  }};
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionHeader = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: #666;
  }
  
  p {
    margin: 0;
    font-size: 16px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const DocumentsList = styled.ul`
  list-style: none;
  
  li {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  svg {
    margin-right: 10px;
    color: #4361ee;
  }
`;

const CommentsSection = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
`;

const Comment = styled.div`
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const CommentAuthor = styled.div`
  font-weight: 600;
`;

const CommentDate = styled.div`
  color: #666;
  font-size: 14px;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
`;

const DealDetail = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  
  // Mock data
  const deal = {
    id: 1,
    name: "Contrat avec ABC Corp",
    amount: "€25,000",
    stage: "Négociation",
    company: "ABC Corp",
    contact: "Jean Dupont",
    email: "jean.dupont@abccorp.com",
    phone: "+33 1 23 45 67 89",
    probability: "80%",
    closeDate: "15/04/2023",
    createdDate: "01/02/2023",
    source: "Réseau professionnel",
    priority: "Haute",
    industry: "Technologie",
    companySize: "500-1000 employés",
    acquisitionChannel: "Referral",
    identifiedNeed: "Solution de gestion de projet",
    proposedSolution: "Plateforme ProManager",
    contractType: "Licence annuelle",
    contractDuration: "12 mois",
    paymentMethod: "Virement bancaire",
    lastInteraction: "10/03/2023",
    leadScore: "85",
    lifetimeValue: "€75,000",
    region: "Île-de-France, France",
    internalNotes: "Client très intéressé par les fonctionnalités avancées. Attend des références avant de signer.",
  };
  
  const documents = [
    { id: 1, name: "Proposition commerciale.pdf", date: "05/02/2023" },
    { id: 2, name: "Contrat de service.docx", date: "20/02/2023" },
    { id: 3, name: "Présentation technique.pdf", date: "01/03/2023" },
  ];
  
  const comments = [
    { id: 1, author: "Marie Martin", date: "10/03/2023", text: "Rencontre planifiée avec le directeur technique pour la semaine prochaine." },
    { id: 2, author: "Thomas Bernard", date: "05/03/2023", text: "Client satisfait de la démonstration. Attend la proposition finale." },
  ];
  
  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      alert(`Commentaire ajouté: ${comment}`);
      setComment('');
    }
  };

  return (
    <DealDetailContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Retour aux deals
      </BackLink>
      
      <DealHeader>
        <div>
          <DealTitle>{deal.name}</DealTitle>
          <StageBadge stage={deal.stage}>
            {deal.stage}
          </StageBadge>
        </div>
        <DealAmount>{deal.amount}</DealAmount>
      </DealHeader>
      
      <ActionButtons>
        <button className="btn btn-primary">
          <FaEdit /> Modifier
        </button>
        <button className="btn btn-danger">
          <FaTrash /> Supprimer
        </button>
      </ActionButtons>
      
      <Section>
        <SectionHeader>Informations du deal</SectionHeader>
        <InfoGrid>
          <InfoItem>
            <label>Entreprise</label>
            <p>{deal.company}</p>
          </InfoItem>
          <InfoItem>
            <label>Contact principal</label>
            <p>{deal.contact}</p>
          </InfoItem>
          <InfoItem>
            <label>Email</label>
            <p>{deal.email}</p>
          </InfoItem>
          <InfoItem>
            <label>Téléphone</label>
            <p>{deal.phone}</p>
          </InfoItem>
          <InfoItem>
            <label>Probabilité de closing</label>
            <p>{deal.probability}</p>
          </InfoItem>
          <InfoItem>
            <label>Date de clôture prévue</label>
            <p>{deal.closeDate}</p>
          </InfoItem>
          <InfoItem>
            <label>Date de création</label>
            <p>{deal.createdDate}</p>
          </InfoItem>
          <InfoItem>
            <label>Source du lead</label>
            <p>{deal.source}</p>
          </InfoItem>
          <InfoItem>
            <label>Priorité</label>
            <p>{deal.priority}</p>
          </InfoItem>
        </InfoGrid>
      </Section>
      
      <Section>
        <SectionHeader>Informations complémentaires</SectionHeader>
        <InfoGrid>
          <InfoItem>
            <label>Secteur d'activité</label>
            <p>{deal.industry}</p>
          </InfoItem>
          <InfoItem>
            <label>Taille de l'entreprise</label>
            <p>{deal.companySize}</p>
          </InfoItem>
          <InfoItem>
            <label>Canal d'acquisition</label>
            <p>{deal.acquisitionChannel}</p>
          </InfoItem>
          <InfoItem>
            <label>Besoin identifié</label>
            <p>{deal.identifiedNeed}</p>
          </InfoItem>
          <InfoItem>
            <label>Solution proposée</label>
            <p>{deal.proposedSolution}</p>
          </InfoItem>
          <InfoItem>
            <label>Type de contrat</label>
            <p>{deal.contractType}</p>
          </InfoItem>
          <InfoItem>
            <label>Durée du contrat</label>
            <p>{deal.contractDuration}</p>
          </InfoItem>
          <InfoItem>
            <label>Mode de paiement</label>
            <p>{deal.paymentMethod}</p>
          </InfoItem>
          <InfoItem>
            <label>Date de dernière interaction</label>
            <p>{deal.lastInteraction}</p>
          </InfoItem>
          <InfoItem>
            <label>Score du lead</label>
            <p>{deal.leadScore}</p>
          </InfoItem>
          <InfoItem>
            <label>Valeur à vie estimée</label>
            <p>{deal.lifetimeValue}</p>
          </InfoItem>
          <InfoItem>
            <label>Région/Pays</label>
            <p>{deal.region}</p>
          </InfoItem>
        </InfoGrid>
      </Section>
      
      <Section>
        <SectionHeader>Commentaires internes</SectionHeader>
        <CommentsSection>
          {comments.map(comment => (
            <Comment key={comment.id}>
              <CommentHeader>
                <CommentAuthor>{comment.author}</CommentAuthor>
                <CommentDate>{comment.date}</CommentDate>
              </CommentHeader>
              <p>{comment.text}</p>
            </Comment>
          ))}
          
          <CommentForm onSubmit={handleAddComment}>
            <CommentTextarea 
              placeholder="Ajouter un commentaire..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              <FaComment /> Ajouter un commentaire
            </button>
          </CommentForm>
        </CommentsSection>
      </Section>
      
      <Section>
        <SectionHeader>Documents joints</SectionHeader>
        <DocumentsList>
          {documents.map(doc => (
            <li key={doc.id}>
              <FaPaperclip /> {doc.name} - {doc.date}
            </li>
          ))}
        </DocumentsList>
      </Section>
    </DealDetailContainer>
  );
};

export default DealDetail;
