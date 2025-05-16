import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import InvoiceForm from './components/InvoiceForm';
import Footer from './components/footer';
import History from './components/history';
import SignIn from './components/SignIn';
import Help from './components/Help';
import Information from './components/Information';
import Register from './components/Register';
import Sidebar from './components/sidebar';         // Tambahkan Sidebar
import Dashboard from './components/Dashboard';     // Tambahkan Dashboard

function AppContent() {
  const invoiceRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.toLowerCase();

  // Halaman yang tidak memakai Navbar & Footer
  const hideNavbarFooterRoutes = ['/signin', '/register', '/dashboard'];
  const hideLayout = hideNavbarFooterRoutes.includes(currentPath);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn && (currentPath === '/signin' || currentPath === '/register')) {
      navigate('/invoice');
    }
  }, [currentPath, navigate]);

  // Layout khusus dashboard
  if (currentPath === '/dashboard') {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Dashboard />
      </div>
    );
  }

  // Layout umum dengan Navbar dan Footer
  return (
    <div>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/invoice" element={<InvoiceForm contentRef={invoiceRef} />} />
        <Route path="/history" element={<History />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/help" element={<Help />} />
        <Route path="/information" element={<Information />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<InvoiceForm contentRef={invoiceRef} />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
