import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const CreateDealContainer = styled.div`
  padding: 20px;
  max-width: 1000px;
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
  color: #333;
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
  font-family: inherit;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
`;

const FormButton = styled.button`
  background: #4361ee;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #3a56d4;
  }
  
  &.cancel {
    background: #6c757d;
    margin-right: 10px;
    
    &:hover {
      background: #5a6268;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const CreateDeal = () => {
  const [dealData, setDealData] = useState({
    name: '',
    amount: '',
    currency: 'EUR',
    stage: 'Prospection',
    source: '',
    priority: 'Moyenne',
    probability: 20,
    expectedCloseDate: '',
    salesRep: '',
    company: '',
    primaryContact: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
    acquisitionChannel: '',
    identifiedNeed: '',
    proposedSolution: '',
    contractType: 'Contrat annuel',
    contractDuration: '12 mois',
    paymentMethod: 'Facturation mensuelle',
    followUpReminder: '',
    leadScore: 50,
    estimatedLifetimeValue: '',
    region: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDealData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to create the deal
    console.log('Deal data:', dealData);
    alert('Deal créé avec succès!');
    // Reset form or redirect
  };

  return (
    <CreateDealContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Retour aux deals
      </BackLink>
      
      <PageTitle>Créer un nouveau deal</PageTitle>
      
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Informations du Deal</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Nom du deal *</label>
              <FormInput 
                type="text" 
                name="name" 
                value={dealData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label>Montant *</label>
              <FormInput 
                type="number" 
                name="amount" 
                value={dealData.amount}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Devise</label>
              <FormSelect 
                name="currency" 
                value={dealData.currency}
                onChange={handleChange}
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <label>Étape de vente</label>
              <FormSelect 
                name="stage" 
                value={dealData.stage}
                onChange={handleChange}
              >
                <option value="Prospection">Prospection</option>
                <option value="Qualification">Qualification</option>
                <option value="Prise de contact">Prise de contact</option>
                <option value="Découverte">Découverte</option>
                <option value="Proposition de valeur">Proposition de valeur</option>
                <option value="Négociation">Négociation</option>
                <option value="Closing">Closing</option>
                <option value="Livraison/Onboarding">Livraison/Onboarding</option>
                <option value="Fidélisation/Upsell/Cross-sell">Fidélisation/Upsell/Cross-sell</option>
              </FormSelect>
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Source du lead</label>
              <FormInput 
                type="text" 
                name="source" 
                value={dealData.source}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Priorité</label>
              <FormSelect 
                name="priority" 
                value={dealData.priority}
                onChange={handleChange}
              >
                <option value="Basse">Basse</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Haute">Haute</option>
              </FormSelect>
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Probabilité de closing (%)</label>
              <FormInput 
                type="number" 
                name="probability" 
                value={dealData.probability}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </FormGroup>
            
            <FormGroup>
              <label>Date de clôture prévue</label>
              <FormInput 
                type="date" 
                name="expectedCloseDate" 
                value={dealData.expectedCloseDate}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Informations Client</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Client/Entreprise *</label>
              <FormInput 
                type="text" 
                name="company" 
                value={dealData.company}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label>Contact principal *</label>
              <FormInput 
                type="text" 
                name="primaryContact" 
                value={dealData.primaryContact}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Email</label>
              <FormInput 
                type="email" 
                name="email" 
                value={dealData.email}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Téléphone</label>
              <FormInput 
                type="tel" 
                name="phone" 
                value={dealData.phone}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Secteur d'activité</label>
              <FormInput 
                type="text" 
                name="industry" 
                value={dealData.industry}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Taille de l'entreprise</label>
              <FormSelect 
                name="companySize" 
                value={dealData.companySize}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="1-10 employés">1-10 employés</option>
                <option value="11-50 employés">11-50 employés</option>
                <option value="51-200 employés">51-200 employés</option>
                <option value="201-500 employés">201-500 employés</option>
                <option value="500-1000 employés">500-1000 employés</option>
                <option value="1000+ employés">1000+ employés</option>
              </FormSelect>
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Canal d'acquisition</label>
              <FormInput 
                type="text" 
                name="acquisitionChannel" 
                value={dealData.acquisitionChannel}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Région/Pays</label>
              <FormInput 
                type="text" 
                name="region" 
                value={dealData.region}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Détails de l'Offre</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Besoin identifié</label>
              <FormTextarea 
                name="identifiedNeed" 
                value={dealData.identifiedNeed}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Solution proposée</label>
              <FormTextarea 
                name="proposedSolution" 
                value={dealData.proposedSolution}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Type de contrat</label>
              <FormSelect 
                name="contractType" 
                value={dealData.contractType}
                onChange={handleChange}
              >
                <option value="Contrat annuel">Contrat annuel</option>
                <option value="Contrat mensuel">Contrat mensuel</option>
                <option value="Contrat ponctuel">Contrat ponctuel</option>
                <option value="Contrat de service">Contrat de service</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <label>Durée du contrat</label>
              <FormInput 
                type="text" 
                name="contractDuration" 
                value={dealData.contractDuration}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Mode de paiement</label>
              <FormSelect 
                name="paymentMethod" 
                value={dealData.paymentMethod}
                onChange={handleChange}
              >
                <option value="Facturation mensuelle">Facturation mensuelle</option>
                <option value="Facturation trimestrielle">Facturation trimestrielle</option>
                <option value="Facturation annuelle">Facturation annuelle</option>
                <option value="Paiement unique">Paiement unique</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <label>Valeur à vie estimée</label>
              <FormInput 
                type="number" 
                name="estimatedLifetimeValue" 
                value={dealData.estimatedLifetimeValue}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Suivi</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Suivi de relance</label>
              <FormInput 
                type="date" 
                name="followUpReminder" 
                value={dealData.followUpReminder}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Score du lead</label>
              <FormInput 
                type="number" 
                name="leadScore" 
                value={dealData.leadScore}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </FormGroup>
          </FormRow>
          
          <FormGroup>
            <label>Commentaires internes</label>
            <FormTextarea 
              name="internalComments" 
              value={dealData.internalComments || ''}
              onChange={(e) => setDealData({...dealData, internalComments: e.target.value})}
            />
          </FormGroup>
        </FormSection>
        
        <ButtonGroup>
          <FormButton className="cancel" type="button">
            Annuler
          </FormButton>
          <FormButton type="submit">
            Créer le deal
          </FormButton>
        </ButtonGroup>
      </Form>
    </CreateDealContainer>
  );
};

export default CreateDeal;
