import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import styled from 'styled-components'; // Use styled-components for consistency

// Re-importing styled components from the existing ones or defining new ones
const CreateDealContainer = styled.div`
  padding: 30px;
  background-color: #f4f7fc;
  min-height: calc(100vh - 70px); /* Adjust height to account for header */
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 15px;

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
  font-family: inherit; /* Use inherited font */
  min-height: 100px; /* Give it some default height */
  resize: vertical; /* Allow vertical resizing */
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px; /* Add margin for spacing between rows */
`;

const FullWidthFormGroup = styled(FormGroup)`
  grid-column: 1 / -1; /* Span across all columns */
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
  margin-top: 20px; /* Space above the button */

  &:hover {
    background: #3a56d4;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
`;

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

const currencyOptions = ['USD', 'EUR', 'GBP', 'JPY']; // Example currencies
const statusOptions = ['Open', 'Closed Won', 'Closed Lost', 'On Hold'];
const priorityOptions = ['Low', 'Medium', 'High', 'Urgent'];

function CreateDeal() {
  const { addDeal } = useDeals();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    currency: 'USD',
    status: 'Open',
    stage: 'Prospection',
    source: '',
    priority: 'Medium',
    probability: '',
    createdAt: new Date().toISOString().split('T')[0], // Default to today
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
    lastInteraction: '',
    internalComments: '',
    attachedDocuments: '',
    followUpReminder: '',
    leadScore: '',
    lifetimeValue: '',
    region: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setIsLoading(true);

    // Basic validation
    if (!formData.name || !formData.amount || isNaN(parseFloat(formData.amount))) {
      setError('Deal name is required and amount must be a valid number.');
      setIsLoading(false);
      return;
    }

    try {
      // Prepare data for API, ensuring numeric fields are parsed correctly
      const dealDataToSend = {
        ...formData,
        amount: parseFloat(formData.amount),
        probability: formData.probability ? parseFloat(formData.probability) : 0,
        leadScore: formData.leadScore ? parseFloat(formData.leadScore) : 0,
        lifetimeValue: formData.lifetimeValue ? parseFloat(formData.lifetimeValue) : 0,
        // Ensure dates are in correct format if they exist
        createdAt: formData.createdAt ? new Date(formData.createdAt).toISOString() : new Date().toISOString(),
        closeDate: formData.closeDate ? new Date(formData.closeDate).toISOString() : null,
        lastInteraction: formData.lastInteraction ? new Date(formData.lastInteraction).toISOString() : null,
        followUpReminder: formData.followUpReminder ? new Date(formData.followUpReminder).toISOString() : null,
      };

      await addDeal(dealDataToSend);
      navigate('/deals'); // Navigate to deals list on success
    } catch (err) {
      setError(err.message || 'Failed to create deal. Please try again.');
      console.error("Submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CreateDealContainer>
      <FormWrapper>
        <PageTitle>Create New Deal</PageTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
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
              required
              step="0.01"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="currency">Currency</label>
            <FormSelect id="currency" name="currency" value={formData.currency} onChange={handleChange}>
              {currencyOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <label htmlFor="stage">Sales Stage</label>
            <FormSelect id="stage" name="stage" value={formData.stage} onChange={handleChange}>
              {salesStages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <label htmlFor="client">Client/Company</label>
            <FormInput
              type="text"
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="contact">Contact Principal</label>
            <FormInput
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </FormGroup>

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

          <FormGroup>
            <label htmlFor="responsible">Responsible Sales Rep</label>
            <FormInput
              type="text"
              id="responsible"
              name="responsible"
              value={formData.responsible}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="priority">Priority</label>
            <FormSelect id="priority" name="priority" value={formData.priority} onChange={handleChange}>
              {priorityOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <label htmlFor="probability">Probability (%)</label>
            <FormInput
              type="number"
              id="probability"
              name="probability"
              value={formData.probability}
              onChange={handleChange}
              min="0"
              max="100"
              step="1"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="closeDate">Expected Close Date</label>
            <FormInput
              type="date"
              id="closeDate"
              name="closeDate"
              value={formData.closeDate ? formData.closeDate.split('T')[0] : ''} // Format for date input
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="source">Lead Source</label>
            <FormInput
              type="text"
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="acquisitionChannel">Acquisition Channel</label>
            <FormInput
              type="text"
              id="acquisitionChannel"
              name="acquisitionChannel"
              value={formData.acquisitionChannel}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="sector">Industry Sector</label>
            <FormInput
              type="text"
              id="sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="companySize">Company Size</label>
            <FormInput
              type="text"
              id="companySize"
              name="companySize"
              value={formData.companySize}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="identifiedNeed">Identified Need</label>
            <FormTextarea
              id="identifiedNeed"
              name="identifiedNeed"
              value={formData.identifiedNeed}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="proposedSolution">Proposed Solution</label>
            <FormTextarea
              id="proposedSolution"
              name="proposedSolution"
              value={formData.proposedSolution}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="contractType">Contract Type</label>
            <FormInput
              type="text"
              id="contractType"
              name="contractType"
              value={formData.contractType}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="contractDuration">Contract Duration</label>
            <FormInput
              type="text"
              id="contractDuration"
              name="contractDuration"
              value={formData.contractDuration}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="paymentMode">Payment Mode</label>
            <FormInput
              type="text"
              id="paymentMode"
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="lastInteraction">Date of Last Interaction</label>
            <FormInput
              type="datetime-local" // Use datetime-local for more precise date/time
              id="lastInteraction"
              name="lastInteraction"
              value={formData.lastInteraction ? formData.lastInteraction.split('.')[0] : ''} // Format for datetime-local input
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="followUpReminder">Follow-up Reminder</label>
            <FormInput
              type="datetime-local"
              id="followUpReminder"
              name="followUpReminder"
              value={formData.followUpReminder ? formData.followUpReminder.split('.')[0] : ''}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="leadScore">Lead Score</label>
            <FormInput
              type="number"
              id="leadScore"
              name="leadScore"
              value={formData.leadScore}
              onChange={handleChange}
              step="1"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="lifetimeValue">Estimated Lifetime Value</label>
            <FormInput
              type="number"
              id="lifetimeValue"
              name="lifetimeValue"
              value={formData.lifetimeValue}
              onChange={handleChange}
              step="0.01"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="region">Region/Country</label>
            <FormInput
              type="text"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
            />
          </FormGroup>

          <FullWidthFormGroup>
            <label htmlFor="internalComments">Internal Comments</label>
            <FormTextarea
              id="internalComments"
              name="internalComments"
              value={formData.internalComments}
              onChange={handleChange}
            />
          </FullWidthFormGroup>

          <FullWidthFormGroup>
            <label htmlFor="attachedDocuments">Attached Documents (e.g., filenames)</label>
            <FormInput
              type="text"
              id="attachedDocuments"
              name="attachedDocuments"
              value={formData.attachedDocuments}
              onChange={handleChange}
              placeholder="e.g., proposal.pdf, contract.docx"
            />
          </FullWidthFormGroup>

          <FullWidthFormGroup>
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Deal'}
            </SubmitButton>
          </FullWidthFormGroup>
        </Form>
      </FormWrapper>
    </CreateDealContainer>
  );
}

export default CreateDeal;
