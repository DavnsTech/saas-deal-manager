import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Deals from './pages/Deals';
import DealDetail from './pages/DealDetail';
import CreateDeal from './pages/CreateDeal';
import './App.css';
import { DealProvider } from './contexts/DealContext';

function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <DealProvider>
      <div className="app-container">
        <Header />
        <div className="main-content">
          {isAuthenticated && <Sidebar />}
          <main className="page-content">
            <Routes>
              <Route path="/login" element={<div>Login Page (Not Implemented)</div>} />
              <Route path="/register" element={<div>Register Page (Not Implemented)</div>} />
              
              <Route
                path="/"
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/deals"
                element={isAuthenticated ? <Deals /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/deals/:id"
                element={isAuthenticated ? <DealDetail /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/deals/create"
                element={isAuthenticated ? <CreateDeal /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/deals/:id/edit"
                element={isAuthenticated ? <CreateDeal /> : <Navigate to="/login" replace />}
              />
              
              <Route path="*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </DealProvider>
  );
}

export default App;
