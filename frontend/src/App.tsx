import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Deals from './pages/Deals';
import CreateDeal from './pages/CreateDeal';
import DealDetail from './pages/DealDetail';
import { DealProvider } from './contexts/DealContext';
import './App.css';
import './index.css';

function App() {
  // In a real app, you'd fetch user data here or from an auth context
  const currentUser = { id: 'user1', username: 'TestUser', email: 'test@example.com' }; // Dummy user

  return (
    <DealProvider>
      <Router>
        <div className="app-container">
          <Header user={currentUser} />
          <div className="main-content">
            <Sidebar />
            <main className="page-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/deals/new" element={<CreateDeal />} />
                <Route path="/deals/:dealId" element={<DealDetail />} />
                {/* Add other routes as needed */}
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </DealProvider>
  );
}

export default App;
