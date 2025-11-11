import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const CreateDealContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
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

const PageTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    font-weight: 600;
    margin-bottom: 5px;
    color: #333;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-family: inherit; /* Ensures textarea uses the same font as other inputs */
  resize: vertical; /* Allows vertical resizing */
`;

const SubmitButton = styled.button`
  background: #4361ee;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #3a56d4;
  }
`;

const CreateDeal = () => {
  const [dealName, setDealName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [salesStage, setSalesStage] = useState('Prospection');
  const [leadSource, setLeadSource] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [probability, setProbability] = useState(50);
  const [dueDate, setDueDate] = useState('');
  const [salesRep, setSalesRep] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [acquisitionChannel, setAcquisitionChannel] = useState('');
  const [identifiedNeed, setIdentifiedNeed] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [contractType, setContractType] = useState('');
  const [contractDuration, setContractDuration] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [internalComments, setInternalComments] = useState('');

  const salesStages = [
    'Prospection', 'Qualification', 'Prise de contact', 'Découverte', 
    'Proposition de valeur', 'Négociation', 'Closing', 'Livraison/Onboarding', 
    'Fidélisation/Upsell/Cross-sell'
  ];
  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to an API
    console.log('Deal created:', {
      dealName, amount, currency, salesStage, leadSource, priority, 
      probability, dueDate, salesRep, clientCompany, contactPerson, 
      email, phone, industry, companySize, acquisitionChannel, 
      identifiedNeed, proposedSolution, contractType, contractDuration, 
      paymentMode, internalComments
    });
    alert('Deal created successfully! (Check console)');
  };

  return (
    <CreateDealContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Retour à la liste des deals
      </BackLink>
      <PageTitle>Créer un nouveau deal</PageTitle>
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Informations Générales</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="dealName">Nom du deal</label>
              <FormInput 
                id="dealName" 
                type="text" 
                value={dealName} 
                onChange={(e) => setDealName(e.target.value)} 
                required 
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="amount">Montant</label>
              <FormInput 
                id="amount" 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                required 
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="currency">Devise</label>
              <FormSelect id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </FormSelect>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="salesStage">Étape de vente</label>
              <FormSelect id="salesStage" value={salesStage} onChange={(e) => setSalesStage(e.target.value)}>
                {salesStages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <label htmlFor="leadSource">Source du lead</label>
              <FormInput 
                id="leadSource" 
                type="text" 
                value={leadSource} 
                onChange={(e) => setLeadSource(e.target.value)} 
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="priority">Priorité</label>
              <FormSelect id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                {priorities.map(p => <option key={p} value={p}>{p}</option>)}
              </FormSelect>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="probability">Probabilité de closing (%)</label>
              <FormInput 
                id="probability" 
                type="number" 
                min="0" 
                max="100" 
                value={probability} 
                onChange={(e) => setProbability(parseInt(e.target.value, 10))} 
                required 
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="dueDate">Date de clôture prévue</label>
              <FormInput 
                id="dueDate" 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
              />
            </FormGroup>
          </FormRow>
        </FormSection>

        <FormSection>
          <SectionTitle>Détails du Client/Entreprise</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="clientCompany">Client/Entreprise</label>
              <FormInput 
                id="clientCompany" 
                type="text" 
                value={clientCompany} 
                onChange={(e) => setClientCompany(e.target.value)} 
                required 
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="contactPerson">Contact principal</label>
              <FormInput 
                id="contactPerson" 
                type="text" 
                value={contactPerson} 
                onChange={(e) => setContactPerson(e.target.value)} 
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <FormInput 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="phone">Téléphone</label>
              <FormInput 
                id="phone" 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="industry">Secteur d’activité</label>
              <FormInput 
                id="industry" 
                type="text" 
                value={industry} 
                onChange={(e) => setIndustry(e.target.value)} 
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="companySize">Taille de l’entreprise</label>
              <FormInput 
                id="companySize" 
                type="text" 
                value={companySize} 
                onChange={(e) => setCompanySize(e.target.value)} 
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="acquisitionChannel">Canal d’acquisition</label>
              <FormInput 
                id="acquisitionChannel" 
                type="text" 
                value={acquisitionChannel} 
                onChange={(e) => setAcquisitionChannel(e.target.value)} 
              />
            </FormGroup>
          </FormRow>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Détails du Deal</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="identifiedNeed">Besoin identifié</label>
              <FormTextarea 
                id="identifiedNeed" 
                rows="3" 
                value={identifiedNeed} 
                onChange={(e) => setIdentifiedNeed(e.target.value)} 
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="proposedSolution">Solution proposée</label>
              <FormTextarea 
                id="proposedSolution" 
                rows="3" 
                value={proposedSolution} 
                onChange={(e) => setProposedSolution(e.target.value)} 
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="contractType">Type de contrat</label>
              <FormInput 
                id="contractType" 
                type="text" 
                value={contractType} 
                onChange={(e) => setContractType(e.target.value)} 
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="contractDuration">Durée du contrat</label>
              <FormInput 
                id="contractDuration" 
                type="text" 
                value={contractDuration} 
                onChange={(e) => setContractDuration(e.target.value)} 
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="paymentMode">Mode de paiement</label>
              <FormInput 
                id="paymentMode" 
                type="text" 
                value={paymentMode} 
                onChange={(e) => setPaymentMode(e.target.value)} 
              />
            </FormGroup>
          </FormRow>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Informations Internes</SectionTitle>
          <FormGroup>
            <label htmlFor="internalComments">Commentaires internes</label>
            <FormTextarea 
              id="internalComments" 
              rows="4" 
              value={internalComments} 
              onChange={(e) => setInternalComments(e.target.value)} 
            />
          </FormGroup>
        </FormSection>

        <SubmitButton type="submit">Créer le Deal</SubmitButton>
      </Form>
    </CreateDealContainer>
  );
};

export default CreateDeal;
