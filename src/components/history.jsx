import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useLanguage } from './LanguageContext';



function History() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const translations = {
    en : {
      invoiceHistory: 'Invoice History',
      createNewInvoice: 'Create New Invoice',
      searchCustomer: 'Search customer',
      search: 'Search',
      invoiceNumber: 'Invoice Number',
      date: 'Date',
      total: 'Total',
      status: 'Status',
      action: 'Action',
      noInvoiceData: 'No invoice data.',
      view: 'View',
      delete: 'Delete',
      download: 'Download',
      sendToWhatsApp: 'Send to WhatsApp',
      enterPhoneNumber: 'Enter phone number',
      close: 'Close',
      send: 'Send',
      confirmDelete: 'Are you sure you want to delete this invoice?',
      deleteSuccess: 'Invoice deleted successfully',
      deleteFail: 'Failed to delete invoice',
      deleteError: 'Error deleting invoice',
      deleteErrorAlert: 'An error occurred while deleting the invoice'

    }
    
  }

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://192.168.100.72:5000/api/invoices", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setInvoices(data);
      setFilteredInvoices(data); // Simpan juga untuk hasil filter
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
          fetchInvoices();
        } else {
          alert("Gagal menghapus invoice");
        }
      } catch (error) {
        console.error("Error menghapus invoice:", error);
        alert("Terjadi kesalahan saat menghapus invoice");
      }
    }
  };

  const handleDownload = (id) => {
    window.location.href = `/download/invoice/${id}`;
  };

  const handleSearch = () => {
    const filtered = invoices.filter(invoice =>
      invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInvoices(filtered);
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

      {/* Search Bar */}
      <div className="d-flex mb-3 bg-light rounded p-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search customer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
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
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Tidak ada data invoice.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice, index) => (
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
                            className="btn btn-sm btn-outline-primary me-2 mb-2"
                            onClick={() => window.location.href = `/invoice/${invoice.id}`}
                          >
                            View
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger me-2 mb-2"
                            onClick={() => handleDelete(invoice.id)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-sm btn-outline-success me-2 mb-2"
                            onClick={() => handleDownload(invoice.id)}
                          >
                            Download
                          </button>
                        <button
                          className="btn btn-sm btn-outline-info me-2 mb-2"
                          data-bs-toggle="modal"
                          data-bs-target={`#whatsappModal${invoice.id}`}
                        >
                          Send to WhatsApp
                        </button>
                        <div className="modal fade" id={`whatsappModal${invoice.id}`} tabIndex="-1" aria-labelledby="whatsappModalLabel" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="whatsappModalLabel">Send to WhatsApp</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <input
                                  type="text"
                                  className="form-control"
                                  id={`whatsappNumber${invoice.id}`}
                                  placeholder="Enter phone number"
                                />
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => {
                                    const phoneNumber = document.getElementById(`whatsappNumber${invoice.id}`).value;
                                    window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Invoice ${invoice.invoice_number} telah dikirimkan.`;
                                  }}
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
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
