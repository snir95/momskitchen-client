import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProviders } from './contexts/AppProviders';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import './App.css';

function App() {
  return (
    <AppProviders>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Layout>
      </Router>
    </AppProviders>
  );
}

export default App;