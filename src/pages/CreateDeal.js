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
  font-family: inherit; /* Use inherited font family */
  resize: vertical; /* Allow vertical resizing */
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
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
  display: block;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background: #3a56d4;
  }
`;

const CreateDeal = () => {
  const [formData, setFormData] = useState({
    dealName: '',
    amount: '',
    currency: 'USD',
    status: 'Open',
    salesStage: 'Prospection',
    leadSource: '',
    priority: 'Medium',
    probability: 50,
    creationDate: '',
    expectedCloseDate: '',
    salesRep: '',
    clientCompany: '',
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
    paymentMode: '',
    lastInteractionDate: '',
    internalComments: '',
    // Add other fields as necessary
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Deal Data:', formData);
    // In a real application, you would send this data to your backend API
    // and then potentially redirect the user or show a success message.
    alert('Deal created successfully (check console for data)!');
  };

  // Dummy options for select inputs
  const salesStages = ['Prospection', 'Qualification', 'Prise de contact', 'Découverte', 'Proposition de valeur', 'Négociation', 'Closing', 'Livraison/Onboarding', 'Fidélisation/Upsell/Cross-sell'];
  const currencies = ['USD', 'EUR', 'GBP', 'CAD'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  const contractTypes = ['One-time', 'Subscription', 'Project-based'];
  const paymentModes = ['Credit Card', 'Bank Transfer', 'Invoice'];
  const companySizes = ['1-10', '11-50', '51-200', '201-1000', '1000+'];
  const industries = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Education', 'Other'];

  return (
    <CreateDealContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Retour à la liste des deals
      </BackLink>
      <PageTitle>Créer un nouveau deal</PageTitle>
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Informations principales</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="dealName">Nom du deal</label>
              <FormInput
                type="text"
                id="dealName"
                name="dealName"
                value={formData.dealName}
                onChange={handleChange}
                required
              />
            </FormFormGroup>
            <FormGroup>
              <label htmlFor="amount">Montant</label>
              <FormInput
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="currency">Devise</label>
              <FormSelect
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              >
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </FormSelect>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="salesStage">Étape de vente</label>
              <FormSelect
                id="salesStage"
                name="salesStage"
                value={formData.salesStage}
                onChange={handleChange}
              >
                {salesStages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <label htmlFor="priority">Priorité</label>
              <FormSelect
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                {priorities.map(p => <option key={p} value={p}>{p}</option>)}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <label htmlFor="probability">Probabilité de closing (%)</label>
              <FormInput
                type="number"
                id="probability"
                name="probability"
                value={formData.probability}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </FormGroup>
          </FormRow>
        </FormSection>

        <FormSection>
          <SectionTitle>Détails du client et du contact</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="clientCompany">Client/Entreprise</label>
              <FormInput
                type="text"
                id="clientCompany"
                name="clientCompany"
                value={formData.clientCompany}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="primaryContact">Contact principal</label>
              <FormInput
                type="text"
                id="primaryContact"
                name="primaryContact"
                value={formData.primaryContact}
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
                value={formData.email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="phone">Téléphone</label>
              <FormInput
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="industry">Secteur d’activité</label>
              <FormSelect
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              >
                <option value="">Sélectionnez un secteur</option>
                {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <label htmlFor="companySize">Taille de l’entreprise</label>
              <FormSelect
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une taille</option>
                {companySizes.map(size => <option key={size} value={size}>{size}</option>)}
              </FormSelect>
            </FormGroup>
          </FormRow>
        </FormSection>

        <FormSection>
          <SectionTitle>Détails du deal</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="leadSource">Source du lead</label>
              <FormInput
                type="text"
                id="leadSource"
                name="leadSource"
                value={formData.leadSource}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="acquisitionChannel">Canal d’acquisition</label>
              <FormInput
                type="text"
                id="acquisitionChannel"
                name="acquisitionChannel"
                value={formData.acquisitionChannel}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="identifiedNeed">Besoin identifié</label>
              <FormTextarea
                id="identifiedNeed"
                name="identifiedNeed"
                value={formData.identifiedNeed}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="proposedSolution">Solution proposée</label>
              <FormTextarea
                id="proposedSolution"
                name="proposedSolution"
                value={formData.proposedSolution}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="contractType">Type de contrat</label>
              <FormSelect
                id="contractType"
                name="contractType"
                value={formData.contractType}
                onChange={handleChange}
              >
                <option value="">Sélectionnez un type</option>
                {contractTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <label htmlFor="contractDuration">Durée du contrat</label>
              <FormInput
                type="text"
                id="contractDuration"
                name="contractDuration"
                placeholder="Ex: 12 mois, 2 ans"
                value={formData.contractDuration}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="paymentMode">Mode de paiement</label>
              <FormSelect
                id="paymentMode"
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
              >
                <option value="">Sélectionnez un mode</option>
                {paymentModes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
              </FormSelect>
            </FormGroup>
          </FormRow>
        </FormSection>

        <FormSection>
          <SectionTitle>Dates et suivi</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="creationDate">Date de création</label>
              <FormInput
                type="date"
                id="creationDate"
                name="creationDate"
                value={formData.creationDate}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="expectedCloseDate">Date de clôture prévue</label>
              <FormInput
                type="date"
                id="expectedCloseDate"
                name="expectedCloseDate"
                value={formData.expectedCloseDate}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="lastInteractionDate">Date de dernière interaction</label>
              <FormInput
                type="date"
                id="lastInteractionDate"
                name="lastInteractionDate"
                value={formData.lastInteractionDate}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
        </FormSection>

        <FormSection>
          <SectionTitle>Autres détails</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="salesRep">Responsable commercial</label>
              <FormInput
                type="text"
                id="salesRep"
                name="salesRep"
                value={formData.salesRep}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="internalComments">Commentaires internes</label>
              <FormTextarea
                id="internalComments"
                name="internalComments"
                value={formData.internalComments}
                onChange={handleChange}
              />
            </FormGroup>
            {/* Add more fields like Documents, Follow-up status etc. as needed */}
          </FormRow>
        </FormSection>

        <SubmitButton type="submit">Créer le Deal</SubmitButton>
      </Form>
    </CreateDealContainer>
  );
};

export default CreateDeal;
