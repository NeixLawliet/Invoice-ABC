import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function History() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const data = [
      { number: "INV001", date: "2022-01-01", total: "1000", status: "Paid", action: "View" },
      { number: "INV002", date: "2022-02-01", total: "2000", status: "Pending", action: "View" },
      { number: "INV003", date: "2022-03-01", total: "3000", status: "Paid", action: "View" },
    ];
    setInvoices(data);
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Invoice History</h2>
        <button className="btn btn-primary" onClick={() => window.location.href='/invoice'}>Create New Invoice</button>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Invoice Number</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr key={index}>
                    <td>{invoice.number}</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.total}</td>
                    <td>{invoice.status}</td>
                    <td>{invoice.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;