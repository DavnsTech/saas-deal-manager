import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { createDeal } from '../api/dealsApi';
import { Deal } from '../types';

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
  padding: 12px 24px;
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

const CreateDeal: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Deal>>({
    name: '',
    amount: 0,
    currency: 'USD',
    status: '',
    stage: 'Prospection',
    source: '',
    priority: '',
    probability: 0,
    creationDate: new Date().toISOString().split('T')[0],
    expectedCloseDate: '',
    responsible: '',
    company: '',
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
    paymentMode: '',
    lastInteractionDate: '',
    internalComments: '',
    attachedDocuments: [],
    followUpSchedule: '',
    leadScore: 0,
    lifetimeValue: 0,
    region: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDeal(formData);
      navigate('/deals');
    } catch (error) {
      console.error('Error creating deal:', error);
    }
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
    'Fidélisation/Upsell/Cross-sell'
  ];

  return (
    <CreateDealContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Back to Deals
      </BackLink>
      <PageTitle>Create New Deal</PageTitle>
      <Form onSubmit={handleSubmit}>
        <FormSection>
          <SectionTitle>Basic Information</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="name">Deal Name</label>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="amount">Amount</label>
              <FormInput
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <label htmlFor="currency">Currency</label>
              <FormSelect
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <label htmlFor="stage">Stage</label>
              <FormSelect
                id="stage"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
              >
                {salesStages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </FormSelect>
            </FormGroup>
          </FormRow>
        </FormSection>
        <FormSection>
          <SectionTitle>Company & Contact</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="company">Company</label>
              <FormInput
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="contact">Contact Person</label>
              <FormInput
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
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
              <label htmlFor="phone">Phone</label>
              <FormInput
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
        </FormSection>
        <FormSection>
          <SectionTitle>Additional Details</SectionTitle>
          <FormRow>
            <FormGroup>
              <label htmlFor="sector">Sector</label>
              <FormInput
                type="text"
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="expectedCloseDate">Expected Close Date</label>
              <FormInput
                type="date"
                id="expectedCloseDate"
                name="expectedCloseDate"
                value={formData.expectedCloseDate}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>
          <FormGroup>
            <label htmlFor="internalComments">Internal Comments</label>
            <FormTextarea
              id="internalComments"
              name="internalComments"
              value={formData.internalComments}
              onChange={handleChange}
            />
          </FormGroup>
        </FormSection>
        <SubmitButton type="submit">Create Deal</SubmitButton>
      </Form>
    </CreateDealContainer>
  );
};

export default CreateDeal;
