import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register'; // Assuming Register.tsx exists
import DashboardPage from './pages/Dashboard';
import DealsPage from './pages/Deals';
import CreateDealPage from './pages/CreateDeal';
import DealDetailPage from './pages/DealDetail'; // Assuming DealDetail.tsx exists
import { DealProvider } from './contexts/DealContext'; // Using TS context
import './App.css';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
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

            {/* Default Redirect - if user is logged in, redirect to dashboard, otherwise to login */}
            <Route
              path="/"
              element={
                localStorage.getItem('token') ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            {/* Catch-all for any other routes, redirect to login if not authenticated */}
            <Route path="*" element={<Navigate to={localStorage.getItem('token') ? "/dashboard" : "/login"} replace />} />
          </Routes>
        </div>
      </DealProvider>
    </Router>
  );
}

export default App;
