import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { dealsApi } from '../api/dealsApi';

const CreateDealContainer = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
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

const PageTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
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
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 20px;
  padding: 10px;
  background: #ffeaea;
  border-radius: 4px;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  margin-bottom: 20px;
  padding: 10px;
  background: #e8f5e9;
  border-radius: 4px;
`;

const CreateDeal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    currency: 'EUR',
    stage: 'Prospection',
    leadSource: '',
    priority: 'Moyenne',
    closingProbability: 0,
    expectedCloseDate: '',
    owner: '',
    company: '',
    primaryContact: '',
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
    comments: '',
    documents: '',
    followUp: '',
    leadScore: 0,
    lifetimeValue: '',
    region: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const dealData = {
        ...formData,
        createdAt: new Date().toISOString(),
        lastInteraction: new Date().toISOString()
      };
      
      await dealsApi.createDeal(dealData);
      setSuccess(true);
      setTimeout(() => navigate('/deals'), 1500);
    } catch (err) {
      setError(err.message || 'Erreur lors de la création du deal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateDealContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Retour aux deals
      </BackLink>
      
      <PageTitle>Créer un nouveau deal</PageTitle>
      
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>Deal créé avec succès ! Redirection...</SuccessMessage>}
        
        <FormSection>
          <SectionTitle>Informations de base</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Nom du deal *</label>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label>Montant *</label>
              <FormInput
                type="number"
                name="amount"
                value={formData.amount}
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
                value={formData.currency}
                onChange={handleChange}
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <label>Étape de vente</label>
              <FormSelect
                name="stage"
                value={formData.stage}
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
                name="leadSource"
                value={formData.leadSource}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Priorité</label>
              <FormSelect
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Basse">Basse</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Haute">Haute</option>
                <option value="Urgente">Urgente</option>
              </FormSelect>
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Probabilité de closing (%)</label>
              <FormInput
                type="number"
                name="closingProbability"
                value={formData.closingProbability}
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
                value={formData.expectedCloseDate}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Informations sur le client</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Entreprise *</label>
              <FormInput
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label>Contact principal *</label>
              <FormInput
                type="text"
                name="primaryContact"
                value={formData.primaryContact}
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
                value={formData.email}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Téléphone</label>
              <FormInput
                type="tel"
                name="phone"
                value={formData.phone}
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
                value={formData.industry}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Taille de l'entreprise</label>
              <FormSelect
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="1-10">1-10 employés</option>
                <option value="11-50">11-50 employés</option>
                <option value="51-200">51-200 employés</option>
                <option value="201-500">201-500 employés</option>
                <option value="501-1000">501-1000 employés</option>
                <option value="1000+">1000+ employés</option>
              </FormSelect>
            </FormGroup>
          </FormRow>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Détails du deal</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Canal d'acquisition</label>
              <FormInput
                type="text"
                name="acquisitionChannel"
                value={formData.acquisitionChannel}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Besoin identifié</label>
              <FormInput
                type="text"
                name="identifiedNeed"
                value={formData.identifiedNeed}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Solution proposée</label>
              <FormTextarea
                name="proposedSolution"
                value={formData.proposedSolution}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Type de contrat</label>
              <FormInput
                type="text"
                name="contractType"
                value={formData.contractType}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Durée du contrat</label>
              <FormInput
                type="text"
                name="contractDuration"
                value={formData.contractDuration}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Mode de paiement</label>
              <FormInput
                type="text"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Score du lead</label>
              <FormInput
                type="number"
                name="leadScore"
                value={formData.leadScore}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Valeur à vie estimée</label>
              <FormInput
                type="text"
                name="lifetimeValue"
                value={formData.lifetimeValue}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Région/Pays</label>
              <FormInput
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
        </FormSection>
        
        <FormSection>
          <SectionTitle>Informations supplémentaires</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Responsable commercial</label>
              <FormInput
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Suivi de relance</label>
              <FormInput
                type="text"
                name="followUp"
                value={formData.followUp}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Documents joints</label>
              <FormInput
                type="text"
                name="documents"
                value={formData.documents}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <label>Commentaires internes</label>
              <FormTextarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
        </FormSection>
        
        <FormButton type="submit" disabled={loading}>
          {loading ? 'Création en cours...' : 'Créer le deal'}
        </FormButton>
      </Form>
    </CreateDealContainer>
  );
};

export default CreateDeal;
