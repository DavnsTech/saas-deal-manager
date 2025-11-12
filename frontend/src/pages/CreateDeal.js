import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useDeals } from '../contexts/DealContext';

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
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
`;

const SubmitButton = styled.button`
  background: #4361ee;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #3a56d4;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CreateDeal = () => {
  const { addDeal, loading, error } = useDeals();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    currency: 'EUR',
    status: 'Prospection',
    priority: 'Medium',
    probability: '',
    createdDate: '',
    closeDate: '',
    responsible: '',
    clientCompany: '',
    contact: '',
    email: '',
    phone: '',
    sector: '',
    companySize: '',
    acquisitionChannel: '',
    identifiedNeed: '',
    proposedSolution: '',
    contractType: '',
    contractDuration: '',
    paymentMethod: '',
    lastInteraction: '',
    internalComments: '',
    documents: '',
    followUp: '',
    leadScore: '',
    lifetimeValue: '',
    region: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDeal(formData);
      // Redirect or show success
      alert('Deal created successfully!');
      setFormData({ // Reset form
        name: '',
        amount: '',
        currency: 'EUR',
        status: 'Prospection',
        priority: 'Medium',
        probability: '',
        createdDate: '',
        closeDate: '',
        responsible: '',
        clientCompany: '',
        contact: '',
        email: '',
        phone: '',
        sector: '',
        companySize: '',
        acquisitionChannel: '',
        identifiedNeed: '',
        proposedSolution: '',
        contractType: '',
        contractDuration: '',
        paymentMethod: '',
        lastInteraction: '',
        internalComments: '',
        documents: '',
        followUp: '',
        leadScore: '',
        lifetimeValue: '',
        region: ''
      });
    } catch (err) {
      // Error handled in context
    }
  };

  return (
    <CreateDealContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Retour aux deals
      </BackLink>
      <PageTitle>Créer un nouveau deal</PageTitle>
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Informations de base</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Nom du deal</label>
              <FormInput type="text" name="name" value={formData.name} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <label>Montant</label>
              <FormInput type="number" name="amount" value={formData.amount} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Devise</label>
              <FormSelect name="currency" value={formData.currency} onChange={handleChange}>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </FormSelect>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Étape de vente</label>
              <FormSelect name="status" value={formData.status} onChange={handleChange}>
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
              <label>Priorité</label>
              <FormSelect name="priority" value={formData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <label>Probabilité de closing (%)</label>
              <FormInput type="number" name="probability" value={formData.probability} onChange={handleChange} min="0" max="100" />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Date de création</label>
              <FormInput type="date" name="createdDate" value={formData.createdDate} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Date de clôture prévue</label>
              <FormInput type="date" name="closeDate" value={formData.closeDate} onChange={handleChange} />
            </FormGroup>
          </FormRow>
        </FormSection>
        <FormSection>
          <SectionTitle>Informations client</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Entreprise</label>
              <FormInput type="text" name="clientCompany" value={formData.clientCompany} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Contact principal</label>
              <FormInput type="text" name="contact" value={formData.contact} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Email</label>
              <FormInput type="email" name="email" value={formData.email} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Téléphone</label>
              <FormInput type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Secteur d'activité</label>
              <FormInput type="text" name="sector" value={formData.sector} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Taille de l'entreprise</label>
              <FormSelect name="companySize" value={formData.companySize} onChange={handleChange}>
                <option value="">Sélectionner</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-1000">201-1000</option>
                <option value="1000+">1000+</option>
              </FormSelect>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Canal d'acquisition</label>
              <FormInput type="text" name="acquisitionChannel" value={formData.acquisitionChannel} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Région/Pays</label>
              <FormInput type="text" name="region" value={formData.region} onChange={handleChange} />
            </FormGroup>
          </FormRow>
        </FormSection>
        <FormSection>
          <SectionTitle>Détails du deal</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Besoin identifié</label>
              <FormTextarea name="identifiedNeed" value={formData.identifiedNeed} onChange={handleChange} rows="3" />
            </FormGroup>
            <FormGroup>
              <label>Solution proposée</label>
              <FormTextarea name="proposedSolution" value={formData.proposedSolution} onChange={handleChange} rows="3" />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Type de contrat</label>
              <FormInput type="text" name="contractType" value={formData.contractType} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Durée du contrat</label>
              <FormInput type="text" name="contractDuration" value={formData.contractDuration} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Mode de paiement</label>
              <FormInput type="text" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Responsable commercial</label>
              <FormInput type="text" name="responsible" value={formData.responsible} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Score du lead</label>
              <FormInput type="number" name="leadScore" value={formData.leadScore} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Valeur à vie estimée</label>
              <FormInput type="number" name="lifetimeValue" value={formData.lifetimeValue} onChange={handleChange} />
            </FormGroup>
          </FormRow>
        </FormSection>
        <FormSection>
          <SectionTitle>Suivi et commentaires</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Date de dernière interaction</label>
              <FormInput type="date" name="lastInteraction" value={formData.lastInteraction} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Suivi de relance</label>
              <FormTextarea name="followUp" value={formData.followUp} onChange={handleChange} rows="3" />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Commentaires internes</label>
              <FormTextarea name="internalComments" value={formData.internalComments} onChange={handleChange} rows="3" />
            </FormGroup>
            <FormGroup>
              <label>Documents joints</label>
              <FormTextarea name="documents" value={formData.documents} onChange={handleChange} rows="3" placeholder="Liens ou descriptions des documents" />
            </FormGroup>
          </FormRow>
        </FormSection>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Création...' : 'Créer le deal'}
        </SubmitButton>
      </Form>
    </CreateDealContainer>
  );
};

export default CreateDeal;
