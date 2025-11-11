import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Deals from './pages/Deals';
import DealDetail from './pages/DealDetail';
import CreateDeal from './pages/CreateDeal';
import './App.css'; // Import App-specific styles

function App() {
  // Basic authentication check (replace with actual auth logic)
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        {isAuthenticated && <Sidebar />}
        <main className="page-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<div>Login Page (Not Implemented)</div>} />
            <Route path="/register" element={<div>Register Page (Not Implemented)</div>} />

            {/* Protected Routes */}
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
              path="/deals/new"
              element={isAuthenticated ? <CreateDeal /> : <Navigate to="/login" replace />}
            />

            {/* Fallback or Not Found */}
            <Route path="*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
