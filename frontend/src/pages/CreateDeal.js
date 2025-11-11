import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dealsApi } from '../api/dealsApi'; // Import the module
import './CreateDeal.css';

function CreateDeal() {
  const navigate = useNavigate();
  const [dealData, setDealData] = useState({
    name: '',
    description: '', // Added description field
    amount: 0, // Renamed from 'value' to 'amount' for clarity and consistency with potential backend
    currency: 'USD',
    stage: 'Prospection', // Default stage
    customerId: '', // This should ideally be a dropdown populated from a customer API
    assignedUserId: '', // This should ideally be a dropdown populated from a user API
    // Add other relevant fields from custom fields if needed
    sourceLead: '',
    priority: 'Medium',
    probabilityClosing: 50, // Default to 50%
    contactPrincipal: '',
    email: '',
    phone: '',
    activitySector: '',
    companySize: '',
    acquisitionChannel: '',
    identifiedNeed: '',
    proposedSolution: '',
    contractType: '',
    contractDuration: '',
    paymentMode: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDealData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation
    if (!dealData.name || !dealData.amount || !dealData.customerId || !dealData.assignedUserId) {
      setError('Please fill in all required fields (Name, Amount, Customer, Assigned User).');
      setLoading(false);
      return;
    }

    // Map frontend state to backend expected fields if names differ
    const payload = {
      ...dealData,
      // Example: Ensure amount is a number if it comes from input as string
      amount: Number(dealData.amount),
      // Add other mappings here if necessary
    };

    try {
      await dealsApi.createDeal(payload); // Use the correct API function
      navigate('/deals'); // Redirect to deals list after successful creation
    } catch (err) {
      setError(`Failed to create deal: ${err.message}`);
      console.error('Create deal error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Placeholder for Sales Stages, Currencies, Priorities, etc.
  const salesStages = ["Prospection", "Qualification", "Prise de contact", "Découverte", "Proposition de valeur", "Négociation", "Closing", "Livraison/Onboarding", "Fidélisation/Upsell/Cross-sell"];
  const currencies = ["USD", "EUR", "GBP"];
  const priorities = ["Low", "Medium", "High", "Urgent"];

  return (
    <div className="create-deal-container">
      <h2>Create New Deal</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Deal Information</h3>
          <div className="form-group">
            <label htmlFor="name">Deal Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={dealData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={dealData.amount}
              onChange={handleInputChange}
              required
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="currency">Currency:</label>
            <select
              id="currency"
              name="currency"
              value={dealData.currency}
              onChange={handleInputChange}
              required
            >
              {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="stage">Sales Stage:</label>
            <select
              id="stage"
              name="stage"
              value={dealData.stage}
              onChange={handleInputChange}
              required
            >
              {salesStages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="probabilityClosing">Probability of Closing (%):</label>
            <input
              type="number"
              id="probabilityClosing"
              name="probabilityClosing"
              value={dealData.probabilityClosing}
              onChange={handleInputChange}
              min="0"
              max="100"
            />
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority:</label>
            <select
              id="priority"
              name="priority"
              value={dealData.priority}
              onChange={handleInputChange}
            >
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>Customer/Company Information</h3>
          <div className="form-group">
            <label htmlFor="customerId">Customer/Company ID:</label>
            {/* In a real app, this would be a dropdown populated from customer API */}
            <input
              type="text"
              id="customerId"
              name="customerId"
              value={dealData.customerId}
              onChange={handleInputChange}
              required
              placeholder="Enter Customer ID"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactPrincipal">Contact Person:</label>
            <input
              type="text"
              id="contactPrincipal"
              name="contactPrincipal"
              value={dealData.contactPrincipal}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={dealData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={dealData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="activitySector">Activity Sector:</label>
            <input
              type="text"
              id="activitySector"
              name="activitySector"
              value={dealData.activitySector}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="companySize">Company Size:</label>
            <input
              type="text"
              id="companySize"
              name="companySize"
              value={dealData.companySize}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Deal Details</h3>
          <div className="form-group">
            <label htmlFor="sourceLead">Source of Lead:</label>
            <input
              type="text"
              id="sourceLead"
              name="sourceLead"
              value={dealData.sourceLead}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="acquisitionChannel">Acquisition Channel:</label>
            <input
              type="text"
              id="acquisitionChannel"
              name="acquisitionChannel"
              value={dealData.acquisitionChannel}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="identifiedNeed">Identified Need:</label>
            <textarea
              id="identifiedNeed"
              name="identifiedNeed"
              value={dealData.identifiedNeed}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="proposedSolution">Proposed Solution:</label>
            <textarea
              id="proposedSolution"
              name="proposedSolution"
              value={dealData.proposedSolution}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="contractType">Contract Type:</label>
            <input
              type="text"
              id="contractType"
              name="contractType"
              value={dealData.contractType}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contractDuration">Contract Duration:</label>
            <input
              type="text"
              id="contractDuration"
              name="contractDuration"
              value={dealData.contractDuration}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentMode">Payment Mode:</label>
            <input
              type="text"
              id="paymentMode"
              name="paymentMode"
              value={dealData.paymentMode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={dealData.description}
            onChange={handleInputChange}
            rows="4"
          ></textarea>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Create Deal'}
        </button>
      </form>
    </div>
  );
}

export default CreateDeal;
