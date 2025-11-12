import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register'; // Assuming Register.js exists
import DashboardPage from './pages/Dashboard';
import DealsPage from './pages/Deals';
import CreateDealPage from './pages/CreateDeal';
import DealDetailPage from './pages/DealDetail'; // Assuming DealDetail.js exists
import { DealProvider } from './contexts/DealContext'; // Using JS context for now
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <DealProvider> {/* Wrap routes that need deal context */}
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deals"
              element={
                <ProtectedRoute>
                  <DealsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deals/new"
              element={
                <ProtectedRoute>
                  <CreateDealPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deals/:id"
              element={
                <ProtectedRoute>
                  <DealDetailPage />
                </ProtectedRoute>
              }
            />

            {/* Default Redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </DealProvider>
    </Router>
  );
}

export default App;
