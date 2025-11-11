import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext';
import './CreateDeal.css';

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
    createdAt: '',
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) {
      setError('Name and amount are required');
      return;
    }
    try {
      await addDeal({ ...formData, amount: parseFloat(formData.amount), probability: parseFloat(formData.probability) || 0, leadScore: parseFloat(formData.leadScore) || 0, lifetimeValue: parseFloat(formData.lifetimeValue) || 0 });
      navigate('/deals');
    } catch (err) {
      setError('Failed to create deal');
    }
  };

  return (
    <div className="create-deal">
      <h2>Create New Deal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Currency</label>
          <select name="currency" value={formData.currency} onChange={handleChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Stage</label>
          <select name="stage" value={formData.stage} onChange={handleChange}>
            {salesStages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Source</label>
          <input type="text" name="source" value={formData.source} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Probability (%)</label>
          <input type="number" name="probability" value={formData.probability} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Date Created</label>
          <input type="date" name="createdAt" value={formData.createdAt} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Expected Close Date</label>
          <input type="date" name="closeDate" value={formData.closeDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Responsible</label>
          <input type="text" name="responsible" value={formData.responsible} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Client/Company</label>
          <input type="text" name="client" value={formData.client} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Contact Principal</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Sector</label>
          <input type="text" name="sector" value={formData.sector} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Company Size</label>
          <input type="text" name="companySize" value={formData.companySize} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Acquisition Channel</label>
          <input type="text" name="acquisitionChannel" value={formData.acquisitionChannel} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Identified Need</label>
          <textarea name="identifiedNeed" value={formData.identifiedNeed} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Proposed Solution</label>
          <textarea name="proposedSolution" value={formData.proposedSolution} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Contract Type</label>
          <input type="text" name="contractType" value={formData.contractType} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Contract Duration</label>
          <input type="text" name="contractDuration" value={formData.contractDuration} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Payment Mode</label>
          <input type="text" name="paymentMode" value={formData.paymentMode} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Interaction</label>
          <input type="date" name="lastInteraction" value={formData.lastInteraction} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Internal Comments</label>
          <textarea name="internalComments" value={formData.internalComments} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Attached Documents</label>
          <input type="text" name="attachedDocuments" value={formData.attachedDocuments} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Follow-up Reminder</label>
          <input type="text" name="followUpReminder" value={formData.followUpReminder} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Lead Score</label>
          <input type="number" name="leadScore" value={formData.leadScore} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Lifetime Value</label>
          <input type="number" name="lifetimeValue" value={formData.lifetimeValue} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Region/Country</label>
          <input type="text" name="region" value={formData.region} onChange={handleChange} />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Deal</button>
      </form>
    </div>
  );
}

export default CreateDeal;
