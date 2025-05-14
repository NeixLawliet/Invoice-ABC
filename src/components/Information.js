import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InformationPage = () => {
  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Information</h1>

          <p className="card-text">
            This application is designed to simplify the process of creating and managing digital invoices.
            Suitable for small business owners, freelancers, and companies that want to manage billing quickly and efficiently.
          </p>

          <h4 className="mt-4">✨ Main Features:</h4>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">✅ Create invoices easily and quickly</li>
            <li className="list-group-item">✅ Add and manage customer data</li>
            <li className="list-group-item">✅ Save invoice history</li>
            <li className="list-group-item">✅ Download invoice in PDF format</li>
            <li className="list-group-item">✅ Calculate the automatic total including taxes and discounts</li>
          </ul>

          <h4 className="mt-4">📋 How to use:</h4>
          <ol className="list-group list-group-numbered mb-3">
            <li className="list-group-item">Login or register your account</li>
            <li className="list-group-item">Enter customer and product data</li>
            <li className="list-group-item">Fill in invoice details (quantity, price, tax, discount)</li>
            <li className="list-group-item">Save or download invoices in PDF</li>
          </ol>

          <p className="text-muted mt-3">
            The app is built using React JS and Bootstrap for a modern and responsive user experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformationPage;
