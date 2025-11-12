import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DealProvider } from './contexts/DealContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Deals from './pages/Deals';
import DealDetail from './pages/DealDetail';
import CreateDeal from './pages/CreateDeal';
import './App.css';

function App() {
  return (
    <DealProvider>
      <div className="app">
        <Header />
        <div className="main-container">
          <Sidebar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/deals/:id" element={<DealDetail />} />
              <Route path="/deals/create" element={<CreateDeal />} />
            </Routes>
          </main>
        </div>
      </div>
    </DealProvider>
  );
}

export default App;
