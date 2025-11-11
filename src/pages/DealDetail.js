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
      case 'Qualification': return '#f57f17';
      case 'Prise de contact': return '#f57f17';
      case 'Découverte': return '#e65100';
      case 'Proposition de valeur': return '#e65100';
      case 'Négociation': return '#fff';
      case 'Closing': return '#fff';
      case 'Livraison/Onboarding': return '#fff';
      case 'Fidélisation/Upsell/Cross-sell': return '#fff';
      default: return '#424242';
    }
  }};
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled(Link)`
  background: #f0f4f8;
  color: #4361ee;
  padding: 10px 15px;
  border-radius: 4px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease;
  border: none;
  cursor: pointer;

  &:hover {
    background: #e0e7ee;
    color: #3a56d4;
  }

  svg {
    margin-right: 8px;
  }
`;

const EditButton = styled(ActionButton)`
  background: #ffc107;
  color: #333;
  &:hover {
    background: #e0a800;
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #dc3545;
  color: white;
  &:hover {
    background: #c82333;
  }
`;

const DetailsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 25px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #333;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #555;
  
  svg {
    margin-right: 12px;
    color: #4361ee;
    font-size: 18px;
  }
  
  span {
    font-weight: 500;
    color: #333;
  }
`;

const DetailLabel = styled.div`
  font-weight: 600;
  color: #666;
  min-width: 180px; /* Adjust as needed */
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const DetailValue = styled.div`
  flex-grow: 1;
`;

const NotesSection = styled(Section)`
  grid-column: 1 / -1; /* Span across both columns */
`;

const NoteItem = styled.div`
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const NoteAuthor = styled.span`
  font-weight: 600;
  color: #4361ee;
`;

const NoteTimestamp = styled.span`
  font-size: 12px;
  color: #999;
`;

const NoteContent = styled.p`
  margin: 0;
  color: #444;
  line-height: 1.5;
`;

const AddNoteForm = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  textarea {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    font-family: inherit;
    resize: vertical;
  }

  button {
    background: #4361ee;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
    align-self: flex-start;

    &:hover {
      background: #3a56d4;
    }
  }
`;

const DealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState(null);
  const [newNote, setNewNote] = useState('');

  // Mock fetch for deal data
  useEffect(() => {
    const fetchDeal = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500)); 
      const mockDealData = {
        id: id,
        name: `Deal ${id}`,
        amount: 50000,
        currency: 'USD',
        stage: 'Négociation',
        status: 'Open',
        leadSource: 'Website',
        priority: 'High',
        probability: 75,
        creationDate: '2024-07-20',
        expectedCloseDate: '2024-08-15',
        salesRep: 'Alice Smith',
        clientCompany: 'Tech Solutions Inc.',
        contactPerson: 'Bob Johnson',
        email: 'bob.johnson@techsolutions.com',
        phone: '123-456-7890',
        industry: 'Technology',
        companySize: '50-100 employees',
        acquisitionChannel: 'Organic Search',
        identifiedNeed: 'Scalable cloud infrastructure',
        proposedSolution: 'Custom cloud migration and management service',
        contractType: 'Service Agreement',
        contractDuration: '12 months',
        paymentMode: 'Monthly Invoice',
        lastInteraction: '2024-07-28',
        internalComments: 'Client is very interested in long-term partnership.',
        documents: ['proposal.pdf', 'contract_draft.docx'],
        followUp: 'Scheduled for next week',
        leadScore: 85,
        estimatedLifetimeValue: '$250,000',
        region: 'North America',
        notes: [
          { id: 1, author: 'Alice Smith', timestamp: '2024-07-25 10:30 AM', content: 'Initial call went well. Client has clear requirements.' },
          { id: 2, author: 'Bob Johnson (Client)', timestamp: '2024-07-27 02:15 PM', content: 'Received proposal. Reviewing internally. Expect feedback by Friday.' },
        ]
      };
      setDeal(mockDealData);
    };
    fetchDeal();
  }, [id]);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete deal "${deal?.name}"?`)) {
      // Simulate API call for deletion
      console.log(`Deleting deal ${id}`);
      alert('Deal deleted successfully! (Check console)');
      navigate('/deals');
    }
  };

  const handleAddNote = () => {
    if (newNote.trim() === '') return;
    const newNoteData = {
      id: Date.now(), // Simple ID generation
      author: 'You', // Assuming current user
      timestamp: new Date().toLocaleString(),
      content: newNote,
    };
    setDeal({ ...deal, notes: [...deal.notes, newNoteData] });
    setNewNote('');
    // In a real app, send this to the API
    console.log('Adding new note:', newNoteData);
  };

  if (!deal) {
    return <DealDetailContainer><p>Loading deal details...</p></DealDetailContainer>;
  }

  return (
    <DealDetailContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Retour à la liste des deals
      </BackLink>
      <DealHeader>
        <DealTitleAndStatus>
          <DealTitle>{deal.name}</DealTitle>
          <DealAmount>{deal.amount.toLocaleString('en-US', { style: 'currency', currency: deal.currency })}</DealAmount>
          <StageBadge stage={deal.stage}>{deal.stage}</StageBadge>
        </DealTitleAndStatus>
        <Actions>
          <EditButton to={`/deals/edit/${deal.id}`}>
            <FaEdit /> Modifier
          </EditButton>
          <DeleteButton onClick={handleDelete}>
            <FaTrash /> Supprimer
          </DeleteButton>
        </Actions>
      </DealHeader>

      <DetailsSection>
        <Section>
          <SectionTitle>Informations Générales</SectionTitle>
          <DetailItem>
            <DetailLabel><FaCalendarAlt /> Date de création</DetailLabel>
            <DetailValue>{deal.creationDate}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaCalendarAlt /> Date de clôture prévue</DetailLabel>
            <DetailValue>{deal.expectedCloseDate}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaTag /> Source du lead</DetailLabel>
            <DetailValue>{deal.leadSource}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaTag /> Priorité</DetailLabel>
            <DetailValue>{deal.priority}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaChartLine /> Probabilité de closing</DetailLabel>
            <DetailValue>{deal.probability}%</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaChartLine /> Score du lead</DetailLabel>
            <DetailValue>{deal.leadScore}</DetailValue>
          </DetailItem>
        </Section>

        <Section>
          <SectionTitle>Client & Contact</SectionTitle>
          <DetailItem>
            <DetailLabel><FaBuilding /> Client/Entreprise</DetailLabel>
            <DetailValue>{deal.clientCompany}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaUser /> Contact principal</DetailLabel>
            <DetailValue>{deal.contactPerson}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaEnvelope /> Email</DetailLabel>
            <DetailValue>{deal.email}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaPhone /> Téléphone</DetailLabel>
            <DetailValue>{deal.phone}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaIndustry /> Secteur d’activité</DetailLabel>
            <DetailValue>{deal.industry}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaBuilding /> Taille de l’entreprise</DetailLabel>
            <DetailValue>{deal.companySize}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaTag /> Canal d’acquisition</DetailLabel>
            <DetailValue>{deal.acquisitionChannel}</DetailValue>
          </DetailItem>
        </Section>

        <Section>
          <SectionTitle>Détails du Deal</SectionTitle>
          <DetailItem>
            <DetailLabel><FaTag /> Besoin identifié</DetailLabel>
            <DetailValue>{deal.identifiedNeed}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaTag /> Solution proposée</DetailLabel>
            <DetailValue>{deal.proposedSolution}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaTag /> Type de contrat</DetailLabel>
            <DetailValue>{deal.contractType}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaTag /> Durée du contrat</DetailLabel>
            <DetailValue>{deal.contractDuration}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaTag /> Mode de paiement</DetailLabel>
            <DetailValue>{deal.paymentMode}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaChartLine /> Valeur à vie estimée</DetailLabel>
            <DetailValue>{deal.estimatedLifetimeValue}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaTag /> Région/Pays</DetailLabel>
            <DetailValue>{deal.region}</DetailValue>
          </DetailItem>
        </Section>

        <Section>
          <SectionTitle>Responsable & Suivi</SectionTitle>
          <DetailItem>
            <DetailLabel><FaUser /> Responsable commercial</DetailLabel>
            <DetailValue>{deal.salesRep}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaCalendarAlt /> Dernière interaction</DetailLabel>
            <DetailValue>{deal.lastInteraction}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel><FaTag /> Suivi de relance</DetailLabel>
            <DetailValue>{deal.followUp}</DetailValue>
          </DetailItem>
        </Section>

        <Section>
          <SectionTitle>Documents</SectionTitle>
          {deal.documents.length > 0 ? (
            deal.documents.map((doc, index) => (
              <DetailItem key={index}>
                <FaPaperclip />
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#4361ee', textDecoration: 'none' }}>{doc}</a>
              </DetailItem>
            ))
          ) : (
            <p>Aucun document joint.</p>
          )}
        </Section>
        
        <Section>
          <SectionTitle>Commentaires internes</SectionTitle>
          <DetailItem>
            <DetailValue>{deal.internalComments}</DetailValue>
          </DetailItem>
        </Section>

        <NotesSection>
          <SectionTitle>Notes & Activités <FaComment /></SectionTitle>
          {deal.notes.map(note => (
            <NoteItem key={note.id}>
              <NoteHeader>
                <NoteAuthor>{note.author}</NoteAuthor>
                <NoteTimestamp>{note.timestamp}</NoteTimestamp>
              </NoteHeader>
              <NoteContent>{note.content}</NoteContent>
            </NoteItem>
          ))}
          <AddNoteForm>
            <textarea 
              rows="3" 
              placeholder="Ajouter une note..." 
              value={newNote} 
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button onClick={handleAddNote}>Ajouter la Note</button>
          </AddNoteForm>
        </NotesSection>
      </DetailsSection>
    </DealDetailContainer>
  );
};

export default DealDetail;
