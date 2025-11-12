import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { getDealById, updateDeal, deleteDeal, Deal as DealType, UpdateDealData } from '../api/dealsApi';
import './DealDetail.css';

const DealDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<DealType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateDealData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDealData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedDeal = await getDealById(Number(id!));
        setDeal(fetchedDeal);
        // Initialize form data with fetched deal data
        setFormData({
          name: fetchedDeal.name,
          stage: fetchedDeal.stage,
          company: fetchedDeal.company,
          contactPerson: fetchedDeal.contactPerson,
          value: fetchedDeal.value,
          expectedCloseDate: fetchedDeal.expectedCloseDate ? fetchedDeal.expectedCloseDate.split('T')[0] : '', // Format date for input
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load deal details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDealData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedDeal = await updateDeal(Number(id!), formData);
      setDeal(updatedDeal);
      setIsEditing(false);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to update deal.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await deleteDeal(Number(id!));
        navigate('/deals'); // Redirect to deals list
      } catch (err: any) {
        setError(err.message || 'Failed to delete deal.');
      }
    }
  };

  const stages = ["Prospecting", "Qualification", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

  if (loading) return <div className="deal-detail-container">Loading deal details...</div>;
  if (error) return <div className="deal-detail-container error-message">Error: {error}</div>;
  if (!deal) return <div className="deal-detail-container">Deal not found.</div>;

  return (
    <div className="deal-detail-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="deal-detail-main">
          <div className="deal-header">
            <h1>{deal.name}</h1>
            {!isEditing && (
              <div className="actions">
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={handleDelete} className="delete-button">Delete</button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="edit-form">
              {error && <p className="error-message">{error}</p>}
              <div className="form-group">
                <label htmlFor="editName">Deal Name:</label>
                <input
                  type="text"
                  id="editName"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="editStage">Stage:</label>
                <select
                  id="editStage"
                  name="stage"
                  value={formData.stage || ''}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Stage</option>
                  {stages.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="editCompany">Company:</label>
                <input
                  type="text"
                  id="editCompany"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editContactPerson">Contact Person:</label>
                <input
                  type="text"
                  id="editContactPerson"
                  name="contactPerson"
                  value={formData.contactPerson || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editValue">Value:</label>
                <input
                  type="number"
                  id="editValue"
                  name="value"
                  value={formData.value !== undefined ? formData.value : ''}
                  onChange={handleInputChange}
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label htmlFor="editExpectedCloseDate">Expected Close Date:</label>
                <input
                  type="date"
                  id="editExpectedCloseDate"
                  name="expectedCloseDate"
                  value={formData.expectedCloseDate || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="edit-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => { setIsEditing(false); setError(null); }}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="deal-details">
              <p><strong>Stage:</strong> {deal.stage}</p>
              <p><strong>Company:</strong> {deal.company || 'N/A'}</p>
              <p><strong>Contact Person:</strong> {deal.contactPerson || 'N/A'}</p>
              <p><strong>Value:</strong> {deal.value !== undefined ? `$${deal.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'N/A'}</p>
              <p><strong>Expected Close Date:</strong> {deal.expectedCloseDate ? new Date(deal.expectedCloseDate).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Created At:</strong> {new Date(deal.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(deal.updatedAt).toLocaleString()}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DealDetail;
