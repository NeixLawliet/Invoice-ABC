import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function History() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/invoices", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Fetched invoices:", data); // Untuk debug
      setInvoices(data);
    } catch (error) {
      console.error("Gagal mengambil data invoice:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus invoice ini?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/invoices/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Invoice berhasil dihapus");
          fetchInvoices(); // Refresh data setelah menghapus
        } else {
          alert("Gagal menghapus invoice");
        }
      } catch (error) {
        console.error("Error menghapus invoice:", error);
        alert("Terjadi kesalahan saat menghapus invoice");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Invoice History</h2>
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/invoice")}
        >
          Create New Invoice
        </button>
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
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Tidak ada data invoice.
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice, index) => (
                    <tr key={index}>
                      <td>{invoice.invoice_number}</td>
                      <td>{new Date(invoice.date).toLocaleDateString()}</td>
                      <td>
                        {parseFloat(invoice.total_amount).toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td>{invoice.status || "N/A"}</td>
                      <td>
                        <div className="btn-group">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => window.location.href = `/invoice/${invoice.id}`}
                          >
                            View
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(invoice.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
