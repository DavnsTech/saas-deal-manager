import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';
import DealsPage from './pages/Deals';
import CreateDealPage from './pages/CreateDeal';
import DealDetailPage from './pages/DealDetail';
import { DealProvider } from './contexts/DealContext';
import Header from './components/Header'; // Assuming Header is now outside Routes
import Sidebar from './components/Sidebar'; // Assuming Sidebar is now outside Routes
import './App.css'; // Global styles

// Protected Route Component: Ensures that a user must be logged in to access certain routes.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  // If no token is found, redirect to the login page.
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // Otherwise, render the requested child component.
  return children;
};

/**
 * Main App component that sets up routing and global providers.
 * Uses React Router for navigation and DealProvider for state management.
 */
function App() {
  return (
    <Router>
      {/* DealProvider makes deal-related state and functions available to its descendants */}
      <DealProvider>
        <div className="app-layout"> {/* Wrapper for header, sidebar, and main content */}
          <Header />
          <div className="main-content-area"> {/* Wrapper for sidebar and main section */}
            <Sidebar />
            <main className="content">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes - Require authentication */}
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

                {/* Redirect any unmatched routes to login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </DealProvider>
    </Router>
  );
}

export default App;
