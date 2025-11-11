import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DealProvider, useDeals } from './contexts/DealContext';
import Header from './components/Header'; // Assuming Header component exists
import Sidebar from './components/Sidebar'; // Assuming Sidebar component exists
import DealsPage from './pages/Deals';
import DealDetailPage from './pages/DealDetail';
import CreateDealPage from './pages/CreateDeal'; // Assuming CreateDealPage exists
import LoginPage from './pages/Login'; // Assuming LoginPage exists
import RegisterPage from './pages/Register'; // Assuming RegisterPage exists
import DashboardPage from './pages/Dashboard'; // Assuming DashboardPage exists

// Helper component to protect routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useDeals();
  return currentUser ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <DealProvider>
      <Router>
        <div className="app-container">
          <Header />
          <div className="main-content">
            <Sidebar />
            <main className="page-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/deals" element={<ProtectedRoute><DealsPage /></ProtectedRoute>} />
                <Route path="/deals/:dealId" element={<ProtectedRoute><DealDetailPage /></ProtectedRoute>} />
                <Route path="/deals/new" element={<ProtectedRoute><CreateDealPage isEditMode={false} /></ProtectedRoute>} />
                <Route path="/deals/edit/:dealId" element={<ProtectedRoute><CreateDealPage isEditMode={true} /></ProtectedRoute>} />

                {/* Catch-all for 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </DealProvider>
  );
}

// Placeholder components (assuming they exist based on project structure)
// In a real app, these would be properly implemented.

const Placeholder: React.FC<{ title: string }> = ({ title }) => (
  <div>
    <h2>{title}</h2>
    <p>This is a placeholder component.</p>
  </div>
);

const Header: React.FC = () => {
  const { currentUser, logout } = useDeals();
  return (
    <header>
      <h1>Deal Manager</h1>
      {currentUser ? (
        <div>
          <span>Welcome, {currentUser.username}!</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <nav>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </nav>
      )}
    </header>
  );
};

const Sidebar: React.FC = () => {
  const { currentUser } = useDeals();
  if (!currentUser) return null;
  return (
    <aside>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/deals">Deals</Link></li>
          {/* Add more sidebar links as needed */}
        </ul>
      </nav>
    </aside>
  );
};

// Basic CSS for layout (minimal)
const AppCss = `
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  display: flex;
  flex: 1;
}
header, footer {
  background-color: #f0f0f0;
  padding: 1rem;
  text-align: center;
}
aside {
  width: 200px;
  background-color: #e0e0e0;
  padding: 1rem;
}
main.page-content {
  flex: 1;
  padding: 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
`;

// Inject basic CSS into the document head for demonstration
if (document.getElementById('app-styles') === null) {
  const style = document.createElement('style');
  style.id = 'app-styles';
  style.innerHTML = AppCss;
  document.head.appendChild(style);
}


export default App;
