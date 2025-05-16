// src/components/Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaTachometerAlt, FaUsers, FaPlus } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div style={{ height: '100vh', width: '250px', backgroundColor: '#800080', color: 'white', padding: '20px', position: 'fixed' }}>
      <div className="text-center mb-4">
        <img src="/abc-group-teknologi.png" alt="Logo" className="mb-2" style={{ width: '50%', height: 'auto' }} />
      </div>

      <Nav defaultActiveKey="/dashboard" className="flex-column">
        <Nav.Link href="/dashboard" style={{ color: 'white' }}>
          <FaTachometerAlt /> Dashboard
        </Nav.Link>
        <Nav.Link href="/customer" style={{ color: 'white' }}>
          <FaUsers /> Customer
        </Nav.Link>
        <Nav.Link href="/invoice" style={{ color: 'white' }}>
          <FaPlus /> Crate Invoice
        </Nav.Link>
      </Nav>

      <div className="mt-auto text-center">
        <button className="btn btn-danger w-100 mt-5">Log Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
