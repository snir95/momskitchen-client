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
          {/* Test div to verify Tailwind is working */}
          <div className="bg-blue-500 text-white p-4 m-4 rounded-lg text-center">
            <h2 className="text-2xl font-bold">Tailwind Test</h2>
            <p>If you see this styled, Tailwind is working!</p>
          </div>
          
          {/* Test div with custom CSS class */}
          <div className="test-red text-center">
            <h2 className="text-2xl font-bold">Custom CSS Test</h2>
            <p>If you see this styled, custom CSS is working!</p>
          </div>
          
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