import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Deals from './pages/Deals';
import CreateDeal from './pages/CreateDeal';
import DealDetail from './pages/DealDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import { DealProvider } from './contexts/DealContext';
import './App.css';
import './index.css'; // Assuming index.css is also globally applied

// Placeholder for a protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TODO: Implement actual authentication check
  const isAuthenticated = localStorage.getItem('token') !== null; // Example check
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <DealProvider>
      <Router>
        <div className="app-container">
          <Header title="Deal Manager" />
          <div className="main-content">
            <Sidebar />
            <main className="page-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/deals"
                  element={
                    <ProtectedRoute>
                      <Deals />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/deals/create"
                  element={
                    <ProtectedRoute>
                      <CreateDeal />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/deals/:id"
                  element={
                    <ProtectedRoute>
                      <DealDetail />
                    </ProtectedRoute>
                  }
                />

                {/* Redirect to login if no other route matches */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </DealProvider>
  );
}

export default App;
