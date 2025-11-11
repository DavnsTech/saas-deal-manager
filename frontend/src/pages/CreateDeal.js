import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa'; // Import FaArrowLeft

const CreateDealContainer = styled.div`
  padding: 30px;
  background-color: #f4f7fc;
  min-height: calc(100vh - 70px); /* Adjust height to account for header */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackLink = styled(Link)` // Using Link from react-router-dom
  display: inline-flex;
  align-items: center;
  color: #4361ee;
  text-decoration: none;
  margin-bottom: 20px;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    margin-right: 8px;
  }
`;

const FormWrapper = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 800px; /* Limit width for better readability */
`;

const PageTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
    font-size: 14px;
  }
`;

const FormInput = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
`;

const FormSelect = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

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
  font-family: inherit; /* Use the same font as the rest of the app */
  min-height: 100px; /* Make textareas a bit taller */
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  resize: vertical; /* Allow vertical resizing */

  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
`;

const FullWidthFormGroup = styled(FormGroup)`
  grid-column: 1 / -1; /* Span across all columns */
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1; /* Span across all columns */
  background: #4361ee;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-top: 20px;

  &:hover {
    background: #3a56d4;
  }
`;

const CreateDeal = () => {
  const navigate = useNavigate();
  const { addDeal } = useDeals();
  const [formData, setFormData] = useState({
    name: '',
    amount: 0,
    currency: 'USD',
    status: 'Open',
    stage: 'Prospection',
    source: '',
    priority: 'Medium',
    probability: 0,
    closeDate: '',
    responsible: '',
    client: '',
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
    internalComments: '',
    leadScore: 0,
    lifetimeValue: 0,
    region: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert numeric fields to numbers
      const numericFields = ['amount', 'probability', 'leadScore', 'lifetimeValue'];
      const processedData = { ...formData };
      numericFields.forEach(field => {
        if (processedData[field]) {
          processedData[field] = parseFloat(processedData[field]);
        }
      });
      
      // Ensure probability is between 0 and 100
      if (processedData.probability > 100) processedData.probability = 100;
      if (processedData.probability < 0) processedData.probability = 0;

      await addDeal(processedData);
      navigate('/deals');
    } catch (error) {
      console.error("Error creating deal:", error);
      // Optionally display an error message to the user
    }
  };

  // Mock data for select options
  const salesStages = ['Prospection', 'Qualification', 'Prise de contact', 'Découverte', 'Proposition de valeur', 'Négociation', 'Closing', 'Livraison/Onboarding', 'Fidélisation/Upsell/Cross-sell'];
  const statuses = ['Open', 'Closed Won', 'Closed Lost', 'On Hold'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  const currencies = ['USD', 'EUR', 'GBP', 'CAD'];
  const companySizes = ['<50', '50-200', '201-500', '500+'];
  const contractTypes = ['Service Agreement', 'Product Sale', 'Subscription', 'Partnership'];
  const paymentModes = ['Monthly Invoice', 'Upfront Payment', 'Net 30', 'Net 60'];

  return (
    <CreateDealContainer>
      <BackLink to="/deals">
        <FaArrowLeft /> Back to Deals
      </BackLink>
      <FormWrapper>
        <PageTitle>Create New Deal</PageTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Deal Name</label>
            <FormInput type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <label htmlFor="amount">Amount</label>
            <FormInput type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <label htmlFor="currency">Currency</label>
            <FormSelect id="currency" name="currency" value={formData.currency} onChange={handleChange}>
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <label htmlFor="status">Status</label>
            <FormSelect id="status" name="status" value={formData.status} onChange={handleChange}>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <label htmlFor="stage">Sales Stage</label>
            <FormSelect id="stage" name="stage" value={formData.stage} onChange={handleChange}>
              {salesStages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <label htmlFor="source">Source</label>
            <FormInput type="text" id="source" name="source" value={formData.source} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="priority">Priority</label>
            <FormSelect id="priority" name="priority" value={formData.priority} onChange={handleChange}>
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <label htmlFor="probability">Probability (%)</label>
            <FormInput type="number" id="probability" name="probability" value={formData.probability} onChange={handleChange} min="0" max="100" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="closeDate">Expected Close Date</label>
            <FormInput type="date" id="closeDate" name="closeDate" value={formData.closeDate} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="responsible">Sales Rep</label>
            <FormInput type="text" id="responsible" name="responsible" value={formData.responsible} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="client">Client/Company Name</label>
            <FormInput type="text" id="client" name="client" value={formData.client} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="contact">Primary Contact</label>
            <FormInput type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="email">Email</label>
            <FormInput type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="phone">Phone</label>
            <FormInput type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="sector">Industry/Sector</label>
            <FormInput type="text" id="sector" name="sector" value={formData.sector} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="companySize">Company Size</label>
            <FormSelect id="companySize" name="companySize" value={formData.companySize} onChange={handleChange}>
              <option value="">Select Size</option>
              {companySizes.map(size => <option key={size} value={size}>{size}</option>)}
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <label htmlFor="acquisitionChannel">Acquisition Channel</label>
            <FormInput type="text" id="acquisitionChannel" name="acquisitionChannel" value={formData.acquisitionChannel} onChange={handleChange} />
          </FormGroup>

          <FullWidthFormGroup>
            <label htmlFor="identifiedNeed">Identified Need</label>
            <FormTextarea id="identifiedNeed" name="identifiedNeed" value={formData.identifiedNeed} onChange={handleChange} />
          </FullWidthFormGroup>

          <FullWidthFormGroup>
            <label htmlFor="proposedSolution">Proposed Solution</label>
            <FormTextarea id="proposedSolution" name="proposedSolution" value={formData.proposedSolution} onChange={handleChange} />
          </FullWidthFormGroup>

          <FormGroup>
            <label htmlFor="contractType">Contract Type</label>
            <FormSelect id="contractType" name="contractType" value={formData.contractType} onChange={handleChange}>
              <option value="">Select Type</option>
              {contractTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <label htmlFor="contractDuration">Contract Duration</label>
            <FormInput type="text" id="contractDuration" name="contractDuration" value={formData.contractDuration} onChange={handleChange} placeholder="e.g., 12 months" />
          </FormGroup>

          <FormGroup>
            <label htmlFor="paymentMode">Payment Mode</label>
            <FormSelect id="paymentMode" name="paymentMode" value={formData.paymentMode} onChange={handleChange}>
              <option value="">Select Mode</option>
              {paymentModes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
            </FormSelect>
          </FormGroup>

          <FullWidthFormGroup>
            <label htmlFor="internalComments">Internal Comments</label>
            <FormTextarea id="internalComments" name="internalComments" value={formData.internalComments} onChange={handleChange} />
          </FullWidthFormGroup>

          <FormGroup>
            <label htmlFor="leadScore">Lead Score</label>
            <FormInput type="number" id="leadScore" name="leadScore" value={formData.leadScore} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="lifetimeValue">Estimated Lifetime Value</label>
            <FormInput type="number" id="lifetimeValue" name="lifetimeValue" value={formData.lifetimeValue} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <label htmlFor="region">Region/Country</label>
            <FormInput type="text" id="region" name="region" value={formData.region} onChange={handleChange} />
          </FormGroup>
          
          <SubmitButton type="submit">Create Deal</SubmitButton>
        </Form>
      </FormWrapper>
    </CreateDealContainer>
  );
};

export default CreateDeal;
