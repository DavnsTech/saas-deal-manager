import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import { useDeals } from '../contexts/DealContext';

const CreateDealContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  color: #4361ee;
  background: none;
  border: none;
  cursor: pointer;
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
  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #4361ee;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: #3a56d4;
  }
`;

const CreateDeal: React.FC = () => {
  const navigate = useNavigate();
  const { createDeal } = useDeals();

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    currency: 'USD',
    status: 'Active',
    stage: 'Prospection',
    source: '',
    priority: 'Medium',
    probability: '',
    expectedCloseDate: '',
    owner: '',
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
    lastInteraction: '',
    internalComments: '',
    followUp: '',
    leadScore: '',
    lifetimeValue: '',
    region: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const deal = {
      ...formData,
      amount: parseFloat(formData.amount) || 0,
      probability: parseInt(formData.probability) || 0,
      leadScore: parseInt(formData.leadScore) || 0,
      lifetimeValue: parseFloat(formData.lifetimeValue) || 0,
      attachedDocuments: [],
      createdAt: new Date().toISOString(),
    };
    await createDeal(deal);
    navigate('/deals');
  };

  const salesStages = [
    'Prospection',
    'Qualification',
    'Prise de contact',
    'Découverte',
    'Proposition de valeur',
    'Négociation',
    'Closing',
    'Livraison/Onboarding',
    'Fidélisation/Upsell/Cross-sell',
  ];

  return (
    <CreateDealContainer>
      <BackLink onClick={() => navigate('/deals')}>
        <FaArrowLeft /> Back to Deals
      </BackLink>
      <PageTitle>Create New Deal</PageTitle>
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Basic Information</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Deal Name</label>
              <FormInput type="text" name="name" value={formData.name} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <label>Amount</label>
              <FormInput type="number" name="amount" value={formData.amount} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Currency</label>
              <FormSelect name="currency" value={formData.currency} onChange={handleChange}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <label>Stage</label>
              <FormSelect name="stage" value={formData.stage} onChange={handleChange}>
                {salesStages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
              </FormSelect>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Priority</label>
              <FormSelect name="priority" value={formData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <label>Probability (%)</label>
              <FormInput type="number" name="probability" value={formData.probability} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Expected Close Date</label>
              <FormInput type="date" name="expectedCloseDate" value={formData.expectedCloseDate} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Source</label>
              <FormInput type="text" name="source" value={formData.source} onChange={handleChange} />
            </FormGroup>
          </FormRow>
        </FormSection>
        <FormSection>
          <SectionTitle>Company & Contact</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Company</label>
              <FormInput type="text" name="company" value={formData.company} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Contact Person</label>
              <FormInput type="text" name="contact" value={formData.contact} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Email</label>
              <FormInput type="email" name="email" value={formData.email} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Phone</label>
              <FormInput type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Industry</label>
              <FormInput type="text" name="industry" value={formData.industry} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Company Size</label>
              <FormInput type="text" name="companySize" value={formData.companySize} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Acquisition Channel</label>
              <FormInput type="text" name="acquisitionChannel" value={formData.acquisitionChannel} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Region</label>
              <FormInput type="text" name="region" value={formData.region} onChange={handleChange} />
            </FormGroup>
          </FormRow>
        </FormSection>
        <FormSection>
          <SectionTitle>Details</SectionTitle>
          <FormRow>
            <FormGroup>
              <label>Identified Need</label>
              <FormTextarea name="identifiedNeed" value={formData.identifiedNeed} onChange={handleChange} rows={3} />
            </FormGroup>
            <FormGroup>
              <label>Proposed Solution</label>
              <FormTextarea name="proposedSolution" value={formData.proposedSolution} onChange={handleChange} rows={3} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Contract Type</label>
              <FormInput type="text" name="contractType" value={formData.contractType} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Contract Duration</label>
              <FormInput type="text" name="contractDuration" value={formData.contractDuration} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Payment Method</label>
              <FormInput type="text" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Last Interaction</label>
              <FormInput type="date" name="lastInteraction" value={formData.lastInteraction} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Internal Comments</label>
              <FormTextarea name="internalComments" value={formData.internalComments} onChange={handleChange} rows={3} />
            </FormGroup>
            <FormGroup>
              <label>Follow Up</label>
              <FormTextarea name="followUp" value={formData.followUp} onChange={handleChange} rows={3} />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label>Lead Score</label>
              <FormInput type="number" name="leadScore" value={formData.leadScore} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label>Lifetime Value</label>
              <FormInput type="number" name="lifetimeValue" value={formData.lifetimeValue} onChange={handleChange} />
            </FormGroup>
          </FormRow>
        </FormSection>
        <SubmitButton type="submit">Create Deal</SubmitButton>
      </Form>
    </CreateDealContainer>
  );
};

export default CreateDeal;
