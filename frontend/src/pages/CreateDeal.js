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
    createdAt: new Date().toISOString().split('T')[0],
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Amount *</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Currency</label>
          <select name="currency" value={formData.currency} onChange={handleChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <div className="form-group">
          <label>Stage</label>
          <select name="stage" value={formData.stage} onChange={handleChange}>
            {salesStages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Close Date</label>
          <input type="date" name="closeDate" value={formData.closeDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Client</label>
          <input type="text" name="client" value={formData.client} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Contact</label>
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
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Probability (%)</label>
          <input type="number" name="probability" value={formData.probability} onChange={handleChange} min="0" max="100" />
        </div>
        <button type="submit">Create Deal</button>
      </form>
    </div>
  );
}

export default CreateDeal;
