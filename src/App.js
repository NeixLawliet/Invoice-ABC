import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import InvoiceForm from './components/InvoiceForm';
import Footer from './components/footer';
import History from './components/history';
import SignIn from './components/SignIn';
import Help from './components/Help';
import Information from './components/Information';
import Register from './components/Register';

function AppContent() {
  const invoiceRef = useRef(null);
  const location = useLocation();

  // Konversi pathname ke huruf kecil
  const currentPath = location.pathname.toLowerCase();

  // Sembunyikan navbar & footer di halaman tertentu
  const hideLayoutRoutes = ['/signin', '/register'];
  const hideLayout = hideLayoutRoutes.includes(currentPath);

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
