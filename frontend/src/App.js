import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Deals from './pages/Deals';
import DealDetail from './pages/DealDetail';
import CreateDeal from './pages/CreateDeal';
import Login from './pages/Login';
import Register from './pages/Register';
import DealContextProvider from './contexts/DealContext';
import './App.css'; // Global styles

function App() {
  // Basic authentication check using localStorage
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <DealContextProvider>
      <div className="app">
        <Header />
        <div className="main-container">
          {isAuthenticated && <Sidebar />}
          <main className="content">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
              <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />

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
                path="/deals/create"
                element={isAuthenticated ? <CreateDeal /> : <Navigate to="/login" replace />}
              />
              {/* Example of an edit route - requires implementation */}
              <Route
                path="/deals/:id/edit"
                element={isAuthenticated ? <div>Edit Deal Page (Not Implemented)</div> : <Navigate to="/login" replace />}
              />


              {/* Fallback Route */}
              <Route
                path="*"
                element={isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </DealContextProvider>
  );
}

export default App;
