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
  font-family: inherit;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
`;

const CreateDeal = () => {
  const [dealData, setDealData] = useState({
    name: '',
    amount: '',
    currency: 'EUR',
    status: 'Ouvert',
    stage: 'Prospection',
    leadSource: '',
    priority: 'Moyenne',
    closeDate: '',
    responsible: '',
    company: '',
    contact: '',
    email: '',
    phone: '',
    industry: '',
    companySize: '',
    acquisitionChannel: '',
    identifiedNeed: '',
    proposedSolution: '',
    contractType: '',
    contractDuration: '',
    paymentMethod: '',
    internalNotes: '',
    leadScore: '',
    lifetimeValue: '',
    region: '',
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
    console.log('Deal data:', dealData);
    alert('Deal créé avec succès!');
    // Here you would typically send the data to your backend
  };

  return (
    <CreateDealContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Retour aux deals
      </BackLink>
      
      <PageTitle>Nouveau Deal</PageTitle>
      
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Informations du deal</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="name">Nom du deal *</label>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={dealData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="amount">Montant *</label>
              <FormInput
                type="number"
                id="amount"
                name="amount"
                value={dealData.amount}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label htmlFor="currency">Devise</label>
              <FormSelect
                id="currency"
                name="currency"
                value={dealData.currency}
                onChange={handleChange}
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="status">Statut</label>
              <FormSelect
                id="status"
                name="status"
                value={dealData.status}
                onChange={handleChange}
              >
                <option value="Ouvert">Ouvert</option>
                <option value="Gagné">Gagné</option>
                <option value="Perdu">Perdu</option>
                <option value="Suspendu">Suspendu</option>
              </FormSelect>
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label htmlFor="stage">Étape de vente *</label>
              <FormSelect
                id="stage"
                name="stage"
                value={dealData.stage}
                onChange={handleChange}
                required
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
            
            <FormGroup>
              <label htmlFor="priority">Priorité</label>
              <FormSelect
                id="priority"
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
              <label htmlFor="leadSource">Source du lead</label>
              <FormInput
                type="text"
                id="leadSource"
                name="leadSource"
                value={dealData.leadSource}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="closeDate">Date de clôture prévue</label>
              <FormInput
                type="date"
                id="closeDate"
                name="closeDate"
                value={dealData.closeDate}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label htmlFor="responsible">Responsable commercial</label>
              <FormInput
                type="text"
                id="responsible"
                name="responsible"
                value={dealData.responsible}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="probability">Probabilité de closing (%)</label>
              <FormInput
                type="number"
                id="probability"
                name="probability"
                value={dealData.probability}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </FormGroup>
          </FormRow>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Informations client</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="company">Client/Entreprise *</label>
              <FormInput
                type="text"
                id="company"
                name="company"
                value={dealData.company}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="contact">Contact principal</label>
              <FormInput
                type="text"
                id="contact"
                name="contact"
                value={dealData.contact}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={dealData.email}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="phone">Téléphone</label>
              <FormInput
                type="tel"
                id="phone"
                name="phone"
                value={dealData.phone}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label htmlFor="industry">Secteur d'activité</label>
              <FormInput
                type="text"
                id="industry"
                name="industry"
                value={dealData.industry}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="companySize">Taille de l'entreprise</label>
              <FormSelect
                id="companySize"
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
              <label htmlFor="acquisitionChannel">Canal d'acquisition</label>
              <FormInput
                type="text"
                id="acquisitionChannel"
                name="acquisitionChannel"
                value={dealData.acquisitionChannel}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="region">Région/Pays</label>
              <FormInput
                type="text"
                id="region"
                name="region"
                value={dealData.region}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Détails de l'offre</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="identifiedNeed">Besoin identifié</label>
              <FormTextarea
                id="identifiedNeed"
                name="identifiedNeed"
                value={dealData.identifiedNeed}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="proposedSolution">Solution proposée</label>
              <FormTextarea
                id="proposedSolution"
                name="proposedSolution"
                value={dealData.proposedSolution}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label htmlFor="contractType">Type de contrat</label>
              <FormInput
                type="text"
                id="contractType"
                name="contractType"
                value={dealData.contractType}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="contractDuration">Durée du contrat</label>
              <FormInput
                type="text"
                id="contractDuration"
                name="contractDuration"
                value={dealData.contractDuration}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label htmlFor="paymentMethod">Mode de paiement</label>
              <FormInput
                type="text"
                id="paymentMethod"
                name="paymentMethod"
                value={dealData.paymentMethod}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="lifetimeValue">Valeur à vie estimée</label>
              <FormInput
                type="number"
                id="lifetimeValue"
                name="lifetimeValue"
                value={dealData.lifetimeValue}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Informations complémentaires</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="leadScore">Score du lead</label>
              <FormInput
                type="number"
                id="leadScore"
                name="leadScore"
                value={dealData.leadScore}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="lastInteraction">Date de dernière interaction</label>
              <FormInput
                type="date"
                id="lastInteraction"
                name="lastInteraction"
                value={dealData.lastInteraction}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormGroup>
            <label htmlFor="internalNotes">Commentaires internes</label>
            <FormTextarea
              id="internalNotes"
              name="internalNotes"
              value={dealData.internalNotes}
              onChange={handleChange}
            />
          </FormGroup>
        </FormSection>
        
        <FormActions>
          <Link to="/deals" className="btn btn-secondary">
            Annuler
          </Link>
          <button type="submit" className="btn btn-primary">
            Créer le deal
          </button>
        </FormActions>
      </Form>
    </CreateDealContainer>
  );
};

export default CreateDeal;
