import React, { useContext } from "react";


const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <img 
              src="/abc-group-teknologi.png" 
              alt="logo"
              className="img-fluid mb-3"
              style={{ maxWidth: '150px' }}
            />
          </div>
          <div className="col-md-3">
            <h5>Menu</h5>
            <ul className="list-unstyled">
              <li><a href="#" onClick={() => window.location.href='/invoice'} className="text-light text-decoration-none">Invoice Form</a></li>
              <li><a href="#" onClick={() => window.location.href='/history'} className="text-light text-decoration-none">History</a></li>
              <li><a href="#" onClick={() => window.location.href='/information'} className="text-light text-decoration-none">Information</a></li>
              <li><a href="#" onClick={() => window.location.href='/help'} className="text-light text-decoration-none">Help</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Fitur</h5>
            <ul className="list-unstyled">
              <li>Upload Logo</li>
              <li>Multiple Items</li>
              <li>Multi Currency</li>
              <li>Diskon</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Kontak</h5>
            <ul className="list-unstyled">
              <li>Email: hello@fanatect.net</li>
              <li>Telepon: (081) 9080-8001-7</li>
              <li>Bandung, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3 border-top pt-3">
          <p className="mb-0">&copy; 2025 ABC Invoice Generator App. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


