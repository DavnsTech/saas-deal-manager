import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DealProvider } from './contexts/DealContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Deals from './pages/Deals';
import DealDetail from './pages/DealDetail';
import CreateDeal from './pages/CreateDeal';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './App.css';

const isAuthenticated = () => !!localStorage.getItem('token');

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="app">
    <Header />
    <div className="main-container">
      <Sidebar />
      <main className="content">
        {children}
      </main>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <DealProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
          <Route path="/deals" element={<ProtectedRoute><AppLayout><Deals /></AppLayout></ProtectedRoute>} />
          <Route path="/deals/create" element={<ProtectedRoute><AppLayout><CreateDeal /></AppLayout></ProtectedRoute>} />
          <Route path="/deals/:id" element={<ProtectedRoute><AppLayout><DealDetail /></AppLayout></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </DealProvider>
    </Router>
  );
}

export default App;
