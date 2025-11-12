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
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <DealProvider>
        <div className="app-layout"> {/* Wrapper for header, sidebar, and content */}
          <Header />
          <div className="main-content-area"> {/* Wrapper for sidebar and main section */}
            <Sidebar />
            <main className="content">
              <Routes>
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

                {/* Redirect to dashboard if logged in and on root */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Navigate to="/dashboard" replace />
                    </ProtectedRoute>
                  }
                />
                {/* Catch-all for unmatched routes (optional) */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </DealProvider>
    </Router>
  );
}

export default App;
