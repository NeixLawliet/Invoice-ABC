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
      noInvoiceData: 'No Invoice Data.',
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

    },
    id : {
      invoiceHistory : 'Riwayat Invoice',
      createNewInvoice : 'Buat Invoice Baru',
      searchCustomer : 'Cari Pelanggan',
      search : 'Cari',
      invoiceNumber : 'Nomor Invoice',
      date : 'Tanggal',
      total : 'Total',
      status : 'Status',
      action : 'Aksi',
      noInvoiceData : 'Tidak Ada Data Invoice',
      view : 'Lihat',
      delete : 'Hapus',
      download : 'Unduh',
      sendToWhatsApp : 'Kirim Ke Whastsapp',
      enterPhoneNumber : 'Masukan No Telepon',
      close : 'Tutup',
      send : 'Kirim',
      confirmDelete : 'Apakah Anda Yakin Ingin Menghapus Invoice Ini?',
      deleteSuccess : 'Invoice Berhasil Dihapus',
      deleteFail : 'Gagal Menghapus Invoice',
      deleteError : 'Kesalahan Saat Menghapus Invoice',
      deleteErrorAlert : 'Terjadi Kesalahan Saat Menghapus Invoice'
    }
  }

  const {language} = useLanguage();
  const t = translations[language];

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
      setFilteredInvoices(data);
    } catch (error) {
      console.error("Gagal mengambil data invoice:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t.confirmDelete)) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/invoices/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert(t.deleteSuccess);
          fetchInvoices();
        } else {
          alert(t.deleteFail);
        }
      } catch (error) {
        console.error(t.deleteError, error);
        alert(t.deleteErrorAlert);
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
        <h2>{t.InvoiceHistory}</h2>
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/invoice")}
        >
          {t.createNewInvoice}
        </button>
      </div>

      {/* Search Bar */}
      <div className="d-flex mb-3 bg-light rounded p-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder={t.searchCustomer}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          {t.search}
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>{t.invoiceNumber}</th>
                  <th>{t.date}</th>
                  <th>{t.total}</th>
                  <th>{t.status}</th>
                  <th>{t.action}</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      {t.noInvoiceData}
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
                            {t.view}
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger me-2 mb-2"
                            onClick={() => handleDelete(invoice.id)}
                          >
                            {t.delete}
                          </button>
                          <button
                            className="btn btn-sm btn-outline-success me-2 mb-2"
                            onClick={() => handleDownload(invoice.id)}
                          >
                            {t.download}
                          </button>
                        <button
                          className="btn btn-sm btn-outline-info me-2 mb-2"
                          data-bs-toggle="modal"
                          data-bs-target={`#whatsappModal${invoice.id}`}
                        >
                          {t.sendToWhatsApp}
                        </button>
                        <div className="modal fade" id={`whatsappModal${invoice.id}`} tabIndex="-1" aria-labelledby="whatsappModalLabel" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="whatsappModalLabel">{t.sendToWhatsApp}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body">
                                <input
                                  type="text"
                                  className="form-control"
                                  id={`whatsappNumber${invoice.id}`}
                                  placeholder={t.enterPhoneNumber}
                                />
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t.close}</button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={() => {
                                    const phoneNumber = document.getElementById(`whatsappNumber${invoice.id}`).value;
                                    window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Invoice ${invoice.invoice_number} telah dikirimkan.`;
                                  }}
                                >
                                  {t.send}
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
