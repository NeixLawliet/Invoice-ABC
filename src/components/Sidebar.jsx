import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaTachometerAlt, FaUsers, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/signin');
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '250px',
        backgroundColor: '#800080',
        color: 'white',
        padding: '20px',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div className="text-center mb-4">
          <img
            src="/abc-group-teknologi.png"
            alt="Logo"
            className="mb-2"
            style={{ width: '50%', height: 'auto' }}
          />
        </div>

        <Nav className="flex-column">
          <Nav.Link onClick={() => navigate('/dashboard')} style={{ color: 'white' }}>
            <FaTachometerAlt /> Dashboard
          </Nav.Link>
          <Nav.Link onClick={() => navigate('/customer')} style={{ color: 'white' }}>
            <FaUsers /> Customer
          </Nav.Link>
          <Nav.Link onClick={() => navigate('/invoice')} style={{ color: 'white' }}>
            <FaPlus /> Create Invoice
          </Nav.Link>
        </Nav>
      </div>

      <div className="text-center">
        <button className="btn btn-danger w-100" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
