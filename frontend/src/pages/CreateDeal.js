import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeals } from '../contexts/DealContext'; // Import useDeals hook
import './CreateDeal.css'; // Assuming CreateDeal.css exists for styling

/**
 * Page component for creating a new deal.
 * Provides a form to input deal details and uses the DealContext to add the deal.
 */
const CreateDeal = () => {
  // Get functions and state from the DealContext
  const { addDeal, error: contextError, refreshDeals } = useDeals();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    value: '', // Initialize value as empty string for better input handling
    stage: 'Prospection', // Default stage from sales stages list
    description: '',
    // Example custom fields from the CRM definition
    currency: 'USD',
    priority: 'Medium',
    source: '', // e.g., 'Website', 'Referral', 'Cold Call'
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    clientIndustry: '',
    companySize: '',
    acquisitionChannel: '',
    identifiedNeed: '',
    proposedSolution: '',
    contractType: '',
    contractDuration: '',
    paymentMethod: '',
    internalNotes: '',
  });
  const [localError, setLocalError] = useState(''); // Local error state for form specific issues
  const navigate = useNavigate();

  /**
   * Handles input changes in the form and updates the formData state.
   * Also clears local errors when the user starts typing in a field.
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear local error if the user starts typing in a field that previously had an error
    if (localError) {
      setLocalError('');
    }
  };

  /**
   * Handles the form submission.
   * Performs basic validation, calls the addDeal function from context,
   * and navigates to the deals page on success.
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(''); // Clear local errors before submission

    // Basic validation
    if (!formData.name || !formData.company) {
      setLocalError('Deal Name and Company are required.');
      return;
    }
    const numericValue = parseFloat(formData.value);
    if (formData.value && (isNaN(numericValue) || numericValue < 0)) {
      setLocalError('Value must be a non-negative number.');
      return;
    }

    try {
      // Prepare data to send, ensuring value is a number if provided
      const dealDataToSend = {
        ...formData,
        value: formData.value ? numericValue : 0, // Set to 0 if empty, otherwise use parsed number
      };

      await addDeal(dealDataToSend); // Use the context function to add the deal
      // Optionally refresh deals if context doesn't auto-update, or rely on the context's update logic.
      // refreshDeals(); // Uncomment if you want to force a re-fetch immediately after adding

      navigate('/deals'); // Navigate to the deals list page on successful creation
    } catch (err) {
      // Use contextError for API-level errors, or setLocalError for specific form issues
      setLocalError(err.message || 'Failed to create deal. Please try again.');
      console.error("Error during deal creation:", err);
    }
  };

  // Define sales stages and priority levels for select options
  const salesStages = [
    'Prospection', 'Qualification', 'Prise de contact', 'Découverte',
    'Proposition de valeur', 'Négociation', 'Closing', 'Livraison/Onboarding',
    'Fidélisation/Upsell/Cross-sell'
  ];
  const priorityLevels = ['Low', 'Medium', 'High', 'Urgent'];
  const companySizes = ['1-10', '11-50', '51-200', '201-500', '500+'];

  return (
    <div className="create-deal-container">
      <button className="back-button" onClick={() => navigate('/deals')}>
        &larr; Back to Deals
      </button>
      <h2>Create New Deal</h2>
      {localError && <p className="error-message">{localError}</p>}
      {contextError && <p className="error-message">System Error: {contextError}</p>}
      <form onSubmit={handleSubmit} className="deal-form">
        <div className="form-section">
          <h3>Deal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Deal Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="value">Value</label>
              <input
                type="number"
                id="value"
                name="value"
                value={formData.value}
                onChange={handleChange}
                placeholder="e.g., 10000"
              />
            </div>
            <div className="form-group">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                {/* Add more currencies as needed */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="stage">Sales Stage</label>
              <select
                id="stage"
                name="stage"
                value={formData.stage}
                onChange={handleChange}
              >
                {salesStages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                {priorityLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="source">Lead Source</label>
              <input
                type="text"
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="e.g., Website, Referral"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Client & Contact Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="clientIndustry">Client Industry</label>
              <input
                type="text"
                id="clientIndustry"
                name="clientIndustry"
                value={formData.clientIndustry}
                onChange={handleChange}
                placeholder="e.g., Technology, Healthcare"
              />
            </div>
            <div className="form-group">
              <label htmlFor="companySize">Company Size</label>
              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
              >
                <option value="">Select Size</option>
                {companySizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="contactPerson">Contact Person</label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Contact Email</label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactPhone">Contact Phone</label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Deal Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="acquisitionChannel">Acquisition Channel</label>
              <input
                type="text"
                id="acquisitionChannel"
                name="acquisitionChannel"
                value={formData.acquisitionChannel}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="identifiedNeed">Identified Need</label>
              <textarea
                id="identifiedNeed"
                name="identifiedNeed"
                value={formData.identifiedNeed}
                onChange={handleChange}
                rows="2"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="proposedSolution">Proposed Solution</label>
              <textarea
                id="proposedSolution"
                name="proposedSolution"
                value={formData.proposedSolution}
                onChange={handleChange}
                rows="2"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="contractType">Contract Type</label>
              <input
                type="text"
                id="contractType"
                name="contractType"
                value={formData.contractType}
                onChange={handleChange}
                placeholder="e.g., Monthly, Annual, Project-based"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contractDuration">Contract Duration</label>
              <input
                type="text"
                id="contractDuration"
                name="contractDuration"
                value={formData.contractDuration}
                onChange={handleChange}
                placeholder="e.g., 12 months, 2 years"
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <input
                type="text"
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                placeholder="e.g., Credit Card, Bank Transfer"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Internal Notes</h3>
          <div className="form-group w-100"> {/* w-100 for full width */}
            <label htmlFor="description">Description / Internal Notes</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">Create Deal</button>
          <button type="button" className="cancel-button" onClick={() => navigate('/deals')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateDeal;
